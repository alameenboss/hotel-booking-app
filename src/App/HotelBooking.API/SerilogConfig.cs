using HotelBooking.LoggerService.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace HotelBooking.API
{
    public static class SerilogConfig
    {
        public static IConfigurationBuilder SeriLogConfiguration(this IConfigurationBuilder builder, IWebHostEnvironment env)
        {

            builder.AddJsonFile(Path.Combine(PathHelper.GetAssemblyDirectory(), "serilogsettings.json"), optional: true, reloadOnChange: true);
            builder.AddJsonFile(Path.Combine(PathHelper.GetAssemblyDirectory(), $"serilogsettings.{env.EnvironmentName}.json"), optional: true);
            return builder;
        }
    }
}