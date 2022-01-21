using HotelBooking.API.JwtFeatures;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Data.Repository.Extensions;
using HotelBooking.Web.Common.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace HotelBooking.API.Extensions
{
    public static class IdentityConfig
    {
        public static void ConfigureIdentity(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.RegisterIdentityDbContext(configuration);

            services.AddIdentity<IdentityUser, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 7;
                opt.Password.RequireDigit = false;

                opt.User.RequireUniqueEmail = true;

                opt.Lockout.AllowedForNewUsers = true;
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                opt.Lockout.MaxFailedAccessAttempts = 3;
            })
             .AddEntityFrameworkStores<UserDbContext>()
             .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(2));
            
            services.ConfigureAuthentication(configuration);

            services.AddScoped<JwtHandler>();
        }

    }

}