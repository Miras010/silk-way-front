import {Component, OnInit, ViewEncapsulation} from '@angular/core'
// @ts-ignore
import {getFormattedDate} from '../../functionServices/dataService'
import {RequestService} from "../../services/requests.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-receipts',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestsComponent implements OnInit {

  data: any = []
  isLoading: boolean = false
  requestDialog: boolean = false
  requestForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    clientCode: new FormControl('', Validators.required),
    apartment: new FormControl(''),
    floor: new FormControl(''),
    entrance: new FormControl(''),
    phoneNumber: new FormControl(''),
    description: new FormControl('')
  })

  constructor(private requestService: RequestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getReceipts()
  }

  cancelRequest (item: any) {
    this.confirmationService.confirm({
      message: 'Вы уверены что хотите отменить заявку?',
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true
        const data = {
          _id: item._id,
          status: 'CANCELED'
        }
        this.requestService.updateRequest(data).toPromise().then(() => {
          this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Статус заявки изменен', life: 3000});
        }).catch(err => {
          this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось изменить статус заявки' + err.error.message, life: 3000});
        }).finally(() => {
          this.getReceipts()
          this.isLoading = false
        })
      }
    });
  }

  createRequest () {
    if (this.isAuthorized()) {
      this.requestDialog = true
    } else {
      this.messageService.add({severity:'info', summary: 'Ошибка авторизации', detail: 'Необходимо авторизоваться', life: 3000});
    }
  }

  onSubmit () {
    if (this.requestForm.valid) {
      const data = this.requestForm.getRawValue()
      this.requestService.createRequest(data).toPromise().then(() => {
        this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Заявка успешно создана', life: 3000});
      }).catch((err) => {
        this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось создать заявку' + err.error.message, life: 3000});
        console.log(err)
      }).finally(() => {
        this.getReceipts()
        this.requestDialog = false
        this.requestForm.reset()
      })
    } else {
      this.messageService.add({severity:'info', summary: 'Ошибка', detail: 'Заполните обязательное поле', life: 3000});
    }
  }

  getReceipts () {
    this.isLoading = true
    this.requestService.getUsersRequest().toPromise().then((resp) => {
        // @ts-ignore
        this.data = resp.map(item => {
          item.createdDate = getFormattedDate(item.createdDate)
          return item
        })
      }).catch((err) => {
      console.log('er', err)
    }).finally(() => {
      this.isLoading = false
    })
  }

  isAuthorized () {
    return this.authService.isAuthorized()
  }

  getBackground (item: any) {
    const status = item.status
    if (status === 'NEW') {
      return {'background': '#efefef'}
    } else if (status === 'PROCESS') {
      return {'background': '#bfe3ff'}
    } else if (status === 'CANCELED') {
      return {'background': '#ffe0e0'}
    } else if (status === 'COMPLETED') {
      return {'background': '#caffd1'}
    }
    return {'background': '#7cc8ff'}
  }


  getStatusTitle (status: string) {
    let statusTitle = ''
    switch (status) {
      case 'NEW':
        statusTitle = 'Новая'
        break
      case 'PROCESS':
        statusTitle = 'В процессе'
        break
      case 'CANCELED':
        statusTitle = 'Отклонен'
        break
      case 'COMPLETED':
        statusTitle = 'Завершен'
        break
    }
    return statusTitle
  }
}





