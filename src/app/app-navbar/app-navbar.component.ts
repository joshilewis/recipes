import { Component, OnInit } from "@angular/core";
import { AuthService } from "../infra/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./app-navbar.component.html",
  styleUrls: ["./app-navbar.component.css"]
})
export class AppNavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
