import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() item: any;
  @Output() openVideoDetail = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  openDetail(event) {
    this.openVideoDetail.emit(event);
  }
}
