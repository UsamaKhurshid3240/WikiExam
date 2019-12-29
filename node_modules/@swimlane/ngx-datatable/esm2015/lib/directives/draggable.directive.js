/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
export class DraggableDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new EventEmitter();
        this.dragging = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroySubscription();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseup(event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        // we only want to drag the inner header text
        /** @type {?} */
        const isDragElm = ((/** @type {?} */ (event.target))).classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            /** @type {?} */
            const mouseDownPos = { x: event.clientX, y: event.clientY };
            /** @type {?} */
            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => this.onMouseup(ev)));
            /** @type {?} */
            const mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => this.move(ev, mouseDownPos)));
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    /**
     * @param {?} event
     * @param {?} mouseDownPos
     * @return {?}
     */
    move(event, mouseDownPos) {
        if (!this.isDragging)
            return;
        /** @type {?} */
        const x = event.clientX - mouseDownPos.x;
        /** @type {?} */
        const y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = `${x}px`;
        if (this.dragY)
            this.element.style.top = `${y}px`;
        this.element.classList.add('dragging');
        this.dragging.emit({
            event,
            element: this.element,
            model: this.dragModel
        });
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
DraggableDirective.decorators = [
    { type: Directive, args: [{ selector: '[draggable]' },] }
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: ElementRef }
];
DraggableDirective.propDecorators = {
    dragEventTarget: [{ type: Input }],
    dragModel: [{ type: Input }],
    dragX: [{ type: Input }],
    dragY: [{ type: Input }],
    dragStart: [{ type: Output }],
    dragging: [{ type: Output }],
    dragEnd: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DraggableDirective.prototype.dragEventTarget;
    /** @type {?} */
    DraggableDirective.prototype.dragModel;
    /** @type {?} */
    DraggableDirective.prototype.dragX;
    /** @type {?} */
    DraggableDirective.prototype.dragY;
    /** @type {?} */
    DraggableDirective.prototype.dragStart;
    /** @type {?} */
    DraggableDirective.prototype.dragging;
    /** @type {?} */
    DraggableDirective.prototype.dragEnd;
    /** @type {?} */
    DraggableDirective.prototype.element;
    /** @type {?} */
    DraggableDirective.prototype.isDragging;
    /** @type {?} */
    DraggableDirective.prototype.subscription;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7O0FBWTNDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFjN0IsWUFBWSxPQUFtQjtRQVh0QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFFckIsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHMUQsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUkxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDcEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FB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Ozs7O0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBL0ZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7Ozs7WUFibEIsVUFBVTs7OzhCQWUzQixLQUFLO3dCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUVMLE1BQU07dUJBQ04sTUFBTTtzQkFDTixNQUFNOzs7O0lBUFAsNkNBQThCOztJQUM5Qix1Q0FBd0I7O0lBQ3hCLG1DQUErQjs7SUFDL0IsbUNBQStCOztJQUUvQix1Q0FBNEQ7O0lBQzVELHNDQUEyRDs7SUFDM0QscUNBQTBEOztJQUUxRCxxQ0FBcUI7O0lBQ3JCLHdDQUE0Qjs7SUFDNUIsMENBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL2V2ZW50cyc7XG5cbi8qKlxuICogRHJhZ2dhYmxlIERpcmVjdGl2ZSBmb3IgQW5ndWxhcjJcbiAqXG4gKiBJbnNwaXJhdGlvbjpcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL0FuZ3VsYXJDbGFzcy9hbmd1bGFyMi1leGFtcGxlcy9ibG9iL21hc3Rlci9yeC1kcmFnZ2FibGUvZGlyZWN0aXZlcy9kcmFnZ2FibGUudHNcbiAqICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTY2MjUzMC9ob3ctdG8taW1wbGVtZW50LWRyYWctYW5kLWRyb3AtaW4tYW5ndWxhcjJcbiAqXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkcmFnZ2FibGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZHJhZ0V2ZW50VGFyZ2V0OiBhbnk7XG4gIEBJbnB1dCgpIGRyYWdNb2RlbDogYW55O1xuICBASW5wdXQoKSBkcmFnWDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGRyYWdZOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRyYWdnaW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdFdmVudFRhcmdldCddICYmIGNoYW5nZXNbJ2RyYWdFdmVudFRhcmdldCddLmN1cnJlbnRWYWx1ZSAmJiB0aGlzLmRyYWdNb2RlbC5kcmFnZ2luZykge1xuICAgICAgdGhpcy5vbk1vdXNlZG93bihjaGFuZ2VzWydkcmFnRXZlbnRUYXJnZXQnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIG9uTW91c2V1cChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcblxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xuICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoe1xuICAgICAgICBldmVudCxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBtb2RlbDogdGhpcy5kcmFnTW9kZWxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gd2Ugb25seSB3YW50IHRvIGRyYWcgdGhlIGlubmVyIGhlYWRlciB0ZXh0XG4gICAgY29uc3QgaXNEcmFnRWxtID0gKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygnZHJhZ2dhYmxlJyk7XG5cbiAgICBpZiAoaXNEcmFnRWxtICYmICh0aGlzLmRyYWdYIHx8IHRoaXMuZHJhZ1kpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgbW91c2VEb3duUG9zID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XG5cbiAgICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG1vdXNldXAuc3Vic2NyaWJlKChldjogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNldXAoZXYpKTtcblxuICAgICAgY29uc3QgbW91c2VNb3ZlU3ViID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNldXApKVxuICAgICAgICAuc3Vic2NyaWJlKChldjogTW91c2VFdmVudCkgPT4gdGhpcy5tb3ZlKGV2LCBtb3VzZURvd25Qb3MpKTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKG1vdXNlTW92ZVN1Yik7XG5cbiAgICAgIHRoaXMuZHJhZ1N0YXJ0LmVtaXQoe1xuICAgICAgICBldmVudCxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBtb2RlbDogdGhpcy5kcmFnTW9kZWxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIG1vdXNlRG93blBvczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gbW91c2VEb3duUG9zLng7XG4gICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSBtb3VzZURvd25Qb3MueTtcblxuICAgIGlmICh0aGlzLmRyYWdYKSB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGAke3h9cHhgO1xuICAgIGlmICh0aGlzLmRyYWdZKSB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gYCR7eX1weGA7XG5cbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7XG4gICAgICBldmVudCxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgIG1vZGVsOiB0aGlzLmRyYWdNb2RlbFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVN1YnNjcmlwdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==