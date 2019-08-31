import { Component, Input } from '@angular/core';

@Component({
  selector: 'collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.sass'],
})
export class CollectionItemComponent {
  @Input() item: any;
  @Input() highlighted = false;
  constructor() { }

}
