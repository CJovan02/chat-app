using backend.Dto.Messages;
using backend.Dto.Messages.Request;
using backend.Repositories.MessageRepository;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;

namespace backend.Services.MessageService;

public sealed class MessageService(
    IMessageRepository messageRepository,
    IUserRepository userRepository,
    IRoomRepository roomRepository,
    IUserRoomsRepository userRoomsRepository) : IMessageService
{
    private readonly IMessageRepository _messageRepository = messageRepository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IRoomRepository _roomRepository = roomRepository;
    private readonly IUserRoomsRepository _userRoomsRepository = userRoomsRepository;

    public async Task<string> SendMessage(MessageRequest request)
    {
        // check if sender exists
        if (!(await _userRepository.UserExistsByIdAsync(request.SenderId)))
            throw new Exception($"Sender with id: {request.SenderId} does not exist");

        // check if room exists
        if (!(await _roomRepository.RoomExists(request.RoomId)))
            throw new Exception($"Room with id: {request.RoomId} does not exist");

        // check if sender is sending message in the room that he is inside of
        if (!(await _userRoomsRepository.IsUserInRoom(request.SenderId, request.RoomId)))
            throw new Exception($"User with id: {request.SenderId} is not inside room with id: {request.RoomId}");

        return await _messageRepository.SendMessage(request.ToDomain());
    }
}