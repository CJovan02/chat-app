using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Dto.Users.Response;

public sealed record UserResponse
{
    [Required] public required string Id { get; init; }
    [Required] public required string Username { get; init; }
    [Required] public required string DisplayName { get; init; }
    [Required] public required int Age { get; init; }

    public static UserResponse FromDomain(User domain)
    {
        return new UserResponse
        {
            Id = domain.Id!,
            Username = domain.Username,
            DisplayName = domain.DisplayName,
            Age = domain.Age
        };
    }
}