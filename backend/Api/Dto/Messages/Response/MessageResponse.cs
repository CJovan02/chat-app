using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dto.Messages.Response;

public sealed record MessageResponse
{
    [Required] public required string Id { get; init; }
    [Required] public required string RoomId { get; init; }
    [Required] public required string SenderId { get; init; }
    [Required] public required string Text { get; init; }
    [Required] public required DateTime SentAt { get; init; }

    public static MessageResponse FromDomain(Message domain)
    {
        return new MessageResponse
        {
            Id = domain.Id,
            RoomId = domain.RoomId,
            SenderId = domain.SenderId,
            Text = domain.Text,
            SentAt = domain.SentAt
        };
    }
}