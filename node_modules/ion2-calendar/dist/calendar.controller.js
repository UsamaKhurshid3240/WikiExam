"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var calendar_modal_1 = require("./components/calendar.modal");
var calendar_service_1 = require("./services/calendar.service");
var CalendarController = /** @class */ (function () {
    function CalendarController(modalCtrl, calSvc) {
        this.modalCtrl = modalCtrl;
        this.calSvc = calSvc;
    }
    /**
     * @deprecated
     * @param {CalendarModalOptions} calendarOptions
     * @param {ModalOptions} modalOptions
     * @returns {any}
     */
    /**
       * @deprecated
       * @param {CalendarModalOptions} calendarOptions
       * @param {ModalOptions} modalOptions
       * @returns {any}
       */
    CalendarController.prototype.openCalendar = /**
       * @deprecated
       * @param {CalendarModalOptions} calendarOptions
       * @param {ModalOptions} modalOptions
       * @returns {any}
       */
    function (calendarOptions, modalOptions) {
        if (modalOptions === void 0) { modalOptions = {}; }
        var options = this.calSvc.safeOpt(calendarOptions);
        var calendarModal = this.modalCtrl.create(calendar_modal_1.CalendarModal, Object.assign({
            options: options
        }, options), modalOptions);
        calendarModal.present();
        return new Promise(function (resolve, reject) {
            calendarModal.onDidDismiss(function (data) {
                if (data) {
                    resolve(data);
                }
                else {
                    reject('cancelled');
                }
            });
        });
    };
    CalendarController.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CalendarController.ctorParameters = function () { return [
        { type: ionic_angular_1.ModalController, },
        { type: calendar_service_1.CalendarService, },
    ]; };
    return CalendarController;
}());
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map