import { Component,  Inject,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnDestroy {
  owners:any;
  private ownersSubscription: Subscription;

  constructor(private service:AuthService,public dialog: MatDialog){
    this.ownersSubscription = this.service.getApprovedStadeOwners().subscribe((data)=>{
      this.owners=data
    })
  }
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.ownersSubscription) {
      this.ownersSubscription.unsubscribe();
    }
  }
  openDialog(id:any,i:any){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {i,id,owners:this.owners},
    });
  }
  
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-elements.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [MatButtonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:any,i:any){
    this.service.refuseRegistration(id).subscribe((res)=>{
      console.log(res);
      this.data.owners.splice(i,1);
      this.dialogRef.close();
    })
  }
}