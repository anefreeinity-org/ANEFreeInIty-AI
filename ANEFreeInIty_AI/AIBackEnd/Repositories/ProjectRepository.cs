using AIBackEnd.Data;
using AIBackEnd.Data.Entity;
using AIBackEnd.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace AIBackEnd.Repositories
{
    public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(ANEFreeInItyDBContext DbContext)
            : base(DbContext)
        {

        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            var res = await FindAll()
                .OrderBy(o => o.Id)
                .Include(u => u.ProjectMapper)
                .ToListAsync();
            return res;
        }

        public async Task<Project> GetProjectByID(int id)
        {
            return await FindByCondition(project => project.Id.Equals(id))
           .FirstOrDefaultAsync();
        }
    }
}
