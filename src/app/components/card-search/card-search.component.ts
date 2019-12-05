import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Card} from '../../models';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  searchCardCtrl = new FormControl();
  hide = false;
  filteredCards: string[];
  isLoading = false;

  constructor(private router: Router, private cardService: CardService) { }

  ngOnInit() {
    this.searchCardCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredCards = [];
          this.isLoading = true;
          this.hide = false;
        }),
        switchMap(value => this.cardService.getAutocomplete(value)
        )
      )
      .subscribe(data => {
        if (data === null) {
          this.filteredCards = [];
          this.hide = false;
        } else {
          const cardList: any = data;
          this.filteredCards = cardList;
          this.hide = true;
        }
      });
  }

  selectCard(selectedCard: string) {
    this.router.navigate(['/card'], {queryParams: {card: selectedCard}});
  }
}
