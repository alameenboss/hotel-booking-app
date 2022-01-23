using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace HotelBooking.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            IWebHostEnvironment env = host.Services.GetRequiredService<IWebHostEnvironment>();
            //using (var serviceScope = host.Services.CreateScope())
            //{
            //    var context = serviceScope.ServiceProvider.GetRequiredService<UserDbContext>();
            //    context.Database.Migrate();
            //}
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog() // Uses Serilog instead of default .NET Logger
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}