using backend.Entities;

namespace backend.Repositories.MessageRepository;

public interface IMessageRepository
{
    Task<string> SendMessage(Message message);

    // Task<IReadOnlyList<Message>> GetMessagesAsync(
    //     string roomId,
    //     int pageSize,
    //     string? beforeId = null);
}