using AutoMapper;
using HotelBooking.API.Extensions;
using HotelBooking.EmailService.Extensions;
using HotelBooking.LoggerService.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace HotelBooking.Web.Common
{
    public static class DefaultConfiguration
    {
        public static void RegisterDefaultConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureCors();
            services.ConfigureIISIntegration();
            services.ConfigureSwagger();
            services.ConfigureLoggerService();
            services.ConfigureEmail(configuration);
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}