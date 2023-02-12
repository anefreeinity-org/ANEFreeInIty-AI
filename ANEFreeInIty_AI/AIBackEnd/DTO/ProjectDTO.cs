using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AIBackEnd.Data.Entity;

namespace AIBackEnd.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        virtual public IEnumerable<ProjectIteamMapper> ProjectMapper { get; set; }
    }
}
