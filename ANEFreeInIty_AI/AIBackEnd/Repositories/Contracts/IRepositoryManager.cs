namespace AIBackEnd.Repositories.Contracts
{
    public interface IRepositoryManager
    {
        IVector2DRepository Vector2D { get; }
        Task Save();
    }
}
