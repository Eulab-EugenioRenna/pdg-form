import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  iscrizioni = collection(this.firestore, 'freedom');

  async createUser(user: Partial<User>) {
    const userRef = doc(this.iscrizioni, `${user.cognome} ${user.nome}`);
    // Controllo preliminare se il documento esiste
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log('Errore: Nome e Cognome già registrati. Riprova!');
      throw new Error('Errore: Nome e Cognome già registrati.');
    } else {
      const res = await setDoc(userRef, { ...user });
      console.log('Iscrizione registrata con successo:', res);
    }
  }

  async getUser() {
    const res = (await getDocs(query(this.iscrizioni))).docs.map((users) =>
      users.data()
    );
    console.log(res);
    return res;
  }

  getUser$() {
    return from(this.getUser());
  }
}
