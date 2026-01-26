using backend.Entities;

namespace backend.Dto.Messages.Response;

public sealed record MessageResponse(
    string RoomId,
    string SenderId,
    string Text
)
{
    public static MessageResponse FromDomain(Message domain)
    {
        return new MessageResponse(domain.RoomId, domain.SenderId, domain.Text);
    }
}