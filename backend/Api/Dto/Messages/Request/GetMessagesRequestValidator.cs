using FluentValidation;

namespace backend.Dto.Messages.Request;

public class GetMessagesRequestValidator : AbstractValidator<GetMessagesRequest>
{
    public GetMessagesRequestValidator()
    {
        RuleFor(x => x.RoomId)
            .NotEmpty()
            .WithMessage("RoomId is required")
            .MaximumLength(40)
            .WithMessage("RoomId cannot exceed 40 characters");

        RuleFor(x => x.BeforeId)
            .MaximumLength(40)
            .WithMessage("BeforeId cannot exceed 40 characters");

        RuleFor(x => x.PageSize)
            .NotEmpty()
            .WithMessage("PageSize is required")
            .ExclusiveBetween(0, 41)
            .WithMessage("PageSize must be between 1 and 40");
    }
}