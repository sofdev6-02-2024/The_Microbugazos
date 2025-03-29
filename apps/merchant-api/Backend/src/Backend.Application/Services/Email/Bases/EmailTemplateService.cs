using Backend.Application.Services.Email.Interfaces;

namespace Backend.Application.Services.Email.Bases
{
    public abstract class EmailTemplateService<T> : IEmailTemplateService<T>
    {
        protected const string EmailPath = "templates/";

        public abstract Task<string> GenerateEmailTemplate(T email);
    }
}