using backend.Dto.Rooms;
using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.ResultPattern;
using backend.ResultPattern.Errors;

namespace backend.Services.RoomService;

public class RoomService(
    IRoomRepository roomRepository,
    IUserRoomsRepository userRoomsRepository,
    IUserRepository userRepository) : IRoomService
{
    private readonly IRoomRepository _roomRepository = roomRepository;
    private readonly IUserRoomsRepository _userRoomsRepository = userRoomsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<Result<IEnumerable<RoomResponse>>> GetAllRoomsAsync()
    {
        var rooms = await _roomRepository.GetAllRoomsAsync();
        return Result<IEnumerable<RoomResponse>>.Success(rooms.Select(RoomResponse.FromDomain));
    }

    public async Task<Result<RoomResponse?>> GetRoomByIdAsync(string roomId)
    {
        var room = await _roomRepository.GetRoomByIdAsync(roomId);
        if (room is null) return Result<RoomResponse?>.Success(null);

        return Result<RoomResponse?>.Success(RoomResponse.FromDomain(room));
    }

    public async Task<Result<string>> CreateRoomAsync(RoomRequest request)
    {
        // Grab only distinct id's
        request = new RoomRequest(request.ParticipantIds.Distinct().ToList());

        // check if provided users exist
        foreach (var participantId in request.ParticipantIds)
        {
            if (!(await _userRepository.UserExistsByIdAsync(participantId)))
                return Result<string>.Failure(RoomErrors.ParticipantNotFound(participantId));
        }

        var roomId = await _roomRepository.CreateRoomAsync(request.ToDomain());

        // Add this room for each participant id
        foreach (var participantId in request.ParticipantIds)
        {
            await _userRoomsRepository.AddRoomToUserAsync(participantId, roomId);
        }

        return Result<string>.Success(roomId);
    }

    public async Task<Result> UpdateRoomAsync(RoomRequest request)
    {
        await _roomRepository.UpdateRoomAsync(request.ToDomain());
        return Result.Success();
    }

    public async Task<Result> DeleteRoomAsync(string roomId)
    {
        // Redis ORM package accepts full object in order to delete it, that's why we need to pull it first
        // This logic can also go inside repository, but I think it's fine like this

        var room = await _roomRepository.GetRoomByIdAsync(roomId);
        if (room is null)
            return Result.Failure(RoomErrors.NotFound(roomId));

        await _roomRepository.DeleteRoomAsync(room);
        return Result.Success();
    }
}