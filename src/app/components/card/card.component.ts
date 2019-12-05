import { Component, OnInit } from '@angular/core';
import {Card} from '../../models';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private sub: Subscription;
  private card: Card = new Card();
  private cardId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.cardId = params.card || 'null';

      });
    if (this.cardId === 'null') {
      this.router.navigate(['']);
    } else {
      this.cardService.getCardByName(this.cardId)
        .subscribe(
          (data: any) => {
            if (data == null) {
              this.router.navigate(['/home']);
            }
            this.card = data;
            console.log(this.card);
          }
        );
    }
  }


}
