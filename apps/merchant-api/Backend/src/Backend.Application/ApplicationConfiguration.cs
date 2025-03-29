using Backend.Application.Dtos.ContactUsMessages;
using Backend.Application.Dtos.Stores;
using Backend.Application.Dtos.Users;
using Backend.Application.Profiles;
using Backend.Application.Services.Auth.Concretes;
using Backend.Application.Services.Auth.Interfaces;
using Backend.Application.Validators.ContactUsMessages;
using Backend.Application.Validators.Stores;
using Backend.Application.Validators.Users;
using Backend.Commons.Extensions;
using Backend.Commons.ResponseHandler.Handler.Concretes;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Infrastructure.Repositories.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using FirebaseAdmin;
using FluentValidation;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Application
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

            //validators
            services.AddScoped<IValidator<RegisterUserDto>, RegisterUserValidator>();
            services.AddScoped<IValidator<UpdateUserDto>, UpdateUserDtoValidator>();
            services.AddScoped<IValidator<StoreDto>, StoreDtoValidator>();
            services.AddScoped<IValidator<CreateContactUsMessageDto>, CreateContactUsMessageValidator>();
        }
    }
}
