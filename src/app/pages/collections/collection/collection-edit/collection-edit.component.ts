import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { Store, select } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Collection } from 'src/app/shared/models/collection.model';
import { AppState } from 'src/app/store';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

import * as colSelectors from 'src/app/store/collections-store/collections.selectors';
import * as colActions from 'src/app/store/collections-store/collections.actions';
import * as authSelectors from 'src/app/store/auth-store/auth.selectors';
import * as usersActions from '../../../../store/users-store/users.actions';

@Component({
  selector: 'collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.sass']
})
export class CollectionEditComponent implements OnInit, AfterContentInit, OnDestroy {
  collectionSubscription: Subscription;
  userSubscription: Subscription;
  stillProducedSub: Subscription;
  id: string;
  categories = [
    {key: 'admissionTicket', value: 'Admission Ticket'},
    {key: 'banknote', value: 'Banknote'},
    {key: 'bankCard', value: 'Bank Card'},
    {key: 'beerCoaster', value: 'Beer Coaster'},
    {key: 'bottleCap', value: 'Bottle Cap'},
    {key: 'coin', value: 'Coin'},
    {key: 'drinkLabel', value: 'Drink Label'},
    {key: 'giftCard', value: 'Gift Card'},
    {key: 'hotelKeyCard', value: 'Hotel Key Card'},
    {key: 'phoneCard', value: 'Phone Card'},
    {key: 'sportsCard', value: 'Sports Card'},
    {key: 'stamp', value: 'Stamp'},
    {key: 'sticker', value: 'Sticker'},
    {key: 'sugarPacket', value: 'Sugar Packet'},
    {key: 'teaBag', value: 'Tea Bag'},
    {key: 'transportationTicket', value: 'Transportation Ticket'},
    {key: 'videoGame', value: 'Video Game'},
    {key: 'wrapper', value: 'Wrapper'},
  ];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  themes: string[] = [];
  collection: Collection;
  user: User;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.cid;

    this.userSubscription = this.store.pipe(select(authSelectors.selectUser)).subscribe(user => this.user = user);

    if (this.id) {
      this.collectionSubscription = this.store.pipe(select(colSelectors.selectCollectionById(this.id)))
        .subscribe(collection => this.collection = collection);
    } else {
      this.collection = {
        title: '', description: '', country: '', themes: [], category: '',
        producedFrom: null, producedTo: null, created: null, createdBy: null, contributors: [],
        modified: null, totalItems: null, itemsIds: [], producedBy: '', stillProduced: false,
      };
    }
    this.form = this.fb.group({
      category: [this.collection.category, Validators.required],
      title: [this.collection.title, Validators.required],
      description: [this.collection.description, Validators.required],
      country: [this.collection.country, Validators.required],
      themes: [this.collection.themes, Validators.required],
      producedBy: [this.collection.producedBy, Validators.required],
      producedFrom: [this.collection.producedFrom, Validators.required],
      producedTo: [this.collection.producedTo],
      stillProduced: [this.collection.stillProduced, Validators.required],
      totalItems: [this.collection.totalItems],
    });
  }

  ngAfterContentInit() {
    this.themes = [...this.form.get('themes').value];
    // console.log(this.themes);
  }

  isStillProduced() {
    if (this.form.contains('stillProduced')) {
      const stillProduced = this.form.get('stillProduced');
      const producedTo = this.form.get('producedTo');
      this.stillProducedSub = stillProduced.valueChanges.subscribe(value => {
        if (value === true) {
          producedTo.disable();
        } else {
          producedTo.enable();
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
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

  remove(theme: string) {
    const index = this.themes.indexOf(theme);
    if (index >= 0) {
      this.themes.splice(index, 1);
    }
  }

  onSubmit() {
    this.form.get('themes').setValue(this.themes);
    if (this.form.valid) {
      const modified = new Date().toISOString();
      const producedFrom = new Date(this.form.get('producedFrom').value).toISOString();
      const producedTo = new Date(this.form.get('producedTo').value).toISOString();
      // this.form.get('producedFrom').setValue(producedFrom)
      const contributor = {name: this.user.name, id: this.user.id};
      if (this.id) { // if it's an existing collection, just update it
        const newCollection: Collection = {
          ...this.form.value,
          id: this.id,
          modified,
          producedFrom,
          producedTo,
          contributors:
            [...this.collection.contributors]
              .find(contribution => contribution.id === contributor.id)
                ? this.collection.contributors
                : [...this.collection.contributors, contributor]
        };
        const updUser: User = {
          ...this.user,
          experience:  this.user.experience + environment.experience.updateCol
        };
        this.store.dispatch(usersActions.updateUser({user: updUser}));
        this.store.dispatch(colActions.updateCollection({collection: newCollection}));

      } else { // if it's a new collection, create it
        const id = this.firestore.createId();
        const created = new Date().toISOString();
        const createdBy = contributor;
        const itemsIds = [];
        const newCollection: Collection = {
          ...this.form.value,
          id,
          created,
          modified,
          createdBy,
          producedFrom,
          producedTo,
          contributors: [contributor],
          itemsIds,
        };
        const updUser: User = {
          ...this.user,
          experience: this.user.experience + environment.experience.createCol
        };
        // console.log(newCollection);
        this.store.dispatch(usersActions.updateUser({user: updUser}));
        this.store.dispatch(colActions.addCollection({collection: newCollection}));
      }
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    if (this.id) {
      this.collectionSubscription.unsubscribe();
    }
    if (this.stillProducedSub) {
      this.stillProducedSub.unsubscribe();
    }
  }
}
