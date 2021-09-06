using HotelBooking.LoggerService.Interface;
using Microsoft.Extensions.DependencyInjection;
namespace HotelBooking.LoggerService.Extensions
{
    public static class LogConfig
    {
        
        public static void ConfigureLoggerService(this IServiceCollection services) =>
            services.AddScoped<ILoggerManager, LoggerManager>();

    }
}
