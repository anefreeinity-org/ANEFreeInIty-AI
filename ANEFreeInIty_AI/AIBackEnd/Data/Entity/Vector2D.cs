using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIBackEnd.Data.Entity
{
    [Table("vector2d")]
    public class Vector2D
    {
        [Key]
        [Required(ErrorMessage = "Vector ID is required")]
        [Column("id")]
        public int Id { get; set; }

        [Column("x_quadinate_val")]
        public double X { get; set; }

        [Column("y_quadinate_val")]
        public double Y { get; set; }

        [Column("magnitude")]
        public double Magnitude { get; set; }

        [Column("angle_with_x_axis_deg")]
        public double AngleWithXAxisDeg { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [Column("v_description")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Column("v_name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Is Cartesian is required")]
        [Column("is_cartesian")]
        public bool IsCartesian { get; set; }
    }
}
