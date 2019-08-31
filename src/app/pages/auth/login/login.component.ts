import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private alerts: AlertsService,
    private seo: SeoService) {
      seo.updateTitle('Login');
    }

  ngOnInit() {
    // console.log(this.auth.authenticated)
  }

  login(event: any) {
    const {email, password} = event;
    this.auth.login(email, password)
    .then(_ => {
      this.alerts.alert('Login is successful!', 'Hide');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.alerts.alert('User not found', 'Hide');
      } else {
        this.alerts.alert('Password is invalid', 'Hide');
      }
    });
  }

}
