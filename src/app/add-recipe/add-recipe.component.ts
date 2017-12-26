import { Component, OnInit } from "@angular/core";
import { Recipe } from "../client/recipe";
import { NgbActiveModal, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { RecipeService } from "../client/recipe.service";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe;
  addRecipeForm: FormGroup = this.builder.group({
    title: new FormControl("Title", [
      Validators.required
    ]),
    description: new FormControl("Description", [
      Validators.required
    ]),
    notes:new FormControl("notes"),
  });
  addRecipeError: boolean = false;

  constructor(private recipeService: RecipeService, public activeModal: NgbActiveModal,
    private builder: FormBuilder
) { }

  ngOnInit() {
  }

  addRecipe() {
    if (this.addRecipeForm.valid) {
      this.recipeService.addRecipe(this.addRecipeForm.value)
        .then(x => {
          this.recipeService.refreshRecipes();
          this.activeModal.close();
        })
        .catch(x => this.addRecipeError = true);
    }
  }

  closeAlert() {
    this.addRecipeError = false;
  }
}
