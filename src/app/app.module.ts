import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeService } from "./client/recipe.service";
import { InfraModule } from "./infra/infra.module";
import { SigninComponent } from "./auth/signin/signin.component";

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    RecipesListComponent,
    SigninComponent
  ],
  imports: [BrowserModule, InfraModule, ReactiveFormsModule, FormsModule],
  providers: [RecipeService],
  bootstrap: [AppComponent],
  entryComponents: [SigninComponent]
})
export class AppModule {}
