using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Messages.Request;

public sealed record GetMessagesRequest
{
    [Required] public required string RoomId { get; init; }
    [Required] public required int PageSize { get; init; }
    public string? BeforeId { get; init; }
}