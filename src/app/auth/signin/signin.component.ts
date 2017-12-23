import { Component, OnInit } from "@angular/core";
import { SignInDto } from "./signinDto";
import { AuthService } from "../../infra/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  private signinDto: SignInDto;
  signinForm: FormGroup = this.builder.group({
    email: new FormControl("user@example.com", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private authService: AuthService,
    public activeModal: NgbActiveModal,
    private builder: FormBuilder
  ) {}

  ngOnInit() {}

  get email() {
    return this.signinForm.get("email");
  }

  get password() {
    return this.signinForm.get("password");
  }

  signIn() {
    if (this.signinForm.valid) {
      this.signinDto = this.signinForm.value;
      this.authService.signIn(this.signinDto.email, this.signinDto.password);
      this.activeModal.close();
    }
  }
}
