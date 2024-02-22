import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core'
import {ConfirmationService, MessageService} from 'primeng/api'
import {TrackService} from "../../services/track.service"
import {UsersTrack } from '../../models/response/track-models'
// @ts-ignore
import {getFormattedDate} from '../../functionServices/dataService'
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Track} from '../../models/response/track-models'
import {CardComponent} from "../cardInfo/card.component";
import {UserTrackComponent} from "./userTrack/user-track.component";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, DialogService]
})
export class TracksComponent implements OnInit {
  totalTracks: number = 0
  data: Array<UsersTrack> = []
  sortedData: any
  dataAll: Array<UsersTrack> = []
  selectedTracks: UsersTrack[] = [];
  isLoading: boolean = false
  sortValue: any = ''
  sortOptions: any[] = [];
  // @ts-ignore
  userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  // @ts-ignore
  ref: DynamicDialogRef;
  @ViewChildren(UserTrackComponent) trackCardComponents: QueryList<UserTrackComponent>;


  constructor(private messageService: MessageService,
              private trackService: TrackService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getTracks()
    this.sortOptions = [
      {name: 'Получено на складе в Китае', code: 'receivedInChinaDate'},
      {name: 'Отправлено с Китая в Актобе', code: 'fromChinaToAktobe'},
      {name: 'Прошла границу', code: 'passedTheBorder'},
      {name: 'Получено на складе в Актобе', code: 'receivedInAktobeDate'},
      {name: 'Получено клиентом', code: 'receivedByClient'}
    ]
  }

  sortChange () {
    this.cancelSelect()
    // @ts-ignore
    // @ts-ignore
    this.data = this.dataAll.filter((track) => {
      if (track.track.receivedByClient) {
        return this.sortValue.code === 'receivedByClient'
      } else if (track.track.receivedInAktobeDate) {
        return this.sortValue.code === 'receivedInAktobeDate'
      } else if (track.track.passedTheBorder) {
        return this.sortValue.code === 'passedTheBorder'
      } else if (track.track.fromChinaToAktobe) {
        return this.sortValue.code === 'fromChinaToAktobe'
      } else if (track.track.receivedInChinaDate) {
        return this.sortValue.code === 'receivedInChinaDate'
      }
      return false
    }).sort((a: UsersTrack, b: UsersTrack) => {
      if (this.sortValue.code) {
        // @ts-ignore
        return new Date(b.track[this.sortValue.code]) - new Date(a.track[this.sortValue.code])
      }
      return 0
    })
    const res = {}
    this.data.forEach(item => {
      // @ts-ignore
      res[getFormattedDate(item.track[this.sortValue.code])] = []
    })
    this.data.forEach(item => {
      // @ts-ignore
      res[getFormattedDate(item.track[this.sortValue.code])].push(item)
    })
    this.sortedData = Object.values(res)
    console.log('s', this.sortedData)
  }

  getSelectDate (arr: any[]) {
    if (arr.length > 0) {
      return getFormattedDate(arr[0].track[this.sortValue.code]).split(' ')[0]
    } else {
      return ''
    }
  }

