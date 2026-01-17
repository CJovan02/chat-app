using backend.Entities;

namespace backend.Repositories.UserRepository;

public interface IUserRepository
{
    Task<bool> UserExistsAsync(string username);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(string userId);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<string> CreateUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(User user);
}