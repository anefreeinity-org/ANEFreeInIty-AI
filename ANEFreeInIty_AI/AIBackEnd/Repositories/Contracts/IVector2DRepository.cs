using AIBackEnd.Data.Entity;
using AutoMapper.Features;

namespace AIBackEnd.Repositories.Contracts
{
    public interface IVector2DRepository : IRepositoryBase<Vector2D>
    {
        Task<IEnumerable<Vector2D>> GetAllVector2D();
        Task<Vector2D> GetVector2DByID(int id);
    }
}
