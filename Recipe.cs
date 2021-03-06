using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Recipes
{
  public class Recipe
  {
    [JsonProperty(PropertyName = "id")]
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string OwnerEmail { get; set; }
    public string Notes { get; set; }
    public RecipeStep[] Steps { get; set; }

    public Recipe(string title, string description, string notes, RecipeStep[] steps)
    {
      Id = Guid.NewGuid();
      Title = title;
      Description = description;
      Notes = notes;
      Steps = steps;
    }

    public Recipe()
    {
      Id = Guid.NewGuid();
      Steps = new RecipeStep[] { };
    }
  }

  public class RecipeStep
  {
    public string Step { get; set; }
  }
}
