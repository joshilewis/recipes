using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public Recipe(string title, string description)
        {
            Id = Guid.NewGuid();
            Title = title;
            Description = description;
        }

        public Recipe()
        {
        }
    }
}
