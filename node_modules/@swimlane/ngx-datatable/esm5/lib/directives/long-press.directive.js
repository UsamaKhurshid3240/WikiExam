/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MouseEvent } from '../events';
var LongPressDirective = /** @class */ (function () {
    function LongPressDirective() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new EventEmitter();
        this.longPressing = new EventEmitter();
        this.longPressEnd = new EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pressing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "isLongPress", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isLongPressing;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    LongPressDirective.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        /** @type {?} */
        var mouseup = fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe((/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) { return _this.onMouseup(); }));
        this.timeout = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.isLongPressing = true;
            _this.longPressStart.emit({
                event: event,
                model: _this.pressModel
            });
            _this.subscription.add(fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((/**
             * @param {?} mouseEvent
             * @return {?}
             */
            function (mouseEvent) { return _this.onMouseMove(mouseEvent); })));
            _this.loop(event);
        }), this.duration);
        this.loop(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    LongPressDirective.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pressing && !this.isLongPressing) {
            /** @type {?} */
            var xThres = Math.abs(event.clientX - this.mouseX) > 10;
            /** @type {?} */
            var yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    LongPressDirective.prototype.loop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.isLongPressing) {
            this.timeout = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.longPressing.emit({
                    event: event,
                    model: _this.pressModel
                });
                _this.loop(event);
            }), 50);
        }
    };
    /**
     * @return {?}
     */
    LongPressDirective.prototype.endPress = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    };
    /**
     * @return {?}
     */
    LongPressDirective.prototype.onMouseup = /**
     * @return {?}
     */
    function () {
        this.endPress();
    };
    /**
     * @return {?}
     */
    LongPressDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroySubscription();
    };
    /**
     * @private
     * @return {?}
     */
    LongPressDirective.prototype._destroySubscription = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    LongPressDirective.decorators = [
        { type: Directive, args: [{ selector: '[long-press]' },] }
    ];
    LongPressDirective.propDecorators = {
        pressEnabled: [{ type: Input }],
        pressModel: [{ type: Input }],
        duration: [{ type: Input }],
        longPressStart: [{ type: Output }],
        longPressing: [{ type: Output }],
        longPressEnd: [{ type: Output }],
        press: [{ type: HostBinding, args: ['class.press',] }],
        isLongPress: [{ type: HostBinding, args: ['class.longpress',] }],
        onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return LongPressDirective;
}());
export { LongPressDirective };
if (false) {
    /** @type {?} */
    LongPressDirective.prototype.pressEnabled;
    /** @type {?} */
    LongPressDirective.prototype.pressModel;
    /** @type {?} */
    LongPressDirective.prototype.duration;
    /** @type {?} */
    LongPressDirective.prototype.longPressStart;
    /** @type {?} */
    LongPressDirective.prototype.longPressing;
    /** @type {?} */
    LongPressDirective.prototype.longPressEnd;
    /** @type {?} */
    LongPressDirective.prototype.pressing;
    /** @type {?} */
    LongPressDirective.prototype.isLongPressing;
    /** @type {?} */
    LongPressDirective.prototype.timeout;
    /** @type {?} */
    LongPressDirective.prototype.mouseX;
    /** @type {?} */
    LongPressDirective.prototype.mouseY;
    /** @type {?} */
    LongPressDirective.prototype.subscription;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1wcmVzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2xvbmctcHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUE0QixTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkM7SUFBQTtRQUVXLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFFdEIsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLL0QsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBbUdyQixDQUFDO0lBL0ZDLHNCQUNJLHFDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSwyQ0FBVzs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBOzs7OztJQUdELHdDQUFXOzs7O0lBRFgsVUFDWSxLQUFpQjtRQUQ3QixpQkFtQ0M7UUFqQ0MsK0JBQStCO1FBQy9CLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFF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QztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHNDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFTyxpREFBb0I7Ozs7SUFBNUI7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUMvQjtJQUNILENBQUM7O2dCQWhIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOzs7K0JBRXBDLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUVMLE1BQU07K0JBQ04sTUFBTTsrQkFDTixNQUFNO3dCQVVOLFdBQVcsU0FBQyxhQUFhOzhCQUt6QixXQUFXLFNBQUMsaUJBQWlCOzhCQUs3QixZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQXFGdkMseUJBQUM7Q0FBQSxBQWpIRCxJQWlIQztTQWhIWSxrQkFBa0I7OztJQUM3QiwwQ0FBc0M7O0lBQ3RDLHdDQUF5Qjs7SUFDekIsc0NBQWdDOztJQUVoQyw0Q0FBaUU7O0lBQ2pFLDBDQUErRDs7SUFDL0QsMENBQStEOztJQUUvRCxzQ0FBa0I7O0lBQ2xCLDRDQUF3Qjs7SUFDeEIscUNBQWE7O0lBQ2Isb0NBQW1COztJQUNuQixvQ0FBbUI7O0lBRW5CLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2xvbmctcHJlc3NdJyB9KVxuZXhwb3J0IGNsYXNzIExvbmdQcmVzc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByZXNzRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHByZXNzTW9kZWw6IGFueTtcbiAgQElucHV0KCkgZHVyYXRpb246IG51bWJlciA9IDUwMDtcblxuICBAT3V0cHV0KCkgbG9uZ1ByZXNzU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbG9uZ1ByZXNzaW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxvbmdQcmVzc0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJlc3Npbmc6IGJvb2xlYW47XG4gIGlzTG9uZ1ByZXNzaW5nOiBib29sZWFuO1xuICB0aW1lb3V0OiBhbnk7XG4gIG1vdXNlWDogbnVtYmVyID0gMDtcbiAgbW91c2VZOiBudW1iZXIgPSAwO1xuXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucHJlc3MnKVxuICBnZXQgcHJlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucHJlc3Npbmc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvbmdwcmVzcycpXG4gIGdldCBpc0xvbmdQcmVzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0xvbmdQcmVzc2luZztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gZG9uJ3QgZG8gcmlnaHQvbWlkZGxlIGNsaWNrc1xuICAgIGlmIChldmVudC53aGljaCAhPT0gMSB8fCAhdGhpcy5wcmVzc0VuYWJsZWQpIHJldHVybjtcblxuICAgIC8vIGRvbid0IHN0YXJ0IGRyYWcgaWYgaXRzIG9uIHJlc2l6ZSBoYW5kbGVcbiAgICBjb25zdCB0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXNpemUtaGFuZGxlJykpIHJldHVybjtcblxuICAgIHRoaXMubW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICB0aGlzLnByZXNzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzTG9uZ1ByZXNzaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdCBtb3VzZXVwID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbW91c2V1cC5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2V1cCgpKTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc0xvbmdQcmVzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLmxvbmdQcmVzc1N0YXJ0LmVtaXQoe1xuICAgICAgICBldmVudCxcbiAgICAgICAgbW9kZWw6IHRoaXMucHJlc3NNb2RlbFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2V1cCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgobW91c2VFdmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShtb3VzZUV2ZW50KSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMubG9vcChldmVudCk7XG4gICAgfSwgdGhpcy5kdXJhdGlvbik7XG5cbiAgICB0aGlzLmxvb3AoZXZlbnQpO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcmVzc2luZyAmJiAhdGhpcy5pc0xvbmdQcmVzc2luZykge1xuICAgICAgY29uc3QgeFRocmVzID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WCAtIHRoaXMubW91c2VYKSA+IDEwO1xuICAgICAgY29uc3QgeVRocmVzID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHRoaXMubW91c2VZKSA+IDEwO1xuXG4gICAgICBpZiAoeFRocmVzIHx8IHlUaHJlcykge1xuICAgICAgICB0aGlzLmVuZFByZXNzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9vcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTG9uZ1ByZXNzaW5nKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5sb25nUHJlc3NpbmcuZW1pdCh7XG4gICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgbW9kZWw6IHRoaXMucHJlc3NNb2RlbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb29wKGV2ZW50KTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH1cblxuICBlbmRQcmVzcygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLmlzTG9uZ1ByZXNzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcmVzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcblxuICAgIHRoaXMubG9uZ1ByZXNzRW5kLmVtaXQoe1xuICAgICAgbW9kZWw6IHRoaXMucHJlc3NNb2RlbFxuICAgIH0pO1xuICB9XG5cbiAgb25Nb3VzZXVwKCk6IHZvaWQge1xuICAgIHRoaXMuZW5kUHJlc3MoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=