import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = false;
  showSpinner = false;
  password: string;
  email: string;
  username: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.hide = false;
    if (this.username.length === 0 || this.email.length === 0 || this.password.length === 0) {
      this.hide = true;
      return;
    }
    this.showSpinner = true;
    this.authService.register(this.username, this.email, this.password);
    this.showSpinner = null;
    this.router.navigate(['/auth']);
  }
}
