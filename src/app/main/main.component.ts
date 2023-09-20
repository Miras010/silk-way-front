import { Component } from '@angular/core';

@Component({
    selector: 'app-partner',
    template: `
      <app-user-header></app-user-header>
      <hr>
      <router-outlet></router-outlet>
    `,
})

export class MainComponent {

    constructor() {
    }
}
