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
}
