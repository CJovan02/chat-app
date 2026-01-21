using backend.Dto.Rooms.Request;
using backend.Services.RoomService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomController(IRoomService roomService) : ControllerBase
{
    private readonly IRoomService _roomService = roomService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _roomService.GetAllRoomsAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create(RoomRequest request)
    {
        return Ok(await _roomService.CreateRoomAsync(request));
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string roomId)
    {
        await _roomService.DeleteRoomAsync(roomId);
        return Ok();
    }
}