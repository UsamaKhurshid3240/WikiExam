/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './angular-datatables.directive';
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
    DataTablesModule = DataTablesModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [DataTableDirective],
            exports: [DataTableDirective]
        })
    ], DataTablesModule);
    return DataTablesModule;
}());
export { DataTablesModule };
//# sourceMappingURL=angular-datatables.module.js.map