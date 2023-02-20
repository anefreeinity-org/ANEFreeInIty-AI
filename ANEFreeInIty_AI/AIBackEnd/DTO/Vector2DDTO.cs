using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AIBackEnd.DTO
{
    public class Vector2DDTO
    {
        public int Id { get; set; }
       
        virtual public double X { get; set; }
        
        virtual public double Y { get; set; }

        virtual public double Magnitude { get; set; }
        
        virtual public double AngleWithXAxisDeg { get; set; }

        virtual public bool IsCartesian { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }
    }
}
