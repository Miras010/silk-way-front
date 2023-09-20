import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {ConfirmationService, MessageService} from 'primeng/api'
import {TrackService} from "../../services/track.service"
// @ts-ignore
import {getFormattedDate} from '../../functionServices/dataService'
import {DialogService} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


function validateWhiteSpace(control: FormControl) {
  if (control.value.includes(' ')) {
    return {
      hasWhiteSpace: true
    }
  }
  return null
}


@Component({
  selector: 'app-tracks',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  loginForm: any;
  signupForm: any;
  isLoading: boolean = false;
  lastInputData: any

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, validateWhiteSpace]),
      password: new FormControl('', Validators.required)
    })

    this.getLastInputData()
  }

  getLastInputData() {
    const lastInputData = this.authService.getLastInputData()
    if (lastInputData) {
      this.lastInputData = lastInputData
      this.loginForm.patchValue({
        phoneNumber: lastInputData.lastPhoneNumber,
        password: lastInputData.lastPassword,
      })
    }
  }

  signin() {
    console.log('signin')
    if (this.loginForm.valid) {
      this.isLoading = true
      const symbols = ['+', '(', ')', ' ', '-']
      symbols.forEach(symbol => {
        this.loginForm.value.phoneNumber = this.loginForm.value.phoneNumber.replaceAll(symbol, '')
      })
      this.authService.loginByPhone(this.loginForm.value)
        .toPromise()
        .then(res => {
          this.messageService.add({
            severity: "success",
            summary: "Успешно",
            detail: "Вы успешно авторизовались!"
          });
          this.authService.authorize(res, {phoneNumber: this.loginForm.value.phoneNumber, password: this.loginForm.value.password})
        }).catch((err) => {
        console.log(err);
        this.messageService.add({severity:'error', summary: 'Ошибка', detail: err.error.message, life: 3000});
      }).finally(() => {
        this.isLoading = false
      })
    } else {
      this.messageService.add({severity:'info', summary:'Info Message', detail:'Не все поля заполнены!'})
    }
  }
  register() {
    console.log('register')
    if (this.signupForm.valid) {
      const symbols = ['+', '(', ')', ' ', '-']
      symbols.forEach(symbol => {
        this.signupForm.value.phoneNumber = this.signupForm.value.phoneNumber.replaceAll(symbol, '')
      })
      this.isLoading = true
      this.authService.register(this.signupForm.value).toPromise()
        .then(() => {
          this.messageService.add({
            severity: "success",
            summary: "Успешно",
            detail: "Пользователь успешно зарегистрирован!"
          });
          // setTimeout(() => {
          //   this.router.navigate(['login'])
          // }, 1000)
        }).catch((e) => {
        this.messageService.add({
          severity: "info",
          summary: "Ошибка регистрации",
          detail: e.error.message
        })
      }).finally(() => {
        this.isLoading = false
      })
    } else {
      this.messageService.add({
        severity: "info",
        summary: "Не все поля заполнены",
        detail: "Заполните все поля!"
      });
    }
  }

  isAuthorized () {
    return this.authService.isAuthorized()
  }


}





