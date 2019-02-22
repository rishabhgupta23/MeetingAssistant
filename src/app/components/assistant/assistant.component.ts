import { Component, OnInit } from '@angular/core';
import { AssistantRequest } from 'src/app/models/request';
import { RestClientService } from 'src/app/service/rest-client.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit {

  request = new AssistantRequest();
  rooms: string[] = ['Leaf', 'Maxima', 'Ultima', 'Skyline' ];
  choice: string;
  constructor(private service: RestClientService, public dialog: MatDialog) { }

  ngOnInit() {
    this.request.room_name = 'NOT_SELECTED';
  }

  speakVoice() {
    this.speak('Hello Rishabh. Welcome to the meeting.');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.choice = result;
      console.log(this.choice);
    });
  }



 speak(text) {
    const u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
    speechSynthesis.speak(u);
}

startMeeting(request, operation) {
  request.operation = operation;
  this.openDialog();
  // this.service.startMeeting(request)
  // .subscribe(response => {
  //   console.log(response);
  // }, error =>  console.log(error)); // error path
}

}
