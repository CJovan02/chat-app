using backend.Entities;

namespace backend.Dto.Rooms.Response;

public sealed record RoomResponse(
    string Id,
    List<string> ParticipantIds,
    DateTimeOffset CreatedAt
)
{
    public static RoomResponse FromDomain(Room domain)
    {
        return new RoomResponse(
            domain.Id,
            domain.ParticipantIds,
            domain.CreatedAt
        );
    }
}