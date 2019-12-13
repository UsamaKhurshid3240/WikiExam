"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var calendar_controller_1 = require("./calendar.controller");
var ionic_angular_1 = require("ionic-angular");
var calendar_service_1 = require("./services/calendar.service");
var index_1 = require("./components/index");
function calendarController(modalCtrl, calSvc) {
    return new calendar_controller_1.CalendarController(modalCtrl, calSvc);
}
exports.calendarController = calendarController;
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [ionic_angular_1.IonicModule],
                    declarations: index_1.CALENDAR_COMPONENTS,
                    exports: index_1.CALENDAR_COMPONENTS,
                    entryComponents: index_1.CALENDAR_COMPONENTS,
                    providers: [
                        calendar_service_1.CalendarService,
                        {
                            provide: calendar_controller_1.CalendarController,
                            useFactory: calendarController,
                            deps: [ionic_angular_1.ModalController, calendar_service_1.CalendarService]
                        }
                    ],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    CalendarModule.ctorParameters = function () { return []; };
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.module.js.map