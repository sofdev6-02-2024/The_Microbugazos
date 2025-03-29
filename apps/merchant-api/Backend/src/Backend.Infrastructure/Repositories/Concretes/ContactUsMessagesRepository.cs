using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Abstract;
using Backend.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories.Concretes;

public class ContactUsMessagesRepository(DbContext context) : BaseRepository<ContactUsMessage>(context), IContactUsMessageRepository;