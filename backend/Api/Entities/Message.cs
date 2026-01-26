namespace backend.Entities;

public sealed class Message
{
    public string Id { get; init; }
    public string RoomId { get; init; }
    public string SenderId { get; init; }
    public string Text { get; init; }
    public DateTime SentAt { get; init; } = DateTime.Now;
}