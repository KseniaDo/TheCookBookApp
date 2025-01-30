import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'rc-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.css'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
  })
export class DialogDeleteComponent {
    deleteButton: string = 'true';
    constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {} 
    onNoClick() {
        this.dialogRef.close();
    }
}