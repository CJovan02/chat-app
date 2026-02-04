using backend.Dto.Id;
using backend.ExceptionHandlers;
using backend.Infrastructure.EnvironmentConfig;
using backend.Repositories.MessageRepository;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.Services.MessageService;
using backend.Services.RoomService;
using backend.Services.UserService;
using FluentValidation;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

namespace backend.Infrastructure;

public static class IServiceExtension
{
    public static IServiceCollection AddEnvVariables(this IServiceCollection services, EnvConfig? instance = null)
    {
        if (instance == null)
            services.AddSingleton<IEnvConfig, EnvConfig>();
        else
            services.AddSingleton<IEnvConfig>(instance);

        return services;
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

    public static IServiceCollection AddExceptionHandlers(this IServiceCollection services)
    {
        return services
            .AddExceptionHandler<GlobalExceptionHandler>()
            .AddProblemDetails();
    }

    public static IServiceCollection AddFluentValidationAndValidators(this IServiceCollection services)
    {
        return services
            .AddValidatorsFromAssembly(typeof(IdRequest).Assembly, includeInternalTypes: true)
            .AddValidatorsFromAssemblyContaining<Program>()
            .AddFluentValidationAutoValidation();
    }

    public static IServiceCollection AddFrontendToCors(this IServiceCollection services, string frontendOrigin)
    {
        // "http://localhost:5174"
        // "http://localhost:5173"
        Console.WriteLine(frontendOrigin);
        return services
            .AddCors(options =>
            {
                options.AddPolicy(name: Common.Constants.OriginNames.Frontend,
                    policy =>
                    {
                        policy
                            .WithOrigins(frontendOrigin)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
    }
}