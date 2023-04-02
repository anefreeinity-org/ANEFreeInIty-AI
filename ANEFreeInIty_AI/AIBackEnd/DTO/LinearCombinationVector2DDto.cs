using AIBackEnd.Data.Entity;

namespace AIBackEnd.DTO
{
    public class LinearCombinationVector2DDto
    {
        public Vector2D[] Vectors { set; get; }
        public double XRange { get; set; }
        public double YRange { get; set; }

        public double Scale { get; set; }
    }
}
