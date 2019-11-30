import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CardService {

  constructor(private http: HttpClient) {}

  getAutocomplete(cardName: string) {
    if (cardName === '') {
      return [];
    }
  }

  getCardByName(cardName: string) {

  }

  getCards(cardIds: string[]) {

  }

  getDeckArt(cardIds: string[]) {

  }
}
