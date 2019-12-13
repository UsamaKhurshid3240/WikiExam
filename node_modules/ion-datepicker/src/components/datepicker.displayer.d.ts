import { App, ModalOptions, NavOptions, ViewController } from 'ionic-angular';
import { Config } from 'ionic-angular/config/config';
export declare class DatePickerDisplayer extends ViewController {
    private _app;
    private _enterAnimation;
    private _leaveAnimation;
    constructor(app: App, component: any, data: any, opts: ModalOptions, config: Config);
    getTransitionName(direction: string): string;
    present(navOptions?: NavOptions): Promise<any>;
}
