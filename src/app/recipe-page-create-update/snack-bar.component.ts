import {Component, inject} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
    selector: 'rf-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.css'],
    standalone: true,
    imports: [MatSnackBarModule],
})
export class SnackBarComponent {
    snackBarRef = inject(MatSnackBarRef);
}