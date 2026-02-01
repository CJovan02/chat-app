using backend.Dto.Rooms;
using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;
using backend.Entities;
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

    public async Task<Result<RoomResponse>> GetRoomByIdAsync(string roomId)
    {
        var room = await _roomRepository.GetRoomByIdAsync(roomId);
        if (room is null)
            return Result<RoomResponse>.Failure(RoomErrors.NotFound(roomId));

        return Result<RoomResponse?>.Success(RoomResponse.FromDomain(room));
    }

    public async Task<Result<string>> CreateRoomAsync(RoomRequest request)
    {
        // Grab only distinct id's
        request = new RoomRequest { ParticipantIds = request.ParticipantIds.Distinct().ToList() };

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

    public async Task<Result<string>> CreatePrivateRoomAsync(CreatePrivateRoomRequest request)
    {
        // check if provided users exist
        if (!(await _userRepository.UserExistsByIdAsync(request.UserId)))
            return Result<string>.Failure(UserErrors.NotFoundId(request.UserId));

        var otherUser = await _userRepository.GetUserByUsernameAsync(request.OtherUserUsername);
        if (otherUser is null)
            return Result<string>.Failure(UserErrors.NotFoundUsername(request.OtherUserUsername));

        var participantIds = new List<string>();
        participantIds.AddRange(request.UserId, otherUser.Id!);
        var room = new Room
        {
            ParticipantIds = participantIds,
        };
        var roomId = await _roomRepository.CreateRoomAsync(room);

        // Add this room for both users id
        await _userRoomsRepository.AddRoomToUserAsync(request.UserId, roomId);
        await _userRoomsRepository.AddRoomToUserAsync(otherUser.Id, roomId);

        return Result<string>.Success(roomId);
    }

    public async Task<Result> UpdateRoomAsync(RoomRequest request)
    {
        await _roomRepository.UpdateRoomAsync(request.ToDomain());
        return Result.Success();
    }

    // TODO delete room from user rooms and delete all messages from that room
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