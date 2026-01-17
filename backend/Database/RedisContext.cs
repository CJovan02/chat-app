using Redis.OM;
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
    /// <summary>
    /// Use this if you want to execute Redis commands.
    /// </summary>
    public readonly IDatabase Db = connection.GetDatabase();

    // This is used for ORM.
    public readonly RedisConnectionProvider Provider = new RedisConnectionProvider(connection);

    public async Task PingAsync()
    {
        try
        {
            var latency = await Db.PingAsync();
            Console.WriteLine("✅ Pinged your deployment. You successfully connected to Redis! Latency: " +
                              latency.TotalMilliseconds + "ms");
        }
        catch (Exception e)
        {
            Console.WriteLine("❌ Redis connection could not be established.");
            Console.WriteLine(e);
        }
    }
}