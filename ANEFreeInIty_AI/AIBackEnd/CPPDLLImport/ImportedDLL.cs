using System.Runtime.InteropServices;
using System.Text;
using CharSet = System.Runtime.InteropServices.CharSet;

namespace AIBackEnd.CPPDLLImport
{
    public static class ImportedDLL
    {
        const string LOCATION = "LinearALGEBRA.dll";

        [DllImport(LOCATION)]
        public static extern IntPtr CreateVector2D(double param1, double param2, bool isCartesian);

        [DllImport(LOCATION)]
        public static extern double Vector2DGetX(IntPtr v);

        [DllImport(LOCATION)]
        public static extern double Vector2DGetY(IntPtr v);

        [DllImport(LOCATION)]
        public static extern double Vector2DGetMagnitude(IntPtr v);

        [DllImport(LOCATION)]
        public static extern double Vector2DGetAngleWithXAxisDeg(IntPtr v);

        [DllImport(LOCATION, CharSet = CharSet.Ansi)]
        public static extern void aCat(string s1, string s2, StringBuilder ret);

        [DllImport(LOCATION)]
        public static extern IntPtr AddVector2D(double[] data, int length, bool isCartesian);
    }
}
