using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;

namespace backend.Services.RoomService;

public interface IRoomService
{
    Task<IEnumerable<RoomResponse>> GetAllRoomsAsync();
    Task<RoomResponse?> GetRoomByIdAsync(string roomId);
    Task<string> CreateRoomAsync(RoomRequest request);
    Task UpdateRoomAsync(RoomRequest request);
    Task DeleteRoomAsync(string roomId);
}