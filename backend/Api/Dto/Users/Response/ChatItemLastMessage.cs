using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dto.Users.Response;

public sealed record ChatItemLastMessage
{
    [Required] public required string Id { get; init; }
    [Required] public required string SenderId { get; init; }
    [Required] public required string Text { get; init; }
    [Required] public required DateTime SentAt { get; init; }

    public static ChatItemLastMessage FromDomain(Message domain)
    {
        return new ChatItemLastMessage
        {
            Id = domain.Id,
            SenderId = domain.SenderId,
            Text = domain.Text,
            SentAt = domain.SentAt
        };
    }
}