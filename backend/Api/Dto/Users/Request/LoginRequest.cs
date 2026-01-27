namespace backend.Dto.Users.Request;

public sealed record LoginRequest(
    string Username,
    string Password
);