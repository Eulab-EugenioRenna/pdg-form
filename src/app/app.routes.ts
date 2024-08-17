import { FormComponent } from './form/form.component';
import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { IscrizioneComponent } from './iscrizione/iscrizione.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: 'home', component: FormComponent },
  { path: 'iscrizione', component: IscrizioneComponent },
  { path: 'lista', component: ListComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    component: ErrorComponent,
  },
];
