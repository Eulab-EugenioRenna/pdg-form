import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'summercampgela',
        appId: '1:188215617075:web:968427c8a4fabefd4f6546',
        storageBucket: 'summercampgela.appspot.com',
        apiKey: 'AIzaSyDtCgtKLkkM3AEcfT4QVXvoCjpDC99xN2Y',
        authDomain: 'summercampgela.firebaseapp.com',
        messagingSenderId: '188215617075',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
