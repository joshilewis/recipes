import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeService } from "./client/recipe.service";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthService } from "./infra/auth.service";
import { PersistenceService } from "angular-persistence/src/services/persistence.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterComponent } from './auth/register/register.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "signin", component: SigninComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    RecipesListComponent,
    SigninComponent,
    RegisterComponent,
    AddRecipeComponent,
    RecipeDetailsComponent,
    EditRecipeComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [PersistenceService, AuthService, RecipeService],
  bootstrap: [AppComponent],
  entryComponents: [SigninComponent, RegisterComponent, AddRecipeComponent, RecipeDetailsComponent, EditRecipeComponent]
})
export class AppModule {}
