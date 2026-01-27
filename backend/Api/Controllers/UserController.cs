using backend.Dto.Users.Request;
using backend.ResultPattern;
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
        return (await _userService.GetAllUsersAsync()).ToActionResult();
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetById(string userId)
    {
        return Ok(await _userService.GetUserByIdAsync(userId));
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        return (await _userService.CreateUserAsync(request)).ToActionResult();
    }

    [HttpGet("login")]
    public async Task<IActionResult> Login([FromQuery] LoginRequest request)
    {
        return (await _userService.LoginAsync(request)).ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(string roomId)
    {
        return (await _userService.DeleteUserAsync(roomId)).ToActionResult();
    }
}