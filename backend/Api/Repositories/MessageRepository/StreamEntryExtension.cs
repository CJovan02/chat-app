using backend.Entities;
using StackExchange.Redis;

namespace backend.Repositories.MessageRepository;

public static class StreamEntryExtension
{
    public static Message ToMessage(this StreamEntry entry, string roomId)
    {
        return new Message
        {
            Id = entry.Id!,
            RoomId = roomId,
            SenderId = entry["senderId"],
            Text = entry["text"],
            SentAt = DateTime.Parse(entry["sentAt"])
        };
    }
}