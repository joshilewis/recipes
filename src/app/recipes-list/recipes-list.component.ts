import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../client/recipe.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"]
})
export class RecipesListComponent implements OnInit {
  constructor(public recipeClient: RecipeService) {}

  ngOnInit() {}
}
