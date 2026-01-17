namespace backend.Infrastructure.EnvironmentConfig;

public interface IEnvConfig
{
    string RedisCloudHost { get; }
    int RedisCloudPort { get; }
    string RedisPassword { get; }
}