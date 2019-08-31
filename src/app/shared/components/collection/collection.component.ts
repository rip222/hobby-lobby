import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Collection } from 'src/app/shared/models/collection.model';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent {
  @Input() collection: Collection;

}
