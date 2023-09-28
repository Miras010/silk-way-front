import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms";

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
    course: new FormControl(450),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })
  form2: FormGroup = new FormGroup({
    price: new FormControl(4.7),
    priceText: new FormControl('4.7$'),
    course: new FormControl(450),
    weight: new FormControl(null),
    sum: new FormControl(0)
  })

  constructor() { }

  ngOnInit() {
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





