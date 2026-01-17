using backend.Dto.Users.Request;
using backend.Entities;
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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserRequest request)
    {
        var id = await _userService.CreateUserAsync(request);
        return Ok(id);
    }
}