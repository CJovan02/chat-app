using backend.Infrastructure.EnvironmentConfig;
using backend.Repositories.MessageRepository;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.Services.MessageService;
using backend.Services.RoomService;
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
            .AddScoped<IUserRoomsRepository, UserRoomsRepository>()
            .AddScoped<IUserRepository, UserRepository>()
            .AddScoped<IRoomRepository, RoomRepository>()
            .AddScoped<IMessageRepository, MessageRepository>();
    }

    public static IServiceCollection AddBusinessLogicServices(this IServiceCollection services)
    {
        return services
            .AddScoped<IUserService, UserService>()
            .AddScoped<IRoomService, RoomService>()
            .AddScoped<IMessageService, MessageService>();
    }
}