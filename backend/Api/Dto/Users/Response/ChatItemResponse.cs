using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Users.Response;

public record ChatItemResponse
{
    [Required] public required string RoomId { get; init; }
    [Required] public required string OtherUserId { get; init; }
    [Required] public required string OtherUserDisplayName { get; init; }
    public ChatItemLastMessage? LastMessage { get; init; }
}