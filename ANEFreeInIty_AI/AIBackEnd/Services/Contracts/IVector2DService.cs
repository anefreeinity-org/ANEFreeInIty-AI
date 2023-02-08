using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;

namespace AIBackEnd.Services.Contracts
{
    public interface IVector2DService
    {
        Task<IEnumerable<Vector2DDTO>> GetVector2DAsync();
        Task<Vector2D> GetVector2DByIdAsync(int id);
        Task<Vector2DDTO> CreateNewVector2DAsync(Vector2DDTO vector);
        Task DeleteVector2DAsync(Vector2D vector);
        Task UpdateVector2DAsync(int id, Vector2D vector);
    }
}
