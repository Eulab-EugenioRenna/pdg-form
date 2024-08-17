import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private emailUrl = 'https://mail.eulab-dash.it/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(user: Partial<User>) {
    const data = {
      ...user,
    };
    return this.http.post(this.emailUrl, data, { responseType: 'text' });
  }
}
