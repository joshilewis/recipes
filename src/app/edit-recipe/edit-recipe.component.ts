import { Component, OnInit } from '@angular/core';
import { Recipe } from "../client/recipe";
import { NgbActiveModal, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
  } from "@angular/forms";
import { RecipeService } from "../client/recipe.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  public recipeId: string;
  recipe: Recipe;
  editRecipeForm: FormGroup = this.builder.group({
    title: new FormControl("Title", [
      Validators.required
    ]),
    description: new FormControl("Description", [
      Validators.required
    ]),
    id: new FormControl("Id", []),
    ownerEmail: new FormControl("ownerEmail", []),
  });
  editRecipeError: boolean = false;

  constructor(private recipeService: RecipeService, public activeModal: NgbActiveModal,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.recipeId)
      .subscribe(x => {
        this.recipe = x;
        this.editRecipeForm.setValue(x);
      });
  }

  saveRecipe() {
    if (this.editRecipeForm.valid) {
      this.recipeService.saveRecipe(this.editRecipeForm.value)
        .then(x => {
          this.recipeService.refreshRecipes();
          this.activeModal.close();
        })
        .catch(x => this.editRecipeError = true);
    }
  }

  closeAlert() {
    this.editRecipeError = false;
  }
}
