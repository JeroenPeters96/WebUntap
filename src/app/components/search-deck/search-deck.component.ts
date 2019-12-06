import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Deck} from '../../models';
import {debounceTime, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search-deck',
  templateUrl: './search-deck.component.html',
  styleUrls: ['./search-deck.component.css']
})
export class SearchDeckComponent implements OnInit {
  searchDeckCtrl = new FormControl();
  decks: Deck[];

  constructor() { }

  ngOnInit() {
    this.searchDeckCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(
          () => {
            this.filteredDecks = [];
            this.isLoading = true;
            this.hide = false;
          }),
        switchMap(value => this.deckService.getDecksByLikeName(value))
      )
      .subscribe(data => {
        this.filteredDecks = data;
        this.hide = true;
        console.log(data);
        console.log(this.filteredDecks);
      });
  }

}
