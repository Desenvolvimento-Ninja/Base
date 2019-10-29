import { Component, OnInit } from '@angular/core';
import Me from '../../../classes/Me';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private login: string;
  private senha: string;

  constructor(private me: Me) { }

  ngOnInit() {
  }

  async send(){
    this.me.login(this.login, this.senha);
  }

}
