(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.css":
/*!*********************************************************************************************************!*\
  !*** ./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "label {\r\n    display: inline-block;\r\n    margin-right: 5px;\r\n    margin-left: 5px;\r\n    margin-top: 5px;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.html":
/*!**********************************************************************************************************!*\
  !*** ./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\" width:100%; height: 100%;\"  >\n\n\n    \n\n    <div class=\"row\">\n        <div class=\"text-left\" >\n            <label>Search </label>\n            <input type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n            \n        </div>\n\n\n        <div class=\" text-right btn-group-sm\">\n            <button class=\"btn btn-danger\"  (click)=\"deleteChanges()\" [disabled]=\"comptadorCanvis <= 0\">Delete Changes</button>\n            <button class=\"btn btn-warning\" (click)=\"undo()\" [disabled]=\"comptadorCanvis <= 0\" >Undo</button>\n            <button class=\"btn btn-warning\" (click)=\"redo()\" [disabled]=\"comptadorRedo <= 0\">Redo</button>\n            <button class=\"btn btn-success\" (click)=\"applyChanges()\" [disabled]=\"comptadorCanvis <= 0\" >Apply Changes</button>\n        </div>\n\n        \n        <div class=\" text-right btn-group-sm\">\n            <button class=\"btn btn-secondary\" (click)=\"removeData()\">Remove</button>\n            <button class=\"btn btn-success\" (click)=\"newData()\">New</button>\n        </div>\n\n\n    </div>\n\n    <div class=\"row\" style=\"width:100%; height: 100%\">\n        <div class=\"ag-theme-balham\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            rowSelection=\"multiple\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: DataGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGridComponent", function() { return DataGridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ag_grid_community_all_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ag-grid-community/all-modules */ "./node_modules/@ag-grid-community/all-modules/dist/es6/main.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};


var DataGridComponent = /** @class */ (function () {
    function DataGridComponent() {
        this.modules = _ag_grid_community_all_modules__WEBPACK_IMPORTED_MODULE_1__["AllCommunityModules"];
        this.map = new Map(); // Guardarem l'id de les celes modificades i el nº d'edicions sobre aquestes
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.new = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.sendChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.comptadorCanvis = 0;
        this.comptadorCanvisAnterior = 0;
        this.comptadorRedo = 0;
        this.gridOptions = {
            defaultColDef: {
                flex: 1,
                filter: true,
                editable: true,
                minWidth: 100,
                cellStyle: { backgroundColor: '#FFFFFF' },
            },
            rowSelection: 'multiple',
        };
    }
    DataGridComponent.prototype.onGridReady = function (params) {
        this.params = params;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.rowHeight = 100;
        this.getElements();
        this.gridApi.sizeColumnsToFit();
    };
    DataGridComponent.prototype.quickSearch = function () {
        this.gridApi.setQuickFilter(this.searchValue);
    };
    DataGridComponent.prototype.getElements = function () {
        var _this = this;
        this.getAll()
            .subscribe(function (items) {
            console.log(items);
            _this.rowData = items;
        });
    };
    DataGridComponent.prototype.removeData = function () {
        this.gridApi.stopEditing(false);
        var selectedNodes = this.gridApi.getSelectedNodes();
        var selectedData = selectedNodes.map(function (node) { return node.data; });
        console.log(selectedData);
        this.remove.emit(selectedData);
    };
    DataGridComponent.prototype.newData = function () {
        console.log(this.comptadorCanvis);
        this.gridApi.stopEditing(false);
        this.new.emit(true);
    };
    DataGridComponent.prototype.applyChanges = function () {
        var itemsChanged = [];
        this.gridApi.stopEditing(false);
        try {
            for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                itemsChanged.push(this.gridApi.getRowNode(key).data);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.sendChanges.emit(itemsChanged);
        this.map.clear();
        this.comptadorCanvis = 0;
        this.comptadorCanvisAnterior = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
        var e_1, _c;
    };
    DataGridComponent.prototype.deleteChanges = function () {
        console.log(this.comptadorCanvis);
        for (var i = 0; i < this.comptadorCanvis; i++) {
            this.gridApi.undoCellEditing();
        }
        this.map.clear();
        this.comptadorCanvisAnterior = 0;
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    };
    DataGridComponent.prototype.undo = function () {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        this.comptadorCanvis -= 1;
        this.comptadorRedo += 1;
    };
    DataGridComponent.prototype.redo = function () {
        this.gridApi.stopEditing(false);
        this.gridApi.redoCellEditing();
        this.comptadorCanvis += 1;
        this.comptadorRedo -= 1;
    };
    DataGridComponent.prototype.onCellEditingStopped = function (e) {
        this.comptadorCanvis++;
        this.comptadorRedo = 0;
        this.onCellValueChanged(e);
    };
    DataGridComponent.prototype.onCellValueChanged = function (params) {
        this.params = params; // Guardarem els paramatres actuals per si hem de fer un apply changes
        if (this.comptadorCanvis > this.comptadorCanvisAnterior) 
        // Aquesta condició serà certa si venim d'editar o de fer un redo , però no si venim d'un undo
        {
            if (!this.map.has(params.node.id)) {
                this.map.set(params.node.id, 1);
                var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#17AB4D' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
            }
            else {
                var modificacionsActuals = this.map.get(params.node.id);
                this.map.set(params.node.id, (modificacionsActuals + 1));
            }
            this.comptadorCanvisAnterior++;
        }
        if (this.comptadorCanvis < this.comptadorCanvisAnterior) {
            // Com sabem que ja haviem editat la cela, agafem el nombre de modificacions que l'hem fet
            var modificacionsActuals = this.map.get(params.node.id);
            if (modificacionsActuals === 1) {
                // Si només te una modificació, vol dir que amb l'undo hem deixat la cela com a l'estat inicial, pel que l'hem de borrar del map
                this.map.delete(params.node.id);
                var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                this.gridApi.redrawRows({ rowNodes: [row] });
            }
            else {
                this.map.set(params.node.id, (modificacionsActuals - 1));
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DataGridComponent.prototype, "columnDefs", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Function)
    ], DataGridComponent.prototype, "getAll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataGridComponent.prototype, "remove", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataGridComponent.prototype, "new", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataGridComponent.prototype, "sendChanges", void 0);
    DataGridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-data-grid',
            template: __webpack_require__(/*! ./data-grid.component.html */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.html"),
            styles: [__webpack_require__(/*! ./data-grid.component.css */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DataGridComponent);
    return DataGridComponent;
}());



/***/ }),

/***/ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/public_api.ts":
/*!*************************************************************************************!*\
  !*** ./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/public_api.ts ***!
  \*************************************************************************************/
/*! exports provided: DataGridComponent, SitmunFrontendGuiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_grid_data_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-grid/data-grid.component */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataGridComponent", function() { return _data_grid_data_grid_component__WEBPACK_IMPORTED_MODULE_0__["DataGridComponent"]; });

/* harmony import */ var _sitmun_frontend_gui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sitmun-frontend-gui.module */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/sitmun-frontend-gui.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SitmunFrontendGuiModule", function() { return _sitmun_frontend_gui_module__WEBPACK_IMPORTED_MODULE_1__["SitmunFrontendGuiModule"]; });

/*
 * Public API Surface of sitmun-frontend-gui
 */




/***/ }),

/***/ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/sitmun-frontend-gui.module.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/sitmun-frontend-gui.module.ts ***!
  \*****************************************************************************************************/
/*! exports provided: SitmunFrontendGuiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitmunFrontendGuiModule", function() { return SitmunFrontendGuiModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sitmun/frontend-core */ "./node_modules/@sitmun/frontend-core/fesm5/sitmun-frontend-core.js");
/* harmony import */ var _data_grid_data_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data-grid/data-grid.component */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/data-grid/data-grid.component.ts");
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ag-grid-community/angular */ "./node_modules/@ag-grid-community/angular/main.js");
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import * as ol from 'openlayers';






