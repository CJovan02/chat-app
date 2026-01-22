using backend.Entities;

namespace backend.Dto.Users.Response;

public sealed record UserResponseWithRooms(
    string Id,
    string Username,
    string DisplayName,
    int Age,
    IReadOnlyCollection<string> rooms
)
{
    public static UserResponseWithRooms FromDomain(User domain, IReadOnlyCollection<string> roomIds)
    {
        return new UserResponseWithRooms(
            domain.Id!,
            domain.Username,
            domain.DisplayName,
            domain.Age,
            roomIds
        );
    }
}