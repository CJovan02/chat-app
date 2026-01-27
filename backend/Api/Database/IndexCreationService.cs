using backend.Database;
using backend.Entities;
using backend.Repositories.RoomRepository;

namespace backend.Infrastructure.HostedServices;

/// <summary>
/// Creates redis indexes for all entities in the background when the app starts
/// </summary>
public class IndexCreationService(RedisContext redisContext, ILogger<IndexCreationService> logger) : IHostedService
{
    private readonly RedisContext _redisContext = redisContext;
    private readonly ILogger<IndexCreationService> _logger = logger;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var startTime = DateTime.Now;
        _logger.LogInformation("Creating redis indexes for entities...");

        var status1 = await _redisContext.DropAndCreateIndexAsync(typeof(User));
        var status2 = await _redisContext.DropAndCreateIndexAsync(typeof(Room));

        if (!status1 || !status2)
        {
            _logger.LogError("❌ Error trying to create redis indexes");
        }
        var duration = DateTime.Now - startTime;
        _logger.LogInformation("✅ Redis index creation finished in {DurationTotalMs} ms", duration.TotalMilliseconds);
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}