/** SITMUN plugin core module */
var SitmunFrontendGuiModule = /** @class */ (function () {
    function SitmunFrontendGuiModule() {
    }
    SitmunFrontendGuiModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["NoopAnimationsModule"],
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_7__["AngularHalModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_9__["AgGridModule"].withComponents([]),
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_7__["SitmunFrontendCoreModule"],
            ],
            declarations: [
                _data_grid_data_grid_component__WEBPACK_IMPORTED_MODULE_8__["DataGridComponent"]
            ],
            entryComponents: [],
            providers: [],
            exports: [
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["NoopAnimationsModule"],
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_7__["AngularHalModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _data_grid_data_grid_component__WEBPACK_IMPORTED_MODULE_8__["DataGridComponent"],
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_7__["SitmunFrontendCoreModule"]
            ]
        })
    ], SitmunFrontendGuiModule);
    return SitmunFrontendGuiModule;
}());



/***/ }),

/***/ "./src/main/angular-library/src/$$_lazy_route_resource lazy recursive":
/*!***********************************************************************************!*\
  !*** ./src/main/angular-library/src/$$_lazy_route_resource lazy namespace object ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/main/angular-library/src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/main/angular-library/src/app/ExternalConfigurationService.ts":
/*!**************************************************************************!*\
  !*** ./src/main/angular-library/src/app/ExternalConfigurationService.ts ***!
  \**************************************************************************/
