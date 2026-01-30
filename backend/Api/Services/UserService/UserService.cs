using backend.Dto.Users;
using backend.Dto.Users.Request;
using backend.Dto.Users.Response;
using backend.Repositories.MessageRepository;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.ResultPattern;
using backend.ResultPattern.Errors;

namespace backend.Services.UserService;

public class UserService(
    IUserRepository userRepository,
    IUserRoomsRepository roomsRepository,
    IRoomRepository roomRepository,
    IMessageRepository messageRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IUserRoomsRepository _roomsRepository = roomsRepository;
    private readonly IRoomRepository _roomRepository = roomRepository;
    private readonly IMessageRepository _messageRepository = messageRepository;

    public async Task<Result<IEnumerable<UserResponse>>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();
        return Result<IEnumerable<UserResponse>>.Success(users.Select(UserResponse.FromDomain));
    }

    public async Task<Result<IEnumerable<ChatItemResponse>>> GetUserChatsAsync(string userKey)
    {
        if (!(await _userRepository.UserExistsByIdAsync(userKey)))
            return Result<IEnumerable<ChatItemResponse>>.Failure(UserErrors.NotFoundId(userKey));

        var roomKeys = await _roomsRepository.GetUserRoomsAsync(userKey);

        var chats = new List<ChatItemResponse>();

        foreach (var roomKey in roomKeys)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomKey);
            if (room is null)
                return Result<IEnumerable<ChatItemResponse>>.Failure(RoomErrors.NotFound(roomKey));

            if (room.ParticipantIds.Count != 2)
                throw new Exception(
                    "Room you are trying to access has more than 2 participants, this feature is not added yet.");

            var otherUserId = room.ParticipantIds.First(id => id != userKey);
            var otherUser = await _userRepository.GetUserByIdAsync(otherUserId);
            if (otherUser == null)
                return Result<IEnumerable<ChatItemResponse>>.Failure(UserErrors.NotFoundId(otherUserId));

            var lastMessage = await _messageRepository.GetLastMessageAsync(room.Id);

            var chatDto = new ChatItemResponse
            {
                RoomId = room.Id,
                OtherUserId = otherUserId,
                OtherUserDisplayName = otherUser.DisplayName,
                LastMessage = lastMessage is not null ? ChatItemLastMessage.FromDomain(lastMessage) : null,
            };

            chats.Add(chatDto);
        }

        return Result<IEnumerable<ChatItemResponse>>.Success(chats);
    }

    public async Task<Result<UserResponse>> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetUserByUsernameAsync(request.Username);
        if (user is null)
            return Result<UserResponse>.Failure(UserErrors.NotFoundUsername(request.Username));

        var correctPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!correctPassword)
            return Result<UserResponse>.Failure(UserErrors.WrongPassword());

        return Result<UserResponse>.Success(UserResponse.FromDomain(user));
    }

    public async Task<Result<UserResponse>> GetUserByIdAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null)
            return Result<UserResponse>.Failure(UserErrors.NotFoundId(userId));

        return Result<UserResponse?>.Success(UserResponse.FromDomain(user));
    }

    public async Task<Result<UserResponse>> GetUserByUsernameAsync(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null)
            return Result<UserResponse>.Failure(UserErrors.NotFoundUsername(username));

        return Result<UserResponse?>.Success(UserResponse.FromDomain(user));
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