import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {
  logoPath = `assets/${environment.logoUrl}`

  constructor() { }

  ngOnInit() {
  }

}
