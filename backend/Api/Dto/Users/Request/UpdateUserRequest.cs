namespace backend.Dto.Users.Request;

public sealed record UpdateUserRequest(
    string Username,
    string DisplayName,
    int Age
);