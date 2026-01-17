using backend.Common.Exceptions;

namespace backend.Infrastructure.EnvironmentConfig;

public sealed class EnvConfig : IEnvConfig
{
    public string RedisCloudHost =>
        DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisCloudHost)
        ?? throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisCloudHost);

    public int RedisCloudPort
    {
        get
        {
            var port = DotNetEnv.Env.GetInt(Common.Constants.EnvVariables.RedisCloudPort);
            if (port == 0)
                throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisCloudPort);

            return port;
        }
    }

    public string RedisPassword =>
        DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisPassword)
        ?? throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisPassword);
}