using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.Data.Repository.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
        }
    }
}