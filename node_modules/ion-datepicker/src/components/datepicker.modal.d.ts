import { App, ModalOptions } from 'ionic-angular';
import { DatePickerDisplayer } from './datepicker.displayer';
import { Config } from 'ionic-angular/config/config';
export declare class DatePickerController {
    private _app;
    config: Config;
    constructor(_app: App, config: Config);
    create(data?: any, opts?: ModalOptions): DatePickerDisplayer;
}
