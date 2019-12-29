/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Output, EventEmitter, Renderer2, NgZone, HostBinding, ChangeDetectionStrategy } from '@angular/core';
var ScrollerComponent = /** @class */ (function () {
    function ScrollerComponent(ngZone, element, renderer) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this._scrollEventListener = null;
        this.element = element.nativeElement;
    }
    /**
     * @return {?}
     */
    ScrollerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            /** @type {?} */
            var renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this._scrollEventListener = this.onScrolled.bind(this);
            this.parentElement.addEventListener('scroll', this._scrollEventListener);
        }
    };
    /**
     * @return {?}
     */
    ScrollerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._scrollEventListener) {
            this.parentElement.removeEventListener('scroll', this._scrollEventListener);
            this._scrollEventListener = null;
        }
    };
    /**
     * @param {?} offsetY
     * @return {?}
     */
    ScrollerComponent.prototype.setOffset = /**
     * @param {?} offsetY
     * @return {?}
     */
    function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ScrollerComponent.prototype.onScrolled = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var dom = (/** @type {?} */ (event.currentTarget));
        requestAnimationFrame((/**
         * @return {?}
         */
        function () {
            _this.scrollYPos = dom.scrollTop;
            _this.scrollXPos = dom.scrollLeft;
            _this.updateOffset();
        }));
    };
    /**
     * @return {?}
     */
    ScrollerComponent.prototype.updateOffset = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    ScrollerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-scroller',
                    template: "\n    <ng-content></ng-content>\n  ",
                    host: {
                        class: 'datatable-scroll'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ScrollerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ScrollerComponent.propDecorators = {
        scrollbarV: [{ type: Input }],
        scrollbarH: [{ type: Input }],
        scrollHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
        scrollWidth: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
        scroll: [{ type: Output }]
    };
    return ScrollerComponent;
}());
export { ScrollerComponent };
if (false) {
    /** @type {?} */
    ScrollerComponent.prototype.scrollbarV;
    /** @type {?} */
    ScrollerComponent.prototype.scrollbarH;
    /** @type {?} */
    ScrollerComponent.prototype.scrollHeight;
    /** @type {?} */
    ScrollerComponent.prototype.scrollWidth;
    /** @type {?} */
    ScrollerComponent.prototype.scroll;
    /** @type {?} */
    ScrollerComponent.prototype.scrollYPos;
    /** @type {?} */
    ScrollerComponent.prototype.scrollXPos;
    /** @type {?} */
    ScrollerComponent.prototype.prevScrollYPos;
    /** @type {?} */
    ScrollerComponent.prototype.prevScrollXPos;
    /** @type {?} */
    ScrollerComponent.prototype.element;
    /** @type {?} */
    ScrollerComponent.prototype.parentElement;
    /** @type {?} */
    ScrollerComponent.prototype.onScrollListener;
    /**
     * @type {?}
     * @private
     */
    ScrollerComponent.prototype._scrollEventListener;
    /**
     * @type {?}
     * @private
     */
    ScrollerComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    ScrollerComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCO0lBa0NFLDJCQUFvQixNQUFjLEVBQUUsT0FBbUIsRUFBVSxRQUFtQjtRQUFoRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQStCLGFBQVEsR0FBUixRQUFRLENBQVc7UUF2QjNFLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVUzQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBS25CLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUd2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjtRQUNFLHdDQUF3QztRQUN4QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTs7Z0JBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTtZQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7O0lBRUQscUNBQVM7Ozs7SUFBVCxVQUFVLE9BQWU7UUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7O0lBRUQsc0NBQVU7Ozs7SUFBVixVQUFXLEtBQWlCO1FBQTVCLGlCQU9DOztZQU5PLEdBQUcsR0FBWSxtQkFBUyxLQUFLLENBQUMsYUFBYSxFQUFBO1FBQ2pELHFCQUFxQjs7O1FBQUM7WUFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsd0NBQVk7OztJQUFaOztZQUNNLFNBQWlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNoRCxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixTQUFTLFdBQUE7WUFDVCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQzs7Z0JBdEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUscUNBRVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7cUJBQzFCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFsQkMsTUFBTTtnQkFKTixVQUFVO2dCQUdWLFNBQVM7Ozs2QkFxQlIsS0FBSzs2QkFDTCxLQUFLOytCQUVMLFdBQVcsU0FBQyxpQkFBaUIsY0FDN0IsS0FBSzs4QkFHTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7eUJBR0wsTUFBTTs7SUFpRVQsd0JBQUM7Q0FBQSxBQXZGRCxJQXVGQztTQTdFWSxpQkFBaUI7OztJQUM1Qix1Q0FBcUM7O0lBQ3JDLHVDQUFxQzs7SUFFckMseUNBRXFCOztJQUVyQix3Q0FFb0I7O0lBRXBCLG1DQUF5RDs7SUFFekQsdUNBQXVCOztJQUN2Qix1Q0FBdUI7O0lBQ3ZCLDJDQUEyQjs7SUFDM0IsMkNBQTJCOztJQUMzQixvQ0FBYTs7SUFDYiwwQ0FBbUI7O0lBQ25CLDZDQUFzQjs7Ozs7SUFFdEIsaURBQXlDOzs7OztJQUU3QixtQ0FBc0I7Ozs7O0lBQXVCLHFDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjIsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1zY3JvbGxlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtc2Nyb2xsJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgc2Nyb2xsYmFyVjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQucHgnKVxuICBASW5wdXQoKVxuICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcbiAgQElucHV0KClcbiAgc2Nyb2xsV2lkdGg6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgc2Nyb2xsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzY3JvbGxZUG9zOiBudW1iZXIgPSAwO1xuICBzY3JvbGxYUG9zOiBudW1iZXIgPSAwO1xuICBwcmV2U2Nyb2xsWVBvczogbnVtYmVyID0gMDtcbiAgcHJldlNjcm9sbFhQb3M6IG51bWJlciA9IDA7XG4gIGVsZW1lbnQ6IGFueTtcbiAgcGFyZW50RWxlbWVudDogYW55O1xuICBvblNjcm9sbExpc3RlbmVyOiBhbnk7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsRXZlbnRMaXN0ZW5lcjogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBtYW51YWwgYmluZCBzbyB3ZSBkb24ndCBhbHdheXMgbGlzdGVuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViB8fCB0aGlzLnNjcm9sbGJhckgpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlcjtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHJlbmRlcmVyLnBhcmVudE5vZGUocmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnQpKTtcbiAgICAgIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIgPSB0aGlzLm9uU2Nyb2xsZWQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxFdmVudExpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIpO1xuICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0T2Zmc2V0KG9mZnNldFk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgPSBvZmZzZXRZO1xuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkb206IEVsZW1lbnQgPSA8RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbFlQb3MgPSBkb20uc2Nyb2xsVG9wO1xuICAgICAgdGhpcy5zY3JvbGxYUG9zID0gZG9tLnNjcm9sbExlZnQ7XG4gICAgICB0aGlzLnVwZGF0ZU9mZnNldCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlT2Zmc2V0KCk6IHZvaWQge1xuICAgIGxldCBkaXJlY3Rpb246IHN0cmluZztcbiAgICBpZiAodGhpcy5zY3JvbGxZUG9zIDwgdGhpcy5wcmV2U2Nyb2xsWVBvcykge1xuICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY3JvbGxZUG9zID4gdGhpcy5wcmV2U2Nyb2xsWVBvcykge1xuICAgICAgZGlyZWN0aW9uID0gJ3VwJztcbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbC5lbWl0KHtcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIHNjcm9sbFlQb3M6IHRoaXMuc2Nyb2xsWVBvcyxcbiAgICAgIHNjcm9sbFhQb3M6IHRoaXMuc2Nyb2xsWFBvc1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcmV2U2Nyb2xsWVBvcyA9IHRoaXMuc2Nyb2xsWVBvcztcbiAgICB0aGlzLnByZXZTY3JvbGxYUG9zID0gdGhpcy5zY3JvbGxYUG9zO1xuICB9XG59XG4iXX0=