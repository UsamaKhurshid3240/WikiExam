(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global.angular = global.angular || {}, global.angular.datatables = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, function (exports, core, rxjs, common) { 'use strict';

    /**
     * @license
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
     */
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var DataTableDirective = /** @class */ (function () {
        function DataTableDirective(el) {
            this.el = el;
            /**
             * The DataTable option you pass to configure your table.
             */
            this.dtOptions = {};
        }
        DataTableDirective.prototype.ngOnInit = function () {
            var _this = this;
            if (this.dtTrigger) {
                this.dtTrigger.subscribe(function () {
                    _this.displayTable();
                });
            }
            else {
                this.displayTable();
            }
        };
        DataTableDirective.prototype.ngOnDestroy = function () {
            if (this.dtTrigger) {
                this.dtTrigger.unsubscribe();
            }
            if (this.dt) {
                this.dt.destroy(true);
            }
        };
        DataTableDirective.prototype.displayTable = function () {
            var _this = this;
            this.dtInstance = new Promise(function (resolve, reject) {
                Promise.resolve(_this.dtOptions).then(function (dtOptions) {
                    // Using setTimeout as a "hack" to be "part" of NgZone
                    setTimeout(function () {
                        _this.dt = $(_this.el.nativeElement).DataTable(dtOptions);
                        resolve(_this.dt);
                    });
                });
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DataTableDirective.prototype, "dtOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", rxjs.Subject)
        ], DataTableDirective.prototype, "dtTrigger", void 0);
        DataTableDirective = __decorate([
            core.Directive({
                selector: '[datatable]'
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], DataTableDirective);
        return DataTableDirective;
    }());

    /**
     * @license
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
     */
    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DataTablesModule = /** @class */ (function () {
        function DataTablesModule() {
        }
        DataTablesModule_1 = DataTablesModule;
        DataTablesModule.forRoot = function () {
            return {
                ngModule: DataTablesModule_1
            };
        };
        var DataTablesModule_1;
        DataTablesModule = DataTablesModule_1 = __decorate$1([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [DataTableDirective],
                exports: [DataTableDirective]
            })
        ], DataTablesModule);
        return DataTablesModule;
    }());

    /**
     * @license
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
     */

    exports.DataTableDirective = DataTableDirective;
    exports.DataTablesModule = DataTablesModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
