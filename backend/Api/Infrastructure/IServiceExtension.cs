using backend.Infrastructure.EnvironmentConfig;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Services.UserService;

namespace backend.Infrastructure;

public static class IServiceExtension
{
    public static IServiceCollection AddEnvVariables(this IServiceCollection services)
    {
        return services.AddSingleton<IEnvConfig, EnvConfig>();
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        return services
            .AddScoped<IUserRepository, UserRepository>()
            .AddScoped<IRoomRepository, RoomRepository>();
    }

    public static IServiceCollection AddBusinessLogicServices(this IServiceCollection services)
    {
        return services.AddScoped<IUserService, UserService>();
    }
}