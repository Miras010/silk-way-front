import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from '../../models/user'
import {Table} from "primeng/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminUsersService} from "../../services/admin/admin-users.service";
import {AdminRequestsService} from "../../services/admin/admin-requests.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
// @ts-ignore
import { getFormattedDate } from '../../functionServices/dataService';
import {PdfGeneratorService} from "../../services/pdf.service";


@Component({
  selector: 'app-delivery-requests',
  templateUrl: './deliveryRequests.component.html',
  styleUrls: ['./deliveryRequests.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService,ConfirmationService]
})
export class DeliveryRequestsComponent implements OnInit {

  defaultParams = {
    page: 1,
    rows: 10,
    status: 'NEW'
  }
  data = []
  totalRecords: number = 0
  loading: boolean = false
  private subscription: Subscription;
  selected = []
  requestDetailDialog: boolean = false
  currentRequest: any
  currentStatus: string = 'NEW'
  menu: MenuItem[]

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private activateRoute: ActivatedRoute,
              private pdfGeneratorService: PdfGeneratorService,
              private adminRequestsService: AdminRequestsService) {
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.defaultParams.status = params['status'].toUpperCase()
      this.currentStatus = params['status'].toUpperCase()
      this.getAllRequests(this.defaultParams)
    });

    this.menu = [
      {label: 'Новые заявки', icon: 'pi pi-fw pi-home', routerLink: '/admin/delivery/new'},
      {label: 'В процессе', icon: 'pi pi-fw pi-check', routerLink: '/admin/delivery/process'},
      {label: 'Отменненные', icon: 'pi pi-fw pi-times', routerLink: '/admin/delivery/canceled'},
      {label: 'Завершенные', icon: 'pi pi-fw pi-send', routerLink: '/admin/delivery/completed'},
    ];
  }

  getAllRequests(params: any) {
    this.adminRequestsService.getAllRequests(params).toPromise()
      .then(resp => {
        // @ts-ignore
        this.data = resp.resp.map(item => {
          item.createdDate = this.getFormattedDate(item.createdDate)
          item.fio = item.userId ? item.userId.name + ' ' + item.userId.surname : item.clientName
          item.usersCode = item.userId ? item.userId.username : ''
          item.userPhoneNumber = item.userId ? item.userId.phoneNumber : ''
          return item
        })
        this.totalRecords = resp.totalCount
      }).catch(err => {
      console.log('err', err)
    })
  }

  generatePDF() {
    const data = this.selected.map((item) => {
      // @ts-ignore
      item.fullAdress = item.address + ', кв-' + item.apartment + ', под-' + item.entrance + ', этаж-' +  item.floor
      return item
    })
    this.pdfGeneratorService.generatePDF(data);
  }

  updateRequestStatus (request: any, status: string) {
    this.loading = true
    const data = {
      _id: request._id,
      status
    }
    this.adminRequestsService.updateRequest(data).toPromise().then(() => {
      this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Статус заявки изменен', life: 3000});
    }).catch(err => {
      this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось изменить статус заявки' + err.error.message, life: 3000});
    }).finally(() => {
      this.getAllRequests(this.defaultParams)
      this.loading = false
    })
  }

  updateRequests (status: string) {
    if (this.selected.length > 0) {
      let promises: Promise<any>[] = []
      this.selected.forEach(request => {
        const data = {
          _id: request['_id'],
          status
        }
        promises.push(this.adminRequestsService.updateRequest(data).toPromise())
      })
      Promise.all(promises).then(() => {
        this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Статусы заявок изменены', life: 3000});
      }).catch(err => {
        this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось изменить статус заявкок' + err.error.message, life: 3000});
      }).finally(() => {
        this.getAllRequests(this.defaultParams)
        this.selected = []
        this.loading = false
      })
    }
  }

  getStatus (status: string) {
    let statusTitle = ''
    switch (status) {
      case 'NEW':
        statusTitle = 'Новые заявки'
        break
      case 'PROCESS':
        statusTitle = 'Заявки в процессе'
        break
      case 'CANCELED':
        statusTitle = 'Отклоненные заявки'
        break
      case 'COMPLETED':
        statusTitle = 'Завершенные заявки'
        break
    }
    return statusTitle
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

  rowClick (req: any) {
    this.currentRequest = req
    this.requestDetailDialog = true
  }

  getFormattedDate (date: any) {
    return getFormattedDate(date)
  }

  loadData(event: LazyLoadEvent) {
    this.loading = false
    let page = 1
    const { rows, first} = event
    // @ts-ignore
    if (first > 0) {
      // @ts-ignore
      page = (first / rows) + 1
    }
    this.getAllRequests({ rows, page, status: this.currentStatus })
  }

}
