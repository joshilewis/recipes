using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Recipes;
using AspNetCore.Identity.DocumentDb;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipes.Controllers
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  public class RecipesController : Controller
  {
    private readonly IDocumentClient client;
    private readonly UserManager<DocumentDbIdentityUser> userManager;

    private const string DatabaseId = "recipes_demo";
    private const string CollectionId = "recipes";
    private readonly Uri documentCollectionUri = UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId);

    public RecipesController(IDocumentClient client, UserManager<DocumentDbIdentityUser> userManager)
    {
      this.client = client;
      this.userManager = userManager;
    }

    [Authorize]
    [HttpGet]
    public async Task<IEnumerable<Recipe>> GetAsync()
    {
      var email = User.FindFirst("sub").Value;
      var query = client.CreateDocumentQuery<Recipe>(
          documentCollectionUri)
        .Where(x => x.OwnerEmail == email)
        .AsDocumentQuery();

      List<Recipe> results = new List<Recipe>();
      while (query.HasMoreResults)
      {
        results.AddRange(await query.ExecuteNextAsync<Recipe>());
      }

      return results;
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<Recipe> GetAsync(Guid id)
    {
      var response = await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString()));
      Recipe recipe = (dynamic) response.Resource;
      return recipe;
    }

    [Authorize]
    [HttpPost]
    public async void Post([FromBody]Recipe recipe)
    {
      recipe.OwnerEmail = User.FindFirst("sub").Value;
      await client.CreateDocumentAsync(
        documentCollectionUri, recipe);
    }

    // PUT api/<controller>/5
    [Authorize]
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<controller>/5
    [Authorize]
    [HttpDelete("{id}")]
    public async void Delete(Guid id)
    {
      await client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString()));
    }
    
  }
}
