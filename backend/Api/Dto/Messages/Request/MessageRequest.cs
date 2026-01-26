namespace backend.Dto.Messages.Request;

public sealed record MessageRequest(
    string RoomId,
    string SenderId,
    string Text
);