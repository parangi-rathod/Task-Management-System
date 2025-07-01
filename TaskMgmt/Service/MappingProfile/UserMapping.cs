using AutoMapper;
using Repo;

namespace Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile() // Fix constructor name to match the class name
        {
            CreateMap<RegisterUserDTO, User>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender))
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.RoleId))
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()); 
        }
    }
}
