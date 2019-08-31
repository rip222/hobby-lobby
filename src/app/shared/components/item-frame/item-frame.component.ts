import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColItem } from '../../models/collection-item-models/col-item.model';

@Component({
  selector: 'item-frame',
  templateUrl: './item-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class ItemFrameComponent implements OnInit {
  @Input() item: ColItem;
  optionalData: any;
  constructor() {
  }

  ngOnInit() {
    if (this.item) {
      const {
        id,
        collection,
        created,
        createdBy,
        modified,
        title,
        description,
        shape,
        size,
        themes,
        photo,
        photoFile,
        photoPreview,
        contributors,
        ...rest
      } = this.item;
      this.optionalData = rest;
    }
  }
}
