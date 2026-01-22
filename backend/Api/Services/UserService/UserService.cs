using backend.Dto.Users;
using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;

namespace backend.Services.UserService;

public class UserService(IUserRepository userRepository, IUserRoomsRepository roomsRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IUserRoomsRepository _roomsRepository = roomsRepository;

    public async Task<IEnumerable<UserResponse>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();
        return users.Select(UserResponse.FromDomain);
    }

    public async Task<UserResponseWithRooms?> GetUserByIdAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null) return null;

        var roomIds = (await _roomsRepository.GetUserRoomsAsync(user.Id));

        return UserResponseWithRooms.FromDomain(user, roomIds);
    }

    public async Task<UserResponseWithRooms?> GetUserByUsernameAsync(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null) return null;

        var roomIds = (await _roomsRepository.GetUserRoomsAsync(user.Id));

        return UserResponseWithRooms.FromDomain(user, roomIds);
    }

    public async Task<string> CreateUserAsync(UserRequest request)
    {
        if (await _userRepository.UserExistsAsync(request.Username))
            throw new Exception("User with provided username already exists");

        return await _userRepository.CreateUserAsync(request.ToDomain());
    }

    public Task UpdateUserAsync(UserRequest request)
    {
        return _userRepository.UpdateUserAsync(request.ToDomain());
    }

    public async Task DeleteUserAsync(string userId)
    {
        // Redis ORM package accepts full object in order to delete it, that's why we need to pull it first
        // This logic can also go inside repository, but I think it's fine like this

        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null)
            throw new Exception("User not found");

        await _userRepository.DeleteUserAsync(user);
    }
}