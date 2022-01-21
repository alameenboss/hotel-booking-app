using AutoMapper;

namespace HotelBooking.API.DTO.Company
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<HotelBooking.Domain.Company, CompanyDto>()
                    .ForMember(c => c.FullAddress,
                        opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
        }
    }
}