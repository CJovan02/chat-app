using backend.Dto.Messages.Request;
using backend.Services.MessageService;
using FluentValidation;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class ChatHub(IMessageService messageService, IValidator<MessageRequest> messageReqValidator) : Hub
{
    private readonly IMessageService _messageService = messageService;
    private readonly IValidator<MessageRequest> _messageReqValidator = messageReqValidator;

    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }

    public async Task SendMessage(MessageRequest request)
    {
        var validationResult = await _messageReqValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            await Clients.Caller.SendAsync("ValidationFailed", validationResult.Errors);
            return;
        }

        // Firstly, save this message inside db
        var response = await _messageService.SendMessage(request);

        // Broadcast to everyone inside group
        await Clients.Group(request.RoomId).SendAsync("ReceiveMessage", response);
    }
}