using backend.Dto.Messages.Request;
using backend.Services.MessageService;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class ChatHub(IMessageService messageService) : Hub
{
    private readonly IMessageService _messageService = messageService;

    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }

    public async Task SendMessage(MessageRequest request)
    {
        // Firstly, save this message inside db
        var response = await _messageService.SendMessage(request);

        // Broadcast to everyone inside group
        await Clients.Group(request.RoomId).SendAsync("ReceiveMessage", response);
    }
}