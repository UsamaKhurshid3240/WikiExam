/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Output, EventEmitter, Renderer2, NgZone, HostBinding, ChangeDetectionStrategy } from '@angular/core';
export class ScrollerComponent {
    /**
     * @param {?} ngZone
     * @param {?} element
     * @param {?} renderer
     */
    constructor(ngZone, element, renderer) {
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
    ngOnInit() {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            /** @type {?} */
            const renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this._scrollEventListener = this.onScrolled.bind(this);
            this.parentElement.addEventListener('scroll', this._scrollEventListener);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._scrollEventListener) {
            this.parentElement.removeEventListener('scroll', this._scrollEventListener);
            this._scrollEventListener = null;
        }
    }
    /**
     * @param {?} offsetY
     * @return {?}
     */
    setOffset(offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScrolled(event) {
        /** @type {?} */
        const dom = (/** @type {?} */ (event.currentTarget));
        requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            this.scrollYPos = dom.scrollTop;
            this.scrollXPos = dom.scrollLeft;
            this.updateOffset();
        }));
    }
    /**
     * @return {?}
     */
    updateOffset() {
        /** @type {?} */
        let direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    }
}
ScrollerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-scroller',
                template: `
    <ng-content></ng-content>
  `,
                host: {
                    class: 'datatable-scroll'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ScrollerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
ScrollerComponent.propDecorators = {
    scrollbarV: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    scrollHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    scrollWidth: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
    scroll: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBY3ZCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQXdCNUIsWUFBb0IsTUFBYyxFQUFFLE9BQW1CLEVBQVUsUUFBbUI7UUFBaEUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUErQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdkIzRSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFVM0IsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUtuQix5QkFBb0IsR0FBUSxJQUFJLENBQUM7UUFHdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFOztrQkFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQWlCOztjQUNwQixHQUFHLEdBQVksbUJBQVMsS0FBSyxDQUFDLGFBQWEsRUFBQTtRQUNqRCxxQkFBcUI7OztRQUFDLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxZQUFZOztZQUNOLFNBQWlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNoRCxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixTQUFTO1lBQ1QsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM1QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7OztZQXRGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOztHQUVUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQWxCQyxNQUFNO1lBSk4sVUFBVTtZQUdWLFNBQVM7Ozt5QkFxQlIsS0FBSzt5QkFDTCxLQUFLOzJCQUVMLFdBQVcsU0FBQyxpQkFBaUIsY0FDN0IsS0FBSzswQkFHTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7cUJBR0wsTUFBTTs7OztJQVhQLHVDQUFxQzs7SUFDckMsdUNBQXFDOztJQUVyQyx5Q0FFcUI7O0lBRXJCLHdDQUVvQjs7SUFFcEIsbUNBQXlEOztJQUV6RCx1Q0FBdUI7O0lBQ3ZCLHVDQUF1Qjs7SUFDdkIsMkNBQTJCOztJQUMzQiwyQ0FBMkI7O0lBQzNCLG9DQUFhOztJQUNiLDBDQUFtQjs7SUFDbkIsNkNBQXNCOzs7OztJQUV0QixpREFBeUM7Ozs7O0lBRTdCLG1DQUFzQjs7Ozs7SUFBdUIscUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMixcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSG9zdEJpbmRpbmcsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXNjcm9sbGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1zY3JvbGwnXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNjcm9sbGJhckg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIEBJbnB1dCgpXG4gIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBASW5wdXQoKVxuICBzY3JvbGxXaWR0aDogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNjcm9sbFlQb3M6IG51bWJlciA9IDA7XG4gIHNjcm9sbFhQb3M6IG51bWJlciA9IDA7XG4gIHByZXZTY3JvbGxZUG9zOiBudW1iZXIgPSAwO1xuICBwcmV2U2Nyb2xsWFBvczogbnVtYmVyID0gMDtcbiAgZWxlbWVudDogYW55O1xuICBwYXJlbnRFbGVtZW50OiBhbnk7XG4gIG9uU2Nyb2xsTGlzdGVuZXI6IGFueTtcblxuICBwcml2YXRlIF9zY3JvbGxFdmVudExpc3RlbmVyOiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIG1hbnVhbCBiaW5kIHNvIHdlIGRvbid0IGFsd2F5cyBsaXN0ZW5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWIHx8IHRoaXMuc2Nyb2xsYmFySCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gcmVuZGVyZXIucGFyZW50Tm9kZShyZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudCkpO1xuICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lciA9IHRoaXMub25TY3JvbGxlZC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zY3JvbGxFdmVudExpc3RlbmVyKSB7XG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lcik7XG4gICAgICB0aGlzLl9zY3JvbGxFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRPZmZzZXQob2Zmc2V0WTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnNjcm9sbFRvcCA9IG9mZnNldFk7XG4gICAgfVxuICB9XG5cbiAgb25TY3JvbGxlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRvbTogRWxlbWVudCA9IDxFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsWVBvcyA9IGRvbS5zY3JvbGxUb3A7XG4gICAgICB0aGlzLnNjcm9sbFhQb3MgPSBkb20uc2Nyb2xsTGVmdDtcbiAgICAgIHRoaXMudXBkYXRlT2Zmc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVPZmZzZXQoKTogdm9pZCB7XG4gICAgbGV0IGRpcmVjdGlvbjogc3RyaW5nO1xuICAgIGlmICh0aGlzLnNjcm9sbFlQb3MgPCB0aGlzLnByZXZTY3JvbGxZUG9zKSB7XG4gICAgICBkaXJlY3Rpb24gPSAnZG93bic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcm9sbFlQb3MgPiB0aGlzLnByZXZTY3JvbGxZUG9zKSB7XG4gICAgICBkaXJlY3Rpb24gPSAndXAnO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsLmVtaXQoe1xuICAgICAgZGlyZWN0aW9uLFxuICAgICAgc2Nyb2xsWVBvczogdGhpcy5zY3JvbGxZUG9zLFxuICAgICAgc2Nyb2xsWFBvczogdGhpcy5zY3JvbGxYUG9zXG4gICAgfSk7XG5cbiAgICB0aGlzLnByZXZTY3JvbGxZUG9zID0gdGhpcy5zY3JvbGxZUG9zO1xuICAgIHRoaXMucHJldlNjcm9sbFhQb3MgPSB0aGlzLnNjcm9sbFhQb3M7XG4gIH1cbn1cbiJdfQ==