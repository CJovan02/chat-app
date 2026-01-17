namespace backend.Dto.Users.Request;

public sealed record UserRequest(
    string Username,
    string DisplayName,
    int Age
);