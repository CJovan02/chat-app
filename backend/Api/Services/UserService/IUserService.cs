using backend.Dto.Users.Request;
using backend.Dto.Users.Response;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<IEnumerable<UserResponse>> GetAllUsersAsync();
    Task<UserResponseWithRooms?> GetUserByIdAsync(string userId);
    Task<UserResponseWithRooms?> GetUserByUsernameAsync(string username);
    Task<UserResponseWithRooms> LoginAsync(LoginRequest request);
    Task<string> CreateUserAsync(CreateUserRequest request);
    Task UpdateUserAsync(UpdateUserRequest request);
    Task DeleteUserAsync(string userId);
}