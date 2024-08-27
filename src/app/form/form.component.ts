import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { MailService } from '../mail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(
    private fs: FirestoreService,
    private router: Router,
    private mail: MailService
  ) {}
  formSummerCamp = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    eta: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(29),
    ]),
    tel1: new FormControl('', [Validators.required]),
    tel2: new FormControl('', []),
    sesso: new FormControl('', [Validators.required]),
    prenotazioni: new FormControl(1, [Validators.required]),
    materassino: new FormControl('', [Validators.required]),
    allergie: new FormControl('', []),
    altro: new FormControl('', []),
    media: new FormControl('', []),
    privacy: new FormControl('', [Validators.requiredTrue]),
    bonifico: new FormControl('', [Validators.required]),
  });

  
  base64?: string;

  toBase64(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.base64 = reader.result as string;
    };
  }

  async submit() {
    console.log(this.formSummerCamp.value);
    const user = this.formSummerCamp.value as Partial<User>;
    if (!user) {
      return;
    }
    try {
      user.bonifico = this.base64;
      await this.fs.createUser(user);
      this.mail.sendEmail(user).subscribe(
        (response) => {
          console.log('Email sent successfully!');
        },
        (error) => {
          console.log('Error sending email:', error);
        }
      );
      this.reset();
      this.router.navigate(['/iscrizione']);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  reset() {
    this.formSummerCamp.setValue({
      nome: '',
      cognome: '',
      email: '',
      eta: '',
      tel1: '',
      tel2: '',
      sesso: '',
      prenotazioni: 1,
      materassino: '',
      allergie: '',
      altro: '',
      media: '',
      privacy: '',
      bonifico: '',
    });
  }
}
