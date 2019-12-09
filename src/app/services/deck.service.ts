import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {describe} from 'selenium-webdriver/testing';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  constructor(private http: HttpClient) {}

  createNewDeck(deckName: string, decription: string, mtgFormat: string) {
    const accountJson = sessionStorage.getItem('login');
    console.log(accountJson);
    const account: Account = (JSON.parse(accountJson));
    const payload = {
      accountId: account.id,
      name: deckName,
      description: decription,
      format: mtgFormat
    };
    const url = environment.deckApiUrl + '/cmd/create';

    return this.http.post(url, payload);
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
}
