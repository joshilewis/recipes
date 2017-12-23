using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.DocumentDb;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace recipe2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
      public void ConfigureServices(IServiceCollection services)
      {
        var serviceEndpoint = new Uri(Configuration["cosmos:endpointUri"]);
        var authKeyOrResourceToken = Configuration["cosmos:key"];
        var client = new DocumentClient(serviceEndpoint, authKeyOrResourceToken);
        client.CreateDatabaseIfNotExistsAsync(new Database {Id = "recipes_demo"});
        client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri("recipes_demo"),
          new DocumentCollection {Id = "recipes"});
        client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri("recipes_demo"),
          new DocumentCollection { Id = "users" });
        services.AddSingleton<IDocumentClient>(client);

        services.AddMvc();

        services.AddIdentity<DocumentDbIdentityUser, DocumentDbIdentityRole>()
          .AddDocumentDbStores(options =>
          {
            options.Database = "recipes_demo";
            options.UserStoreDocumentCollection = "users";
          });

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
        services
          .AddAuthentication(options =>
          {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

          })
          .AddJwtBearer(cfg =>
          {
            cfg.RequireHttpsMetadata = false;
            cfg.SaveToken = true;
            cfg.TokenValidationParameters = new TokenValidationParameters
            {
              ValidIssuer = Configuration["JwtIssuer"],
              ValidAudience = Configuration["JwtIssuer"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
              ClockSkew = TimeSpan.Zero // remove delay of token when expire
            };
          });
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
        if (env.IsDevelopment())
        {
          app.UseDeveloperExceptionPage();
        }

        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseAuthentication();
        app.UseMvc();
        app.UseMvc();
      }
    }
}
