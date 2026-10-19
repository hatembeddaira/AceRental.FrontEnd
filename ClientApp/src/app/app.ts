import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    // GTM: dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).dataLayer.push({
          event: 'page_view',
          page_path: event.urlAfterRedirects
        });
      }
    });


  }
}
