using backend.Dto.Users.Request;
using backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _userService.GetAllUsersAsync());
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetById(string userId)
    {
        return Ok(await _userService.GetUserByIdAsync(userId));
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        return Ok(await _userService.CreateUserAsync(request));
    }

    [HttpGet("login")]
    public async Task<IActionResult> Login([FromQuery] LoginRequest request)
    {
        return Ok(await _userService.LoginAsync(request));
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string roomId)
    {
        await _userService.DeleteUserAsync(roomId);
        return Ok();
    }
}