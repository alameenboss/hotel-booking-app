using HotelBooking.EmailService.Config;
using HotelBooking.EmailService.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.EmailService.Extensions
{
    public static class EmailConfig
    {
        public static void ConfigureEmail(this IServiceCollection services,
            IConfiguration configuration)
        {
            var emailConfig = configuration
               .GetSection(nameof(EmailConfiguration))
               .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();
        }
    }
}