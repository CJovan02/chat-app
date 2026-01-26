using backend.Dto.Messages.Request;
using backend.Entities;

namespace backend.Dto.Messages;

public static class MessagesExtensions
{
    public static Message ToDomain(this MessageRequest request)
    {
        return new Message
        {
            RoomId = request.RoomId,
            SenderId = request.SenderId,
            Text = request.Text
        };
    }
}