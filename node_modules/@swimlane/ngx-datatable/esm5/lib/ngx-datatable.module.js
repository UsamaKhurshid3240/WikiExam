/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
var NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param configuration
     */
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param {?} configuration
     * @return {?}
     */
    NgxDatatableModule.forRoot = /**
     * Configure global configuration via INgxDatatableConfig
     * @param {?} configuration
     * @return {?}
     */
    function (configuration) {
        return {
            ngModule: NgxDatatableModule,
            providers: [{ provide: 'configuration', useValue: configuration }]
        };
    };
    NgxDatatableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
                    declarations: [
                        DataTableFooterTemplateDirective,
                        VisibilityDirective,
                        DraggableDirective,
                        ResizeableDirective,
                        OrderableDirective,
                        LongPressDirective,
                        ScrollerComponent,
                        DatatableComponent,
                        DataTableColumnDirective,
                        DataTableHeaderComponent,
                        DataTableHeaderCellComponent,
                        DataTableBodyComponent,
                        DataTableFooterComponent,
                        DataTablePagerComponent,
                        ProgressBarComponent,
                        DataTableBodyRowComponent,
                        DataTableRowWrapperComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableBodyCellComponent,
                        DataTableSelectionComponent,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DatatableFooterDirective,
                        DatatableGroupHeaderTemplateDirective,
                        DataTableSummaryRowComponent
                    ],
                    exports: [
                        DatatableComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableColumnDirective,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DataTableFooterTemplateDirective,
                        DatatableFooterDirective,
                        DataTablePagerComponent,
                        DatatableGroupHeaderTemplateDirective
                    ]
                },] }
    ];
    return NgxDatatableModule;
}());
export { NgxDatatableModule };
/**
 * Interface definition for INgxDatatableConfig global configuration
 * @record
 */
export function INgxDatatableConfig() { }
if (false) {
    /** @type {?} */
    INgxDatatableConfig.prototype.messages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZGF0YXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM5RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMvRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUUvRjtJQUFBO0lBMkRBLENBQUM7SUFWQzs7O09BR0c7Ozs7OztJQUNJLDBCQUFPOzs7OztJQUFkLFVBQWUsYUFBa0M7UUFDL0MsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsQ0FBQztTQUNuRSxDQUFDO0lBQ0osQ0FBQzs7Z0JBMURGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztvQkFDcEUsWUFBWSxFQUFFO3dCQUNaLGdDQUFnQzt3QkFDaEMsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsNEJBQTRCO3dCQUM1QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5Qiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0Isd0JBQXdCO3dCQUN4QixxQ0FBcUM7d0JBQ3JDLDRCQUE0QjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLDRCQUE0Qjt3QkFDNUIsNkJBQTZCO3dCQUM3QixnQ0FBZ0M7d0JBQ2hDLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixxQ0FBcUM7cUJBQ3RDO2lCQUNGOztJQVlELHlCQUFDO0NBQUEsQUEzREQsSUEyREM7U0FYWSxrQkFBa0I7Ozs7O0FBZ0IvQix5Q0FNQzs7O0lBTEMsdUNBSUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnNIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlzaWJpbGl0eURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXNpYmlsaXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNpemVhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExvbmdQcmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVQYWdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LXJvdy13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm93LWRldGFpbC9yb3ctZGV0YWlsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwtdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVTZWxlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi1oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4tY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy90cmVlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvc3VtbWFyeS9zdW1tYXJ5LXJvdy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbU2Nyb2xsYmFySGVscGVyLCBEaW1lbnNpb25zSGVscGVyLCBDb2x1bW5DaGFuZ2VzU2VydmljZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERhdGFUYWJsZUZvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIFZpc2liaWxpdHlEaXJlY3RpdmUsXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxuICAgIFJlc2l6ZWFibGVEaXJlY3RpdmUsXG4gICAgT3JkZXJhYmxlRGlyZWN0aXZlLFxuICAgIExvbmdQcmVzc0RpcmVjdGl2ZSxcbiAgICBTY3JvbGxlckNvbXBvbmVudCxcbiAgICBEYXRhdGFibGVDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUJvZHlDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50LFxuICAgIFByb2dyZXNzQmFyQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlUm93V3JhcHBlckNvbXBvbmVudCxcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQm9keUNlbGxDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLFxuICAgIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGF0YWJsZUNvbXBvbmVudCxcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLFxuICAgIERhdGFUYWJsZUZvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVQYWdlckNvbXBvbmVudCxcbiAgICBEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0YXRhYmxlTW9kdWxlIHtcbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBnbG9iYWwgY29uZmlndXJhdGlvbiB2aWEgSU5neERhdGF0YWJsZUNvbmZpZ1xuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvblxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbjogSU5neERhdGF0YWJsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiAnY29uZmlndXJhdGlvbicsIHVzZVZhbHVlOiBjb25maWd1cmF0aW9uIH1dXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBkZWZpbml0aW9uIGZvciBJTmd4RGF0YXRhYmxlQ29uZmlnIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU5neERhdGF0YWJsZUNvbmZpZyB7XG4gIG1lc3NhZ2VzOiB7XG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmc7IC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZCwgYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xuICAgIHRvdGFsTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxuICAgIHNlbGVjdGVkTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxuICB9O1xufVxuIl19