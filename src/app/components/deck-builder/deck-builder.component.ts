import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  create(deckName: any, deckDescription: any, selectedFormat: any) {

  }

  continue() {

  }

  setFormat(format: string) {
    this.selectedFormat = format;
  }
}
