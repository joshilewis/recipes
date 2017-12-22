import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PersistenceService } from "angular-persistence/src/services/persistence.service";

@NgModule({
  providers: [PersistenceService, AuthService],
  imports: [HttpClientModule, NgbModule.forRoot()]
})
export class InfraModule {}
