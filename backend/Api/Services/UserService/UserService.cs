using backend.Dto.Users;
using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.ResultPattern;
using backend.ResultPattern.Errors;

namespace backend.Services.UserService;

public class UserService(IUserRepository userRepository, IUserRoomsRepository roomsRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IUserRoomsRepository _roomsRepository = roomsRepository;

    public async Task<Result<IEnumerable<UserResponse>>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();
        return Result<IEnumerable<UserResponse>>.Success(users.Select(UserResponse.FromDomain));
    }

    public async Task<Result<UserResponseWithRooms>> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetUserByUsernameAsync(request.Username);
        if (user is null)
            return Result<UserResponseWithRooms>.Failure(UserErrors.NotFoundUsername(request.Username));

        var correctPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!correctPassword)
            return Result<UserResponseWithRooms>.Failure(UserErrors.WrongPassword());

        var rooms = await _roomsRepository.GetUserRoomsAsync(user.Id);
        return Result<UserResponseWithRooms?>.Success(UserResponseWithRooms.FromDomain(user, rooms));
    }

    public async Task<Result<UserResponseWithRooms?>> GetUserByIdAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null) return Result<UserResponseWithRooms?>.Success(null);

        var roomIds = (await _roomsRepository.GetUserRoomsAsync(user.Id));

        return Result<UserResponseWithRooms?>.Success(UserResponseWithRooms.FromDomain(user, roomIds));
    }

    public async Task<Result<UserResponseWithRooms?>> GetUserByUsernameAsync(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null) return Result<UserResponseWithRooms?>.Success(null);

        var roomIds = (await _roomsRepository.GetUserRoomsAsync(user.Id));

        return Result<UserResponseWithRooms?>.Success(UserResponseWithRooms.FromDomain(user, roomIds));
    }

    public async Task<Result<string>> CreateUserAsync(CreateUserRequest request)
    {
        if (await _userRepository.UserExistsByUsernameAsync(request.Username))
            return Result<string>.Failure(UserErrors.UsernameOccupied(request.Username));

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        return Result<string>.Success(await _userRepository.CreateUserAsync(request.ToDomain(passwordHash)));
    }

    public async Task<Result> UpdateUserAsync(UpdateUserRequest request)
    {
        await _userRepository.UpdateUserAsync(request.ToDomain());
        return Result.Success();
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        // Redis ORM package accepts full object in order to delete it, that's why we need to pull it first
        // This logic can also go inside repository, but I think it's fine like this

        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null)
            return Result.Failure(UserErrors.NotFoundId(userId));

        await _userRepository.DeleteUserAsync(user);

        return Result.Success();
    }
}