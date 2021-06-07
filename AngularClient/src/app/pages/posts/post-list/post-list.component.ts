import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Post } from 'src/app/_interfaces/posts/Post';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { PostService } from 'src/app/pages/posts/post.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public isUserAuthenticated: boolean;
  constructor(
    private dataService: PostService,
    public dialog: MatDialog,
    public _authService: AuthenticationService) {
    this.isUserAuthenticated = this._authService.isUserAuthenticated();
  }

  displayedColumns = ['date_posted', 'title', 'category'];
  dataSource = new PostDataSource(this.dataService);

  ngOnInit() {
    if (this.isUserAuthenticated)
      this.displayedColumns.push('delete')
    else {
      const deteleIndex = this.displayedColumns.indexOf('delete')
      if (deteleIndex != -1) {
        this.displayedColumns.splice(deteleIndex, 1)
      }
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  deletePost(id) {
    if (this.isUserAuthenticated) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('Login in Before');
    }
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: PostService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }


}
