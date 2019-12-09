import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 @Input() sidenav: MatSidenav;
  menuIcon = 'menu';
  logged: boolean;

  constructor() {
    const accountJson = sessionStorage.getItem('login');
    if (accountJson !== null) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  ngOnInit() {
  }

  toggleIcon() {
    if (this.menuIcon === 'menu') {
      this.menuIcon = 'close';
    } else {
      this.menuIcon = 'menu';
    }
  }
}
