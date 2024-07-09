using CineListAPI.Context;
using CineListAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CineListAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<FilmeDbContext>(options =>
            
                options.UseInMemoryDatabase("BancoDeDados"));
            

                services.AddControllers();
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CineListAPI", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CineListAPI V1");
                    //c.RoutePrefix = string.Empty;
                });
            }

            app.UseCors(options =>
            {
                options.WithOrigins("http://localhost:3000");
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetService<FilmeDbContext>();
            SeedData(context);
        }

        public static void SeedData(FilmeDbContext context)
        {
            Filme movie01 = new Filme
            {
                Id = 1,
                Nome = "Divertidamente 2",
                Nota = 5
            };

            Filme movie02 = new Filme
            {
                Id = 2,
                Nome = "Barbie",
                Nota = 5
            };

            Filme movie03 = new Filme
            {
                Id = 3,
                Nome = "Anyone but you",
                Nota = 4
            };

            context.Filmes.Add(movie01);
            context.Filmes.Add(movie02);
            context.Filmes.Add(movie03);
            context.SaveChanges();
        }

    }
}
