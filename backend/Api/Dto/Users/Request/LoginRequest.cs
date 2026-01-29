using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Users.Request;

public sealed record LoginRequest
{
    [Required] public required string Username { get; init; }
    [Required] public required string Password { get; init; }
}