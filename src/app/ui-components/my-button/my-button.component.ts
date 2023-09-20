import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss'],
})
export class MyButtonComponent {

  public buttonText = '';

  @Input()
  set text(name: string) {
    this.buttonText = name;
  }
  get name(): string {
    return this.buttonText;
  }

  @Input() color: string = '0068B4';
  @Input() type: string = 'button';
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

  constructor() {}

  onClick() {
    this.btnClick.emit();
  }
}





