import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }


  removeAmount(card: Card, amount: number) {
    const accountJson = sessionStorage.getItem('login');
    const account: Account = (JSON.parse(accountJson));

    return this.http.post(environment.collectionApiUrl + '/cmd/remove/' + account.id + '/' + card.id + '/' + amount, '');
  }

  addAmount(card: Card, amount: number) {
    const accountJson = sessionStorage.getItem('login');
    const account: Account = (JSON.parse(accountJson));
    console.log(card.id+'');
    return this.http.post(environment.collectionApiUrl + '/cmd/add/' + account.id + '/' + card.id + '/' + amount, '');
  }

  getCollection() {
    const accountJson = sessionStorage.getItem('login');
    const account: Account = (JSON.parse(accountJson));

    return this.http.get(environment.collectionApiUrl + '/qry/' + account.id);
  }

  tradesend(receiver: string, sender: string, toSend: { cardId: string, amount: number}) {

  }
}
