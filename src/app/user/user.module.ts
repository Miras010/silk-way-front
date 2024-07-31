import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from "./user.component";
import { TracksComponent } from './tracks/tracks.component';
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserHeaderComponent} from "../ui-components/user-header/user-header.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {KeyValuePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import {DialogComponent} from "./dialog/dialog.component";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService} from "primeng/api";
import {CardComponent} from "./cardInfo/card.component";
import {HomeComponent} from "./home/home.component";
import {ReceiptsComponent} from "./receipts/receipts.component";
import {ProfileComponent} from "./profile/profile.component";
import {InputMaskModule} from "primeng/inputmask";
import {NewUserHeaderComponent} from "../ui-components/new-user-header/new-user-header.component";
import {TabViewModule} from "primeng/tabview";
import {MyButtonComponent} from "../ui-components/my-button/my-button.component";
import {DividerModule} from "primeng/divider";
import {CalculatorComponent} from "./calculator/calculator.component";
import {UserFooterComponent} from "../ui-components/user-footer/user-footer.component";
import {CheckboxModule} from "primeng/checkbox";
import {AddressComponent} from "./address/address.component";
import {UserTrackComponent} from "./tracks/userTrack/user-track.component";
import {DropdownModule} from "primeng/dropdown";
import {AutoTrackingComponent} from "./auto-tracking/auto-tracking.component";
import {RequestsComponent} from "./requests/requests.component";

@NgModule({
  imports: [
    UserRoutingModule,
    CardModule,
    FormsModule,
    ProgressSpinnerModule,
    NgIf,
    AccordionModule,
    NgForOf,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    DialogModule,
    RippleModule,
    NgStyle,
    InputMaskModule,
    TabViewModule,
    DividerModule,
    CheckboxModule,
    DropdownModule,
    KeyValuePipe
  ],
    exports: [
        NewUserHeaderComponent,
        UserHeaderComponent
    ],
  declarations: [
    UserComponent,
    TracksComponent,
    HomeComponent,
    UserHeaderComponent,
    NewUserHeaderComponent,
    DialogComponent,
    CardComponent,
    ReceiptsComponent,
    ProfileComponent,
    MyButtonComponent,
    CalculatorComponent,
    UserFooterComponent,
    AddressComponent,
    UserTrackComponent,
    AutoTrackingComponent,
    RequestsComponent
  ],
  providers: [ConfirmationService],
})

export class UserModule {
}
