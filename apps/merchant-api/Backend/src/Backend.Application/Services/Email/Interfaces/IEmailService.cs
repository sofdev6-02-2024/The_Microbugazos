namespace Backend.Application.Services.Email.Interfaces
{
    public interface IEmailService<in T>
    {
        public Task Send(string receiver, string subject, T objectEmail);
    }
}