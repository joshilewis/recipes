import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeService } from "./client/recipe.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, AppNavbarComponent, RecipesListComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule.forRoot()],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
