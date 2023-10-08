import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms";
import {CurrencyService} from "../../services/currency.service";
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
    price: new FormControl(4.8),
    priceText: new FormControl('4.8$'),
    course: new FormControl(477),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })
  form3: FormGroup = new FormGroup({
    price: new FormControl(4.6),
    priceText: new FormControl('4.6$'),
    course: new FormControl(477),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })

  constructor(private currencyService: CurrencyService) {

  }

  ngOnInit() {
    this.getActuallyCurrency()
  }

  getActuallyCurrency () {
    this.currencyService.getLatestValue().toPromise().then((resp) => {
      if (resp.length > 0) {
        const latestValue = resp[0].value
        this.form1.patchValue({
          course: latestValue
        })
        this.form2.patchValue({
          course: latestValue
        })
        this.form3.patchValue({
          course: latestValue
        })
      }
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

  weightChange3 () {
    const formData = this.form3.getRawValue()
    const res = Math.round(formData.weight * formData.price * formData.course)
    this.form3.patchValue({
      sum: res
    })
  }

}





