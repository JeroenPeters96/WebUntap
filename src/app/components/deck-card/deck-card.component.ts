import {Component, Input, OnInit} from '@angular/core';
import {Deck} from '../../models';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css']
})
export class DeckCardComponent implements OnInit {

  @Input()
  deck: Deck;

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
  }

  selectDeck() {

  }

  getArt() {
    if (this.deck.deckArt === null) {
      return this.deck.deckArt;
    }
    if(this.deck.cards !== null && this.deck.cards.length !== 0) {

      let cardKeys = [];
      this.deck.cards.forEach((cardId: string, count: number) => {
        console.log('t');
        console.log(cardId);
        cardKeys.push(cardId);
      });

      console.log(cardKeys);


     // this.cardService.getDeckArt(Array.from(this.deck.cards))
    }



    return 'https://img.scryfall.com/cards/art_crop/front/f/a/fa56d53c-836c-483d-988d-a288d0ad91bb.jpg?1537149837';
  }
}
