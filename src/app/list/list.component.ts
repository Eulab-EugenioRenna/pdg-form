import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private fs: FirestoreService) {}
  iscrizioni$ = this.fs.getUser$();

  open(url: string) {
    const newTab = window.open(url, '_blank');
    newTab?.document.write(
      `<div style="max-width:100vw; max-height:100%; min-height:100vh; display: flex; justify-content: center; background:#b2b2b246;padding:30px; margin:0; overflow:auto;">
      <img src="${url}" style="width:80%; height:auto; object-fit:contain;"/>
      </div>`
    );
  }
}
