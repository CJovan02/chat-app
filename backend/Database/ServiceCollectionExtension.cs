using backend.Infrastructure.EnvironmentConfig;
using StackExchange.Redis;

namespace backend.Database;

public static class ServiceCollectionExtension
{
    /// <summary>
    /// Creates Redis connection configuration and uses it to create connection multiplexer.
    /// This multiplexer is connection to redis service.
    /// Depends on IEnvConfig.
    /// </summary>
    public static IServiceCollection AddRedisConnectionMultiplexer(this IServiceCollection services)
    {
        services.AddSingleton<IConnectionMultiplexer>(provider =>
        {
            var envConfig = provider.GetService<IEnvConfig>();

            var config = new ConfigurationOptions
            {
                EndPoints = { { envConfig.RedisCloudHost, envConfig.RedisCloudPort } },
                User = "default",
                Password = envConfig.RedisPassword
            };

            return ConnectionMultiplexer.Connect(config);
        });

        return services;
    }

    /// <summary>
    /// Creates Redis Context object and adds it to DI.
    /// It depends on IConnectionMultiplexer for redis connection.
    /// </summary>
    public static IServiceCollection AddRedisContext(this IServiceCollection services)
    {
        return services.AddSingleton<RedisContext>();
    }
}