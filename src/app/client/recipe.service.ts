import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Recipe } from "./recipe";
import { AuthService } from "../infra/auth.service";

@Injectable()
export class RecipeService {
  public recipes: Observable<Recipe[]>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.recipes = this.getRecipes();
  }

  private getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>("http://localhost:61978/api/recipes", this.getAuthHeader());
  }

  public addRecipe(recipe: Recipe): Promise<Object> {
    return this.httpClient.post("api/recipes/", recipe, this.getAuthHeader())
      .toPromise();
  }

  public refreshRecipes() {
    this.recipes = this.getRecipes();
  }

  private getAuthHeader(): Object {
    return {
      headers:
        new HttpHeaders().append("Authorization", `bearer ${this.authService.token}`)
    }
  }
}
