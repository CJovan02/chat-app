using backend.Infrastructure.EnvironmentConfig;
using DotNetEnv;
using StackExchange.Redis;

namespace backend.Database;

public static class ServiceCollectionExtension
{
    /// <summary>
    /// Creates redis database configuration to DI and also creates redis database to DI which uses that configuration
    /// </summary>
    /// <exception cref="EnvVariableNotFoundException"></exception>
    public static IServiceCollection AddRedisDatabase(this IServiceCollection services)
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

        services.AddSingleton<RedisDatabase>();

        return services;
    }
}