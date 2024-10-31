namespace NotificationService.Infraestructure.EmailService
{
    public interface IEmailService<in T>
    {
        public Task Send(string reciver, string subject, T objectEmail);
    }
}