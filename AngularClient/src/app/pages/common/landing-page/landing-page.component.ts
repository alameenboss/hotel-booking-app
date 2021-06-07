import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { AppService } from 'src/app/shared/services/app.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  cards = [];
  cardsForHandset = [];
  cardsForWeb = [];

  isHandset: boolean = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService: AppService,
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();
    });

    this.appService.getDeals().subscribe(
      response => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
      },
      error => {
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
  }

  loadCards() {
    this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
  }

  getImage(imageName: string): string {
    //const url = 'http://localhost:3000/images/'+ imageName + '.jpg';
    const url = 'https://source.unsplash.com/random/300x300';
    return 'url(' +  url + ')';
  }

}
