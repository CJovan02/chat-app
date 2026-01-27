namespace backend.ResultPattern.Errors;

public static class RoomErrors
{
    public static Error NotFound(string roomId) =>
        new(StatusCodes.NotFound, $"Room with id: {roomId} not found");
    public static Error ParticipantNotFound(string id) =>
        new(StatusCodes.BadRequest, $"Participant with id: {id} doesn't exist.");

    public static Error NotEnoughParticipants() =>
        new(StatusCodes.BadRequest, "You need to provide at least two distinct participants");
}