import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CardInformation } from './cardinformation';
import { EdgeConfigValue } from '@vercel/edge-config';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogDeleteComponent } from './dialog-delete.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class RecipeCardComponent {
  @Input() cardData!: CardInformation;
  deleteCheck: string = 'false';
  @Output() onDeleteSelect: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { deleteCheck: this.deleteCheck },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteCheck = result;
      if (result !== '') {
        this.onDeleteSelect.emit(this.cardData.id);
      }
    });
  }
}