using Redis.OM.Modeling;

namespace backend.Entities;

[Document(StorageType = StorageType.Json, Prefixes = ["user"])]
public class User : BaseEntity
{
    [Indexed] public required string Username { get; init; }

    [Indexed] public required string DisplayName { get; set; }

    public required int Age { get; set; }

    public string PasswordHash { get; init; }
}