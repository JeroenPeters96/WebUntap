import { Component, OnInit } from '@angular/core';
import {DeckService} from '../../services/deck.service';
import {Deck, User} from '../../models';

@Component({
  selector: 'app-your',
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.css']
})
export class YourComponent implements OnInit {
  decks: Deck[];

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    let user: User;
    user = JSON.parse(sessionStorage.getItem('login'));

   this.deckService.getDecksByUserId(user.id)
      .subscribe(data => {
        const temp: any = data;
        this.decks = temp;
      });
  }


}
