using backend.Dto.Messages;
using backend.Dto.Messages.Request;
using backend.Dto.Messages.Response;
using backend.Repositories.MessageRepository;
using backend.Repositories.RoomRepository;
using backend.Repositories.UserRepository;
using backend.Repositories.UserRoomRepository;
using backend.ResultPattern;
using backend.ResultPattern.Errors;

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

    public async Task<Result<MessageResponse>> SendMessage(MessageRequest request)
    {
        // check if sender exists
        if (!(await _userRepository.UserExistsByIdAsync(request.SenderId)))
            return Result<MessageResponse>.Failure(UserErrors.NotFoundId(request.SenderId));

        // check if room exists
        if (!(await _roomRepository.RoomExists(request.RoomId)))
            return Result<MessageResponse>.Failure(RoomErrors.NotFound(request.RoomId));

        // check if sender is sending message in the room that he is inside of
        if (!(await _userRoomsRepository.IsUserInRoom(request.SenderId, request.RoomId)))
            return Result<MessageResponse>.Failure(UserErrors.NotInsideRoom(request.SenderId, request.RoomId));

        var id = await _messageRepository.SendMessage(request.ToDomain());

        return Result<MessageResponse>.Success(MessageResponse.FromDomain(request.ToDomain(id)));
    }

    public async Task<Result<IEnumerable<MessageResponse>>> GetMessagesAsync(
        string roomId,
        int pageSize,
        string? beforeId = null
    )
    {
        var messages = await _messageRepository.GetMessagesAsync(roomId, pageSize, beforeId);
        return Result<IEnumerable<MessageResponse>>.Success(messages.Select(MessageResponse.FromDomain));
    }
}