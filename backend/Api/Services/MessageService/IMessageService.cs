using backend.Dto.Messages.Request;
using backend.Dto.Messages.Response;
using backend.ResultPattern;

namespace backend.Services.MessageService;

public interface IMessageService
{
    Task<Result<MessageResponse>> SendMessage(MessageRequest request);

    Task<Result<IEnumerable<MessageResponse>>> GetMessagesAsync(string roomId, int pageSize, string? beforeId = null);
}