using HotelBooking.LoggerService.Interface;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using System;
using System.IO;
using System.Reflection;

namespace HotelBooking.LoggerService.Extensions
{
    public static class LogConfig
    {
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            LogManager.LoadConfiguration(Path.Combine(AssemblyDirectory, "nlog.config"));
            services.AddScoped<ILoggerManager, LoggerManager>();
        }

        public static string AssemblyDirectory
        {
            get
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                return Path.GetDirectoryName(path);
            }
        }

    }
}