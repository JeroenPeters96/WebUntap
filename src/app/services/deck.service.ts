import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {describe} from 'selenium-webdriver/testing';
import {environment} from '../../environments/environment';
import {Card, Deck} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  constructor(private http: HttpClient) {}

  createNewDeck(deckName: string, decription: string, mtgFormat: string) {
    const accountJson = sessionStorage.getItem('login');
    console.log(accountJson);
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    const account: Account = (JSON.parse(accountJson));
    const payload = {
      accountId: account.id + '',
      name: deckName,
      description: decription,
      format: mtgFormat
    };
    const url = environment.deckApiUrl + '/cmd/create';
    console.log(payload);
    return this.http.post(url, payload, config);
  }


  getDeckById(id: string) {
    const url = environment.deckApiUrl + '/qry/' + id;
    return this.http.get(url);
  }

  getMetaDecks() {
    const url = environment.deckApiUrl + '/qry/meta';
    return this.http.get(url);
  }

  searchDecks(value: string) {
      const url = environment.deckApiUrl + '/qry/name/' + value;
      return this.http.get(url);
  }

  getDeck(deckId: string) {
    return this.http.get(environment.deckApiUrl + '/qry/' + deckId);
  }

  addCardToDeck(deckIdentifier: string, cardIdentifier: string, amount: number) {
    const body = { cards: [{ cardId: cardIdentifier, count: amount}], deckId: deckIdentifier};
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post(environment.deckApiUrl + '/cmd/', JSON.stringify(body), config);
  }

  getDecksByUserId(id: string) {
    return this.http.get(environment.deckApiUrl + '/qry/user/' + id);
  }

  deleteDeck(deck: Deck) {
    this.http.delete(environment.deckApiUrl + '/cmd/delete/' + deck.id)
      .subscribe(response => console.log(response));

  }

  newName(deck: Deck, result: string) {
    return this.http.post(environment.deckApiUrl + '/cmd/renameDeck/' + deck.id + '/' + result, '');
  }

  setDeckArt(deck: Deck, result: string) {
      return this.http.post(environment.deckApiUrl + '/cmd/setArt/' + deck.id + '/' + result, '');
  }

  addAmount(deck: Deck, card: Card, amount: number) {
   return this.addCardToDeck(deck.id, card.id, amount);
  }

  removeAmount(deck: Deck, card: Card, amount: number) {
    const body = { cards: [{ cardId: card.id, count: amount}], deckId: deck.id};
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post(environment.deckApiUrl + '/cmd/removeCards', JSON.stringify(body), config);
  }

  newFormat(deck: Deck, result: string) {
    return this.http.post(environment.deckApiUrl + '/cmd/setFormat/' + deck.id + '/' + result, '');
  }
}
