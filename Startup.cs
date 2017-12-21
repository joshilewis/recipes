using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

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
          client.CreateDatabaseIfNotExistsAsync(new Database { Id = "recipes_demo" });
          client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri("recipes_demo"),
            new DocumentCollection { Id = "recipes" });
          services.AddMvc();
          services.AddSingleton<IDocumentClient>(client);
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
            app.UseMvc();
        }
    }
}
