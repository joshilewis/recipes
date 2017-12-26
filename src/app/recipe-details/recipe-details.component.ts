import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../client/recipe.service";
import {Recipe} from "../client/recipe";
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipeId: string;
  public recipe: Observable<Recipe>;
  constructor(public recipeClient: RecipeService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.recipe = this.recipeClient.getRecipe(this.recipeId);
  }

}
