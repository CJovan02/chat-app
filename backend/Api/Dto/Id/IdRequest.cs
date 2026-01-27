using Microsoft.AspNetCore.Mvc;

namespace backend.Dto.Id;

public record IdRequest
{
    [FromRoute(Name = "id")] public required string Id { get; init; }
}