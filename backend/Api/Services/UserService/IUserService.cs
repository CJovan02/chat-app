using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.ResultPattern;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<Result<IEnumerable<UserResponse>>> GetAllUsersAsync();
    Task<Result<UserResponse>> GetUserByIdAsync(string userId);
    Task<Result<UserResponse>> GetUserByUsernameAsync(string username);
    /// <summary>
    /// It returns chats that user is part of with additional information for each chat
    /// </summary>
    Task<Result<IEnumerable<ChatItemResponse>>> GetUserChatsAsync(string userId);
    Task<Result<UserResponse>> LoginAsync(LoginRequest request);
    Task<Result<string>> CreateUserAsync(CreateUserRequest request);
    Task<Result> UpdateUserAsync(UpdateUserRequest request);
    Task<Result> DeleteUserAsync(string userId);
}