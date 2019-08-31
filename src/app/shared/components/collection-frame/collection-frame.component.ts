import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../../models/collection.model';

@Component({
  selector: 'collection-frame',
  templateUrl: './collection-frame.component.html',
  styleUrls: ['./collection-frame.component.sass']
})
export class CollectionFrameComponent implements OnInit {
  @Input() col: Collection;
  constructor() { }

  ngOnInit() {
  }

}
