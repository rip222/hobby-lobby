import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {
  url: string;
  @Output() formSubmitted = new EventEmitter();
  form = this.fb.group({
    name: ['', Validators.minLength(3)],
    email: ['', Validators.email],
    emailConfirm: ['', ],
    password: ['', Validators.minLength(6)]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }
  ngOnInit() {
    this.url = this.route.snapshot.url[0].path;
    if (this.url === 'register') {
      this.form.get('emailConfirm').setValidators(
        [Validators.required, Validators.email]);
    }
  }


  onSubmit() {
    if (this.form.valid) {
      const { email, password, name } = this.form.value;
      this.formSubmitted.emit({name, email, password});
    }
  }

}
