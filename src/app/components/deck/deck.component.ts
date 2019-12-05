import { Component, OnInit } from '@angular/core';
import {Card, Deck} from '../../models';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  deck: Deck;
  username: string;
  searchCardCtrl = new FormControl();
  hide = false;
  filteredCards: Card[];

  constructor() { }

  ngOnInit() {
  }

  changeView() {

  }

  copyDeck() {

  }

  addCard(card: Card) {

  }

  deckArt() {

  }

  changeName() {

  }

  changeFormat() {

  }

  deleteDeck() {

  }
}
