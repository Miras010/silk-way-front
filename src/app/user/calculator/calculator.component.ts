import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms";
import {CurrencyService} from "../../services/currency";
// @ts-ignore
import {getDateDay} from '../../functionServices/dataService'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {

  isLoading: boolean = false
  form1: FormGroup = new FormGroup({
    price: new FormControl(5),
    priceText: new FormControl('5$'),
    course: new FormControl(477),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })
  form2: FormGroup = new FormGroup({
    price: new FormControl(4.7),
    priceText: new FormControl('4.7$'),
    course: new FormControl(477),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })

  constructor(private currencyService: CurrencyService) {

  }

  ngOnInit() {
    // this.getActuallyCurrencyRate()
  }

  getActuallyCurrencyRate () {
    const date = getDateDay(new Date())
    this.currencyService.getCurrencyRateByDate(date).toPromise().then((resp) => {
      console.log('resp', resp)
    })
  }

  weightChange () {
    const formData = this.form1.getRawValue()
    const res = Math.round(formData.weight * formData.price * formData.course)
    this.form1.patchValue({
      sum: res
    })
  }

  weightChange2 () {
    const formData = this.form2.getRawValue()
    const res = Math.round(formData.weight * formData.price * formData.course)
    this.form2.patchValue({
      sum: res
    })
  }

}





