using HotelBooking.LoggerService.Interface;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using System;
using System.IO;
using System.Reflection;

namespace HotelBooking.LoggerService.Extensions
{
    public static class NLogConfig
    {
        public static void ConfigureNLogService(this IServiceCollection services)
        {
            LogManager.LoadConfiguration(Path.Combine(PathHelper.GetAssemblyDirectory(), "nlog.config"));
            services.AddScoped<ILoggerManager, NLogManager>();
        }
    }
}