/*! exports provided: ExternalConfigurationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalConfigurationService", function() { return ExternalConfigurationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/** REST API access configuration service*/
var ExternalConfigurationService = /** @class */ (function () {
    /** Constructor*/
    function ExternalConfigurationService(http) {
        this.http = http;
    }
    /** deperecated*/
    ExternalConfigurationService.prototype.deserialize = function () {
        throw new Error('Method not implemented.');
    };
    /** deperecated*/
    ExternalConfigurationService.prototype.serialize = function () {
        throw new Error('Method not implemented.');
    };
    /** get proxy uri*/
    ExternalConfigurationService.prototype.getProxyUri = function () {
        return "/api/";
    };
    /** get REST API root uri*/
    ExternalConfigurationService.prototype.getRootUri = function () {
        return "/api/";
    };
    /** get HttpClient*/
    ExternalConfigurationService.prototype.getHttp = function () {
        return this.http;
    };
    /**deprecated*/
    ExternalConfigurationService.prototype.getExternalConfiguration = function () {
        return null;
    };
    /**deprecated*/
    ExternalConfigurationService.prototype.setExternalConfiguration = function (externalConfiguration) {
    };
    ExternalConfigurationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ExternalConfigurationService);
    return ExternalConfigurationService;
}());



/***/ }),

/***/ "./src/main/angular-library/src/app/app.component.css":
/*!************************************************************!*\
  !*** ./src/main/angular-library/src/app/app.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/main/angular-library/src/app/app.component.html":
/*!*************************************************************!*\
  !*** ./src/main/angular-library/src/app/app.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\r\n  <button mat-button [routerLink]=\"['']\">\r\n    <img height=\"50px;\" src=\"https://avatars0.githubusercontent.com/u/24718368?s=200&v=4\">\r\n    <span>  Sitmun Admin App</span>\r\n  </button>\r\n  \r\n   <span class=\"toolbar-spacer\"></span>\r\n    <span *ngIf=\"isLoggedIn()\" >\r\n    <!-- \r\n   <button mat-button *sitmunHasAnyAuthority=\"['ADMIN SITMUN','ADMIN ORGANIZACION']\"\r\n            [routerLink]=\"['/territory-list']\"><span [translate]=\"'menu.territories'\">Territories</span>\r\n    </button>\r\n     <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/territory-type-list']\"><span [translate]=\"'menu.territoriesTypes'\">Territory types</span>\r\n    </button>\r\n    <button mat-button  *sitmunHasAnyAuthority=\"['ADMIN SITMUN','ADMIN ORGANIZACION']\"\r\n            [routerLink]=\"['/user-list']\"><span [translate]=\"'menu.users'\">Users</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/role-list']\"><span [translate]=\"'menu.roles'\">Roles</span>\r\n    </button>\r\n    \r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/connection-list']\"><span [translate]=\"'menu.connection'\">Connections</span>\r\n    </button>\r\n     \r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/task-type-list']\"><span [translate]=\"'menu.taskType'\">Task Types</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/task-group-list']\"><span [translate]=\"'menu.taskGroup'\">Task Groups</span>\r\n    </button>\r\n    -->\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/task-list']\"><span [translate]=\"'menu.taskList'\">Tasks</span>\r\n    </button>\r\n     \r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/task-ui-list']\"><span [translate]=\"'menu.taskUIList'\">Task UIs</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/service-list']\"><span [translate]=\"'menu.serviceList'\">Services</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/cartography-list']\"><span [translate]=\"'menu.cartographyList'\">Cartographies</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/cartography-group-list']\"><span [translate]=\"'menu.cartographyGroupList'\">Cartography Groups</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/background-list']\"><span [translate]=\"'menu.backgroundList'\">backgrounds</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/tree-list']\"><span [translate]=\"'menu.treeList'\">trees</span>\r\n    </button>\r\n    <button mat-button *sitmunHasAnyAuthority=\"'ADMIN SITMUN'\"\r\n            [routerLink]=\"['/application-list']\"><span [translate]=\"'menu.applicationList'\">applications</span>\r\n    </button>\r\n  </span>\r\n    <span (click)=\"changeLanguage('ca')\"> CA </span> | <span  (click)=\"changeLanguage('es')\"> ES </span>| <span  (click)=\"changeLanguage('en')\"> EN </span>\r\n    <span *ngIf=\"isLoggedIn()\" ><a href=\"\" [routerLink]=\"['/account']\" [translate]=\"'menu.account'\">Account</a> <a href=\"\" [routerLink]=\"['/change-password']\" [translate]=\"'account.change-password'\">Change password</a><a href=\"\" (click)=\"logout()\" [translate]=\"'account.closeSession'\">Close session</a> </span> \r\n</mat-toolbar>\r\n<router-outlet></router-outlet>\r\n<!-- test map-->\r\n\r\n        <sitmun-map-viewer-map [extent]=\"[256901.08041000657, 4544669.980255321, 554715.9195899934, 4703023.019744679]\" \r\n                       [initialProjection]=\"'EPSG:25831'\" \r\n                       [loadDefaults]=\"true\"></sitmun-map-viewer-map>                       \r\n                      \r\n\r\n"

/***/ }),

