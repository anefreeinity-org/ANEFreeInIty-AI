using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AutoMapper;
using AutoMapper.Features;
using Microsoft.AspNetCore.Identity;

namespace AIBackEnd.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vector2D, Vector2DDTO>();
            CreateMap<Vector2DDTO, Vector2D>();
        }
    }
}
