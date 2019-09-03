import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger,  MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DOWN_ARROW, TAB, ESCAPE } from '@angular/cdk/keycodes';


/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css'],
})
export class ChipsAutocompleteExample {
 visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('fruitInput', {read: MatAutocompleteTrigger}) autoComplete;

  constructor() { }

  ngOnInit() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addFruit(value);
   }

    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  onFruitSelectionChange(event: MatAutocompleteSelectedEvent): void {
     this.updateFruitList(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
     setTimeout(() => {
      this.autoComplete.openPanel();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(option => option.toLowerCase().includes(filterValue));
  }

    onCheckboxClick(event : MouseEvent) {
      event.preventDefault();
    }

  addFruit(fruit: string): void {
    this.fruits.push(fruit);
  }

  isFruitSelected(fruit: string): boolean {
     return this.fruits.indexOf(fruit) >= 0;
  }

  updateFruitList(fruit: string): void {
    if (this.isFruitSelected(fruit)) {
        this.remove(fruit);
    } else {
      this.addFruit(fruit);
    }
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */