using backend.Database;

namespace backend.Repositories.UserRoomRepository;

public class UserRoomsRepository(RedisContext redisContext) : IUserRoomsRepository
{
    private readonly RedisContext _redisContext = redisContext;

    private static string Key(string userId)
        => $"user:{userId}:rooms";

    /// <summary>
    /// Adds a room to user's room set.
    /// SADD user:{userId}:rooms roomId
    /// </summary>
    public Task AddRoomToUserAsync(string userId, string roomId)
    {
        return _redisContext.SetAddAsync(Key(userId), roomId);
    }

    /// <summary>
    /// Removes a room from user's room set.
    /// SREM user:{userId}:rooms roomId
    /// </summary>
    public Task RemoveRoomFromUserAsync(string userId, string roomId)
    {
        return _redisContext.SetRemoveAsync(Key(userId), roomId);
    }

    /// <summary>
    /// Returns all room IDs the user belongs to.
    /// SMEMBERS user:{userId}:rooms
    /// </summary>
    public async Task<IReadOnlyCollection<string>> GetUserRoomsAsync(string userId)
    {
        var members = await _redisContext.SetMembersAsync(Key(userId));

        // RedisValue -> string
        return members
            .Where(v => v.HasValue)
            .Select(v => (string)v!)
            .ToArray();
    }
}