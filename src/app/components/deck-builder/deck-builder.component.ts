import { Component, OnInit } from '@angular/core';
import {DeckService} from '../../services/deck.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit {
  deckName: string;
  deckDescription: string;
  selectedFormat: string;
  formats: string[] = [
    'Standard',
    'Pioneer',
    'Historic',
    'EDH',
    'Modern',
    'Legacy',
    'Vintage'];
  constructor(private deckService: DeckService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.deckService.createNewDeck(this.deckName, this.deckDescription, this.selectedFormat)
      .subscribe(
        (data) => {
          console.log(data);
          const json = JSON.stringify(data);
          const response = JSON.parse(json);
          this.continue(response.deckId);
        },
        error => {
          console.log(error);
        }
      );
  }

  continue(deckIds: string) {
    this.router.navigate(['/deck'], {queryParams: {deckId: deckIds}});
  }

  setFormat(format: string) {
    this.selectedFormat = format;
  }
}
