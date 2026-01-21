using Redis.OM.Modeling;

namespace backend.Entities;

[Document(StorageType = StorageType.Json, Prefixes = ["Room"])]
public class Room : BaseEntity
{
    [Indexed] public required List<string> ParticipantIds { get; set; }
    [Indexed] public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
}