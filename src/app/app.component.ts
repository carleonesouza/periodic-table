import { Component, ViewChild, HostListener } from '@angular/core';
import { MatMenu, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('authMenu', { static: true})
  authMenu: MatMenu;

  @ViewChild('start', { static: true})
  start: MatSidenav;
  mobileMode = false;

  navItems = [
          { name: 'Inicío', route: '/' },
          { name: 'A Tabela', route: '/elemento'},
          { name: 'Conceitos', route: '/conceitos' },
          { name: 'Ajuda', route: '/ajuda' },
      ];

  constructor() {
    const deviceMobile = window.navigator.userAgent.toLowerCase().includes('mobi');
    if (deviceMobile) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }

  @HostListener('window:resize', ['$event'])
    mobileModeAction() {
      if (window.screen.width >= 351 && window.screen.width <= 768) {
        console.log(window.screen.width);
        this.mobileMode = true;
      } else {
        this.mobileMode = false;
      }
    }

}
