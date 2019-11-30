export class Deck {
  id: string;
  accountId: string;
  deckname: string;
  description: string;
  cards: { cardId: string, count: number}[];
  format: string;
  deckArt: string;
}
