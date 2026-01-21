using backend.Database;
using backend.Entities;

namespace backend.Infrastructure.HostedServices;

/// <summary>
/// Creates redis indexes for all entities in the background when the app starts
/// </summary>
/// <param name="provider"></param>
public class IndexCreationService(RedisContext redisContext) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("Creating redis indexes for entities...");
        await redisContext.CreateIndexAsync(typeof(User));
        await redisContext.CreateIndexAsync(typeof(Room));
        Console.WriteLine("Redis index creation finished");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}