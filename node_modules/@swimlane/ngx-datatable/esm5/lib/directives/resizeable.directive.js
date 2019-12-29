/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MouseEvent } from '../events';
import { takeUntil } from 'rxjs/operators';
var ResizeableDirective = /** @class */ (function () {
    function ResizeableDirective(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    /**
     * @return {?}
     */
    ResizeableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var renderer2 = this.renderer;
        /** @type {?} */
        var node = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(node, 'resize-handle');
        }
        else {
            renderer2.addClass(node, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, node);
    };
    /**
     * @return {?}
     */
    ResizeableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroySubscription();
    };
    /**
     * @return {?}
     */
    ResizeableDirective.prototype.onMouseup = /**
     * @return {?}
     */
    function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ResizeableDirective.prototype.onMousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var isHandle = ((/** @type {?} */ (event.target))).classList.contains('resize-handle');
        /** @type {?} */
        var initialWidth = this.element.clientWidth;
        /** @type {?} */
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            /** @type {?} */
            var mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((/**
             * @param {?} ev
             * @return {?}
             */
            function (ev) { return _this.onMouseup(); }));
            /** @type {?} */
            var mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.move(e, initialWidth, mouseDownScreenX); }));
            this.subscription.add(mouseMoveSub);
        }
    };
    /**
     * @param {?} event
     * @param {?} initialWidth
     * @param {?} mouseDownScreenX
     * @return {?}
     */
    ResizeableDirective.prototype.move = /**
     * @param {?} event
     * @param {?} initialWidth
     * @param {?} mouseDownScreenX
     * @return {?}
     */
    function (event, initialWidth, mouseDownScreenX) {
        /** @type {?} */
        var movementX = event.screenX - mouseDownScreenX;
        /** @type {?} */
        var newWidth = initialWidth + movementX;
        /** @type {?} */
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        /** @type {?} */
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    /**
     * @private
     * @return {?}
     */
    ResizeableDirective.prototype._destroySubscription = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    ResizeableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[resizeable]',
                    host: {
                        '[class.resizeable]': 'resizeEnabled'
                    }
                },] }
    ];
    /** @nocollapse */
    ResizeableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ResizeableDirective.propDecorators = {
        resizeEnabled: [{ type: Input }],
        minWidth: [{ type: Input }],
        maxWidth: [{ type: Input }],
        resize: [{ type: Output }],
        onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return ResizeableDirective;
}());
export { ResizeableDirective };
if (false) {
    /** @type {?} */
    ResizeableDirective.prototype.resizeEnabled;
    /** @type {?} */
    ResizeableDirective.prototype.minWidth;
    /** @type {?} */
    ResizeableDirective.prototype.maxWidth;
    /** @type {?} */
    ResizeableDirective.prototype.resize;
    /** @type {?} */
    ResizeableDirective.prototype.element;
    /** @type {?} */
    ResizeableDirective.prototype.subscription;
    /** @type {?} */
    ResizeableDirective.prototype.resizing;
    /**
     * @type {?}
     * @private
     */
    ResizeableDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDO0lBaUJFLDZCQUFZLE9BQW1CLEVBQVUsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVZuRCxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUk3QixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJekQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUd4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELDZDQUFlOzs7SUFBZjs7WUFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVE7O1lBQ3pCLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDLENBQUM7U0FDMUQ7UUFDRCxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUs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O0NBQUEsQUFwRkQsSUFvRkM7U0E5RVksbUJBQW1COzs7SUFDOUIsNENBQXVDOztJQUN2Qyx1Q0FBMEI7O0lBQzFCLHVDQUEwQjs7SUFFMUIscUNBQXlEOztJQUV6RCxzQ0FBcUI7O0lBQ3JCLDJDQUEyQjs7SUFDM0IsdUNBQTBCOzs7OztJQUVPLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcmVzaXplYWJsZV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5yZXNpemVhYmxlXSc6ICdyZXNpemVFbmFibGVkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6ZWFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSByZXNpemVFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHJlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHJlbmRlcmVyMiA9IHRoaXMucmVuZGVyZXI7XG4gICAgY29uc3Qgbm9kZSA9IHJlbmRlcmVyMi5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaWYgKHRoaXMucmVzaXplRW5hYmxlZCkge1xuICAgICAgcmVuZGVyZXIyLmFkZENsYXNzKG5vZGUsICdyZXNpemUtaGFuZGxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlcmVyMi5hZGRDbGFzcyhub2RlLCAncmVzaXplLWhhbmRsZS0tbm90LXJlc2l6YWJsZScpO1xuICAgIH1cbiAgICByZW5kZXJlcjIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50LCBub2RlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIG9uTW91c2V1cCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6aW5nID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24gJiYgIXRoaXMuc3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xuICAgICAgdGhpcy5yZXNpemUuZW1pdCh0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaXNIYW5kbGUgPSAoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXNpemUtaGFuZGxlJyk7XG4gICAgY29uc3QgaW5pdGlhbFdpZHRoID0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IG1vdXNlRG93blNjcmVlblggPSBldmVudC5zY3JlZW5YO1xuXG4gICAgaWYgKGlzSGFuZGxlKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucmVzaXppbmcgPSB0cnVlO1xuXG4gICAgICBjb25zdCBtb3VzZXVwID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBtb3VzZXVwLnN1YnNjcmliZSgoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZXVwKCkpO1xuXG4gICAgICBjb25zdCBtb3VzZU1vdmVTdWIgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2V1cCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW92ZShlLCBpbml0aWFsV2lkdGgsIG1vdXNlRG93blNjcmVlblgpKTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKG1vdXNlTW92ZVN1Yik7XG4gICAgfVxuICB9XG5cbiAgbW92ZShldmVudDogTW91c2VFdmVudCwgaW5pdGlhbFdpZHRoOiBudW1iZXIsIG1vdXNlRG93blNjcmVlblg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1vdmVtZW50WCA9IGV2ZW50LnNjcmVlblggLSBtb3VzZURvd25TY3JlZW5YO1xuICAgIGNvbnN0IG5ld1dpZHRoID0gaW5pdGlhbFdpZHRoICsgbW92ZW1lbnRYO1xuXG4gICAgY29uc3Qgb3Zlck1pbldpZHRoID0gIXRoaXMubWluV2lkdGggfHwgbmV3V2lkdGggPj0gdGhpcy5taW5XaWR0aDtcbiAgICBjb25zdCB1bmRlck1heFdpZHRoID0gIXRoaXMubWF4V2lkdGggfHwgbmV3V2lkdGggPD0gdGhpcy5tYXhXaWR0aDtcblxuICAgIGlmIChvdmVyTWluV2lkdGggJiYgdW5kZXJNYXhXaWR0aCkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gYCR7bmV3V2lkdGh9cHhgO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=