using backend.Entities;

namespace backend.Dto.Users.Response;

public sealed record UserResponse(
    string Id,
    string Username,
    string DisplayName,
    int Age
)
{
    public static UserResponse FromDomain(User domain)
    {
        return new UserResponse(
            domain.Id!,
            domain.Username,
            domain.DisplayName,
            domain.Age
        );
    }
}