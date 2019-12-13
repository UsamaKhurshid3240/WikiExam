var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ViewController } from 'ionic-angular';
import { ModalCmp } from './modal.component';
import { ModalMDSlideIn, ModalMDSlideOut, ModalSlideIn, ModalSlideOut } from 'ionic-angular/components/modal/modal-transitions';
import { isPresent } from 'ionic-angular/util/util';
var DatePickerDisplayer = (function (_super) {
    __extends(DatePickerDisplayer, _super);
    function DatePickerDisplayer(app, component, data, opts, config) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        data = data || {};
        data.component = component;
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        _this = _super.call(this, ModalCmp, data, null) || this;
        _this._app = app;
        _this._enterAnimation = opts.enterAnimation;
        _this._leaveAnimation = opts.leaveAnimation;
        _this.isOverlay = true;
        config.setTransition('modal-slide-in', ModalSlideIn);
        config.setTransition('modal-slide-out', ModalSlideOut);
        config.setTransition('modal-md-slide-in', ModalMDSlideIn);
        config.setTransition('modal-md-slide-out', ModalMDSlideOut);
        return _this;
    }
    DatePickerDisplayer.prototype.getTransitionName = function (direction) {
        var key;
        if (direction === 'back') {
            if (this._leaveAnimation) {
                return this._leaveAnimation;
            }
            key = 'modalLeave';
        }
        else {
            if (this._enterAnimation) {
                return this._enterAnimation;
            }
            key = 'modalEnter';
        }
        return this._nav && this._nav.config.get(key);
    };
    DatePickerDisplayer.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions);
    };
    return DatePickerDisplayer;
}(ViewController));
export { DatePickerDisplayer };
//# sourceMappingURL=datepicker.displayer.js.map