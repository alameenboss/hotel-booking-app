using HotelBooking.LoggerService.Interface;
using Serilog;

namespace HotelBooking.LoggerService
{
    public class SeriLogManager : ILoggerManager
    {
        private readonly ILogger logger;
        public SeriLogManager(ILogger _logger)
        {
            logger = _logger;
        }

        public void LogDebug(string message)
        {
            logger.Debug(message);
        }

        public void LogError(string message)
        {
            logger.Error(message);
        }

        public void LogInfo(string message)
        {
            logger.Information(message);
        }

        public void LogWarn(string message)
        {
            logger.Warning(message);
        }
    }
}