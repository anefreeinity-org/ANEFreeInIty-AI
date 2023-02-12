using AIBackEnd.DTO;

namespace AIBackEnd.Services.Contracts
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDTO>> GetProjectsAsync();
        Task<ProjectDTO> GetProjectByIdAsync(int id);
        Task<ProjectDTO> CreateNewProjectAsync(ProjectDTO project);
        Task DeleteProjectAsync(ProjectDTO project);
        Task UpdateProjectAsync(int id, ProjectDTO project);
    }
}
