using backend.Common.Exceptions;

namespace backend.Infrastructure.EnvironmentConfig;

public sealed class EnvConfig : IEnvConfig
{
    public string RedisCloudHost =>
        DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisHost)
        ?? throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisHost);

    public int RedisCloudPort
    {
        get
        {
            var port = DotNetEnv.Env.GetInt(Common.Constants.EnvVariables.RedisPort);
            if (port == 0)
                throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisPort);

            return port;
        }
    }

    public string RedisPassword =>
        DotNetEnv.Env.GetString(Common.Constants.EnvVariables.RedisPassword)
        ?? throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.RedisPassword);

    public string FrontendAddress =>
        DotNetEnv.Env.GetString(Common.Constants.EnvVariables.FrontendAddress)
        ?? throw new EnvVariableNotFoundException(Common.Constants.EnvVariables.FrontendAddress);
}