import { Component } from '@angular/core';

@Component({
    selector: 'app-partner',
    template: `
      <app-user-header></app-user-header>
      <hr>
      <router-outlet></router-outlet>
      <app-user-footer></app-user-footer>
      <app-new-user-header></app-new-user-header>
    `,
})

export class UserComponent {

    constructor() {
    }
}
