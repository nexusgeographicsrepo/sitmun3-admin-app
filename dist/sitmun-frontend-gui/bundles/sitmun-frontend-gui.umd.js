(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ag-grid-community/all-modules'), require('@angular/forms'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser/animations'), require('@angular/router'), require('@ngx-translate/core'), require('@sitmun/frontend-core'), require('@ag-grid-community/angular')) :
    typeof define === 'function' && define.amd ? define('@sitmun/frontend-gui', ['exports', '@angular/core', '@ag-grid-community/all-modules', '@angular/forms', '@angular/common', '@angular/common/http', '@angular/platform-browser/animations', '@angular/router', '@ngx-translate/core', '@sitmun/frontend-core', '@ag-grid-community/angular'], factory) :
    (factory((global.sitmun = global.sitmun || {}, global.sitmun['frontend-gui'] = {}),global.ng.core,null,global.ng.forms,global.ng.common,global.ng.common.http,global.ng.platformBrowser.animations,global.ng.router,null,null,null));
}(this, (function (exports,core,allModules,forms,common,http,animations,router,core$1,frontendCore,angular) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DataGridComponent = (function () {
        function DataGridComponent() {
            this.modules = allModules.AllCommunityModules;
            this.remove = new core.EventEmitter();
            this.new = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        DataGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} params
         * @return {?}
         */
        DataGridComponent.prototype.onGridReady = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                this.gridApi = params.api;
                this.gridColumnApi = params.columnApi;
                this.gridApi.rowHeight = 100;
                this.getElements();
                params.api.sizeColumnsToFit();
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.quickSearch = /**
         * @return {?}
         */
            function () {
                this.gridApi.setQuickFilter(this.searchValue);
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.getElements = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.getAll()
                    .subscribe(function (items) {
                    console.log(items);
                    _this.rowData = items;
                    // this.gridApi.setRowData(items);
                });
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.removeData = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var selectedNodes = this.gridApi.getSelectedNodes();
                /** @type {?} */
                var selectedData = selectedNodes.map(function (node) { return node.data; });
                console.log(selectedData);
                this.remove.emit(selectedData);
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.newData = /**
         * @return {?}
         */
            function () {
                this.new.emit(true);
            };
        DataGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-data-grid',
                        template: "<div class=\"container\" style=\"margin: 50px;\">\n\n\n    \n    <!-- <button class=\"btn btn-primary\" (click)=\"removeElement()\" > borrar </button> -->\n    <button (click)=\"removeData()\">Remove</button>\n    <button (click)=\"newData()\">New</button>\n    <div class=\"row\">\n        <div class=\"col-12 text-left\" >\n            <label>Search </label>\n            <input type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n            \n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"ag-theme-balham col-12\" id=\"myGrid\">\n            <ag-grid-angular\n            style=\" width: 750px; height: 750px;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"            \n            rowSelection=\"multiple\"\n            (gridReady)=\"onGridReady($event)\">\n            </ag-grid-angular>\n        </div>\n    </div>\n</div>\n\n",
                        styles: ["label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"]
                    },] },
        ];
        /** @nocollapse */
        DataGridComponent.ctorParameters = function () { return []; };
        DataGridComponent.propDecorators = {
            columnDefs: [{ type: core.Input }],
            getAll: [{ type: core.Input }],
            remove: [{ type: core.Output }],
            new: [{ type: core.Output }]
        };
        return DataGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * SITMUN plugin core module
     */
    var SitmunFrontendGuiModule = (function () {
        function SitmunFrontendGuiModule() {
        }
        SitmunFrontendGuiModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            router.RouterModule,
                            http.HttpClientModule,
                            common.CommonModule,
                            forms.FormsModule,
                            animations.NoopAnimationsModule,
                            frontendCore.AngularHalModule,
                            forms.ReactiveFormsModule,
                            animations.BrowserAnimationsModule,
                            angular.AgGridModule.withComponents([]),
                            frontendCore.SitmunFrontendCoreModule,
                        ],
                        declarations: [
                            DataGridComponent
                        ],
                        entryComponents: [],
                        providers: [],
                        exports: [
                            http.HttpClientModule,
                            common.CommonModule,
                            forms.FormsModule,
                            animations.NoopAnimationsModule,
                            frontendCore.AngularHalModule,
                            core$1.TranslateModule,
                            forms.ReactiveFormsModule,
                            DataGridComponent,
                            frontendCore.SitmunFrontendCoreModule
                        ]
                    },] },
        ];
        return SitmunFrontendGuiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.DataGridComponent = DataGridComponent;
    exports.SitmunFrontendGuiModule = SitmunFrontendGuiModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwibWFyZ2luOiA1MHB4O1wiPlxuXG5cbiAgICBcbiAgICA8IS0tIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwicmVtb3ZlRWxlbWVudCgpXCIgPiBib3JyYXIgPC9idXR0b24+IC0tPlxuICAgIDxidXR0b24gKGNsaWNrKT1cInJlbW92ZURhdGEoKVwiPlJlbW92ZTwvYnV0dG9uPlxuICAgIDxidXR0b24gKGNsaWNrKT1cIm5ld0RhdGEoKVwiPk5ldzwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiB0ZXh0LWxlZnRcIiA+XG4gICAgICAgICAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtIGNvbC0xMlwiIGlkPVwibXlHcmlkXCI+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogNzUwcHg7IGhlaWdodDogNzUwcHg7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgICAgICAgICBcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGdyaWRBcGk7XG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIHJvd0RhdGE6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuICBAT3V0cHV0KCkgbmV3OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKXtcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5ncmlkQXBpLnJvd0hlaWdodCA9IDEwMDtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgcGFyYW1zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCl7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+e1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YT1pdGVtcztcbiAgICAgICAvLyB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YShpdGVtcyk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKSB7XG4gICAgbGV0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICBcdGxldCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWREYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG59XG5cbiAgbmV3RGF0YSgpXG4gIHtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVMb2FkZXIsVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7U2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiBcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YUdyaWRDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkFsbENvbW11bml0eU1vZHVsZXMiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTm9vcEFuaW1hdGlvbnNNb2R1bGUiLCJBbmd1bGFySGFsTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiQWdHcmlkTW9kdWxlIiwiU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlIiwiVHJhbnNsYXRlTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7UUErREU7MkJBWm9CQSw4QkFBbUI7WUFhckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJQyxpQkFBWSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJQSxpQkFBWSxFQUFFLENBQUM7U0FDL0I7Ozs7UUFFRCxvQ0FBUTs7O1lBQVI7YUFDQzs7Ozs7UUFFRCx1Q0FBVzs7OztZQUFYLFVBQVksTUFBTTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFFL0I7Ozs7UUFFRCx1Q0FBVzs7O1lBQVg7Z0JBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2pEOzs7O1FBRUQsdUNBQVc7OztZQUFYO2dCQUFBLGlCQVNDO2dCQVBDLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ1osU0FBUyxDQUFDLFVBQUMsS0FBSztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixLQUFJLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQzs7aUJBR3RCLENBQUMsQ0FBQzthQUNKOzs7O1FBRUQsc0NBQVU7OztZQUFWOztnQkFDRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7O2dCQUNyRCxJQUFJLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksR0FBQSxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2xDOzs7O1FBRUMsbUNBQU87OztZQUFQO2dCQUVFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCOztvQkE5RkZDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTt3QkFDekIsUUFBUSxFQUFFLGttQ0FpQ1g7d0JBQ0MsTUFBTSxFQUFFLENBQUMsNkVBQTZFLENBQUM7cUJBQ3hGOzs7OztpQ0FPRUMsVUFBSzs2QkFFTEEsVUFBSzs2QkFFTEMsV0FBTTswQkFDTkEsV0FBTTs7Z0NBN0RUOzs7Ozs7O0FDQUE7Ozs7Ozs7b0JBeUJDQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxtQkFBWTs0QkFDWkMscUJBQWdCOzRCQUNoQkMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYQywrQkFBb0I7NEJBQ3BCQyw2QkFBZ0I7NEJBQ2hCQyx5QkFBbUI7NEJBQ25CQyxrQ0FBdUI7NEJBQ3ZCQyxvQkFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7NEJBQy9CQyxxQ0FBd0I7eUJBRXpCO3dCQUNELFlBQVksRUFBRTs0QkFDWixpQkFBaUI7eUJBQ2xCO3dCQUNELGVBQWUsRUFBRSxFQUNoQjt3QkFDRCxTQUFTLEVBQUUsRUFDVjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1BSLHFCQUFnQjs0QkFDaEJDLG1CQUFZOzRCQUNaQyxpQkFBVzs0QkFDWEMsK0JBQW9COzRCQUNwQkMsNkJBQWdCOzRCQUNoQkssc0JBQWU7NEJBQ2ZKLHlCQUFtQjs0QkFDbkIsaUJBQWlCOzRCQUNqQkcscUNBQXdCO3lCQUN6QjtxQkFDRjs7c0NBekREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=