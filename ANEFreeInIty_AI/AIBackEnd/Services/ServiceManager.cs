using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;

namespace AIBackEnd.Services
{
    public class ServiceManager : IServiceManager
    {
        private Lazy<IVector2DService> _vector2DService;
        private Lazy<IProjectService> _projectService;

        public IVector2DService vector2DService
        {
            get { return _vector2DService.Value; }
        }
        public IProjectService projectService
        {
            get { return _projectService.Value; }
        }

        public ServiceManager(IRepositoryManager anefreeinityAIRepositoryManager, ILoggerManager loggerManager, IMapper mapper)
        {
            _vector2DService = new Lazy<IVector2DService>(() => new Vector2DService(anefreeinityAIRepositoryManager, loggerManager, mapper));
            _projectService = new Lazy<IProjectService>(() => new ProjectService(anefreeinityAIRepositoryManager, loggerManager, mapper));
        }
    }
}
