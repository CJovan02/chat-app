namespace backend.Common.Exceptions;

public class EnvVariableNotFoundException(string environmentName)
    : Exception($"Environment variable {environmentName} was not found");