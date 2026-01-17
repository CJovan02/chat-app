using backend.Infrastructure.EnvironmentConfig;

namespace backend.Infrastructure;

public static class IServiceExtension
{
    public static IServiceCollection AddEnvVariables(this IServiceCollection services)
    {
        return services.AddSingleton<IEnvConfig, EnvConfig>();
    }
}