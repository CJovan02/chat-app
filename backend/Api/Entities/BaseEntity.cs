using Redis.OM.Modeling;

namespace backend.Entities;

public abstract class BaseEntity
{
    [RedisIdField] [Indexed] public string? Id { get; init; }
}