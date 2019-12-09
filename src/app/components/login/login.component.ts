import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  showSpinner: boolean;
  hide: boolean;

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  login() {
    this.showSpinner = true;
    this.hide = false;
    this.authService.login(this.email, this.password).subscribe((data: any) => {
      if (data == null) {
        this.hide = true;
        this.showSpinner = null;
      }
      const tempData: any = data;
      this.continue(tempData);
    });
  }

  private continue(user: User) {
    if (user !== null) {
      sessionStorage.setItem('login', JSON.stringify(user));
      this.router.navigate(['']);
    } else {
      this.hide = true;
      this.showSpinner = false;
    }
  }
}
