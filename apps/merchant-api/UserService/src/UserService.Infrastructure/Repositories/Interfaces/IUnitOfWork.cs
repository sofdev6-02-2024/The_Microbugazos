namespace UserService.Infrastructure.Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    public IUserAddressRepository UserAddressRepository { get; }
    public IUserRepository UserRepository { get; }
    public Task<int> CommitAsync();
}

