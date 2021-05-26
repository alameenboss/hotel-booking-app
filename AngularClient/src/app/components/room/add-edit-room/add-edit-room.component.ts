import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css']
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
  message;
  isEditMode: boolean = false;
  constructor(
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoomDetails();
  }

  getRoomDetails() {
    this.progressBar.startLoading();
    this.roomId = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.roomId > 0) {
      this.title = `Edit Room - ${this.roomId}`;
      this.roomService.getById(this.roomId).subscribe(data => {
        this.progressBar.setSuccess();
        if (data != null) {
          this.isEditMode = true;
          this.room = data;
          console.log(data);
        }
        this.progressBar.completeLoading();
      },
        error => {
          console.log(error);
        });
    }
  }

  createRoom(): void {
    const data = {
      name: this.room.name,
      type: this.room.type
    };
    this.progressBar.startLoading();
    this.roomService.createNew(data)
      .subscribe(
        response => {
          this.progressBar.setSuccess();
          console.log(response);
          this.message = 'Room created successfully!';
          this.submitted = true;
          this.alertService.success(`Room created successfully!`);
          this.progressBar.completeLoading();
        },
        error => {
          console.log(error);
          this.progressBar.setError();
          this.alertService.danger('Error Occured!');
          this.progressBar.completeLoading();
        });
  }

  updateRoom(): void {
    this.progressBar.startLoading();
    this.roomService.update(this.room.id, this.room)
      .subscribe(
        response => {
          this.progressBar.setSuccess();
          this.submitted = true;
          console.log(response);
          this.message = 'The room was updated!';
          this.alertService.success(`Room created successfully!`);
          this.progressBar.completeLoading();
        },
        error => {
          console.log(error);
          this.progressBar.setError();
          this.alertService.danger('Error Occured!');
          this.progressBar.completeLoading();
        });
  }
  deleteRoom(): void {
    this.progressBar.startLoading();
    this.roomService.delete(this.room.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl(`room-list`);
        },
        error => {
          console.log(error);
          this.progressBar.setError();
          this.alertService.danger('Error Occured!');
          this.progressBar.completeLoading();
        });
  }
  roomList() {
    this.router.navigateByUrl(`room-list`);
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
