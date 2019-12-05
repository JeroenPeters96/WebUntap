import { Component, OnInit } from '@angular/core';
import {DeckService} from '../../services/deck.service';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import {Deck} from '../../models';

@Component({
  selector: 'app-meta-decks',
  templateUrl: './meta-decks.component.html',
  styleUrls: ['./meta-decks.component.css']
})
export class MetaDecksComponent implements OnInit {
  decks: Deck[];

  constructor(private deckService: DeckService, private cardService: CardService) { }

  ngOnInit() {
    this.deckService.getMetaDecks()
      .subscribe(data => {
        const temp: any = data;
        this.decks = temp;
      });
  }

}
