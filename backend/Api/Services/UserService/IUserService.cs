using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.ResultPattern;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<Result<IEnumerable<UserResponse>>> GetAllUsersAsync();
    Task<Result<UserResponseWithRooms>> GetUserByIdAsync(string userId);
    Task<Result<UserResponseWithRooms>> GetUserByUsernameAsync(string username);
    Task<Result<UserResponseWithRooms>> LoginAsync(LoginRequest request);
    Task<Result<string>> CreateUserAsync(CreateUserRequest request);
    Task<Result> UpdateUserAsync(UpdateUserRequest request);
    Task<Result> DeleteUserAsync(string userId);
}