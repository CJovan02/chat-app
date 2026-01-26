using backend.Dto.Rooms;
using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;

namespace backend.Services.RoomService;

public class RoomService(
    IRoomRepository roomRepository,
    IUserRoomsRepository userRoomsRepository,
    IUserRepository userRepository) : IRoomService
{
    private readonly IRoomRepository _roomRepository = roomRepository;
    private readonly IUserRoomsRepository _userRoomsRepository = userRoomsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<IEnumerable<RoomResponse>> GetAllRoomsAsync()
    {
        var rooms = await _roomRepository.GetAllRoomsAsync();
        return rooms.Select(RoomResponse.FromDomain);
    }

    public async Task<RoomResponse?> GetRoomByIdAsync(string roomId)
    {
        var room = await _roomRepository.GetRoomByIdAsync(roomId);
        if (room is null) return null;

        return RoomResponse.FromDomain(room);
    }

    public async Task<string> CreateRoomAsync(RoomRequest request)
    {
        request = new RoomRequest(request.ParticipantIds.Distinct().ToList());

        if (request.ParticipantIds.Count < 2)
            throw new Exception("You need to provide at least two participants");

        // check if provided users exist
        foreach (var participantId in request.ParticipantIds)
        {
            if (!(await _userRepository.UserExistsByIdAsync(participantId)))
                throw new Exception($"User {participantId} not found");
        }

        var roomId = await _roomRepository.CreateRoomAsync(request.ToDomain());

        // Add this room for each participant id
        foreach (var participantId in request.ParticipantIds)
        {
            await _userRoomsRepository.AddRoomToUserAsync(participantId, roomId);
        }

        return roomId;
    }

    public Task UpdateRoomAsync(RoomRequest request)
    {
        return _roomRepository.UpdateRoomAsync(request.ToDomain());
    }

    public async Task DeleteRoomAsync(string roomId)
    {
        // Redis ORM package accepts full object in order to delete it, that's why we need to pull it first
        // This logic can also go inside repository, but I think it's fine like this

        var room = await _roomRepository.GetRoomByIdAsync(roomId);
        if (room is null)
            throw new Exception("User not found");

        await _roomRepository.DeleteRoomAsync(room);
    }
}