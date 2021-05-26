using AutoMapper;
using HotelBooking.API.Entities.DataTransferObjects;
using HotelBooking.API.Entities.DTO;
using HotelBooking.API.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace HotelBooking.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Company, CompanyDto>()
                    .ForMember(c => c.FullAddress,
                        opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));

            CreateMap<UserForRegistrationDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}
