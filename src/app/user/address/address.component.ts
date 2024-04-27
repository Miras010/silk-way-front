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
    this.clipboard.copy('努尔波+код\n' +
      '13078833342\n' +
      '广东省 佛山市 南海区\n' +
      '里水镇新联工业区工业大道东一路3号航达В01库区-努尔波+ код')
    this.messageService.add({
      severity: "success",
      summary: "Адрес скопирован!",
      // detail: "Вы успешно авторизовались!"
    });
  }

}





