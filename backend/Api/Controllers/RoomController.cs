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

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        return (await _roomService.GetAllRoomsAsync()).ToActionResult();
    }

    [HttpGet("{roomId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromRoute] string roomId)
    {
        return (await _roomService.GetRoomByIdAsync(roomId)).ToActionResult();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] RoomRequest request)
    {
        return (await _roomService.CreateRoomAsync(request)).ToActionResult();
    }

    [HttpDelete("{roomId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromRoute] string roomId)
    {
        return (await _roomService.DeleteRoomAsync(roomId)).ToActionResult();
    }
}