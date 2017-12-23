import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PersistenceService } from "angular-persistence/src/services/persistence.service";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "../auth/signin/signin.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "signin", component: SigninComponent }
];

@NgModule({
  providers: [PersistenceService, AuthService],
  imports: [
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class InfraModule {}
