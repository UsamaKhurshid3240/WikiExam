"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var calendar_model_1 = require("../calendar.model");
var config_1 = require("../config");
var MonthPickerComponent = /** @class */ (function () {
    function MonthPickerComponent() {
        this.color = config_1.defaults.COLOR;
        this.onSelect = new core_1.EventEmitter();
        this._thisMonth = new Date();
        this._monthFormat = config_1.defaults.MONTH_FORMAT;
    }
    Object.defineProperty(MonthPickerComponent.prototype, "monthFormat", {
        get: function () {
            return this._monthFormat;
        },
        set: function (value) {
            if (Array.isArray(value) && value.length === 12) {
                this._monthFormat = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MonthPickerComponent.prototype._onSelect = function (month) {
        this.onSelect.emit(month);
    };
    MonthPickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-calendar-month-picker',
                    template: "\n    <div [class]=\"'month-picker ' + color\">\n      <div class=\"month-packer-item\"\n           [class.this-month]=\" i === _thisMonth.getMonth() && month.original.year === _thisMonth.getFullYear()\"\n           *ngFor=\"let item of _monthFormat; let i = index\">\n        <button type=\"button\" (click)=\"_onSelect(i)\">{{item}}</button>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    MonthPickerComponent.ctorParameters = function () { return []; };
    MonthPickerComponent.propDecorators = {
        "month": [{ type: core_1.Input },],
        "color": [{ type: core_1.Input },],
        "onSelect": [{ type: core_1.Output },],
        "monthFormat": [{ type: core_1.Input },],
    };
    return MonthPickerComponent;
}());
exports.MonthPickerComponent = MonthPickerComponent;
//# sourceMappingURL=month-picker.component.js.map