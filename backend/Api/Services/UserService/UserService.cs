using backend.Entities;
using backend.Repositories.UserRepository;

namespace backend.Services.UserService;

public class UserService(IUserRepository userRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;

    public Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return _userRepository.GetAllUsersAsync();
    }

    public Task<User?> GetUserByIdAsync(string userId)
    {
        return _userRepository.GetUserByIdAsync(userId);
    }

    public Task<User?> GetUserByUsernameAsync(string username)
    {
        return _userRepository.GetUserByUsernameAsync(username);
    }

    public Task CreateUserAsync(User user)
    {
        return _userRepository.CreateUserAsync(user);
    }

    public Task UpdateUserAsync(User user)
    {
        return _userRepository.UpdateUserAsync(user);
    }

    public Task DeleteUserAsync(User user)
    {
        return _userRepository.DeleteUserAsync(user);
    }
}