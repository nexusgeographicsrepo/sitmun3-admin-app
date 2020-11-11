/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
var DataGridComponent = /** @class */ (function () {
    function DataGridComponent() {
        this.modules = AllCommunityModules;
        this.set = new Set();
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
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
        this.gridApi.sizeColumnsToFit();
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
        });
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.removeData = /**
     * @return {?}
     */
    function () {
        this.gridApi.stopEditing(false);
        /** @type {?} */
        var selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        var selectedData = selectedNodes.map(function (node) { return node.data; });
        this.remove.emit(selectedData);
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.newData = /**
     * @return {?}
     */
    function () {
        this.gridApi.stopEditing(false);
        this.new.emit(true);
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.applyChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var itemsChanged = [];
        this.gridApi.stopEditing(false);
        this.set.forEach(function (id) { return itemsChanged.push(_this.gridApi.getRowNode(id).data); });
        this.sendChanges.emit(itemsChanged);
        this.set.clear();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DataGridComponent.prototype.onCellEditingStopped = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.set.add(e.node.id);
        this.comptadorCanvis += 1;
        this.comptadorRedo = 0;
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.deleteChanges = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i <= this.comptadorCanvis; i++) {
            this.gridApi.undoCellEditing();
        }
        this.set.clear();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.undo = /**
     * @return {?}
     */
    function () {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        if (this.comptadorCanvis > 0) {
            this.comptadorCanvis -= 1;
            this.comptadorRedo += 1;
        }
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.redo = /**
     * @return {?}
     */
    function () {
        this.gridApi.stopEditing(false);
        this.gridApi.redoCellEditing();
        this.comptadorCanvis += 1;
        this.comptadorRedo -= 1;
    };
    DataGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-data-grid',
                    template: "<div class=\"container\" style=\"margin: 50px;\"  >\n\n\n    \n\n    <div class=\"row\">\n        <div class=\"text-left\" >\n            <label>Search </label>\n            <input type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n            \n        </div>\n\n\n        <div class=\" text-right btn-group-sm\">\n            <button class=\"btn btn-danger\"  (click)=\"deleteChanges()\" [disabled]=\"comptadorCanvis <= 0\">Delete Changes</button>\n            <button class=\"btn btn-warning\" (click)=\"undo()\" [disabled]=\"comptadorCanvis <= 0\" >Undo</button>\n            <button class=\"btn btn-warning\" (click)=\"redo()\" [disabled]=\"comptadorRedo <= 0\">Redo</button>\n            <button class=\"btn btn-success\" (click)=\"applyChanges()\" [disabled]=\"comptadorCanvis <= 0\" >Apply Changes</button>\n        </div>\n\n        \n        <div class=\" text-right btn-group-sm\">\n            <button class=\"btn btn-secondary\" (click)=\"removeData()\">Remove</button>\n            <button class=\"btn btn-success\" (click)=\"newData()\">New</button>\n        </div>\n\n\n    </div>\n\n    <div class=\"row\">\n        <div class=\"ag-theme-balham\" id=\"myGrid\" >\n            <ag-grid-angular\n            style=\" width: 750px; height: 500px;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            rowSelection=\"multiple\"\n            (cellEditingStopped)=\"onCellEditingStopped($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            </ag-grid-angular>\n        </div>\n    </div>\n</div>\n\n",
                    styles: ["label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"]
                },] },
    ];
    /** @nocollapse */
    DataGridComponent.ctorParameters = function () { return []; };
    DataGridComponent.propDecorators = {
        columnDefs: [{ type: Input }],
        getAll: [{ type: Input }],
        remove: [{ type: Output }],
        new: [{ type: Output }],
        sendChanges: [{ type: Output }]
    };
    return DataGridComponent;
}());
export { DataGridComponent };
if (false) {
    /** @type {?} */
    DataGridComponent.prototype.modules;
    /** @type {?} */
    DataGridComponent.prototype.searchValue;
    /** @type {?} */
    DataGridComponent.prototype.gridApi;
    /** @type {?} */
    DataGridComponent.prototype.gridColumnApi;
    /** @type {?} */
    DataGridComponent.prototype.set;
    /** @type {?} */
    DataGridComponent.prototype.rowData;
    /** @type {?} */
    DataGridComponent.prototype.comptadorCanvis;
    /** @type {?} */
    DataGridComponent.prototype.comptadorRedo;
    /** @type {?} */
    DataGridComponent.prototype.columnDefs;
    /** @type {?} */
    DataGridComponent.prototype.getAll;
    /** @type {?} */
    DataGridComponent.prototype.remove;
    /** @type {?} */
    DataGridComponent.prototype.new;
    /** @type {?} */
    DataGridComponent.prototype.sendChanges;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxtQkFBbUIsRUFBVSxNQUFNLGdDQUFnQyxDQUFDOztJQWdGM0U7dUJBZm9CLG1CQUFtQjttQkFJcEIsSUFBSSxHQUFHLEVBQVU7UUFhbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDeEI7Ozs7SUFHRCxvQ0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBRWpDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pE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VyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7S0FDekI7O2dCQXZLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSw2N0RBb0RYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDZFQUE2RSxDQUFDO2lCQUN4Rjs7Ozs7NkJBVUUsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLE1BQU07c0JBQ04sTUFBTTs4QkFDTixNQUFNOzs0QkFsRlQ7O1NBcUVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cblxuXG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgc3R5bGU9XCJtYXJnaW46IDUwcHg7XCIgID5cblxuXG4gICAgXG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnRcIiA+XG4gICAgICAgICAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiB0ZXh0LXJpZ2h0IGJ0bi1ncm91cC1zbVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIj5EZWxldGUgQ2hhbmdlczwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZ1wiIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+VW5kbzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZ1wiIChjbGljayk9XCJyZWRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yUmVkbyA8PSAwXCI+UmVkbzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5BcHBseSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiIHRleHQtcmlnaHQgYnRuLWdyb3VwLXNtXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPk5ldzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIiBpZD1cIm15R3JpZFwiID5cbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiA3NTBweDsgaGVpZ2h0OiA1MDBweDtcIlxuICAgICAgICAgICAgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIlxuICAgICAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxuICAgICAgICAgICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXG4gICAgICAgICAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCk9XCJvbkNlbGxFZGl0aW5nU3RvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIHNldDogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcm93RGF0YTogYW55W107XG4gIGNvbXB0YWRvckNhbnZpczogbnVtYmVyO1xuICBjb21wdGFkb3JSZWRvOiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gIH1cblxuICBcbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpe1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdyaWRBcGkucm93SGVpZ2h0ID0gMTAwO1xuICAgIHRoaXMuZ2V0RWxlbWVudHMoKTtcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpe1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKVxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEYXRhKCkge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gIFx0Y29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcbn1cblxuICBuZXdEYXRhKClcbiAge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5uZXcuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpXG4gIHtcbiAgICBjb25zdCBpdGVtc0NoYW5nZWQ6IGFueVtdID1bXTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuc2V0LmZvckVhY2goIGlkID0+IGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGlkKS5kYXRhKSk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcy5lbWl0KGl0ZW1zQ2hhbmdlZCk7XG4gICAgdGhpcy5zZXQuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcz0wO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbz0wO1xuICB9XG5cblxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxuICB7XG4gICAgdGhpcy5zZXQuYWRkKGUubm9kZS5pZCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG89MDtcbiAgfVxuXG4gIGRlbGV0ZUNoYW5nZXMoKVxuICB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8PSB0aGlzLmNvbXB0YWRvckNhbnZpczsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5zZXQuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvPTA7XG4gIH1cblxuXG5cbiAgdW5kbygpIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiAwKSBcbiAgICB7IHRoaXMuY29tcHRhZG9yQ2FudmlzIC09IDE7XG4gICAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgICAgfVxuICB9XG5cbiAgcmVkbygpIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRvQ2VsbEVkaXRpbmcoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyArPSAxO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyAtPSAxO1xuICB9XG5cblxufVxuIl19