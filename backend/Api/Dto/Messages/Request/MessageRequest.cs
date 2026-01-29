using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Messages.Request;

public sealed record MessageRequest
{
    [Required] public required string RoomId { get; init; }
    [Required] public required string SenderId { get; init; }
    [Required] public required string Text { get; init; }
}