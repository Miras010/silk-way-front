import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {ConfirmationService} from "primeng/api";
import {UserModule} from "../user/user.module";

@NgModule({
  imports: [
    MainRoutingModule,
    UserModule,
  ],
    exports: [

    ],
  declarations: [
    MainComponent,
  ],
  providers: [ConfirmationService],
})

export class MainModule {
}
