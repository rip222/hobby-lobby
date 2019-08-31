import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { CollectionItemEditModule } from '../pages/collections/collection-item/collection-item-edit/collection-item-edit.module';
import { isString, isNumber, isDate, isBoolean, isArray } from '../shared/functions/type-check';

import * as items from '../shared/models/collection-item-models';

@Injectable(
  // {
  // providedIn: CollectionItemEditModule,
  // }
)
export class ItemToFormService {
  constructor() { }

  assignType(item: any, category: string) {
    switch (category) {
      case 'admissionTicket':      return new items.AdmissionTicketItem(item);
      case 'banknote':             return new items.BanknoteItem(item);
      case 'bankCard':             return new items.BankCardItem(item);
      case 'beerCoaster':          return new items.BeerCoasterItem(item);
      case 'bottleCap':            return new items.BottleCapItem(item);
      case 'coin':                 return new items.CoinItem(item);
      case 'drinkLabel':           return new items.DrinkLabelItem(item);
      case 'giftCard':             return new items.GiftCardItem(item);
      case 'hotelKeyCard':         return new items.HotelKeyCardItem(item);
      case 'phoneCard':            return new items.PhoneCardItem(item);
      case 'postcard':             return new items.PostcardItem(item);
      case 'sportsCard':           return new items.SportsCardItem(item);
      case 'stamp':                return new items.StampItem(item);
      case 'sticker':              return new items.StickerItem(item);
      case 'sugarPacket':          return new items.SugarPacketItem(item);
      case 'teaBag':               return new items.TeaBagItem(item);
      case 'transportationTicket': return new items.TransportationTicketItem(item);
      case 'videoGame':            return new items.VideoGameItem(item);
      case 'wrapper':              return new items.WrapperItem(item);
      default:                     return new items.ColItem(item);
    }
  }

  createInputs(item: any) {
    const inputs = [];
    for (const prop in item) {
       // exclude these properties
      if (
        // main inputs added manually in the template
        prop !== 'title' &&
        prop !== 'description' &&
        prop !== 'shape' &&
        prop !== 'size' &&
        prop !== 'themes' &&
        // meta things
        prop !== 'id' &&
        prop !== 'collectionId' &&
        prop !== 'created' &&
        prop !== 'createdBy' &&
        prop !== 'modified' &&
        prop !== 'contributors' &&
        prop !== 'photoPreview' &&
        prop !== 'photo') {
        const input = {};
        input['key'] = prop;
        input['value'] = item[prop];
        input['label'] = prop;
        if (isString(item[prop]) || item[prop] === 'undefined') {
          input['type'] = 'text';
          if (prop === 'photoFile') {
            input['type'] = 'file';
          }
        } else if (isNumber(item[prop])) {
          input['type'] = 'number';
        } else if (isBoolean(item[prop])) {
          input['type'] = 'checkbox';
          input['value'] = item[prop];
        } else if (isDate(item[prop])) {
          input['type'] = 'date';
        } else if (isArray(item[prop])) {
          input['type'] = 'text';
        }
        // console.log(input)
        inputs.push(input);
      }

    }
    return inputs;
  }

  toFormGroup(item: any): FormGroup {
    const group = {};
    for (const prop in item) {
      if (
        prop === 'title' ||
        prop === 'description' ||
        prop === 'shape' ||
        prop === 'size' ||
        // prop === 'themes' ||
        prop === 'photo'
        ) {
        group[prop] = new FormControl(item[prop] || '', Validators.required);
      } else {
        group[prop] = new FormControl(item[prop] || '');
        if (isDate(item[prop])) {
          group[prop] = new FormControl(new Date(item[prop]));
        }
      }
    }
    return new FormGroup(group);
  }

  normalizeForm(form: FormGroup) {
    const normalizedForm = {};
    for (const prop in form.value) {
      if (isDate(form.value[prop])) {
        normalizedForm[prop] = new Date(form.value[prop]).toISOString();
      } else {
        normalizedForm[prop] = form.value[prop];
      }
    }
    return normalizedForm;
  }
}
