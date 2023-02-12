using AIBackEnd.Data;
using AIBackEnd.Repositories.Contracts;

namespace AIBackEnd.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private ANEFreeInItyDBContext _dbContext;
        private Lazy<IVector2DRepository> _vectorRepository;
        private Lazy<IProjectRepository> _projectRepository;

        public IVector2DRepository Vector2D
        {
            get { return _vectorRepository.Value; }
        }

        public IProjectRepository Project
        {
            get { return _projectRepository.Value; }
        }

        public RepositoryManager(ANEFreeInItyDBContext repositoryContext)
        {
            _dbContext = repositoryContext;
            _vectorRepository = new Lazy<IVector2DRepository>(() => new Vector2DRepository(repositoryContext));
            _projectRepository = new Lazy<IProjectRepository>(() => new ProjectRepository(repositoryContext));
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
