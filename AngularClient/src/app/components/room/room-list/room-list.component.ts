import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { RoomService } from 'src/app/shared/services/room.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  constructor( 
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private roomService :RoomService) { }

  roomList=[];

  ngOnInit() {
    this.getRoomList()
  }

  getRoomList(){
    this.progressBar.startLoading();
    this.roomService.getAll().subscribe(res=>{
      this.progressBar.setSuccess(); 
      if(res != null)
      this.roomList = res as []
      this.alertService.success(`${this.roomList.length}('s) Rooms Found!`);
      this.progressBar.completeLoading();
    },
    error => {
      console.log(error);
      this.progressBar.setError();
      this.alertService.danger('Error Occured!');
      this.progressBar.completeLoading();
    })
  }

  editRoom(roomnumber){
    this.router.navigateByUrl('edit-room/'+roomnumber)
  }

  addRoom(){
    this.router.navigateByUrl(`add-room`);
  }

}
