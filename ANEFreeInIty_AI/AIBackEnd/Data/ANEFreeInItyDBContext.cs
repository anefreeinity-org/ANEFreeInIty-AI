using AIBackEnd.Data.Entity;
using AutoMapper.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AIBackEnd.Data
{
    public class ANEFreeInItyDBContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ANEFreeInItyDBContext(DbContextOptions<ANEFreeInItyDBContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        //protected override void OnModelCreating(ModelBuilder modeBuilder)
        //{
        //    modeBuilder.Entity<Feature>()
        //        .HasOne(e => e.UserStory)
        //        .WithOne(f => f.Feature);
        //}
        public DbSet<Vector2D> Features { get; set; }
    }
}
