using AIBackEnd.Data;
using AIBackEnd.Data.Entity;
using AIBackEnd.Repositories.Contracts;
using AutoMapper.Features;
using Microsoft.EntityFrameworkCore;

namespace AIBackEnd.Repositories
{
    public class Vector2DRepository : RepositoryBase<Vector2D>, IVector2DRepository
    {
        public Vector2DRepository(ANEFreeInItyDBContext DbContext)
            : base(DbContext)
        {

        }

        public async Task<IEnumerable<Vector2D>> GetAllVector2D()
        {
            var res = await FindAll()
                .OrderBy(o => o.Id)
                //.Include(u =>u.UserStory)
                .ToListAsync();
            return res;
        }

        public async Task<Vector2D> GetVector2DByID(int id)
        {
            return await FindByCondition(vector => vector.Id.Equals(id))
           .FirstOrDefaultAsync();
        }
    }
}
