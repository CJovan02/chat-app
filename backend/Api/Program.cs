using backend.Database;
using backend.Infrastructure;
using backend.Infrastructure.HostedServices;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Chat-App Backend API", Version = "v1" });
});
builder.Services.AddEnvVariables();

// DB
builder.Services.AddRedisConnectionMultiplexer();
builder.Services.AddRedisContext();
builder.Services.AddHostedService<IndexCreationService>();

builder.Services
    .AddRepositories()
    .AddBusinessLogicServices();

builder.Services.AddControllers();

var app = builder.Build();

var redis = app.Services.GetService<RedisContext>();
await redis.PingAsync();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapControllers();
}

app.UseHttpsRedirection();

app.Run();