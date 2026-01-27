using FluentValidation;

namespace backend.Dto.Rooms.Request;

public class RoomRequestValidator : AbstractValidator<RoomRequest>
{
    public RoomRequestValidator()
    {
        RuleFor(r => r.ParticipantIds)
            .NotEmpty()
            .WithMessage("ParticipantIds must not be empty")
            .Must(p => p.Distinct().Count() >= 2)
            .WithMessage("Room must have at least 2 unique participants.");

        RuleForEach(r => r.ParticipantIds)
            .NotEmpty()
            .WithMessage("Ids must not be empty strings")
            .MaximumLength(40)
            .WithMessage("Ids must not exceed 40 characters");
    }
}