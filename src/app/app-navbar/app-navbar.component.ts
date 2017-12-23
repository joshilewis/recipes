import { Component, OnInit } from "@angular/core";
import { AuthService } from "../infra/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SigninComponent } from "../auth/signin/signin.component";
import { RegisterComponent } from "../auth/register/register.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./app-navbar.component.html",
  styleUrls: ["./app-navbar.component.css"]
})
export class AppNavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  openSignInModal() {
    const modalRef = this.modalService.open(SigninComponent);
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterComponent);
  }
}
