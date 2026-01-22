namespace backend.Repositories.UserRoomRepository;

/// <summary>
/// Layer for manipulating user rooms by using Redis Sets.
/// </summary>
public interface IUserRoomsRepository
{
    Task AddRoomToUserAsync(string userId, string roomId);
    Task RemoveRoomFromUserAsync(string userId, string roomId);
    Task<IReadOnlyCollection<string>> GetUserRoomsAsync(string userId);
}