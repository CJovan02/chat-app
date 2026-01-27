using backend.Dto.Messages.Request;
using backend.Entities;

namespace backend.Dto.Messages;

public static class MessagesExtensions
{
    public static Message ToDomain(this MessageRequest request, string? messageId = null)
    {
        return new Message
        {
            Id = messageId,
            RoomId = request.RoomId,
            SenderId = request.SenderId,
            Text = request.Text
        };
    }
}