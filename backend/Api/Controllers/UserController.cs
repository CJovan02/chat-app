using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.ResultPattern;
using backend.Services.UserService;
using Microsoft.AspNetCore.Http.HttpResults;
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
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        return (await _userService.CreateUserAsync(request)).ToActionResult();
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        return (await _userService.LoginAsync(request)).ToActionResult();
    }

    [HttpGet("{userId}/chats")]
    [ProducesResponseType(typeof(IEnumerable<ChatItemResponse>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetChats([FromRoute] string userId)
    {
        return (await _userService.GetUserChatsAsync(userId)).ToActionResult();
    }

    [HttpPatch("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Patch([FromRoute] string userId, [FromQuery] PatchUserRequest request)
    {
        return (await _userService.PatchUserAsync(userId, request)).ToActionResult();
    }

    [HttpGet("{userId}")]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUser([FromRoute] string userId)
    {
        return (await _userService.GetUserByIdAsync(userId)).ToActionResult();
    }
}