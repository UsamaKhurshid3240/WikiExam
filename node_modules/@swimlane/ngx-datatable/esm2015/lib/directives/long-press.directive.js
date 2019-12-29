/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MouseEvent } from '../events';
export class LongPressDirective {
    constructor() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new EventEmitter();
        this.longPressing = new EventEmitter();
        this.longPressEnd = new EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    /**
     * @return {?}
     */
    get press() {
        return this.pressing;
    }
    /**
     * @return {?}
     */
    get isLongPress() {
        return this.isLongPressing;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        /** @type {?} */
        const target = (/** @type {?} */ (event.target));
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        /** @type {?} */
        const mouseup = fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe((/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => this.onMouseup()));
        this.timeout = setTimeout((/**
         * @return {?}
         */
        () => {
            this.isLongPressing = true;
            this.longPressStart.emit({
                event,
                model: this.pressModel
            });
            this.subscription.add(fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((/**
             * @param {?} mouseEvent
             * @return {?}
             */
            (mouseEvent) => this.onMouseMove(mouseEvent))));
            this.loop(event);
        }), this.duration);
        this.loop(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
        if (this.pressing && !this.isLongPressing) {
            /** @type {?} */
            const xThres = Math.abs(event.clientX - this.mouseX) > 10;
            /** @type {?} */
            const yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    loop(event) {
        if (this.isLongPressing) {
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => {
                this.longPressing.emit({
                    event,
                    model: this.pressModel
                });
                this.loop(event);
            }), 50);
        }
    }
    /**
     * @return {?}
     */
    endPress() {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    }
    /**
     * @return {?}
     */
    onMouseup() {
        this.endPress();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroySubscription();
    }
    /**
     * @private
     * @return {?}
     */
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1wcmVzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2xvbmctcHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUE0QixTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHdkMsTUFBTSxPQUFPLGtCQUFrQjtJQUQvQjtRQUVXLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFFdEIsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLL0QsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBbUdyQixDQUFDOzs7O0lBL0ZDLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBR0QsV0FBVyxDQUFDLEtBQWlCO1FBQzNCLCtCQUErQjtRQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPOzs7Y0FHOUMsTUFBTSxHQUFHLG1CQUFhLEtB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QUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBaEhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7OzsyQkFFcEMsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBRUwsTUFBTTsyQkFDTixNQUFNOzJCQUNOLE1BQU07b0JBVU4sV0FBVyxTQUFDLGFBQWE7MEJBS3pCLFdBQVcsU0FBQyxpQkFBaUI7MEJBSzdCLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUExQnJDLDBDQUFzQzs7SUFDdEMsd0NBQXlCOztJQUN6QixzQ0FBZ0M7O0lBRWhDLDRDQUFpRTs7SUFDakUsMENBQStEOztJQUMvRCwwQ0FBK0Q7O0lBRS9ELHNDQUFrQjs7SUFDbEIsNENBQXdCOztJQUN4QixxQ0FBYTs7SUFDYixvQ0FBbUI7O0lBQ25CLG9DQUFtQjs7SUFFbkIsMENBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbG9uZy1wcmVzc10nIH0pXG5leHBvcnQgY2xhc3MgTG9uZ1ByZXNzRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJlc3NFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHJlc3NNb2RlbDogYW55O1xuICBASW5wdXQoKSBkdXJhdGlvbjogbnVtYmVyID0gNTAwO1xuXG4gIEBPdXRwdXQoKSBsb25nUHJlc3NTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsb25nUHJlc3Npbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbG9uZ1ByZXNzRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcmVzc2luZzogYm9vbGVhbjtcbiAgaXNMb25nUHJlc3Npbmc6IGJvb2xlYW47XG4gIHRpbWVvdXQ6IGFueTtcbiAgbW91c2VYOiBudW1iZXIgPSAwO1xuICBtb3VzZVk6IG51bWJlciA9IDA7XG5cbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wcmVzcycpXG4gIGdldCBwcmVzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wcmVzc2luZztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubG9uZ3ByZXNzJylcbiAgZ2V0IGlzTG9uZ1ByZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9uZ1ByZXNzaW5nO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBkb24ndCBkbyByaWdodC9taWRkbGUgY2xpY2tzXG4gICAgaWYgKGV2ZW50LndoaWNoICE9PSAxIHx8ICF0aGlzLnByZXNzRW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgLy8gZG9uJ3Qgc3RhcnQgZHJhZyBpZiBpdHMgb24gcmVzaXplIGhhbmRsZVxuICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Jlc2l6ZS1oYW5kbGUnKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgIHRoaXMubW91c2VZID0gZXZlbnQuY2xpZW50WTtcblxuICAgIHRoaXMucHJlc3NpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNMb25nUHJlc3NpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBtb3VzZXVwLnN1YnNjcmliZSgoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZXVwKCkpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9uZ1ByZXNzaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9uZ1ByZXNzU3RhcnQuZW1pdCh7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBtb2RlbDogdGhpcy5wcmVzc01vZGVsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbChtb3VzZXVwKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChtb3VzZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlKG1vdXNlRXZlbnQpKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5sb29wKGV2ZW50KTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcblxuICAgIHRoaXMubG9vcChldmVudCk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnByZXNzaW5nICYmICF0aGlzLmlzTG9uZ1ByZXNzaW5nKSB7XG4gICAgICBjb25zdCB4VGhyZXMgPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gdGhpcy5tb3VzZVgpID4gMTA7XG4gICAgICBjb25zdCB5VGhyZXMgPSBNYXRoLmFicyhldmVudC5jbGllbnRZIC0gdGhpcy5tb3VzZVkpID4gMTA7XG5cbiAgICAgIGlmICh4VGhyZXMgfHwgeVRocmVzKSB7XG4gICAgICAgIHRoaXMuZW5kUHJlc3MoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb29wKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNMb25nUHJlc3NpbmcpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvbmdQcmVzc2luZy5lbWl0KHtcbiAgICAgICAgICBldmVudCxcbiAgICAgICAgICBtb2RlbDogdGhpcy5wcmVzc01vZGVsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvb3AoZXZlbnQpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfVxuXG4gIGVuZFByZXNzKCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMuaXNMb25nUHJlc3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByZXNzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xuXG4gICAgdGhpcy5sb25nUHJlc3NFbmQuZW1pdCh7XG4gICAgICBtb2RlbDogdGhpcy5wcmVzc01vZGVsXG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNldXAoKTogdm9pZCB7XG4gICAgdGhpcy5lbmRQcmVzcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVN1YnNjcmlwdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==