namespace backend.Dto.Users.Request;

public sealed record CreateUserRequest(
    string Username,
    string DisplayName,
    int Age,
    string Password
);