import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../util/constants';
import {AppService} from '../service/app.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forgotPassword = false;
  username: string;
  password: string;
  isLoginError = false;

  constructor(private route: Router, private appService: AppService) {
  }

  ngOnInit(): void {
    this.isLoginError = false;
  }

  validateUser() {
    this.isLoginError = false;
    this.appService.authenticateUser(this.username, this.password).subscribe(response => {
      if (response.active) {
        this.appService.setToken(response.jwt);
        this.route.navigateByUrl('/home');
      } else {
        this.isLoginError = true;
      }
    }, (error: HttpErrorResponse) => {
      this.isLoginError = true;
    });

  }

  toggleForgotPassword() {
    this.forgotPassword = !this.forgotPassword;
  }
}
