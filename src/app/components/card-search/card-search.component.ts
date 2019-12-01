import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Card} from '../../models';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  searchCardCtrl = new FormControl();
  hide = false;
  filteredCards: Card[];

  constructor() { }

  ngOnInit() {
  }

  selectCard(card: Card) {

  }
}
