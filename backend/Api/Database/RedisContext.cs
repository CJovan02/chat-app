using backend.Entities;
using Redis.OM;
using Redis.OM.Searching;
using StackExchange.Redis;

namespace backend.Database;

/// <summary>
/// Abstraction layer for Redis database. It exposes Redis ORM Collections using "Redis.OM" package as well as
/// IDatabase from "StackExchange.Redis" package allowing you to use this layer for ORM as well as
/// low level Redis commands
/// </summary>
/// <param name="connection"></param>
public sealed class RedisContext(IConnectionMultiplexer connection)
{
    // This is used for executing Redis commands
    private readonly IDatabase _db = connection.GetDatabase();

    // This is used for ORM
    private readonly RedisConnectionProvider _provider = new RedisConnectionProvider(connection);

    public async Task PingAsync()
    {
        try
        {
            var latency = await _db.PingAsync();
            Console.WriteLine("✅ Pinged your deployment. You successfully connected to Redis! Latency: " +
                              latency.TotalMilliseconds + "ms");
        }
        catch (Exception e)
        {
            Console.WriteLine("❌ Redis connection could not be established.");
            Console.WriteLine(e);
        }
    }

    public async Task<bool> DropAndCreateIndexAsync(Type type)
    {
        await _provider.Connection.DropIndexAsync(type);
        return await _provider.Connection.CreateIndexAsync(type);
    }

    public Task<bool> CreateIndexAsync(Type type)
    {
        return _provider.Connection.CreateIndexAsync(type);
    }

    // Redis Set Operations
    public Task<bool> SetAddAsync(RedisKey key, RedisValue value)
    {
        return _db.SetAddAsync(key, value);
    }

    public Task<bool> SetRemoveAsync(RedisKey key, RedisValue value)
    {
        return _db.SetRemoveAsync(key, value);
    }

    public Task<RedisValue[]> SetMembersAsync(RedisKey key)
    {
        return _db.SetMembersAsync(key);
    }

    public Task<bool> SetContainsAsync(RedisKey key, RedisValue value)
    {
        return _db.SetContainsAsync(key, value);
    }

    // Redis Stream operations
    public Task<RedisValue> StreamAddAsync(RedisKey key, NameValueEntry[] streamPairs)
    {
        return _db.StreamAddAsync(key, streamPairs);
    }


    public RedisCollection<User> Users => (RedisCollection<User>)_provider.RedisCollection<User>();

    public RedisCollection<Room> Rooms => (RedisCollection<Room>)_provider.RedisCollection<Room>();
}