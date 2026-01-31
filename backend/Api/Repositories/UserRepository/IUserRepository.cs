using backend.Entities;

namespace backend.Repositories.UserRepository;

public interface IUserRepository
{
    Task<bool> UserExistsByIdAsync(string userId);
    Task<bool> UserExistsByUsernameAsync(string username);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(string userId);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<string> CreateUserAsync(User user);

    /// <summary>
    /// Patches user object using the non-null parameters provided. If parameter is null it's ignored
    /// </summary>
    /// <param name="userToBePatched">User object that needs to be patched</param>
    /// <returns></returns>
    Task PatchUserAsync(User userToBePatched, string? newDisplayName, int? newAge);

    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(User user);
}