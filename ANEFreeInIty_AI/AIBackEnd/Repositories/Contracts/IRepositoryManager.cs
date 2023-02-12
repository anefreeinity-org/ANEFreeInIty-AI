namespace AIBackEnd.Repositories.Contracts
{
    public interface IRepositoryManager
    {
        IVector2DRepository Vector2D { get; }
        IProjectRepository Project { get; }
        Task Save();
    }
}
