using backend.Dto.Messages.Request;
using backend.Dto.Messages.Response;

namespace backend.Services.MessageService;

public interface IMessageService
{
    Task<MessageResponse> SendMessage(MessageRequest request);

    Task<IEnumerable<MessageResponse>> GetMessagesAsync(string roomId, int pageSize, string? beforeId = null);
}