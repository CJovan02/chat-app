using FluentValidation;

namespace backend.Dto.Users.Request;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Username is required")
            .Length(3, 15)
            .WithMessage("Username must be between 3 and 15 characters");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required")
            .MinimumLength(5)
            .WithMessage("Password must be at least 5 characters")
            .MaximumLength(40)
            .WithMessage("Password must not exceed 40 characters");
    }
}