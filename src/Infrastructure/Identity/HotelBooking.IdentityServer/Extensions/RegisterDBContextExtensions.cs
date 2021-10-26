using HotelBooking.Data.Repository.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.Data.Repository.Extensions
{
    public static class RegisterDBContextExtensions
    {
        public static void RegisterIdentityDbContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<UserDbContext>(opts =>
                opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
                    b => b.MigrationsAssembly("HotelBooking.Data.Repository")));
    }
}