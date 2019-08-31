import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';

import { ItemToFormService } from 'src/app/services/item-to-form.service';

import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';
import { User } from 'src/app/shared/models/user.model';
import { Collection } from 'src/app/shared/models/collection.model';
import { UserMin, CollectionMin } from 'src/app/shared/models/min.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.sass']
})
export class ItemEditFormComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Input() collection: Collection;
  @Input() profile: User;
  @Output() itemUpdated = new EventEmitter<{user: User, item: ColItem}>();
  @Output() itemCreated = new EventEmitter<{user: User, item: ColItem, collection: Collection}>();
  stillIssuedSub: Subscription;
  form: FormGroup;
  file: File;
  itemShapes = ['square', 'rectangle', 'triangle', 'polygon', 'circle', 'ellipse', '3d'];
  inputs: any[];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  themes: string[] = [];

  constructor(
    private itf: ItemToFormService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    if (!this.item) {
     this.item = {};
    }
    this.item = this.itf.assignType(this.item, this.collection.category);
    this.inputs = this.itf.createInputs(this.item);
    this.form = this.itf.toFormGroup(this.item);

    this.themes = [...this.form.get('themes').value];
    this.form.get('themes').setValue(this.themes);
  }

  addTheme(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.themes.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTheme(theme: string) {
    const index = this.themes.indexOf(theme);
    if (index >= 0) {
      this.themes.splice(index, 1);
    }
  }

  getFile(event: any) {this.file = event.target.files[0]; }

  isStillIssued() {
    if (this.form.contains('stillIssued')) {
     const issuedTo = this.form.get('issuedTo');
     const stillIssued = this.form.get('stillIssued');
     this.stillIssuedSub = stillIssued.valueChanges.subscribe(value => {
       if (value === true) {
         issuedTo.disable();
       } else if (value === false) {
         issuedTo.enable();
       }
     });
    }
  }

  insertPhotoUrls(event: {photo: string, photoPreview: string}) {
    this.form.get('photo').setValue(event.photo);
    this.form.get('photoPreview').setValue(event.photoPreview);
  }

   onSubmit() {
    if (this.form.valid) {
      this.form.removeControl('photoFile');

      const modified = new Date().toISOString();
      const normalizedForm = this.itf.normalizeForm(this.form);
      const user: UserMin = {name: this.profile.name, id: this.profile.id};
      const collectionMin: CollectionMin = {id: this.collection.id, title: this.collection.title};
      let item: any = {...normalizedForm, collection: collectionMin};
      if (this.item.id) { // if edit mode, then just update the item
        // update item
        item = {
          ...item,
          id: this.item.id,
          modified,
          contributors: [...this.item.contributors]
            .find(contributor => contributor.id === user.id)
              ? this.item.contributors
              : [...this.item.contributors, user]
        };

        // update user profile
        const updUser: User = {
          ...this.profile,
          experience: this.profile.experience + environment.experience.updateItem
        };
        this.itemUpdated.emit({user: updUser, item});

      } else { // if new item mode, then create item and update collection

        // create item
        const id = this.firestore.createId();
        item = {
          ...item,
          id,
          created: new Date().toISOString(),
          modified,
          createdBy: user,
          contributors: [user],
        };

        // update collection
        const collection: Collection = {
          ...this.collection,
          itemsIds: [...this.collection.itemsIds, item.id],
          photoPreview: this.form.value.photoPreview,
        };

        // update user profile
        const updUser: User = {
          ...this.profile,
          experience: this.profile.experience + environment.experience.createItem,
        };
        // console.log(updUser, item, collection);
        this.itemCreated.emit({user: updUser, item, collection});
      }
    }
  }

  ngOnDestroy() {
    if (this.stillIssuedSub) {
      this.stillIssuedSub.unsubscribe();
    }
  }

}
