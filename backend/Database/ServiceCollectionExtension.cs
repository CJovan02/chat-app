using DotNetEnv;
using Microsoft.VisualBasic;
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
            var host = DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisCloudHost);
            if (host == null)
                throw new Common.Exceptions.EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisCloudHost);

            var port = DotNetEnv.Env.GetInt(Common.Constants.EnvVariables.RedisCloudPort);
            if (port == null)
                throw new Common.Exceptions.EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisCloudPort);

            var pass = DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisPassword);
            if (pass == null)
                throw new Common.Exceptions.EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisPassword);
            var config = new ConfigurationOptions
            {
                EndPoints= { { host, port} },
                User = "default",
                Password = pass
            };

            return ConnectionMultiplexer.Connect(config);
        });

        services.AddSingleton<RedisDatabase>();

        return services;
    }
}