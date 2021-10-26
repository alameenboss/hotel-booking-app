using HotelBooking.Data.Repository.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.Data.Repository.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureApplicationContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<ApplicationDbContext>(opts =>
                opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
                    b => b.MigrationsAssembly("HotelBooking.Data.Repository")));
    }
}