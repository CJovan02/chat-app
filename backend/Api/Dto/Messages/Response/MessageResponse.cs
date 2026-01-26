using backend.Entities;

namespace backend.Dto.Messages.Response;

public sealed record MessageResponse(
    string Id,
    string RoomId,
    string SenderId,
    string Text,
    DateTime SentAt
)
{
    public static MessageResponse FromDomain(Message domain)
    {
        return new MessageResponse(domain.Id, domain.RoomId, domain.SenderId, domain.Text, domain.SentAt);
    }
}