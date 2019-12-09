import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  logged: boolean;

  constructor(private router: Router, private authService: AuthenticationService) {
    const accountJson = sessionStorage.getItem('login');
    if (accountJson != null) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  ngOnInit() {
  }

  logout() {
   this.authService.logout();
   this.router.navigate(['']);
  }
}
