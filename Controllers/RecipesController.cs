using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Recipes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipes.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RecipesController : Controller
    {
        private readonly IDocumentClient client;

        public RecipesController(IDocumentClient client)
        {
            this.client = client;
        }

        //[Authorize]
        [HttpGet]
        public async Task<IEnumerable<Recipe>> GetAsync()
        {
            var query = client.CreateDocumentQuery<Recipe>(
                    UriFactory.CreateDocumentCollectionUri("recipes_demo", "recipes"))
                    .AsDocumentQuery();

            List<Recipe> results = new List<Recipe>();
            while (query.HasMoreResults)
            {
                results.AddRange(await query.ExecuteNextAsync<Recipe>());
            }

            return results;
        }

        [HttpGet("{id}")]
        public string GetAsync(int id)
        {
            return "value";
        }

        [HttpPost]
        public async void Post(Recipe recipe)
        {
            await client.CreateDocumentAsync(
                UriFactory.CreateDocumentCollectionUri("recipes_demo", "recipes"), recipe);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
