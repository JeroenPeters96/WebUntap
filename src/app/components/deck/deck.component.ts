import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card, Deck} from '../../models';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DeckService} from '../../services/deck.service';
import {CardService} from '../../services/card.service';
import {AuthenticationService} from '../../services/authentication.service';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnDestroy {
  deck: Deck;
  cards: Card[];
  username: string;
  searchCardCtrl = new FormControl();
  hide = false;
  filteredCards: Card[];
  filteredCardNames: string[];
  hideStyle: boolean;
  sub: Subscription;
  deckId: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private deckService: DeckService,
              private cardService: CardService,
              private authenticationService: AuthenticationService) {
    this.searchCardCtrl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => this.cardService.getCardsLikeName(value)
        ))
      .subscribe(
        data => {
          const temp: any = data;
          this.filteredCards = temp;
          this.filteredCardNames = [];
          for (let count = 0; this.filteredCards.length > count; count++) {
            this.filteredCardNames.push(this.filteredCards[count].cardname);
          }
          this.hide = true;
        }
      );
  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.deckId = params.deckId || 'null';
      });
    if (this.deckId === 'null') {
      this.router.navigate(['/home']);
    } else {
      this.deckService.getDeck(this.deckId)
        .subscribe(
          (data: any) => {
            if (data == null) {
              this.router.navigate(['/home']);
            }
            this.deck = data;
            if (this.deck.cards != null && this.deck.cards.length !== 0) {
              this.updateCards();
            }

            this.authenticationService.findUsername(this.deck.accountId)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe(data => {
                const temp: any = data;
                this.username = temp;
              });
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateCards() {
    const cardKeys = [];
    let count = 0;

    while (count < this.deck.cards.length ) {
      cardKeys.push(this.deck.cards[count].cardId);
      count++;
    }

    if (cardKeys.length !== 0) {


    this.cardService.getCards(cardKeys)
      .subscribe(data => {
          const temp: any = data;
          this.cards = temp;
        }
      );
    }
  }

  getCards() {
    if (this.cards != null) {
      return this.cards;
    } else {
      this.updateCards();
      return this.cards;
    }
  }

  update() {
    this.deckService.getDeck(this.deckId)
      .subscribe(
        (data: any) => {
          if (data == null) {
            this.router.navigate(['/home']);
          }
          this.deck = data;
          this.updateCards();
        }
      );
  }

  changeView() {

  }

  copyDeck() {

  }

  addCard(card: string) {
    for (let count = 0; this.filteredCards.length > count; count++) {
        if(this.filteredCards[count].cardname === card) {
          this.deckService.addCardToDeck(this.deck.id, this.filteredCards[count].id,4 )
            .toPromise()
            .then(data => {
              console.log(data);
              this.update();
            })
            .catch(
              error => {
                console.log(error);
              }
            );

        }
    }
  }

  deckArt() {

    this.update();
  }

  changeName() {

  }

  changeFormat() {

  }

  deleteDeck() {

  }


  getCount(card: Card) {

    if (this.cards == null) {
      return;
    }
    let count = 0;

    while (count < this.deck.cards.length ) {
      if (card.id + '' === this.deck.cards[count].cardId + '') {
        return this.deck.cards[count].count;
      }
      count++;
    }
  }

  getLand(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Land')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }


  getCreature(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Creature')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }

  getInstant(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Instant')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }

  getSorc(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Sorcery')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }

  getArt(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Artifact')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }

  getEnch(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Enchantment')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }

  getPlane(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Legendary Planeswalker')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }
  }
}
