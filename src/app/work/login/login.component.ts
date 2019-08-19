import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() allowedToPass = new EventEmitter<boolean>();
  inputValue = '';

  ngOnInit(): void {
    if(localStorage.getItem('allowedToPass') == 'yep') {
      this.allowedToPass.emit(true);
    }
  }

  validate() {
    if (this.inputValue === CryptoJS.AES.decrypt('U2FsdGVkX1+cKbMyyvelOiyqyJxVee3X68kWkqiQvf8=', 'protection against fools. please do not corrupt data').toString(CryptoJS.enc.Utf8)) {
      localStorage.setItem('allowedToPass', 'yep');
      this.allowedToPass.emit(true);
    }
    this.inputValue = '';
  }
}
