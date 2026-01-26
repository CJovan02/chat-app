using backend.Database;
using backend.Entities;
using Redis.OM.Searching;

namespace backend.Repositories.RoomRepository;

public class RoomRepository(RedisContext redisContext) : IRoomRepository
{
    private readonly RedisCollection<Room> _rooms = redisContext.Rooms;

    public Task<bool> RoomExists(string roomId)
    {
        return _rooms.AnyAsync(r => r.Id == roomId);
    }

    public async Task<IEnumerable<Room>> GetAllRoomsAsync()
    {
        return await _rooms.ToListAsync();
    }

    public Task<Room?> GetRoomByIdAsync(string roomId)
    {
        return _rooms.FindByIdAsync(roomId);
    }

    public Task<string> CreateRoomAsync(Room room)
    {
        return _rooms.InsertAsync(room);
    }

    public Task UpdateRoomAsync(Room room)
    {
        return _rooms.UpdateAsync(room);
    }

    public Task DeleteRoomAsync(Room room)
    {
        return _rooms.DeleteAsync(room);
    }
}