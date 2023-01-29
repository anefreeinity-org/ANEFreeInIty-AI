using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;
using AutoMapper.Features;
using System.Runtime.InteropServices;

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

            [DllImport("LinearALGEBRA.dll")]
            static extern IntPtr CreateVector2D(double param1, double param2, bool isCartesian);

            [DllImport("LinearALGEBRA.dll")]
            static extern double Vector2DGetX(IntPtr v);

            [DllImport("LinearALGEBRA.dll")]
            static extern double Vector2DGetY(IntPtr v);

            [DllImport("LinearALGEBRA.dll")]
            static extern double Vector2DGetMagnitude(IntPtr v);

            [DllImport("LinearALGEBRA.dll")]
            static extern double Vector2DGetAngleWithXAxisDeg(IntPtr v);

            if (vector.IsCartesian)
            {
                test = CreateVector2D(vector.X, vector.Y, true);
            }
            else
            {
                test = CreateVector2D(vector.Magnitude, vector.AngleWithXAxisDeg, false);
            }
            xQuad = Vector2DGetX(test);
            yQuad = Vector2DGetY(test);
            magnitude = Vector2DGetMagnitude(test);
            angleWithXAxisDeg = Vector2DGetAngleWithXAxisDeg(test);

            Vector2D vectorNew = new Vector2D { X = xQuad, Y = yQuad, Magnitude = magnitude, AngleWithXAxisDeg = angleWithXAxisDeg, IsCartesian = vector.IsCartesian };
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
