using AIBackEnd.Data;
using AIBackEnd.Data.Entity;
using AIBackEnd.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace AIBackEnd.Repositories
{
    public class ProjectIteamMapperRepository : RepositoryBase<ProjectIteamMapper>, IProjectIteamMapperRepository
    {
        public ProjectIteamMapperRepository(ANEFreeInItyDBContext DbContext)
            : base(DbContext)
        {

        }

        public async Task<IEnumerable<ProjectIteamMapper>> GetAllProjectIteamMappers()
        {
            var res = await FindAll()
                .OrderBy(o => o.Id)
                .ToListAsync();
            return res;
        }

        public async Task<ProjectIteamMapper> GetAllProjectIteamMapperByID(int id)
        {
            return await FindByCondition(projectMapper => projectMapper.Id.Equals(id))
           .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProjectIteamMapper>> GetAllProjectIteamMapperForSameProjectId(int projectId)
        {
            return await FindByCondition(projectMapper => projectMapper.ProjectId.Equals(projectId))
           .ToListAsync();
        }
    }
}
