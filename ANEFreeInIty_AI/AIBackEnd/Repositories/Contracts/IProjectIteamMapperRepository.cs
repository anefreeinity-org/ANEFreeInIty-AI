using AIBackEnd.Data.Entity;

namespace AIBackEnd.Repositories.Contracts
{
    public interface IProjectIteamMapperRepository : IRepositoryBase<ProjectIteamMapper>
    {
        Task<IEnumerable<ProjectIteamMapper>> GetAllProjectIteamMappers();
        Task<ProjectIteamMapper> GetAllProjectIteamMapperByID(int id);
        Task<IEnumerable<ProjectIteamMapper>> GetAllProjectIteamMapperForSameProjectId(int projectId);
    }
}
