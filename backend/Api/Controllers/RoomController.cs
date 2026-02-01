using backend.Dto.Rooms.Request;
using backend.ResultPattern;
using backend.Services.RoomService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomController(IRoomService roomService) : ControllerBase
{
    private readonly IRoomService _roomService = roomService;

    [HttpPost("createPrivate")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreatePrivateRoomRequest request)
    {
        return (await _roomService.CreatePrivateRoomAsync(request)).ToActionResult();
    }

    // [HttpDelete("{roomId}")]
    // [ProducesResponseType(StatusCodes.Status200OK)]
    // public async Task<IActionResult> Delete([FromRoute] string roomId)
    // {
    //     return (await _roomService.DeleteRoomAsync(roomId)).ToActionResult();
    // }
}