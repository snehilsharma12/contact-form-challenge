import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppComponent {
  title = 'contact-form';

  contactForm: FormGroup;

  showToast = false;

  constructor(private fbuild: FormBuilder) {
    this.contactForm = this.fbuild.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],
      ],

      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],
      ],

      email: ['', [Validators.required, Validators.email]],

      queryType: ['', Validators.required],

      message: ['', Validators.required],

      consent: ['', Validators.required],
    });
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      this.showToast = true;
      this.contactForm.reset();
      this.submitted = false;

      setTimeout(() => {
        this.showToast = false;
        this.contactForm.reset();
      }, 4000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
