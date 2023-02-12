using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIBackEnd.Data.Entity
{
    [Table("project")]
    public class Project
    {
        [Key]
        [Required(ErrorMessage = "Project ID is required")]
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Column("p_name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [Column("p_description")]
        public string Description { get; set; }

        virtual public IEnumerable<ProjectIteamMapper> ProjectMapper { get; set; }
    }
}
