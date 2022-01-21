using HotelBooking.Service.Contracts;
using HotelBooking.Service.Implementation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.Data.Repository.Extensions
{
    public static class ServiceExtensions
    {
        public static void RegisterBusinessService(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureApplicationContext(configuration);
            services.ConfigureRepositoryManager();

            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<IRoomService, RoomService>();
        }
    }
}