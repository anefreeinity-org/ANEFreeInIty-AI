using AIBackEnd.CPPDLLImport;
using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;
using AutoMapper.Features;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Reflection.Metadata.Ecma335;
using System.Text;
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
    }
}
