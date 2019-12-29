/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Output, EventEmitter, ContentChildren, QueryList, KeyValueDiffers, Inject } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DOCUMENT } from '@angular/common';
export class OrderableDirective {
    /**
     * @param {?} differs
     * @param {?} document
     */
    constructor(differs, document) {
        this.document = document;
        this.reorder = new EventEmitter();
        this.targetChanged = new EventEmitter();
        this.differ = differs.find({}).create();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.draggables.forEach((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            d.dragStart.unsubscribe();
            d.dragging.unsubscribe();
            d.dragEnd.unsubscribe();
        }));
    }
    /**
     * @return {?}
     */
    updateSubscriptions() {
        /** @type {?} */
        const diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            /** @type {?} */
            const subscribe = (/**
             * @param {?} __0
             * @return {?}
             */
            ({ currentValue, previousValue }) => {
                unsubscribe({ previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(this.onDragStart.bind(this));
                    currentValue.dragging.subscribe(this.onDragging.bind(this));
                    currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
                }
            });
            /** @type {?} */
            const unsubscribe = (/**
             * @param {?} __0
             * @return {?}
             */
            ({ previousValue }) => {
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragging.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            });
            diffs.forEachAddedItem(subscribe);
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe);
        }
    }
    /**
     * @return {?}
     */
    onDragStart() {
        this.positions = {};
        /** @type {?} */
        let i = 0;
        for (const dragger of this.draggables.toArray()) {
            /** @type {?} */
            const elm = dragger.element;
            /** @type {?} */
            const left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onDragging({ element, model, event }) {
        /** @type {?} */
        const prevPos = this.positions[model.prop];
        /** @type {?} */
        const target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.targetChanged.emit({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.targetChanged.emit({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onDragEnd({ element, model, event }) {
        /** @type {?} */
        const prevPos = this.positions[model.prop];
        /** @type {?} */
        const target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    }
    /**
     * @param {?} model
     * @param {?} event
     * @return {?}
     */
    isTarget(model, event) {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const x = event.x || event.clientX;
        /** @type {?} */
        const y = event.y || event.clientY;
        /** @type {?} */
        const targets = this.document.elementsFromPoint(x, y);
        for (const prop in this.positions) {
            // current column position which throws event.
            /** @type {?} */
            const pos = this.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find((/**
             * @param {?} el
             * @return {?}
             */
            (el) => el === pos.element))) {
                return {
                    pos,
                    i
                };
            }
            i++;
        }
    }
    /**
     * @private
     * @return {?}
     */
    createMapDiffs() {
        return this.draggables.toArray().reduce((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        (acc, curr) => {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }), {});
    }
}
OrderableDirective.decorators = [
    { type: Directive, args: [{ selector: '[orderable]' },] }
];
/** @nocollapse */
OrderableDirective.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
OrderableDirective.propDecorators = {
    reorder: [{ type: Output }],
    targetChanged: [{ type: Output }],
    draggables: [{ type: ContentChildren, args: [DraggableDirective, { descendants: true },] }]
};
if (false) {
    /** @type {?} */
    OrderableDirective.prototype.reorder;
    /** @type {?} */
    OrderableDirective.prototype.targetChanged;
    /** @type {?} */
    OrderableDirective.prototype.draggables;
    /** @type {?} */
    OrderableDirective.prototype.positions;
    /** @type {?} */
    OrderableDirective.prototype.differ;
    /** @type {?} */
    OrderableDirective.prototype.lastDraggingIndex;
    /**
     * @type {?}
     * @private
     */
    OrderableDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsZUFBZSxFQUdmLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFXN0IsWUFBWSxPQUF3QixFQUE0QixRQUFhO1FBQWIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVZuRSxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVU5RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FB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aUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJELEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7O2tCQUUzQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFFaEMsaUZBQWlGO1lBQ2pGLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUMsRUFBRTtnQkFDeEUsT0FBTztvQkFDTCxHQUFHO29CQUNILENBQUM7aUJBQ0YsQ0FBQzthQUNIO1lBRUQsQ0FBQyxFQUFFLENBQUM7U0FDTDtJQUNILENBQUM7Ozs7O0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTTs7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEMsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDOzs7WUEzSUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTs7OztZQVJwQyxlQUFlOzRDQW9Cd0IsTUFBTSxTQUFDLFFBQVE7OztzQkFWckQsTUFBTTs0QkFDTixNQUFNO3lCQUVOLGVBQWUsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Ozs7SUFIMUQscUNBQTBEOztJQUMxRCwyQ0FBZ0U7O0lBRWhFLHdDQUMwQzs7SUFFMUMsdUNBQWU7O0lBQ2Ysb0NBQVk7O0lBQ1osK0NBQTBCOzs7OztJQUVZLHNDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW29yZGVyYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgT3JkZXJhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdGFyZ2V0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEcmFnZ2FibGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgZHJhZ2dhYmxlczogUXVlcnlMaXN0PERyYWdnYWJsZURpcmVjdGl2ZT47XG5cbiAgcG9zaXRpb25zOiBhbnk7XG4gIGRpZmZlcjogYW55O1xuICBsYXN0RHJhZ2dpbmdJbmRleDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIEhBQ0s6IEludmVzdGlnYXRlIEJldHRlciBXYXlcbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMuY2hhbmdlcy5zdWJzY3JpYmUodGhpcy51cGRhdGVTdWJzY3JpcHRpb25zLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZCA9PiB7XG4gICAgICBkLmRyYWdTdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgZC5kcmFnZ2luZy51bnN1YnNjcmliZSgpO1xuICAgICAgZC5kcmFnRW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpZmZzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmNyZWF0ZU1hcERpZmZzKCkpO1xuXG4gICAgaWYgKGRpZmZzKSB7XG4gICAgICBjb25zdCBzdWJzY3JpYmUgPSAoeyBjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUgfTogYW55KSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHsgcHJldmlvdXNWYWx1ZSB9KTtcblxuICAgICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgY3VycmVudFZhbHVlLmRyYWdTdGFydC5zdWJzY3JpYmUodGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICBjdXJyZW50VmFsdWUuZHJhZ2dpbmcuc3Vic2NyaWJlKHRoaXMub25EcmFnZ2luZy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICBjdXJyZW50VmFsdWUuZHJhZ0VuZC5zdWJzY3JpYmUodGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gKHsgcHJldmlvdXNWYWx1ZSB9OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLmRyYWdTdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHByZXZpb3VzVmFsdWUuZHJhZ2dpbmcudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLmRyYWdFbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZGlmZnMuZm9yRWFjaEFkZGVkSXRlbShzdWJzY3JpYmUpO1xuICAgICAgLy8gZGlmZnMuZm9yRWFjaENoYW5nZWRJdGVtKHN1YnNjcmliZS5iaW5kKHRoaXMpKTtcbiAgICAgIGRpZmZzLmZvckVhY2hSZW1vdmVkSXRlbSh1bnN1YnNjcmliZSk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7fTtcblxuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGRyYWdnZXIgb2YgdGhpcy5kcmFnZ2FibGVzLnRvQXJyYXkoKSkge1xuICAgICAgY29uc3QgZWxtID0gZHJhZ2dlci5lbGVtZW50O1xuICAgICAgY29uc3QgbGVmdCA9IHBhcnNlSW50KGVsbS5vZmZzZXRMZWZ0LnRvU3RyaW5nKCksIDApO1xuICAgICAgdGhpcy5wb3NpdGlvbnNbZHJhZ2dlci5kcmFnTW9kZWwucHJvcF0gPSB7XG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0OiBsZWZ0ICsgcGFyc2VJbnQoZWxtLm9mZnNldFdpZHRoLnRvU3RyaW5nKCksIDApLFxuICAgICAgICBpbmRleDogaSsrLFxuICAgICAgICBlbGVtZW50OiBlbG1cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgb25EcmFnZ2luZyh7IGVsZW1lbnQsIG1vZGVsLCBldmVudCB9OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2UG9zID0gdGhpcy5wb3NpdGlvbnNbbW9kZWwucHJvcF07XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5pc1RhcmdldChtb2RlbCwgZXZlbnQpO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgaWYgKHRoaXMubGFzdERyYWdnaW5nSW5kZXggIT09IHRhcmdldC5pKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0Q2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICBwcmV2SW5kZXg6IHRoaXMubGFzdERyYWdnaW5nSW5kZXgsXG4gICAgICAgICAgbmV3SW5kZXg6IHRhcmdldC5pLFxuICAgICAgICAgIGluaXRpYWxJbmRleDogcHJldlBvcy5pbmRleFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sYXN0RHJhZ2dpbmdJbmRleCA9IHRhcmdldC5pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0RHJhZ2dpbmdJbmRleCAhPT0gcHJldlBvcy5pbmRleCkge1xuICAgICAgdGhpcy50YXJnZXRDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBwcmV2SW5kZXg6IHRoaXMubGFzdERyYWdnaW5nSW5kZXgsXG4gICAgICAgIGluaXRpYWxJbmRleDogcHJldlBvcy5pbmRleFxuICAgICAgfSk7XG4gICAgICB0aGlzLmxhc3REcmFnZ2luZ0luZGV4ID0gcHJldlBvcy5pbmRleDtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdFbmQoeyBlbGVtZW50LCBtb2RlbCwgZXZlbnQgfTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJldlBvcyA9IHRoaXMucG9zaXRpb25zW21vZGVsLnByb3BdO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5pc1RhcmdldChtb2RlbCwgZXZlbnQpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMucmVvcmRlci5lbWl0KHtcbiAgICAgICAgcHJldkluZGV4OiBwcmV2UG9zLmluZGV4LFxuICAgICAgICBuZXdJbmRleDogdGFyZ2V0LmksXG4gICAgICAgIG1vZGVsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3REcmFnZ2luZ0luZGV4ID0gdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICdhdXRvJztcbiAgfVxuXG4gIGlzVGFyZ2V0KG1vZGVsOiBhbnksIGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCB4ID0gZXZlbnQueCB8fCBldmVudC5jbGllbnRYO1xuICAgIGNvbnN0IHkgPSBldmVudC55IHx8IGV2ZW50LmNsaWVudFk7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHRoaXMuZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoeCwgeSk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5wb3NpdGlvbnMpIHtcbiAgICAgIC8vIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uIHdoaWNoIHRocm93cyBldmVudC5cbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zaXRpb25zW3Byb3BdO1xuXG4gICAgICAvLyBzaW5jZSB3ZSBkcmFnIHRoZSBpbm5lciBzcGFuLCB3ZSBuZWVkIHRvIGZpbmQgaXQgaW4gdGhlIGVsZW1lbnRzIGF0IHRoZSBjdXJzb3JcbiAgICAgIGlmIChtb2RlbC5wcm9wICE9PSBwcm9wICYmIHRhcmdldHMuZmluZCgoZWw6IGFueSkgPT4gZWwgPT09IHBvcy5lbGVtZW50KSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBvcyxcbiAgICAgICAgICBpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcERpZmZzKCk6IHsgW2tleTogc3RyaW5nXTogRHJhZ2dhYmxlRGlyZWN0aXZlIH0ge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZXMudG9BcnJheSgpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICBhY2NbY3Vyci5kcmFnTW9kZWwuJCRpZF0gPSBjdXJyO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cbn1cbiJdfQ==