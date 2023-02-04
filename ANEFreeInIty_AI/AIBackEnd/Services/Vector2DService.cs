using AIBackEnd.CPPDLLImport;
using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;
using AutoMapper.Features;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Text;

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
                IsCartesian = vector.IsCartesian };

            _anefreeinityAIRepositoryManager.Vector2D.Create(vectorNew);
            await _anefreeinityAIRepositoryManager.Save();

            var createdVectorRef = _mapper.Map<Vector2DDTO>(vectorNew);

            return createdVectorRef;
        }

        public Task DeleteVector2DAsync(Vector2D vector)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Vector2D>> GetVector2DAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Vector2D> GetVector2DByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateVector2DAsync(int id, Vector2D vector)
        {
            throw new NotImplementedException();
        }
    }
}
