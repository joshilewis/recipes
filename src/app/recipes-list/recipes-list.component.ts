import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../client/recipe.service";
import { AuthService } from "../infra/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddRecipeComponent } from "../add-recipe/add-recipe.component";

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
}
