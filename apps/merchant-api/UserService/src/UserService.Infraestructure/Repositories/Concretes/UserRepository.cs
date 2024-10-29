using UserService.Domain.Concretes;
using UserService.Infraestructure.Data;
using UserService.Infraestructure.Repositories.Bases;

namespace UserService.Infraestructure.Repositories.Concretes;

public class UserRepository(UserDbContext userDbContext) : BaseRepository<User>(userDbContext);