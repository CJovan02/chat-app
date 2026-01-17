using backend.Dto.Users.Request;
using backend.Dto.Users.Response;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<UserResponse>> GetAllUsersAsync();
    Task<UserResponse?> GetUserByIdAsync(string userId);
    Task<UserResponse?> GetUserByUsernameAsync(string username);
    Task<string> CreateUserAsync(UserRequest request);
    Task UpdateUserAsync(UserRequest request);
    Task DeleteUserAsync(string userId);
}