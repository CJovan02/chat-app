using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Users.Request;

public sealed record PatchUserRequest
{
    public string? DisplayName { get; init; }
    public int? Age {get; init; }
}