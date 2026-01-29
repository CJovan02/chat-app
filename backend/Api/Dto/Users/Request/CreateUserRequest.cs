using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Users.Request;

public sealed record CreateUserRequest
{
    [Required] public required string Username { get; init; }
    [Required] public required string DisplayName { get; init; }
    [Required] public required int Age { get; init; }
    [Required] public required string Password { get; init; }
};