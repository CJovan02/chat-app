namespace backend.Dto.Messages.Request;

public sealed record GetMessagesRequest(
    string RoomId,
    int PageSize,
    string? BeforeId
);