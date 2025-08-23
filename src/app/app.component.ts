import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentUrl = '';

  constructor(private router: Router){
     this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  isDashboardRoute() {
    return this.currentUrl.startsWith('/dashboard');
  }
}
