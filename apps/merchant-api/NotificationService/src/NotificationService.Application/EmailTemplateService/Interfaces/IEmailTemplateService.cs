namespace NotificationService.Application.Services.Templates
{
    public interface IEmailTemplateService<in T>
    {
        public Task<string> GenerateEmailTemplate(T email);
    }
}