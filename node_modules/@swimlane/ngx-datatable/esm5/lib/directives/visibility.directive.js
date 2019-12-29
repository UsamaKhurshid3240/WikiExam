/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone } from '@angular/core';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = /** @class */ (function () {
    function VisibilityDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new EventEmitter();
    }
    /**
     * @return {?}
     */
    VisibilityDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.runCheck();
    };
    /**
     * @return {?}
     */
    VisibilityDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timeout);
    };
    /**
     * @return {?}
     */
    VisibilityDirective.prototype.onVisibilityChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run((/**
         * @return {?}
         */
        function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        }));
    };
    /**
     * @return {?}
     */
    VisibilityDirective.prototype.runCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var check = (/**
         * @return {?}
         */
        function () {
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.timeout = setTimeout((/**
                     * @return {?}
                     */
                    function () { return check(); }), 50);
                }));
            }
        });
        this.timeout = setTimeout((/**
         * @return {?}
         */
        function () { return check(); }));
    };
    VisibilityDirective.decorators = [
        { type: Directive, args: [{ selector: '[visibilityObserver]' },] }
    ];
    /** @nocollapse */
    VisibilityDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    VisibilityDirective.propDecorators = {
        isVisible: [{ type: HostBinding, args: ['class.visible',] }],
        visible: [{ type: Output }]
    };
    return VisibilityDirective;
}());
export { VisibilityDirective };
if (false) {
    /** @type {?} */
    VisibilityDirective.prototype.isVisible;
    /** @type {?} */
    VisibilityDirective.prototype.visible;
    /** @type {?} */
    VisibilityDirective.prototype.timeout;
    /**
     * @type {?}
     * @private
     */
    VisibilityDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    VisibilityDirective.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Zpc2liaWxpdHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7QUFhcEg7SUFTRSw2QkFBb0IsT0FBbUIsRUFBVSxJQUFZO1FBQXpDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBTjdELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFakIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBSU0sQ0FBQzs7OztJQUVqRSxzQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELGdEQUFrQjs7O0lBQWxCO1FBQUEsaUJBTUM7UUFMQyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7UUFBQztZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUFBLGlCQWlCQzs7WUFoQk8sS0FBSzs7O1FBQUc7O1lBRU4sSUFBQSxnQ0FBMEQsRUFBeEQsOEJBQVksRUFBRSw0QkFBMEM7WUFFaEUsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO2dCQUMvQixZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O2dCQUFDO29CQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVU7OztvQkFBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxHQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVOzs7UUFBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxFQUFDLENBQUM7SUFDM0MsQ0FBQzs7Z0JBNUNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztnQkFiTCxVQUFVO2dCQUFlLE1BQU07Ozs0QkFldEUsV0FBVyxTQUFDLGVBQWU7MEJBRzNCLE1BQU07O0lBd0NULDBCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0E1Q1ksbUJBQW1COzs7SUFDOUIsd0NBQzJCOztJQUUzQixzQ0FBMEQ7O0lBRTFELHNDQUFhOzs7OztJQUVELHNDQUEyQjs7Ozs7SUFBRSxtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgTmdab25lLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFZpc2liaWxpdHkgT2JzZXJ2ZXIgRGlyZWN0aXZlXG4gKlxuICogVXNhZ2U6XG4gKlxuICogXHRcdDxkaXZcbiAqIFx0XHRcdHZpc2liaWxpdHlPYnNlcnZlclxuICogXHRcdFx0KHZpc2libGUpPVwib25WaXNpYmxlKCRldmVudClcIj5cbiAqIFx0XHQ8L2Rpdj5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aXNpYmlsaXR5T2JzZXJ2ZXJdJyB9KVxuZXhwb3J0IGNsYXNzIFZpc2liaWxpdHlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MudmlzaWJsZScpXG4gIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSB2aXNpYmxlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0aW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJ1bkNoZWNrKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgfVxuXG4gIG9uVmlzaWJpbGl0eUNoYW5nZSgpOiB2b2lkIHtcbiAgICAvLyB0cmlnZ2VyIHpvbmUgcmVjYWxjIGZvciBjb2x1bW5zXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnZpc2libGUuZW1pdCh0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bkNoZWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xuICAgICAgLy8gaHR0cHM6Ly9kYXZpZHdhbHNoLm5hbWUvb2Zmc2V0aGVpZ2h0LXZpc2liaWxpdHlcbiAgICAgIGNvbnN0IHsgb2Zmc2V0SGVpZ2h0LCBvZmZzZXRXaWR0aCB9ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGlmIChvZmZzZXRIZWlnaHQgJiYgb2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNoZWNrKCksIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY2hlY2soKSk7XG4gIH1cbn1cbiJdfQ==