/***/ "./src/main/angular-library/src/app/app.component.ts":
/*!***********************************************************!*\
  !*** ./src/main/angular-library/src/app/app.component.ts ***!
  \***********************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sitmun/frontend-core */ "./node_modules/@sitmun/frontend-core/fesm5/sitmun-frontend-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/** Demo app component*/
var AppComponent = /** @class */ (function () {
    /** Component constructor*/
    function AppComponent(/** Translate service */ trans, /** Identity service */ principal, /** Login service */ loginService) {
        this.trans = trans;
        this.principal = principal;
        this.loginService = loginService;
        /** app title*/
        this.title = 'app';
        /** app param*/
        this.param = { value: 'world' };
        this.translate = trans;
        this.translate.addLangs(['es', 'ca']);
        this.translate.setDefaultLang('ca');
        //const browserLang = translate.getBrowserLang();
        //translate.use(browserLang.match(/es|ca/) ? browserLang : 'ca');
        this.translate.use('ca');
    }
    /** Change app language*/
    AppComponent.prototype.changeLanguage = function (locale) {
        this.translate.use(locale);
    };
    /** User log out*/
    AppComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    /** Whether user is logged in */
    AppComponent.prototype.isLoggedIn = function () {
        return this.principal.isAuthenticated();
    };
    /** On component init, get logged user account*/
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/main/angular-library/src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/main/angular-library/src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"], _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_2__["Principal"], _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_2__["LoginService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/main/angular-library/src/app/app.module.ts":
/*!********************************************************!*\
  !*** ./src/main/angular-library/src/app/app.module.ts ***!
  \********************************************************/
/*! exports provided: createTranslateLoader, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/main/angular-library/src/app/app.component.ts");
/* harmony import */ var _ExternalConfigurationService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExternalConfigurationService */ "./src/main/angular-library/src/app/ExternalConfigurationService.ts");
/* harmony import */ var _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sitmun/frontend-core */ "./node_modules/@sitmun/frontend-core/fesm5/sitmun-frontend-core.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.component */ "./src/main/angular-library/src/app/home/home.component.ts");
/* harmony import */ var sitmun_frontend_gui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sitmun-frontend-gui */ "./src/main/angular-library/projects/sitmun-frontend-gui/src/lib/public_api.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/locales/ca */ "./node_modules/@angular/common/locales/ca.js");
/* harmony import */ var _angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/locales/es */ "./node_modules/@angular/common/locales/es.js");
/* harmony import */ var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/esm5/ngx-translate-http-loader.js");
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ag-grid-community/angular */ "./node_modules/@ag-grid-community/angular/main.js");
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_14__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["registerLocaleData"])(_angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_9___default.a, 'ca');
Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["registerLocaleData"])(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_10___default.a, 'es');
/** Load translation assets */
function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_13__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
}
/** Demo app routes configuration*/
var appRoutes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"]
    }
];
var AppModule = /** @class */ (function () {
    /** Demo app module*/
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_5__["SitmunFrontendCoreModule"].forRoot(),
                sitmun_frontend_gui__WEBPACK_IMPORTED_MODULE_7__["SitmunFrontendGuiModule"],
                _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_14__["AgGridModule"].withComponents([]),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__["TranslateLoader"],
                        useFactory: (createTranslateLoader),
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClient"]]
                    }
                }),
                _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_5__["AngularHalModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes)
            ],
            entryComponents: [],
            providers: [
                { provide: 'ExternalConfigurationService', useClass: _ExternalConfigurationService__WEBPACK_IMPORTED_MODULE_4__["ExternalConfigurationService"] },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HTTP_INTERCEPTORS"],
                    useClass: _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_5__["AuthInterceptor"],
                    multi: true
                },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HTTP_INTERCEPTORS"],
                    useClass: _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_5__["AuthExpiredInterceptor"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
        /** Demo app module*/
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/main/angular-library/src/app/home/home.component.css":
/*!******************************************************************!*\
  !*** ./src/main/angular-library/src/app/home/home.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/main/angular-library/src/app/home/home.component.html":
/*!*******************************************************************!*\
  !*** ./src/main/angular-library/src/app/home/home.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n<sitmun-map-viewer-map [initialLon]=\"360498.62863399717\" [initialLat]=\"4630983.631562616\" [initialProjection]=\"'EPSG:25831'\" [initialZoom]=\"2\"></sitmun-map-viewer-map>\r\n-->\r\n\r\n\r\n <span *ngIf=\"isLoggedIn()\" > Youre logged in <a href=\"\" (click)=\"logout()\">Close Session</a> </span> \r\n  <a *ngIf=\"!isLoggedIn()\"  href=\"\" [routerLink]=\"['/login']\"> Login </a> \r\n"

/***/ }),

