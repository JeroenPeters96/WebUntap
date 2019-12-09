import {Component, Input, OnInit} from '@angular/core';
import {Card, Deck} from '../../models';
import {CardService} from '../../services/card.service';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css']
})
export class DeckCardComponent implements OnInit {

  @Input()
  deck: Deck;
  picture = '';
  getting = false;

  constructor(private cardService: CardService, private router: Router) {
  }

  ngOnInit() {
  }

  selectDeck() {
      this.router.navigate(['/deck'], {queryParams: {deckId: this.deck.id}});
  }

  savedPicture() {
    if (this.picture !== '' ) {
      return this.picture;
    } else {
      if(!this.getting) {
        this.picture = this.getArt();
        return this.picture;
      }
    }
  }

  getArt() {
    this.getting = true;
    if (this.deck.deckArt === null) {
      this.getting = false;
      return this.deck.deckArt;
    }
    if (this.deck.cards !== null && this.deck.cards.length !== 0) {

      const cardKeys = [];
      let count = 0;

      while (count < this.deck.cards.length ) {
        cardKeys.push(this.deck.cards[count].cardId);
        count++;
     }
      this.cardService.getDeckArt(cardKeys)
        .pipe(
          debounceTime(1000)
        )
        .subscribe( data => {
         const card: any = data;
         const tempCard: Card = card;
        this.picture = tempCard.artUrl;
         return tempCard.artUrl;
          }
        );
    } else {
      this.getting = false;
      return 'https://img.scryfall.com/cards/art_crop/front/f/a/fa56d53c-836c-483d-988d-a288d0ad91bb.jpg?1537149837';
    }
  }


}
