import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CardService {

  constructor(private http: HttpClient) {}

  getAutocomplete(cardName: string) {
    if (cardName.toString().length !== 0) {
      return this.http.get( environment.cardApiUrl + '/cardqry/getAutocomplete/' + cardName);
    }
    return null;
  }

  getCardByName(cardName: string) {
    return this.http.get(environment.cardApiUrl + '/cardqry/name/' + cardName);
  }

  getCards(cardIds: string[]) {
    console.log('test')
    console.log(cardIds);
    if (cardIds.length === 0) {
      return;
    }
    let newUrl = environment.cardApiUrl + '/cardqry/?cardIds=';
    for (let count = 0; cardIds.length > count; count++) {
      newUrl = newUrl + cardIds[count] + ',';
    }
    console.log(newUrl);
    const url = newUrl.substr(0, newUrl.length - 1);

    return this.http.get(url);
  }

  getDeckArt(cardIds: string[]) {

    if (cardIds.length === 0) {
      return;
    }
    let newUrl = environment.cardApiUrl + '/cardqry/getSignature/?cardIds=';
    for (let i = 0; i < cardIds.length; i++) {
      newUrl = newUrl + cardIds[i] + ',';
    }
    const url = newUrl.substr(0, newUrl.length - 1);

    return this.http.get(url);
  }

  getCardsLikeName(cardName: string) {
    console.log(cardName);
    if (cardName.toString().length !== 0) {
      return this.http.get(environment.cardApiUrl + '/cardqry/getLikeName/' + cardName);
    }
  }
}
