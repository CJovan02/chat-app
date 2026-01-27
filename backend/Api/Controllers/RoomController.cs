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
    public async Task<IActionResult> GetAll()
    {
        return (await _roomService.GetAllRoomsAsync()).ToActionResult();
    }

    [HttpGet("{roomId}")]
    public async Task<IActionResult> Get(string roomId)
    {
        return (await _roomService.GetRoomByIdAsync(roomId)).ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> Create(RoomRequest request)
    {
        return (await _roomService.CreateRoomAsync(request)).ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string roomId)
    {
        return (await _roomService.DeleteRoomAsync(roomId)).ToActionResult();
    }
}