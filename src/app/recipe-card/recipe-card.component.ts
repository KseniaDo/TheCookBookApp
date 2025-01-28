import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CardInformation } from './cardinformation';
import { EdgeConfigValue} from '@vercel/edge-config';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
// import { EventEmitter } from 'stream';

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
export class RecipeCardComponent implements OnInit{
    @Output() onDeleteSelect: EventEmitter<any> = new EventEmitter();
    deleteCheck: string = 'false';
    constructor(public dialog: MatDialog) {}
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogDeleteAccept, {
            data: {deleteCheck: this.deleteCheck},
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.deleteCheck = result;
            console.log(this.deleteCheck);
            console.log(this.cardData.id);
            this.onDeleteSelect.emit(this.cardData.id);
        });
    }

    @Input() cardData!: CardInformation;
    ngOnInit(): void {
        
    }
}

@Component({
    selector: 'dialog-delete-accept',
    templateUrl: 'dialog-delete-accept.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
  })
export class DialogDeleteAccept {
    deleteButton: string = 'true';
    constructor(public dialogRef: MatDialogRef<DialogDeleteAccept>) {}
}