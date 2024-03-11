import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {Clipboard} from "@angular/cdk/clipboard";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {


  constructor(private clipboard: Clipboard,
              private messageService: MessageService,) {
  }

  ngOnInit() {
  }

  copyAddress () {
    this.clipboard.copy('8988-ваш код\n' +
      '13288822727 \n' +
      '广东省  广州市  白云区\n' +
      '西槎路明德街21号B108铺库房810-麦头8988-ваш код')
    this.messageService.add({
      severity: "success",
      summary: "Адрес скопирован!",
      // detail: "Вы успешно авторизовались!"
    });
  }

}





