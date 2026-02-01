using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Rooms.Request;

public sealed record CreatePrivateRoomRequest
{
    [Required] public required string UserId { get; init; }
    [Required] public required string OtherUserUsername { get; init; }
}