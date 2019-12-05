import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CardComponent} from './components/card/card.component';
import {CardSearchComponent} from './components/card-search/card-search.component';
import {DeckComponent} from './components/deck/deck.component';
import {MetaDecksComponent} from './components/meta-decks/meta-decks.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'card', component: CardComponent},
  {path: 'searchcard', component: CardSearchComponent},
  {path: 'deck', component: DeckComponent},
  {path: 'meta', component: MetaDecksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
