using backend.Database;
using backend.Entities;
using backend.Repositories.MessageRepository;
using StackExchange.Redis;

public sealed class MessageRepository(RedisContext redisContext) : IMessageRepository
{
    private readonly RedisContext _redisContext = redisContext;

    private static string StreamKey(string roomId)
        => $"room:{roomId}:messages";

    // CREATE
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

    // READ (pagination)
    // public async Task<IReadOnlyList<Message>> GetMessagesAsync(
    //     string roomId,
    //     int pageSize,
    //     string? beforeId = null)
    // {
    //     var key = StreamKey(roomId);
    //
    //     // ako nema beforeId → čitaj od kraja
    //     var end = beforeId ?? "+";
    //     var start = "-";
    //
    //     var entries = await _db.StreamRangeAsync(
    //         key,
    //         minId: start,
    //         maxId: end,
    //         count: pageSize,
    //         messageOrder: Order.Descending);
    //
    //     return entries.Select(e => new Message
    //     {
    //         Id = e.Id!,
    //         RoomId = roomId,
    //         SenderId = e.Values.First(v => v.Name == "senderId").Value!,
    //         Text = e.Values.First(v => v.Name == "text").Value!,
    //         SentAt = DateTime.Parse(
    //             e.Values.First(v => v.Name == "sentAt").Value!)
    //     }).ToList();
    //}
}