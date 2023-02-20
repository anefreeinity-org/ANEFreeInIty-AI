using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Services.Contracts;
using AutoMapper;
using System.Numerics;
using System.Runtime.Intrinsics;

namespace AIBackEnd.Services
{
    public class ProjectService : IProjectService
    {

        private readonly ILoggerManager _loggerManager;

        private readonly IMapper _mapper;

        private IRepositoryManager _anefreeinityAIRepositoryManager;

        public ProjectService(IRepositoryManager anefreeinityAIRepositoryManager, ILoggerManager loggerManager, IMapper mapper)
        {

            _anefreeinityAIRepositoryManager = anefreeinityAIRepositoryManager;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        public async Task<ProjectDTO> CreateNewProjectAsync(ProjectDTO project)
        {
            var projectRes = _mapper.Map<Project>(project);
            _anefreeinityAIRepositoryManager.Project.Create(projectRes);
            await _anefreeinityAIRepositoryManager.Save();

            return project;
        }

        public async Task DeleteProjectAsync(ProjectDTO project)
        {
            var projectEntity = _mapper.Map<Project>(project);
            _anefreeinityAIRepositoryManager.Project.Delete(projectEntity);
            await _anefreeinityAIRepositoryManager.Save();
        }

        public async Task<ProjectDTO> GetProjectByIdAsync(int id)
        {
            var details = await _anefreeinityAIRepositoryManager.Project.GetProjectByID(id);
            if (details == null)
            {
                throw new Exception($"project with Id:{id},has not be found in db.");
            }
            var projectinfo = _mapper.Map<ProjectDTO>(details);
            _loggerManager.LogInfo($"returned project information from database.");
            return projectinfo;
        }

        public async Task<IEnumerable<ProjectDTO>> GetProjectsAsync()
        {
            var leads = await _anefreeinityAIRepositoryManager.Project.GetAllProjects();
            _loggerManager.LogInfo($"returned all projects details from datbse.");
            var projectRes = _mapper.Map<IEnumerable<ProjectDTO>>(leads);
            return projectRes;
        }

        public async Task UpdateProjectAsync(int id, ProjectDTO project)
        {
            var projectEntity = await _anefreeinityAIRepositoryManager.Project.GetProjectByID(id);
            if (projectEntity == null)
            {
                throw new Exception($"project with Id:{id},has not be found in db.");
            }
            var projectEntityUpdate = _mapper.Map<Project>(project);

            projectEntityUpdate.Id = projectEntity.Id;

            _anefreeinityAIRepositoryManager.Project.Update(projectEntityUpdate);
            _loggerManager.LogInfo($"updated project{id}in databse");

            await _anefreeinityAIRepositoryManager.Save();
            _loggerManager.LogInfo($"committed all project.");
        }
    }
}
