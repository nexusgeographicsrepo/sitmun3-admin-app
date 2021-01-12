/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
/**
 * @record
 */
export function DialogData() { }
/** @type {?} */
DialogData.prototype._GetAllsTable;
/** @type {?} */
DialogData.prototype._columnDefsTable;
/** @type {?} */
DialogData.prototype._singleSelectionTable;
var DialogGridComponent = /** @class */ (function () {
    function DialogGridComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.getAllRows = new Subject();
        this.allRowsReceived = [];
        this.joinTables = new EventEmitter();
        // this.nonEditable = true;
        this.tablesReceivedCounter = 0;
    }
    /**
     * @return {?}
     */
    DialogGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.addButtonClickedSubscription) {
            this._addButtonClickedSubscription = this.addButtonClickedSubscription.subscribe(function () {
                _this.getAllSelectedRows();
            });
        }
    };
    /**
     * @return {?}
     */
    DialogGridComponent.prototype.getAllSelectedRows = /**
     * @return {?}
     */
    function () {
        this.getAllRows.next(true);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    DialogGridComponent.prototype.joinRowsReceived = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.allRowsReceived.push(data);
        this.tablesReceivedCounter++;
        if (this.tablesReceivedCounter === this.getAllsTable.length) {
            this.doAdd(this.allRowsReceived);
            console.log(this.allRowsReceived);
        }
    };
    /**
     * @param {?} rowsToAdd
     * @return {?}
     */
    DialogGridComponent.prototype.doAdd = /**
     * @param {?} rowsToAdd
     * @return {?}
     */
    function (rowsToAdd) {
        this.dialogRef.close({ event: 'Add', data: rowsToAdd });
    };
    /**
     * @return {?}
     */
    DialogGridComponent.prototype.closeDialog = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close({ event: 'Cancel' });
    };
    DialogGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-dialog-grid',
                    template: "<h3 mat-dialog-title>{{title}}</h3>\n<mat-dialog-content class=\"dialogConent\">\n  <div *ngFor=\"let getAll of getAllsTable; let i = index\" class=\"appDialogDataGridDiv\">\n    <app-data-grid \n    [columnDefs]=\"columnDefsTable[i]\" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]=\"singleSelectionTable[i]\"\n    [title]=\"titlesTable[i]\" [nonEditable]='nonEditable' [eventGetSelectedRowsSubscription]=\"getAllRows.asObservable()\" (getSelectedRows)='joinRowsReceived($event)' >\n    </app-data-grid>\n  </div>\n</mat-dialog-content>\n<div mat-dialog-actions align=\"end\">\n  <button mat-button  (click)=\"closeDialog()\">{{\"Cancel\" | translate}}</button>\n  <button mat-button  (click)=\"getAllSelectedRows()\" cdkFocusInitial>{{\"Add\" | translate}}</button>\n</div>\n",
                    styles: [".dialogConent{margin:inherit!important;padding:inherit!important;max-height:60vh!important;height:100%;width:100%;overflow:auto}"]
                },] },
    ];
    /** @nocollapse */
    DialogGridComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    DialogGridComponent.propDecorators = {
        joinTables: [{ type: Output }]
    };
    return DialogGridComponent;
}());
export { DialogGridComponent };
if (false) {
    /** @type {?} */
    DialogGridComponent.prototype.title;
    /** @type {?} */
    DialogGridComponent.prototype.getAllRows;
    /** @type {?} */
    DialogGridComponent.prototype._addButtonClickedSubscription;
    /** @type {?} */
    DialogGridComponent.prototype.tablesReceivedCounter;
    /** @type {?} */
    DialogGridComponent.prototype.allRowsReceived;
    /** @type {?} */
    DialogGridComponent.prototype.themeGrid;
    /** @type {?} */
    DialogGridComponent.prototype.getAllsTable;
    /** @type {?} */
    DialogGridComponent.prototype.columnDefsTable;
    /** @type {?} */
    DialogGridComponent.prototype.singleSelectionTable;
    /** @type {?} */
    DialogGridComponent.prototype.titlesTable;
    /** @type {?} */
    DialogGridComponent.prototype.addButtonClickedSubscription;
    /** @type {?} */
    DialogGridComponent.prototype.nonEditable;
    /** @type {?} */
    DialogGridComponent.prototype.joinTables;
    /** @type {?} */
    DialogGridComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7OztJQWtEdEQsNkJBQW9CLFNBQTRDO1FBQTVDLGNBQVMsR0FBVCxTQUFTLENBQW1DOzBCQXBCakMsSUFBSSxPQUFPLEVBQVk7K0JBR3RCLEVBQUU7UUFtQmhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFFckMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztLQUMvQjs7OztJQUVGLHNDQUFROzs7SUFBUjtRQUFBLGlCQVFDO1FBTkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDL0UsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1NBQ0o7S0FFRjs7OztJQUVELGdEQUFrQjs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsOENBQWdCOzs7O0lBQWhCLFVBQWlCLElBQVc7UUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQzNELENBQUM7WUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNuQztLQUNKOzs7OztJQUVELG1DQUFLOzs7O0lBQUwsVUFBTSxTQUFTO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0tBQ3JEOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztLQUN4Qzs7Z0JBL0VGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsNnlCQWFYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGtJQUFrSSxDQUFDO2lCQUM3STs7OztnQkExQlEsWUFBWTs7OzZCQTZDbEIsTUFBTTs7OEJBL0NUOztTQTZCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcclxuICBfR2V0QWxsc1RhYmxlOiAgQXJyYXk8KCkgPT4gT2JzZXJ2YWJsZTxhbnk+PjtcclxuICBfY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XHJcbiAgX3NpbmdsZVNlbGVjdGlvblRhYmxlOiBBcnJheTxib29sZWFuPjtcclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRpYWxvZy1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxoMyBtYXQtZGlhbG9nLXRpdGxlPnt7dGl0bGV9fTwvaDM+XHJcbjxtYXQtZGlhbG9nLWNvbnRlbnQgY2xhc3M9XCJkaWFsb2dDb25lbnRcIj5cclxuICA8ZGl2ICpuZ0Zvcj1cImxldCBnZXRBbGwgb2YgZ2V0QWxsc1RhYmxlOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJhcHBEaWFsb2dEYXRhR3JpZERpdlwiPlxyXG4gICAgPGFwcC1kYXRhLWdyaWQgXHJcbiAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzVGFibGVbaV1cIiBbdGhlbWVHcmlkXT0ndGhlbWVHcmlkJyAgW2dldEFsbF09J2dldEFsbCcgW2dsb2JhbFNlYXJjaF09dHJ1ZSBbc2luZ2xlU2VsZWN0aW9uXT1cInNpbmdsZVNlbGVjdGlvblRhYmxlW2ldXCJcclxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtub25FZGl0YWJsZV09J25vbkVkaXRhYmxlJyBbZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb25dPVwiZ2V0QWxsUm93cy5hc09ic2VydmFibGUoKVwiIChnZXRTZWxlY3RlZFJvd3MpPSdqb2luUm93c1JlY2VpdmVkKCRldmVudCknID5cclxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cclxuICA8L2Rpdj5cclxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7XCJDYW5jZWxcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiZ2V0QWxsU2VsZWN0ZWRSb3dzKClcIiBjZGtGb2N1c0luaXRpYWw+e3tcIkFkZFwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5kaWFsb2dDb25lbnR7bWFyZ2luOmluaGVyaXQhaW1wb3J0YW50O3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7bWF4LWhlaWdodDo2MHZoIWltcG9ydGFudDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG99YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGdldEFsbFJvd3M6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCA8Ym9vbGVhbj4oKTtcclxuICBwcml2YXRlIF9hZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgdGFibGVzUmVjZWl2ZWRDb3VudGVyOiBudW1iZXI7XHJcbiAgYWxsUm93c1JlY2VpdmVkOiBBcnJheTxhbnlbXT4gPSBbXTtcclxuXHJcbiAgLy9JbnB1dHNcclxuICB0aGVtZUdyaWQ6IGFueTtcclxuICBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XHJcbiAgY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XHJcbiAgc2luZ2xlU2VsZWN0aW9uVGFibGU6IEFycmF5PGJvb2xlYW4+O1xyXG4gIHRpdGxlc1RhYmxlOiBBcnJheTxzdHJpbmc+O1xyXG4gIGFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcclxuICBub25FZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLy9PdXRwdXRzXHJcbiAgQE91dHB1dCgpIGpvaW5UYWJsZXMgOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55W10+PjtcclxuXHJcbiAgXHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERpYWxvZ0dyaWRDb21wb25lbnQ+KSB7XHJcbiAgICBcclxuICAgIHRoaXMuam9pblRhYmxlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIC8vIHRoaXMubm9uRWRpdGFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIgPSAwO1xyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIGlmICh0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbiA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsU2VsZWN0ZWRSb3dzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldEFsbFNlbGVjdGVkUm93cygpIHtcclxuICAgIHRoaXMuZ2V0QWxsUm93cy5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgam9pblJvd3NSZWNlaXZlZChkYXRhOiBhbnlbXSlcclxuICB7XHJcbiAgICAgIHRoaXMuYWxsUm93c1JlY2VpdmVkLnB1c2goZGF0YSk7XHJcbiAgICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyKys7XHJcbiAgICAgIGlmKHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID09PSB0aGlzLmdldEFsbHNUYWJsZS5sZW5ndGgpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLmRvQWRkKHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFsbFJvd3NSZWNlaXZlZCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGRvQWRkKHJvd3NUb0FkZCl7XHJcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCcsZGF0YTogcm93c1RvQWRkfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZURpYWxvZygpe1xyXG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2V2ZW50OidDYW5jZWwnfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=