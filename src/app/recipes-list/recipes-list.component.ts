import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../client/recipe.service";
import { AuthService } from "../infra/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddRecipeComponent } from "../add-recipe/add-recipe.component";
import {RecipeDetailsComponent} from "../recipe-details/recipe-details.component";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"]
})
export class RecipesListComponent implements OnInit {
  constructor(
    public recipeClient: RecipeService,
    public authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  addRecipe() {
    const modalRef = this.modalService.open(AddRecipeComponent);
  }

  showRecipe(recipe) {
    const modalRef = this.modalService.open(RecipeDetailsComponent, {size: "lg"});
    modalRef.componentInstance.recipe = recipe;
    //this.recipeClient.getRecipe(recipe)
    //  .subscribe(x => console.log(x));
  }

  deleteRecipe(recipe) {
    this.recipeClient.deleteRecipe(recipe)
      .then(_ => this.recipeClient.refreshRecipes())
      .catch(_ => alert("There was an error deleting that recipe, please try again"));
  }
}
