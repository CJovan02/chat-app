using FluentValidation;

namespace backend.Dto.Users.Request;

public class PatchUserRequestValidator : AbstractValidator<PatchUserRequest>
{
    public PatchUserRequestValidator()
    {
        RuleFor(x => x.DisplayName)
            .Length(3, 15)
            .WithMessage("Display name must be between 3 and 15 characters");

        RuleFor(x => x.Age)
            .ExclusiveBetween(0, 100)
            .WithMessage("Age must be between 0 and 100");
    }
}