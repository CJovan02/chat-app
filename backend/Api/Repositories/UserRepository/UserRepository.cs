using backend.Database;
using backend.Entities;
using Redis.OM;
using Redis.OM.Searching;

namespace backend.Repositories.UserRepository;

public class UserRepository(RedisContext redisContext) : IUserRepository
{
    private readonly RedisCollection<User> _users = redisContext.Users;

    public Task<bool> UserExistsByIdAsync(string id)
    {
        return _users.AnyAsync(u => u.Id == id);
    }

    public Task<bool> UserExistsByUsernameAsync(string username)
    {
        return _users.AnyAsync(u => u.Username == username);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _users.ToListAsync();
    }

    public Task<User?> GetUserByIdAsync(string userId)
    {
        return _users.FindByIdAsync(userId);
    }

    public Task<User?> GetUserByUsernameAsync(string username)
    {
        return _users.Where(u => u.Username == username).FirstOrDefaultAsync();
    }

    public Task<string> CreateUserAsync(User user)
    {
        return _users.InsertAsync(user);
    }

    public Task UpdateUserAsync(User user)
    {
        return _users.UpdateAsync(user);
    }

    public Task DeleteUserAsync(User user)
    {
        return _users.DeleteAsync(user);
    }
}