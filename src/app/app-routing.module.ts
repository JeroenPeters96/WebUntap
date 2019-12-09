import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CardComponent} from './components/card/card.component';
import {CardSearchComponent} from './components/card-search/card-search.component';
import {DeckComponent} from './components/deck/deck.component';
import {MetaDecksComponent} from './components/meta-decks/meta-decks.component';
import {SearchDeckComponent} from './components/search-deck/search-deck.component';
import {DeckBuilderComponent} from './components/deck-builder/deck-builder.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'card', component: CardComponent, canActivate: [AuthGuard]},
  {path: 'searchcard', component: CardSearchComponent, canActivate: [AuthGuard]},
  {path: 'deck', component: DeckComponent, canActivate: [AuthGuard]},
  {path: 'meta', component: MetaDecksComponent, canActivate: [AuthGuard]},
  {path: 'searchdeck', component: SearchDeckComponent, canActivate: [AuthGuard]},
  {path: 'deckbuilder', component: DeckBuilderComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
