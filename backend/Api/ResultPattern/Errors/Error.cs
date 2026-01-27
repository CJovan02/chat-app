namespace backend.ResultPattern.Errors;

public record Error(int Code, string Description)
{
    public static readonly Error None = new(0, string.Empty);
}