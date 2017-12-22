import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeService } from "./client/recipe.service";
import { InfraModule } from "./infra/infra.module";

@NgModule({
  declarations: [AppComponent, AppNavbarComponent, RecipesListComponent],
  imports: [BrowserModule, InfraModule],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
