using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace HotelBooking.IdentityServer.Models.Auth
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, IdentityUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}