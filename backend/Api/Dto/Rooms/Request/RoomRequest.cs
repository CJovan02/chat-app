using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Rooms.Request;

public sealed record RoomRequest
{
    [Required] public required List<string> ParticipantIds { get; init; }
}