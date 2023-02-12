using AIBackEnd.Data.Entity;

namespace AIBackEnd.Repositories.Contracts
{
    public interface IProjectRepository : IRepositoryBase<Project>
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProjectByID(int id);
    }
}
