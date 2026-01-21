namespace backend.Dto.Rooms.Request;

public sealed record RoomRequest(
    List<string> ParticipantIds
);