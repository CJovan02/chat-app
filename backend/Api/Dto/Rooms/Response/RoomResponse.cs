using backend.Entities;

namespace backend.Dto.Rooms.Response;

public sealed record RoomResponse(
    List<string> ParticipantIds,
    DateTimeOffset CreatedAt
)
{
    public static RoomResponse FromDomain(Room domain)
    {
        return new RoomResponse(
            domain.ParticipantIds,
            domain.CreatedAt
        );
    }
}