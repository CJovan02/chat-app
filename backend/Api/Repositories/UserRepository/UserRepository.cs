using backend.Database;
using backend.Entities;
using Redis.OM;
using Redis.OM.Searching;

namespace backend.Repositories.UserRepository;

public class UserRepository(RedisContext redisContext) : IUserRepository
{
    private readonly RedisCollection<User> _users = redisContext.Users;

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

    public Task CreateUserAsync(User user)
    {
        return _users.InsertAsync(user);
    }

    public Task UpdateUserAsync(User user)
    {
        return _users.UpdateAsync(user);
    }

    // TODO: refactor to only requiring ID instead of full object
    public Task DeleteUserAsync(User user)
    {
        return _users.DeleteAsync(user);
    }
}