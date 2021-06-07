import { Component, OnInit } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: "app-loader",
  template: `
    <div *ngIf="loaderService.isLoading | async" class="loader-container">
    <mat-spinner style="top: 50%; left: 50%;"></mat-spinner>
    </div>
`,
  styles: [
    `
      .loader-container {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #000000;
        opacity: 0.4;
        z-index: 99;
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  constructor(public loaderService: LoaderService) { }

  ngOnInit() { }
}
