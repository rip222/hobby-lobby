import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Collection } from 'src/app/shared/models/collection.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @Input() collections: Collection[];
  @Output() itemClicked = new EventEmitter<string>();

  onClick(colId: string) {
    this.itemClicked.emit(colId);
  }

}
