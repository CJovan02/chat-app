using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dto.Rooms.Response;

public sealed record RoomResponse
{
    [Required] public required string Id { get; init; }
    [Required] public required List<string> ParticipantIds { get; init; }
    [Required] public required DateTimeOffset CreatedAt { get; init; }

    public static RoomResponse FromDomain(Room domain)
    {
        return new RoomResponse
        {
            Id = domain.Id,
            ParticipantIds = domain.ParticipantIds,
            CreatedAt = domain.CreatedAt
        };
    }
}