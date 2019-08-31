import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private alerts: AlertsService,
    private seo: SeoService) {
      seo.updateTitle('Register');
    }

  ngOnInit() {
  }

  register(event: any) {
    const {name, email, password} = event;
    this.auth.register(email, password, name)
      .then(_ => {
        this.alerts.alert('Congratulations! You are registered!', 'Hide');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.alerts.alert(error.message, 'Hide');
        } else if (error.code === 'auth/invalid-email') {
          this.alerts.alert('Invalid Email...', 'Hide');
        } else if (error.code === 'auth/invalid-password') {
          this.alerts.alert('Password should be at least 6 characters long!', 'Hide');
        }
      });
  }
}
