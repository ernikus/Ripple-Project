import { Component, Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy
} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';


@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-my-res',
  templateUrl: './my-res.component.html',
  styleUrls: ['./my-res.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy
    }
  ]
})
export class MyResComponent {
  range = new FormGroup({
    start: new FormControl(),
    middle: new FormControl(),
    end: new FormControl(),
  });

  get startDateControl(): AbstractControl {
    return this.range.controls['start'];
  }

  get endDateControl(): AbstractControl {
    return this.range.controls['end'];
  }
}
