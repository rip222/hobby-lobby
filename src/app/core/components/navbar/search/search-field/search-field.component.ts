import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent {
  @Output() keywordSubmitted = new EventEmitter<string>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]],
    });
   }

  onSubmit() {
    if (this.form.valid) {
      this.keywordSubmitted.emit(this.form.value['search']);
    }
  }

}
