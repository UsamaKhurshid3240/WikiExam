/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
export class ScrollbarHelper {
    /**
     * @param {?} document
     */
    constructor(document) {
        this.document = document;
        this.width = this.getWidth();
    }
    /**
     * @return {?}
     */
    getWidth() {
        /** @type {?} */
        const outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        /** @type {?} */
        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        /** @type {?} */
        const inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        /** @type {?} */
        const widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }
}
ScrollbarHelper.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollbarHelper.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /** @type {?} */
    ScrollbarHelper.prototype.width;
    /**
     * @type {?}
     * @private
     */
    ScrollbarHelper.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBTzNDLE1BQU0sT0FBTyxlQUFlOzs7O0lBRzFCLFlBQXNDLFFBQWE7UUFBYixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBRm5ELFVBQUssR0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFc0IsQ0FBQzs7OztJQUV2RCxRQUFROztjQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDaEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUVoQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVc7UUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztjQUUxQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2hELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUMzQixLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUVuQixlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVc7UUFDekMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEMsT0FBTyxhQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ3pDLENBQUM7OztZQXhCRixVQUFVOzs7OzRDQUlJLE1BQU0sU0FBQyxRQUFROzs7O0lBRjVCLGdDQUFnQzs7Ozs7SUFFcEIsbUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHNjcm9sbGJhci4gIE5lc2MgZm9yIHdpbmRvd3NcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEzMzgyODczLzg4ODE2NVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Nyb2xsYmFySGVscGVyIHtcbiAgd2lkdGg6IG51bWJlciA9IHRoaXMuZ2V0V2lkdGgoKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHt9XG5cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBvdXRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIG91dGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICBvdXRlci5zdHlsZS5tc092ZXJmbG93U3R5bGUgPSAnc2Nyb2xsYmFyJztcbiAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuXG4gICAgY29uc3Qgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG5cbiAgICBjb25zdCBpbm5lciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gICAgY29uc3Qgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbiAgfVxufVxuIl19