import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../client/recipe.service";
import {AuthService} from "../infra/auth.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"]
})
export class RecipesListComponent implements OnInit {
  constructor(public recipeClient: RecipeService, public authService: AuthService) {}

  ngOnInit() {}
}
