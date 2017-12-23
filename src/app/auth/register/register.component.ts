import { Component, OnInit } from '@angular/core';
import { RegisterDto } from "./registerDto";
import { AuthService } from "../../infra/auth.service";
import { NgbActiveModal, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
  } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerDto: RegisterDto;
  registerForm: FormGroup = this.builder.group({
    email: new FormControl("user@example.com", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });
  registerError: boolean = false;

  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.registerForm.valid) {
      this.registerDto = this.registerForm.value;
      this.authService.register(this.registerDto.email, this.registerDto.password)
        .then(x => this.activeModal.close())
        .catch(x => this.registerError = true);

    }
  }

  closeAlert() {
    this.registerError = false;
    this.registerForm.get('password').reset();
    this.registerForm.get('confirmPassword').reset();
  }
}
