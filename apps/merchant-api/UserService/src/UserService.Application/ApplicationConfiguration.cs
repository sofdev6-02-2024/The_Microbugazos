using Commons.ResponseHandler.Handler.Concretes;
using Commons.ResponseHandler.Handler.Interfaces;
using UserService.Application.Profiles;
using UserService.Application.Services.Auth.Concretes;
using UserService.Application.Services.Auth.Interfaces;
using UserService.Infrastructure.Repositories.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using UserService.Application.Validators;
using FluentValidation;
using UserService.Application.Validators.ContactUsMessages;
using UserService.Application.Validators.Stores;

namespace UserService.Application
{
    public static class ApplicationConfiguration
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            string firebaseCredentials = configuration["FIREBASE_CREDENTIALS"] ?? throw new ArgumentNullException("FIREBASE_CREDENTIALS not found");
            services.AddAutoMapper(typeof(UserProfile));
            services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblies(typeof(UserProfile).Assembly)
            );

            FirebaseApp.Create(
                options: new AppOptions
                {
                    Credential = GoogleCredential.FromJson(firebaseCredentials)
                }
            );
            
            services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();
            
            services.AddScoped<IStoreRepository, StoreRepository>();
            services.AddScoped<IUserAddressRepository, UserAddressRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IContactUsMessageRepository, ContactUsMessagesRepository>();
            services.AddSingleton<IJwtDecoder, JwtDecoder>();
            
            services.AddValidatorsFromAssemblyContaining<StoreDtoValidator>(); 
            services.AddValidatorsFromAssemblyContaining<CreateContactUsMessageValidator>(); 
        }
    }
}
