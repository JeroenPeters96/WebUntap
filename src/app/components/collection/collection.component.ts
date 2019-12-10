import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {CardService} from '../../services/card.service';
import {Card, CardCollection} from '../../models';
import {CollectionService} from '../../services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  searchCardCtrl = new FormControl();
  filteredCards: Card[];
  filteredCardNames: string[];
  cards: Card[];
  hide = false;
  hideStyle = false;

  private collection: CardCollection[];

  constructor(private cardService: CardService, private collectionService: CollectionService) {
    this.update();
  }

  ngOnInit() {
    this.searchCardCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredCardNames = [];
          this.hide = false;
        }),
        switchMap(value => this.cardService.getAutocomplete(value)
        )
      )
      .subscribe(data => {
        if (data === null) {
          this.filteredCardNames = [];
          this.hide = false;
        } else {
          const cardList: any = data;
          this.filteredCardNames = cardList;
          this.hide = true;
        }
      });
  }

  update() {
    this.collectionService.getCollection().subscribe( data => {
      const data2: any = data;
      console.log('collection:');
      console.log(data2);
      this.collection = data2;
      this.updateCards();
      }
    );
  }

  addCard(card: string) {
    console.log(card);
    console.log(this.filteredCards);

    this.cardService.getCardsLikeName(card).subscribe(
      foundCard => {
        const data: any = foundCard;
        const card: Card[] = data;
        console.log(card[0]);
        console.log(card[0].id);
        this.collectionService.addAmount(card[0], 1).subscribe(
          output => {
            console.log(output);
            this.update();
          }
        );
      }
    );
  }

  switchStyles() {
    this.hideStyle = !this.hideStyle;
  }

  getCards() {
    if (this.cards) {
      return this.cards;
    } else {
      this.updateCards();
      return this.cards;
    }
  }

  updateCards() {
    const cardKeys = [];
    let count = 0;

    if (!this.collection) {
      return [];
    }

    while (count < this.collection.length ) {
      cardKeys.push(this.collection[count].cardId);
      count++;
    }

    if (cardKeys.length !== 0) {
      this.cardService.getCards(cardKeys)
        .subscribe(data => {
            const temp: any = data;
            this.cards = temp;
          }
        );
    } else {
      return [];
    }
  }



  getLand(): Card[] {

    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Land')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    } else {
      return [];
    }
  }


  getCreature(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Creature') || cards[i].type.startsWith('Legendary Creature')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }  else {
      return [];
    }
  }

  getInstant(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Instant')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    } else {
      return [];
    }
  }

  getSorc(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Sorcery')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }  else {
      return [];
    }
  }

  getArt(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Artifact')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }  else {
      return [];
    }
  }

  getEnch(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Enchantment')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }  else {
      return [];
    }
  }

  getPlane(): Card[] {
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Legendary Planeswalker')) {
          foundCard.push(cards[i]);
        }
      }
      return foundCard;
    }  else {
      return [];
    }
  }


  decreaseAmount(card: Card) {
    this.collectionService.removeAmount(card, 1).subscribe(
      output => {
        console.log(output);
        this.update();
      }
    );
  }

  increaseAmount(card: Card) {
    this.collectionService.addAmount(card, 1).subscribe(
      output => {
        console.log(output);
        this.update();
      }
    );
  }

  getCount(card: Card) {
    for (let count = 0; this.collection.length > count; count++) {
      if (this.collection[count].cardId + '' === card.id + '' ) {
        return this.collection[count].count;
      }
    }
  }
}
