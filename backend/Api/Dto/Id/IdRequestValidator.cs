using FluentValidation;

namespace backend.Dto.Id;

public class IdRequestValidator : AbstractValidator<IdRequest>
{
    public IdRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id is  required")
            .MaximumLength(40)
            .WithMessage("Id cannot exceed 40 characters");
    }
}