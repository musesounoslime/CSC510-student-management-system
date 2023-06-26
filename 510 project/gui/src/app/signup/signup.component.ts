import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private api: HttpClientService, private router: Router) { }



  ngOnInit(): void {
  }
  login() {
    this.router.navigate(['/login']);
  }
  async signup() {
    if (this.password !== this.confirmPassword) {
      alert('Password input is inconsistent!')
      return;
    }
    if (this.password.length < 6) {
      alert('The password must be at least 6 digits long!')
      return;
    }
    try {
      const result: any = await this.api.signup({ userName: this.username, password: this.password });
      result.subscribe((res: any) => {
        alert('success !')
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
      })
    } catch (e) {
      console.log(e);
    }
  }
}
