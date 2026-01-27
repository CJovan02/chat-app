namespace backend.ResultPattern.Errors;

public static class UserErrors
{
    public static Error NotFoundId(string userId) => new(StatusCodes.NotFound, $"User with id {userId} not found");

    public static Error NotFoundUsername(string username) =>
        new(StatusCodes.NotFound, $"User with username: {username} not found");

    public static Error UsernameOccupied(string username) =>
        new(StatusCodes.BadRequest, $"Username {username} is already taken");

    public static Error WrongPassword() =>
        new(StatusCodes.Unauthorized, "Wrong password");

    public static Error NotInsideRoom(string userId, string roomId) =>
        new(StatusCodes.BadRequest, $"User with id: {userId} is not inside the room: {roomId}");
}