  deleteTracks () {
    this.confirmationService.confirm({
      message: 'Вы уверены что хотите удалить ' + this.selectedTracks.length + ' трек кодов ?',
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const promises: any[] = []
        this.selectedTracks.forEach(track => {
          promises.push(this.trackService.unfollowTrack(track._id).toPromise())
        })
          Promise.all(promises)
            .then(() => {
              this.selectedTracks = []
              this.messageService.add({
                severity: "success",
                summary: "Успешно",
                detail: "Трек номера успешно удалены!"
              });
              this.ref.close()
              this.getTracks()
            }).catch((err) => {
              this.messageService.add({
                severity: "info",
                summary: "Ошибка при удалении",
                detail: err.error.message
              });
              console.log('err', err)
            })
      }
    })
  }

  cancelSort () {
    this.sortValue = ''
    this.sortedData = ''
    this.data = [...this.dataAll]
  }

  cancelSelect () {
    this.selectedTracks = []
    this.trackCardComponents.forEach(component => component.clearSelection());
  }

  updateSelectedTracks(isSelected: boolean, track: UsersTrack) {
    if (isSelected) {
      this.selectedTracks.push(track);
    } else {
      const index = this.selectedTracks.indexOf(track);
      if (index !== -1) {
        this.selectedTracks.splice(index, 1);
      }
    }
    console.log('ss', this.selectedTracks)
  }


  getTracks () {
    this.isLoading = true
    this.trackService.getAllUsersTrack().subscribe(async (resp: any) => {
        this.data = resp.filter((item: any) => {
          return !!item.track;
        }).sort((a: UsersTrack, b: UsersTrack) => {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        })
      this.dataAll = [...this.data]
      this.totalTracks = this.data.length
      this.cancelSort()
      this.cancelSelect()
      },
      (error: any) => {
      console.log('error', error)
    },
      () => {
      this.isLoading = false
    })
  }

  getFormattedDate (date: Date) {
    return getFormattedDate(date).split(' ')[0]
  }

  deleteTrack (item: any) {
    this.confirmationService.confirm({
      message: 'Вы уверены что хотите удалить ' + item.track.trackNumber + '?',
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trackService.unfollowTrack(item._id).toPromise().then(() => {
          this.messageService.add({
            severity: "success",
            summary: "Успешно",
            detail: "Трек номер успешно удален!"
          });
          this.ref.close()
          this.getTracks()
        }).catch((err) => {
          this.messageService.add({
            severity: "info",
            summary: "Ошибка",
            detail: err.error.message
          });
          console.log('err', err)
        })
      }
    });
  }

  getBackground (item: any) {
    if (item.track.receivedByClient) {
      return {'background': 'orange'}
    } else if (item.track.receivedInAktobeDate) {
      return {'background': '#4be369'}
    } else if (item.track.passedTheBorder) {
      return {'background': '#3f7af1'}
    } else if (item.track.fromChinaToAktobe) {
      return {'background': '#7cc8ff'}
    } else if (item.track.receivedInChinaDate) {
      return {'background': '#ece942'}
    }
    return {'background': '#efefef'}
  }

  getTypeText(item: any) {
    if (item.track.receivedByClient) {
      const date = getFormattedDate(item.track.receivedInAktobeDate).split(' ')[0]
      return 'получено клиентом' + ' - ' + date
    } else if (item.track.receivedInAlmatyDate) {
      const date = getFormattedDate(item.track.receivedInAktobeDate).split(' ')[0]
      return 'в Алматы' + ' - ' + date
    } else if (item.track.fromChinaToAlmaty) {
      const date =  getFormattedDate(item.track.fromChinaToAktobe).split(' ')[0]
      return 'отправлено из Китая' + ' - ' + date
    } else if (item.track.receivedInChinaDate) {
      const date = getFormattedDate(item.track.receivedInChinaDate).split(' ')[0]
      return 'на складе в Китае' + ' - ' + date
    } else if (item.track.passedTheBorder) {
      const date = getFormattedDate(item.track.passedTheBorder).split(' ')[0]
      return 'прошла границу' + ' - ' + date
    }
    return 'добавлено'
  }

  cardClick(item: any) {
    this.ref = this.dialogService.open(CardComponent, {
      header: 'Детальная информация',
      width: '80%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      data: {item}
    });

    this.ref.onClose.subscribe(() =>{
      this.getTracks()
    });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Вы действительно хотите удалить трек номер?'});
  }

  openDialog () {
    this.ref = this.dialogService.open(DialogComponent, {
      header: 'Добавление трек номера',
      width: '90%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((data) =>{
      if (data) {
        this.isLoading = true
        this.trackService.addUsersTrack(data).subscribe(() => {
          this.messageService.add({
            severity: "success",
            summary: "Успешно",
            detail: "Трек номер успешно добавлен!"
          });
          this.getTracks()
        }, (err) => {
          this.messageService.add({
            severity: "info",
            summary: "Ошибка",
            detail: err.error.message
          });
          console.log('err', err)
          this.isLoading = false
        })
      }
    });
  }

}





