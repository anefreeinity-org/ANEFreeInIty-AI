using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIBackEnd.Data.Entity
{
    [Table("project_iteam_mapper")]
    public class ProjectIteamMapper
    {
        [Key]
        [Required(ErrorMessage = "project mappper ID is required")]
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "project ID is required")]
        [Column("project_id")]
        public int ProjectId { get; set; }

        [Required(ErrorMessage = "vector2d ID is required")]
        [Column("vector2d_id")]
        public int Vector2DId { get; set; }

        [Required(ErrorMessage = "vector2d name is required")]
        [Column("vector2d_name")]
        public string Vector2DName { get; set; }

        [Required(ErrorMessage = "iteam status is required")]
        [Column("iteam_status")]
        public int IteamStatus { get; set; }
    }
}
