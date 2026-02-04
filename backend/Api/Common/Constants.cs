namespace backend.Common;

public static class Constants
{
    public static class EnvVariables
    {
        public const string RedisHost = "REDIS_HOST";
        public const string RedisPort = "REDIS_PORT";
        public const string RedisPassword = "REDIS_PASSWORD";
        public const string FrontendAddress = "FRONTEND_ADDRESS";
    }

    public static class OriginNames
    {
        public const string Frontend = "_frontendOrigin";
    }
}