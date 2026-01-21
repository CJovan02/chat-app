using backend.Dto.Rooms;
using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;
using backend.Repositories.RoomRepository;

namespace backend.Services.RoomService;

public class RoomService(IRoomRepository roomRepository) : IRoomService
{
    private readonly IRoomRepository _roomRepository = roomRepository;

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

    public Task<string> CreateRoomAsync(RoomRequest request)
    {
        return _roomRepository.CreateRoomAsync(request.ToDomain());
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