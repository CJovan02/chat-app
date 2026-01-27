using FluentValidation;

namespace backend.Dto.Messages.Request;

public class MessageRequestValidator : AbstractValidator<MessageRequest>
{
    public MessageRequestValidator()
    {
        RuleFor(x => x.RoomId)
            .NotEmpty()
            .WithMessage("RoomId is required")
            .MaximumLength(40)
            .WithMessage("RoomId cannot exceed 40 characters");

        RuleFor(x => x.SenderId)
            .NotEmpty()
            .WithMessage("SenderId is required")
            .MaximumLength(40)
            .WithMessage("SenderId cannot exceed 40 characters");

        RuleFor(x => x.Text)
            .NotEmpty()
            .WithMessage("Text is required")
            .MaximumLength(100)
            .WithMessage("Text cannot exceed 100 characters");

    }
}