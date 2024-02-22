import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {UsersTrack} from "../../../models/response/track-models";
// @ts-ignore
import {getFormattedDate} from '../../../functionServices/dataService'
import {User} from "../../../models/user";

@Component({
  selector: 'app-user-track',
  templateUrl: './user-track.component.html',
  styleUrls: ['./user-track.component.scss']
})
export class UserTrackComponent implements OnInit {

  @Input() item: UsersTrack;
  @Input() sortValue: any;
  @Output() deleteTrack = new EventEmitter<UsersTrack>();
  @Output() selectionChanged = new EventEmitter<boolean>()
  isSelected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getFormattedDate (date: Date) {
    return getFormattedDate(date).split(' ')[0]
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

  delete (item: any) {
    this.deleteTrack.emit(item)
  }

  toggleSelection() {
    if (!this.sortValue) {
      this.isSelected = !this.isSelected;
      this.selectionChanged.emit(this.isSelected);
    }
  }

  clearSelection () {
    this.isSelected = false
  }
}





