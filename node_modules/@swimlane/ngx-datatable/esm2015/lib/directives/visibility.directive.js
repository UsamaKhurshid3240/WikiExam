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
export class VisibilityDirective {
    /**
     * @param {?} element
     * @param {?} zone
     */
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.runCheck();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearTimeout(this.timeout);
    }
    /**
     * @return {?}
     */
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run((/**
         * @return {?}
         */
        () => {
            this.isVisible = true;
            this.visible.emit(true);
        }));
    }
    /**
     * @return {?}
     */
    runCheck() {
        /** @type {?} */
        const check = (/**
         * @return {?}
         */
        () => {
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    this.timeout = setTimeout((/**
                     * @return {?}
                     */
                    () => check()), 50);
                }));
            }
        });
        this.timeout = setTimeout((/**
         * @return {?}
         */
        () => check()));
    }
}
VisibilityDirective.decorators = [
    { type: Directive, args: [{ selector: '[visibilityObserver]' },] }
];
/** @nocollapse */
VisibilityDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
VisibilityDirective.propDecorators = {
    isVisible: [{ type: HostBinding, args: ['class.visible',] }],
    visible: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Zpc2liaWxpdHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7QUFjcEgsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFROUIsWUFBb0IsT0FBbUIsRUFBVSxJQUFZO1FBQXpDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBTjdELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFakIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBSU0sQ0FBQzs7OztJQUVqRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7OztRQUFDLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxRQUFROztjQUNBLEtBQUs7OztRQUFHLEdBQUcsRUFBRTs7a0JBRVgsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO1lBRWhFLElBQUksWUFBWSxJQUFJLFdBQVcsRUFBRTtnQkFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztnQkFBQyxHQUFHLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDO0lBQzNDLENBQUM7OztZQTVDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7Ozs7WUFiTCxVQUFVO1lBQWUsTUFBTTs7O3dCQWV0RSxXQUFXLFNBQUMsZUFBZTtzQkFHM0IsTUFBTTs7OztJQUhQLHdDQUMyQjs7SUFFM0Isc0NBQTBEOztJQUUxRCxzQ0FBYTs7Ozs7SUFFRCxzQ0FBMkI7Ozs7O0lBQUUsbUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE5nWm9uZSwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBWaXNpYmlsaXR5IE9ic2VydmVyIERpcmVjdGl2ZVxuICpcbiAqIFVzYWdlOlxuICpcbiAqIFx0XHQ8ZGl2XG4gKiBcdFx0XHR2aXNpYmlsaXR5T2JzZXJ2ZXJcbiAqIFx0XHRcdCh2aXNpYmxlKT1cIm9uVmlzaWJsZSgkZXZlbnQpXCI+XG4gKiBcdFx0PC9kaXY+XG4gKlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlzaWJpbGl0eU9ic2VydmVyXScgfSlcbmV4cG9ydCBjbGFzcyBWaXNpYmlsaXR5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZpc2libGUnKVxuICBpc1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgdmlzaWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdGltZW91dDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ydW5DaGVjaygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICBvblZpc2liaWxpdHlDaGFuZ2UoKTogdm9pZCB7XG4gICAgLy8gdHJpZ2dlciB6b25lIHJlY2FsYyBmb3IgY29sdW1uc1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy52aXNpYmxlLmVtaXQodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBydW5DaGVjaygpOiB2b2lkIHtcbiAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL29mZnNldGhlaWdodC12aXNpYmlsaXR5XG4gICAgICBjb25zdCB7IG9mZnNldEhlaWdodCwgb2Zmc2V0V2lkdGggfSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAob2Zmc2V0SGVpZ2h0ICYmIG9mZnNldFdpZHRoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpLCA1MCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNoZWNrKCkpO1xuICB9XG59XG4iXX0=