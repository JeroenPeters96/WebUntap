import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Card, Deck} from '../../models';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DeckService} from '../../services/deck.service';
import {CardService} from '../../services/card.service';
import {AuthenticationService} from '../../services/authentication.service';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnDestroy {
  deck = new Deck();
  cards = [];
  username: string;
  searchCardCtrl = new FormControl();
  hide = false;
  filteredCards: Card[];
  filteredCardNames: string[];
  hideStyle: boolean;
  sub: Subscription;
  deckId: string;
  price: number;
  lands = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deckService: DeckService,
              private cardService: CardService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {
    this.deck.cards = [];
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
            console.log(this.deck.cards);
            if (!this.deck.cards) {
              console.log('tester');
              this.deck.cards = [];
            }
            if (this.deck.cards || this.deck.cards.length !== 0) {
              this.updateCards();
            } else {
              this.cards = [];
            }

            this.authenticationService.findUsername(this.deck.accountId)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe(data => {
                const temp: any = data;
                // @ts-ignore
                const temp2: {message: string } = data;
                this.username = temp2.message;
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

    if (!this.deck.cards) {
      console.log('empty');
      return [];
    }

    while (count < this.deck.cards.length ) {
      cardKeys.push(this.deck.cards[count].cardId);
      count++;
    }

    if (cardKeys.length !== 0) {


    this.cardService.getCards(cardKeys)
      .subscribe(data => {
          const temp: any = data;
          this.cards = temp;
          this.lands = this.getLand();
          this.price = 0;
          for (let counter = 0; this.cards.length > counter; counter++) {
            this.price = this.price + (this.cards[counter].price * this.getCount(this.cards[counter]));
          }
        }
      );
    } else {
      return [];
    }
  }

  getCards() {
    if (this.cards) {
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
    this.hideStyle = !this.hideStyle;
  }

  copyDeck() {

  }

  addCard(card: string) {
    for (let count = 0; this.filteredCards.length > count; count++) {
        if (this.filteredCards[count].cardname === card) {
          this.deckService.addCardToDeck(this.deck.id, this.filteredCards[count].id, 4 )
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
    const dialogRef = this.dialog.open(DeckArtDeckDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        console.log(result);
        this.deck.deckArt = result;
        this.deckService.setDeckArt(this.deck, result)
          .subscribe( output => {
            this.update();
          });
      }
    });

  }

  changeName() {
    const dialogRef = this.dialog.open(NameDeckDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.deckService.newName(this.deck, result)
          .subscribe(output => {
            this.update();
          });
      }
    });

  }

  changeFormat() {
    const dialogRef = this.dialog.open(FormatDeckDialogComponent, {
      data: this.deck.format
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        console.log(result);
        this.deckService.newFormat(this.deck, result).subscribe(
          (output) => {
            console.log(output);
            this.update();
          }
        );

      }
    });
  }

  deleteDeck() {
    const dialogRef = this.dialog.open(DeleteDeckDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.deckService.deleteDeck(this.deck);
        this.router.navigate(['']);
      }
    });
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
    // console.log('when' + this.deck.cards + this.cards);
    const cards: Card[] = this.getCards();
    if (cards != null && cards.length > 0) {
      const foundCard: Array<Card> = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].type.startsWith('Land') || cards[i].type.startsWith('Legendary Land')) {
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
        if (cards[i].type.startsWith('Instant') || cards[i].type.startsWith('Tribal Instant')) {
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
        if (cards[i].type.startsWith('Sorcery') || cards[i].type.startsWith('Tribal Sorcery')) {
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
        if (cards[i].type.startsWith('Artifact') || cards[i].type.startsWith('Legendary Artifact')) {
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
        if (cards[i].type.startsWith('Enchantment') || cards[i].type.startsWith('Legendary Enchantment')) {
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
    this.deckService.removeAmount(this.deck, card, 1).subscribe(
      output => {
        console.log(output);
        this.update();
      }
    );
  }

  increaseAmount(card: Card) {
    this.deckService.addAmount(this.deck, card, 1).subscribe(
      output => {
        console.log(output);
        this.update();
      }
    );
  }
}

@Component({
  selector: 'app-delete-deck-dialog',
  templateUrl: './delete-dialog.html'
})
export class DeleteDeckDialogComponent {

}


@Component({
  selector: 'app-deckart-deck-dialog',
  templateUrl: './new-deckart-dialog.html'
})
export class DeckArtDeckDialogComponent {
  filteredCardNames: string[];
  searchCardCtrl = new FormControl();
  private filteredCards: Card[];
  hide = false;
  deckart: string;

  constructor(private cardService: CardService) {
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

  setDeckArt(card: string) {
    for (let count = 0; this.filteredCards.length > count; count++) {
      if (this.filteredCards[count].cardname === card) {
      this.deckart = this.filteredCards[count].id;
      }
    }
    }
}

@Component({
  selector: 'app-format-deck-dialog',
  templateUrl: './new-format-dialog.html'
})
export class FormatDeckDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    console.log(data);
    this.currentFormat = data;
  }

  formats: string[] = [
    'Standard',
    'Pioneer',
    'Historic',
    'EDH',
    'Modern',
    'Legacy',
    'Vintage'];
  format: string;
  private currentFormat: string;

  selectFormat(format: string) {
    this.format = format;
  }
}

@Component({
  selector: 'app-name-deck-dialog',
  templateUrl: './new-name-dialog.html'
})
export class NameDeckDialogComponent {
  deckName: string;
}
