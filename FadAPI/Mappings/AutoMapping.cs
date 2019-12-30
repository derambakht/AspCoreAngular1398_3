using AutoMapper;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels.Base;

namespace FadAPI.Mappings
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Cities, CityViewModel>().ForMember(
                dest => dest.ProvinceName,
                opt => opt.MapFrom(src => src.Province != null ? src.Province.ProvinceName : "")
            );
            CreateMap<CityViewModel, Cities>(); // means you want to map from User to UserDTO
        }
    }
}