/***/ "./src/main/angular-library/src/app/home/home.component.ts":
/*!*****************************************************************!*\
  !*** ./src/main/angular-library/src/app/home/home.component.ts ***!
  \*****************************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sitmun/frontend-core */ "./node_modules/@sitmun/frontend-core/fesm5/sitmun-frontend-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/** Demo app Home component*/
var HomeComponent = /** @class */ (function () {
    /** Component constructor */
    function HomeComponent(
    /** Login service */ loginService, 
    /** Identity service */ principal) {
        this.loginService = loginService;
        this.principal = principal;
    }
    /** Logout user */
    HomeComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    /** Whether the user is logged in*/
    HomeComponent.prototype.isLoggedIn = function () {
        return this.principal.isAuthenticated();
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/main/angular-library/src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/main/angular-library/src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_1__["LoginService"],
            _sitmun_frontend_core__WEBPACK_IMPORTED_MODULE_1__["Principal"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/main/angular-library/src/environments/environment.ts":
/*!******************************************************************!*\
  !*** ./src/main/angular-library/src/environments/environment.ts ***!
  \******************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/** This file can be replaced during build by using the `fileReplacements` array.
    `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
 The list of file replacements can be found in `angular.json`.
 */
var environment = {
    production: false,
    api_url: 'http://localhost:8080/api'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main/angular-library/src/main.ts":
/*!**********************************************!*\
  !*** ./src/main/angular-library/src/main.ts ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/main/angular-library/src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/main/angular-library/src/environments/environment.ts");
/* harmony import */ var _ag_grid_community_all_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ag-grid-community/all-modules */ "./node_modules/@ag-grid-community/all-modules/dist/es6/main.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
/** we use the webpack raw-loader to return the content as a string */
//const translations = require(`raw-loader!./locale/messages.ca.xlf`);
_ag_grid_community_all_modules__WEBPACK_IMPORTED_MODULE_4__["ModuleRegistry"].registerModules(_ag_grid_community_all_modules__WEBPACK_IMPORTED_MODULE_4__["AllCommunityModules"]);
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"], {
    providers: [
        //{provide: TRANSLATIONS, useValue: translations},
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TRANSLATIONS_FORMAT"], useValue: 'xlf' }
    ]
})
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/main/angular-library/src/main.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\ggaliano\Desktop\Sitmun3\sitmun3-frontend-gui\src\main\angular-library\src\main.ts */"./src/main/angular-library/src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map