using backend.Database;
using backend.Infrastructure;
using backend.Infrastructure.HostedServices;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEnvVariables();

// DB
builder.Services.AddRedisConnectionMultiplexer();
builder.Services.AddRedisContext();
builder.Services.AddHostedService<IndexCreationService>();


var app = builder.Build();

var redis = app.Services.GetService<RedisContext>();
await redis.PingAsync();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();

