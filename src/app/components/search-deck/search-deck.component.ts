import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Deck} from '../../models';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {DeckService} from '../../services/deck.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-deck',
  templateUrl: './search-deck.component.html',
  styleUrls: ['./search-deck.component.css']
})
export class SearchDeckComponent implements OnInit {
  searchDeckCtrl = new FormControl();
  decks: Deck[];
  isLoading = false;
  hide = true;

  constructor(private deckService: DeckService,
  private router: Router) { }

  ngOnInit() {
    this.searchDeckCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(
          () => {
            this.isLoading = true;
            this.hide = false;
          }),
        switchMap(value => this.deckService.searchDecks(value))
      )
      .subscribe(data => {
        const anyData: any = data;
        this.decks = anyData;
        this.hide = true;
      });
  }
}
