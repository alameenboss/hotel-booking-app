using AutoMapper;
using HotelBooking.API.Extensions;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.LoggerService.Extensions;
using HotelBooking.Web.Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HotelBooking.API
{
    public class Startup
    {
        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            this.Environment = environment;
            Configuration = configuration;
        }
        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var config = new ConfigurationBuilder()
                   .SetBasePath(this.Environment.ContentRootPath)
                   .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                   .AddJsonFile($"appsettings.{this.Environment.EnvironmentName}.json", optional: true)
                   .SeriLogConfiguration(this.Environment)
                   .AddEnvironmentVariables()
                   .Build();

            services.RegisterDefaultConfiguration(Configuration);
            services.ConfigureSwagger("Hotel Booking Identity Server", "v1");
            services.AddAutoMapper(typeof(Startup));
            services.ConfigureIdentity(Configuration);
            services.AddControllers();
            services.ConfigureSeriLogService(config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseRouting();
            MyIdentityDataInitializer.SeedData(userManager, roleManager);
            app.UseAuthentication();
            app.UseAuthorization();

            app.EnableSwagger();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}