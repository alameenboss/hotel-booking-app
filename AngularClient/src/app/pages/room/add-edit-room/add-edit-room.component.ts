import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { RoomService } from 'src/app/pages/room/room.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.scss']
})
export class AddEditRoomComponent implements OnInit {
  title = "Add Room";
  room = {
    id: 0,
    name: '',
    type: ''
  };
  submitted = false;
  roomId: number = 0;
  isEditMode: boolean = false;
  constructor(

    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoomDetails();
  }

  getRoomDetails() {

    this.roomId = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.roomId > 0) {
      this.title = `Edit Room - ${this.roomId}`;
      this.roomService.getById(this.roomId).subscribe(data => {

        if (data != null) {
          this.isEditMode = true;
          this.room = data;
        }

      },
        error => {
        });
    }
  }

  createRoom(): void {
    const data = {
      name: this.room.name,
      type: this.room.type
    };

    this.roomService.createNew(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.notifierService.showNotification(`Room created successfully!`, 'Ok', "success");
        },
        error => {
          this.notifierService.showNotification('Error Occured!', 'Ok', "error");
        });
  }

  updateRoom(): void {

    this.roomService.update(this.room.id, this.room)
      .subscribe(
        response => {
          this.submitted = true;
          this.notifierService.showNotification(`The room was updated!`, 'Ok', "success");
        },
        error => {
          this.notifierService.showNotification('Error Occured!', 'Ok', "error");
        });
  }
  deleteRoom(): void {

    this.roomService.delete(this.room.id)
      .subscribe(
        response => {
          this.router.navigateByUrl(`room/room-list`);
        },
        error => {
          this.notifierService.showNotification('Error Occured!', 'Ok', "error");
        });
  }
  roomList() {
    this.router.navigateByUrl(`room/room-list`);
  }

  newRoom(): void {
    this.submitted = false;
    this.room = {
      id: 0,
      name: '',
      type: ''
    };
  }
}
