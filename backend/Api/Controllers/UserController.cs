using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.ResultPattern;
using backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        return (await _userService.CreateUserAsync(request)).ToActionResult();
    }

    [HttpGet("login")]
    [ProducesResponseType(typeof(UserResponseWithRooms), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Login([FromQuery] LoginRequest request)
    {
        return (await _userService.LoginAsync(request)).ToActionResult();
    }
}