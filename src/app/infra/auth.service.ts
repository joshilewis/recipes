import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PersistenceService } from "angular-persistence/src/services/persistence.service";
import { StorageType } from "angular-persistence/src/constants/persistence.storage_type";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly persistenceService: PersistenceService
  ) {
    this.token = null;
    const token = persistenceService.get("token", StorageType.LOCAL);
    if (token) {
      this.token = token;
    }
  }

  signIn(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.token) {
        return resolve(true);
    }

    this.httpClient
      .post("api/account/signin", {
        email: email,
        password: password
      })
      .subscribe(
      res => {
        const result = <TokenResult>res;
          this.persistenceService.set("token", result.token, {
            type: StorageType.LOCAL 
          });
          this.token = result.token;
        return resolve(true);
      },
        err => {
          console.log(err);
          return reject();
        }
      );
    });  }

  register(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.token) {
        return resolve(true);
      }

      this.httpClient
        .post("api/account/register", {
          email: email,
          password: password
        })
        .subscribe(
          res => {
            const result = <TokenResult>res;
            this.persistenceService.set("token", result.token, {
              type: StorageType.LOCAL
            });
            this.token = result.token;
            return resolve(true);
          },
          err => {
            console.log(err);
            return reject();
          }
        );
    });
  }

    signOut() {
    this.token = null;
    this.persistenceService.remove("token", StorageType.LOCAL);
  }
}
