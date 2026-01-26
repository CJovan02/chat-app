using backend.Dto.Messages.Request;
using backend.Services.MessageService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MessageController(IMessageService messageService) : ControllerBase
{
    private readonly IMessageService _messageService = messageService;

    [HttpGet]
    public async Task<IActionResult> GetMessagesAsync(string roomId, int pageSize, string? beforeId)
    {
        return Ok(await _messageService.GetMessagesAsync(roomId, pageSize, beforeId));
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
    {
        return Ok(await _messageService.SendMessage(request));
    }
}