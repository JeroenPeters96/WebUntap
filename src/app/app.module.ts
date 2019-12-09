import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {DeckComponent} from './components/deck/deck.component';
import {CardComponent} from './components/card/card.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {RegisterComponent} from './components/register/register.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './guards';
import {CardService} from './services/card.service';
import {AuthenticationService} from './services/authentication.service';
import {AlertService} from './services/alert.service';
import {DeckService} from './services/deck.service';
import {AppRoutingModule} from './app-routing.module';
import { CardSearchComponent } from './components/card-search/card-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { MetaDecksComponent } from './components/meta-decks/meta-decks.component';
import { CollectionComponent } from './components/collection/collection.component';
import { SearchDeckComponent } from './components/search-deck/search-deck.component';
import { DeckBuilderComponent } from './components/deck-builder/deck-builder.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DeckComponent,
    CardComponent,
    SidenavComponent,
    RegisterComponent,
    CardSearchComponent,
    DeckCardComponent,
    MetaDecksComponent,
    CollectionComponent,
    SearchDeckComponent,
    DeckBuilderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
      AuthGuard,
      CardService,
      DeckService,
      AuthenticationService,
      AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
