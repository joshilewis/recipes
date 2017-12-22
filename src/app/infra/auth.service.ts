import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PersistenceService } from "angular-persistence/src/services/persistence.service";
import { StorageType } from "angular-persistence/src/constants/persistence.storage_type";

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly persistenceService: PersistenceService
  ) {
    const token = persistenceService.get("token", StorageType.LOCAL);
    if (token) {
      this.token = token;
    }
  }

  signIn() {
    if (this.token) {
      return;
    }

    this.httpClient
      .post("api/account/signin", {
        email: "user@example.com",
        password: "Password1!"
      })
      .subscribe(
        res => {
          this.persistenceService.set("token", res.token, {
            type: StorageType.LOCAL
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  signOut() {
    this.token = null;
    this.persistenceService.remove("token", StorageType.LOCAL);
  }
}
