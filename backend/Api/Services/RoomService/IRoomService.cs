using backend.Dto.Rooms.Request;
using backend.Dto.Rooms.Response;
using backend.ResultPattern;

namespace backend.Services.RoomService;

public interface IRoomService
{
    Task<Result<IEnumerable<RoomResponse>>> GetAllRoomsAsync();
    Task<Result<RoomResponse>> GetRoomByIdAsync(string roomId);
    Task<Result<string>> CreateRoomAsync(RoomRequest request);
    Task<Result> UpdateRoomAsync(RoomRequest request);
    Task<Result> DeleteRoomAsync(string roomId);
}