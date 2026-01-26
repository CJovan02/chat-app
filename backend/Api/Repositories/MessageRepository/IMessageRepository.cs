using backend.Entities;

namespace backend.Repositories.MessageRepository;

public interface IMessageRepository
{
    Task<string> SendMessage(Message message);

    /// <summary>
    /// Returns Messages from provided chat, starting from the latest message and going to the newest.
    /// </summary>
    /// <param name="beforeId">
    /// If it's null, it starts from the latest message.
    /// If it's not null, it starts from that provided message.
    /// </param>
    /// <returns></returns>
    Task<IReadOnlyList<Message>> GetMessagesAsync(string roomId, int pageSize, string? beforeId = null);
}