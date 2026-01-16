using StackExchange.Redis;

namespace backend.Database;

public sealed class RedisDatabase(IConnectionMultiplexer connection)
{
    private readonly IDatabase _db = connection.GetDatabase();

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
}