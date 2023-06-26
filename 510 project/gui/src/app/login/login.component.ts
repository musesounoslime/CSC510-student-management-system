import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private api: HttpClientService, private router: Router) { }

  ngOnInit(): void {

  }

  async login() {
    try {
      const result: any = await this.api.login({ userName: this.username, password: this.password });
      result.subscribe((res: any) => {
        console.log(res.data);
        if (res.data.isAdmin) {
          localStorage.setItem('identity', 'admin');
          localStorage.setItem('token', res.data.token);
          window.location.replace('/common/add-events')
        } else {
          localStorage.setItem('identity', 'student');
          localStorage.setItem('token', res.data.token);
          window.location.replace('/common/personal-schedule');
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
