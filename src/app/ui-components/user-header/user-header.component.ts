import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment'
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  logoPath = `assets/${environment.logoUrl}`
  // @ts-ignore
  userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('userInfo', this.userInfo.username)
  }

  isAuthorized () {
    return this.authService.isAuthorized()
  }
}
