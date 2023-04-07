using AIBackEnd.CPPDLLImport;
using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;
using AutoMapper.Features;
using Microsoft.AspNetCore.Routing.Constraints;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;

namespace AIBackEnd.Services
{
    public class Vector2DService : IVector2DService
    {
        private readonly ILoggerManager _loggerManager;

        private readonly IMapper _mapper;

        private IRepositoryManager _anefreeinityAIRepositoryManager;

        public Vector2DService(IRepositoryManager anefreeinityAIRepositoryManager, ILoggerManager loggerManager, IMapper mapper)
        {

            _anefreeinityAIRepositoryManager = anefreeinityAIRepositoryManager;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        public async Task<Vector2DDTO> CreateNewVector2DAsync(Vector2DDTO vector)
        {
            IntPtr test;
            double xQuad, yQuad;
            double magnitude, angleWithXAxisDeg;
            StringBuilder sbDescription = new StringBuilder();

            if (vector.IsCartesian)
            {
                test = ImportedDLL.CreateVector2D(vector.X, vector.Y, true);
            }
            else
            {
                test = ImportedDLL.CreateVector2D(vector.Magnitude, vector.AngleWithXAxisDeg, false);
            }

            xQuad = ImportedDLL.Vector2DGetX(test);
            yQuad = ImportedDLL.Vector2DGetY(test);
            magnitude = ImportedDLL.Vector2DGetMagnitude(test);
            angleWithXAxisDeg = ImportedDLL.Vector2DGetAngleWithXAxisDeg(test);
            ImportedDLL.aCat("Description: ", vector.Description, sbDescription);

            Vector2D vectorNew = new Vector2D {
                X = xQuad,
                Y = yQuad,
                Magnitude = magnitude,
                AngleWithXAxisDeg = angleWithXAxisDeg,
                Description = sbDescription.ToString(),
                Name = vector.Name,
                IsCartesian = vector.IsCartesian };

            _anefreeinityAIRepositoryManager.Vector2D.Create(vectorNew);
            await _anefreeinityAIRepositoryManager.Save();

            var createdVectorRef = _mapper.Map<Vector2DDTO>(vectorNew);

            return createdVectorRef;
        }

        public async Task DeleteVector2DAsync(Vector2DDTO vector)
        {
            var vectorEntity = _mapper.Map<Vector2D>(vector);
            _anefreeinityAIRepositoryManager.Vector2D.Delete(vectorEntity);
            await _anefreeinityAIRepositoryManager.Save();
        }

        public async Task<IEnumerable<Vector2DDTO>> GetVector2DAsync()
        {
            var leads = await _anefreeinityAIRepositoryManager.Vector2D.GetAllVector2D();
            _loggerManager.LogInfo($"returned all VEctor2D details from datbse.");
            var vectorRes = _mapper.Map<IEnumerable<Vector2DDTO>>(leads);
            return vectorRes;
        }

        public async Task<Vector2DDTO> GetVector2DByIdAsync(int id)
        {
            var details = await _anefreeinityAIRepositoryManager.Vector2D.GetVector2DByID(id);
            if (details == null)
            {
                throw new Exception($"vector2d with Id:{id},has not be found in db.");
            }
            var vectorinfo = _mapper.Map<Vector2DDTO>(details);
            _loggerManager.LogInfo($"returned all vectors information from database.");
            return vectorinfo;
        }

        public async Task UpdateVector2DAsync(int id, Vector2DDTO vector)
        {
            var vector2DEntity = await _anefreeinityAIRepositoryManager.Vector2D.GetVector2DByID(id);
            if (vector2DEntity == null)
            {
                throw new Exception($"vector2d with Id:{id},has not be found in db.");
            }
            var vector2DEntityUpdated = _mapper.Map<Vector2D>(vector);

            vector2DEntityUpdated.Id = vector2DEntity.Id;

            _anefreeinityAIRepositoryManager.Vector2D.Update(vector2DEntityUpdated);
            _loggerManager.LogInfo($"updated vector2d{id}in databse");

            await _anefreeinityAIRepositoryManager.Save();
            _loggerManager.LogInfo($"committed all vector2ds.");
        }

        public async Task<Vector2DDTO> AddVectors(Vector2DDTO[] vectors)
        {
            IntPtr vector;
            double xQuad;
            double yQuad;
            double magnitude; 
            double angleWithXAxisDeg;
            int length = 2 * vectors.Length;
            double[] coords = new double[length];
            bool isCartesian = true;
            string name = "";

            for(int i = 0, j = 0; i < length - 1; i+=2, j++)
            {
                coords[i] = vectors[j].X;
                coords[i+1] = vectors[j].Y;
                name += vectors[j].Name + " ";
            }

            vector = ImportedDLL.AddVector2D(coords, length, isCartesian);
            xQuad = ImportedDLL.Vector2DGetX(vector);
            yQuad = ImportedDLL.Vector2DGetY(vector);
            magnitude = ImportedDLL.Vector2DGetMagnitude(vector);
            angleWithXAxisDeg = ImportedDLL.Vector2DGetAngleWithXAxisDeg(vector);

            return new Vector2DDTO()
            { 
                X = xQuad, 
                Y = yQuad, 
                Magnitude = magnitude, 
                AngleWithXAxisDeg = angleWithXAxisDeg, 
                Name = name + "ADD", 
                Description = "added vector",
                IsCartesian = isCartesian,
            };
        }

        public async Task<Vector2DDTO> SubVectors(Vector2DDTO[] vectors)
        {
            IntPtr vector;
            double xQuad;
            double yQuad;
            double magnitude;
            double angleWithXAxisDeg;
            int length = 2 * vectors.Length;
            double[] coords = new double[length];
            bool isCartesian = true;
            string name = "";

            for (int i = 0, j = 0; i < length - 1; i += 2, j++)
            {
                coords[i] = vectors[j].X;
                coords[i + 1] = vectors[j].Y;
                name += vectors[j].Name + " ";
            }

            vector = ImportedDLL.SubVector2D(coords, length, isCartesian);
            xQuad = ImportedDLL.Vector2DGetX(vector);
            yQuad = ImportedDLL.Vector2DGetY(vector);
            magnitude = ImportedDLL.Vector2DGetMagnitude(vector);
            angleWithXAxisDeg = ImportedDLL.Vector2DGetAngleWithXAxisDeg(vector);

            return new Vector2DDTO()
            {
                X = xQuad,
                Y = yQuad,
                Magnitude = magnitude,
                AngleWithXAxisDeg = angleWithXAxisDeg,
                Name = name + "SUB",
                Description = "substructed vector",
                IsCartesian = isCartesian,
            };
        }

        public async Task<Vector2DDTO> ScalerMultiplication(SMalDto vector)
        {
            IntPtr cVector;
            double xQuad, yQuad, magnitude, angleWithXAxisDeg;

            if (vector.Vector.IsCartesian)
            {
                cVector = ImportedDLL.CreateVector2D(vector.Vector.X, vector.Vector.Y, true);
            }
            else
            {
                cVector = ImportedDLL.CreateVector2D(vector.Vector.Magnitude, vector.Vector.AngleWithXAxisDeg, false);
            }

            IntPtr resultVector = ImportedDLL.ScalerMultiplication(vector.SVal, cVector);

            xQuad = ImportedDLL.Vector2DGetX(resultVector);
            yQuad = ImportedDLL.Vector2DGetY(resultVector);
            magnitude = ImportedDLL.Vector2DGetMagnitude(resultVector);
            angleWithXAxisDeg = ImportedDLL.Vector2DGetAngleWithXAxisDeg(resultVector);

            return new Vector2DDTO()
            {
                X = xQuad,
                Y = yQuad,
                Magnitude = magnitude,
                AngleWithXAxisDeg = angleWithXAxisDeg,
                Name = vector.Vector.Name + " Scaler Multiplication",
                Description = "Scaler Multiplied vector",
                IsCartesian = vector.Vector.IsCartesian,
            };
        }

        public async Task<List<Coordinate2DDTO>> LinearCombination(LinearCombinationVector2DDto linearCombData)
        {
            List<Coordinate2DDTO> coordPack = new List<Coordinate2DDTO>();
            IntPtr vector1, vector2;
            IntPtr returnPack;
            IDictionary<double, int> scaleLength = new Dictionary<double, int>();
            scaleLength.Add(0.5, 32);
            scaleLength.Add(0.25, 128);
            scaleLength.Add(0.125, 512);
            scaleLength.Add(0.0625, 2048);

            int length = (int)(scaleLength[linearCombData.Scale] * linearCombData.XRange * linearCombData.YRange);

            vector1 = ImportedDLL.CreateVector2D(linearCombData.Vectors[0].X, linearCombData.Vectors[0].Y, true);
            vector2 = ImportedDLL.CreateVector2D(linearCombData.Vectors[1].X, linearCombData.Vectors[1].Y, true);
           
            returnPack = ImportedDLL.GetAllLinearCombinations(vector1, vector2, linearCombData.XRange, linearCombData.YRange, length, linearCombData.Scale);

            double[] result = new double[length];
            Marshal.Copy(returnPack, result, 0, length);
            
            for(int i = 0; i < length-1; i+=2)
            {
                coordPack.Add(new Coordinate2DDTO() { X = result[i], Y = result[i + 1] });
            }

            return coordPack;
        }

        public async Task<Vector2DDTO> DotProductVector2D(Vector2DDTO vector1, Vector2DDTO vector2)
        {
            IntPtr vectorA, vectorB, resultVector;
            double xQuad, yQuad, magnitude, angleWithXAxisDeg;

            vectorA = ImportedDLL.CreateVector2D(vector1.X, vector1.Y, true);
            vectorB = ImportedDLL.CreateVector2D(vector2.X, vector2.Y, true);

            resultVector = ImportedDLL.Vector2DDotProduct(vectorA, vectorB);

            xQuad = ImportedDLL.Vector2DGetX(resultVector);
            yQuad = ImportedDLL.Vector2DGetY(resultVector);
            magnitude = ImportedDLL.Vector2DGetMagnitude(resultVector);
            angleWithXAxisDeg = ImportedDLL.Vector2DGetAngleWithXAxisDeg(resultVector);

            return new Vector2DDTO()
            {
                X = xQuad,
                Y = yQuad,
                Magnitude = magnitude,
                AngleWithXAxisDeg = angleWithXAxisDeg,
                Name = "vector dot product",
                Description = vector1.Name + " dot product " + vector2.Name,
                IsCartesian = true,
            };
        }
    }
}
