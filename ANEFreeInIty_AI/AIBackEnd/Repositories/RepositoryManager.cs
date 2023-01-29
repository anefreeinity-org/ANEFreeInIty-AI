using AIBackEnd.Data;
using AIBackEnd.Repositories.Contracts;

namespace AIBackEnd.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private ANEFreeInItyDBContext _dbContext;
        private Lazy<IVector2DRepository> _vectorRepository;

        public IVector2DRepository Vector2D
        {
            get { return _vectorRepository.Value; }
        }
        
        public RepositoryManager(ANEFreeInItyDBContext repositoryContext)
        {
            _dbContext = repositoryContext;
            _vectorRepository = new Lazy<IVector2DRepository>(() => new Vector2DRepository(repositoryContext));
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
