namespace Backend.Application.Services.Email.Interfaces
{
    public interface IEmailTemplateService<in T>
    {
        public Task<string> GenerateEmailTemplate(T email);
    }
}