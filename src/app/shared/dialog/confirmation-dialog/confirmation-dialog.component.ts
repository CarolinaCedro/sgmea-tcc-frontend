import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ButtonComponent
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string, action: string, closeLabel: string }
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ action: this.data.action });
  }
}
