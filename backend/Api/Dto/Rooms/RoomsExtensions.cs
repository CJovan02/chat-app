using backend.Dto.Rooms.Request;
using backend.Entities;

namespace backend.Dto.Rooms;

public static class RoomsExtensions
{
    public static Room ToDomain(this RoomRequest request)
    {
        return new Room
        {
            ParticipantIds = request.ParticipantIds,
        };
    }
}