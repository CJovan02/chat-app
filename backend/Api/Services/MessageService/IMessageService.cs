using backend.Dto.Messages.Request;

namespace backend.Services.MessageService;

public interface IMessageService
{
    Task<string> SendMessage(MessageRequest request);
}