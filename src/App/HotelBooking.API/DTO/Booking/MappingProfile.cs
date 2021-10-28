using AutoMapper;

namespace HotelBooking.API.DTO.Booking
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Bookings, BookingDTO>().ReverseMap();
        }
    }
}