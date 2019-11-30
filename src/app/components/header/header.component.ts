import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 @Input() sidenav: MatSidenav;
  menuIcon = 'menu';

  constructor() { }

  ngOnInit() {
  }

  toggleIcon() {
    if(this.menuIcon === 'menu') {
      this.menuIcon = 'close';
    } else {
      this.menuIcon = 'menu';
    }
  }
}
