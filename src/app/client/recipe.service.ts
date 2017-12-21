import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Recipe } from "./recipe";

@Injectable()
export class RecipeService {
  public recipes: Observable<Recipe[]>;
  constructor(private httpClient: HttpClient) {
    this.recipes = this.getRecipes();
  }

  private getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>("http://localhost:61978/api/recipes");
  }
}
