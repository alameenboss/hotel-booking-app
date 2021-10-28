using HotelBooking.LoggerService.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;

namespace HotelBooking.LoggerService.Extensions
{
    public static class SeriLogConfig
    {
        public static void ConfigureSeriLogService(this IServiceCollection services,IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                       .ReadFrom
                       .Configuration(configuration)
                       .CreateLogger();


            AppDomain.CurrentDomain.ProcessExit += (s, e) => Log.CloseAndFlush();
            services.AddSingleton(Log.Logger);
            services.AddScoped<ILoggerManager, SeriLogManager>();
        }

    }
}