using FluentValidation;

namespace backend.Dto.Users.Request;

public class UpdateUserRequestValidator : AbstractValidator<UpdateUserRequest>
{
    public UpdateUserRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Username is required")
            .Length(3, 15)
            .WithMessage("Username must be between 3 and 15 characters");

        RuleFor(x => x.DisplayName)
            .NotEmpty()
            .WithMessage("Display name is required")
            .Length(3, 15)
            .WithMessage("Display name must be between 3 and 15 characters");

        RuleFor(x => x.Age)
            .NotEmpty()
            .WithMessage("Age is required")
            .ExclusiveBetween(0, 100)
            .WithMessage("Age must be between 0 and 100");
    }
}