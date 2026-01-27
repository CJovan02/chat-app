using backend.Dto.Users.Request;
using backend.Entities;

namespace backend.Dto.Users;

public static class UsersExtensions
{
    public static User ToDomain(this CreateUserRequest request, string hashedPassword)
    {
        return new User
        {
            Username = request.Username,
            Age = request.Age,
            DisplayName = request.DisplayName,
            PasswordHash =  hashedPassword,
        };
    }

    public static User ToDomain(this UpdateUserRequest request)
    {
        return new User
        {
            Username = request.Username,
            Age = request.Age,
            DisplayName = request.DisplayName,
        };
    }
}