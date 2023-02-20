using AIBackEnd.Services.Contracts;
using AIBackEnd.Services;
using AIBackEnd.Logger;
using AIBackEnd.Repositories.Contracts;
using AIBackEnd.Repositories;
using AIBackEnd.Data;
using Microsoft.EntityFrameworkCore;

namespace AIBackEnd.Extenston
{
    public static class ServiceExtension
    {
        public static void ConfigureCors(this IServiceCollection services) =>
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            builder.AllowAnyOrigin()
            //WithOrigins("https://example.com")
            .AllowAnyMethod()
            //WithMethods("POST", "GET")
            .AllowAnyHeader());
            //WithHeaders("accept", "content)
        });

        public static void ConfigureLoggerService(this IServiceCollection services) =>
            services.AddSingleton<ILoggerManager, LoggerManager>();

        public static void ConfigureMySqlContext(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config["connectionString:mysqlConnection"];
            services.AddDbContext<ANEFreeInItyDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        }

        public static void ConfigureRepository(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureServiceManager(this IServiceCollection services)
        {
            services.AddScoped<IServiceManager, ServiceManager>();
        }
    }
}
