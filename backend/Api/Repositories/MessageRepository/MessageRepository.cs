using backend.Database;
using backend.Entities;
using backend.Repositories.MessageRepository;
using StackExchange.Redis;

public sealed class MessageRepository(RedisContext redisContext) : IMessageRepository
{
    private readonly RedisContext _redisContext = redisContext;

    private static string StreamKey(string roomId)
        => $"room:{roomId}:messages";

    public async Task<string> SendMessage(Message message)
    {
        var id = await _redisContext.StreamAddAsync(
            StreamKey(message.RoomId),
            [
                new NameValueEntry("senderId", message.SenderId),
                new NameValueEntry("text", message.Text),
                new NameValueEntry("sentAt", message.SentAt.ToString("O"))
            ]);

        return id!;
    }

    public async Task<IReadOnlyList<Message>> GetMessagesAsync(string roomId, int pageSize, string? beforeId = null)
    {
        var key = StreamKey(roomId);

        // + means "highest id" -> the newest message
        // - means "lowest id" -> the oldest message

        // here we start reading from the newest message or from the provided message id.
        // I say "start" but variable is called "end" because we use Descending order to read from
        // the newest up to the oldest messages.
        var end = beforeId ?? "+";
        const string start = "-";

        var entries = await _redisContext.StreamRangeAsync(
            key,
            minId: start,
            maxId: end,
            count: pageSize,
            messageOrder: Order.Descending);

        return entries.Select(e => new Message
        {
            Id = e.Id!,
            RoomId = roomId,
            SenderId = e["senderId"],
            Text = e["text"],
            SentAt = DateTime.Parse(e["sentAt"])
        }).ToList();
    }
}