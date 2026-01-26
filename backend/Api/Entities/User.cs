using Redis.OM.Modeling;

namespace backend.Entities;

[Document(StorageType = StorageType.Json, Prefixes = ["user"])]
public class User : BaseEntity
{
    [Indexed] public required string Username { get; set; }

    [Indexed] public required string DisplayName { get; set; }

    [Indexed] public required int Age { get; set; }
}