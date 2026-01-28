using backend.Dto.Messages.Request;
using backend.Dto.Messages.Response;
using backend.ResultPattern;
using backend.Services.MessageService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MessageController(IMessageService messageService) : ControllerBase
{
    private readonly IMessageService _messageService = messageService;

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<MessageResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMessagesAsync([FromQuery] GetMessagesRequest request)
    {
        return (await _messageService.GetMessagesAsync(request)).ToActionResult();
    }

    [HttpPost]
    [ProducesResponseType(typeof(MessageResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
    {
        return (await _messageService.SendMessage(request)).ToActionResult();
    }
}