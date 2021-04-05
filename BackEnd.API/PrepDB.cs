using BackEnd.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BackEnd.API
{
    public static class PrepDB
    {
        public static void PrePopulation(IApplicationBuilder app)
        {
            using (var serviceSope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceSope.ServiceProvider.GetService<BackendContext>());
            }
        }
        public static void SeedData(BackendContext context)
        {
            System.Console.WriteLine("Aplicando migrations...");
            context.Database.Migrate();
        }
    }
}