import { ModalOptions } from 'ionic-angular';
import { DatePickerController } from './datepicker.modal';
import { DatePickerDisplayer } from './datepicker.displayer';
import { EventEmitter } from "@angular/core";
import { DateService } from '../services/datepicker.service';
export declare class DatePickerDirective {
    datepickerCtrl: DatePickerController;
    dateService: DateService;
    selected: EventEmitter<string | Date>;
    changed: EventEmitter<string | Date>;
    canceled: EventEmitter<void>;
    max: Date;
    min: Date;
    locale: string;
    localeStrings: {
        weekdays: string[];
        months: string[];
    };
    okText: string;
    cancelText: string;
    bodyClasses: Array<string>;
    headerClasses: Array<string>;
    modalOptions: ModalOptions;
    value: Date;
    valueChange: EventEmitter<string | Date>;
    disabledDates: Date[];
    markDates: Date[];
    calendar: boolean;
    modal: DatePickerDisplayer;
    private _fn;
    constructor(datepickerCtrl: DatePickerController, dateService: DateService);
    _click(ev: UIEvent): void;
    open(): void;
}
