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
                    template: "<h2 mat-dialog-title>{{title}}</h2>\n<mat-dialog-content >\n  <div *ngFor=\"let getAll of getAllsTable; let i = index\" style=\"width: 450px; height: 300px;  margin: 50px;\">\n    <app-data-grid \n    [columnDefs]=\"columnDefsTable[i]\" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]=\"singleSelectionTable[i]\"\n    [title]=\"titlesTable[i]\" [eventGetSelectedRowsSubscription]=\"getAllRows.asObservable()\" (getSelectedRows)='joinRowsReceived($event)' >\n    </app-data-grid>\n  </div>\n</mat-dialog-content>\n<div mat-dialog-actions align=\"end\">\n  <button mat-button  (click)=\"closeDialog()\">{{\"Cancel\" | translate}}</button>\n  <button mat-button  (click)=\"getAllSelectedRows()\" cdkFocusInitial>{{\"Add\" | translate}}</button>\n</div>\n",
                    styles: [""]
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
    DialogGridComponent.prototype.joinTables;
    /** @type {?} */
    DialogGridComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7OztJQWlEdEQsNkJBQW9CLFNBQTRDO1FBQTVDLGNBQVMsR0FBVCxTQUFTLENBQW1DOzBCQW5CakMsSUFBSSxPQUFPLEVBQVk7K0JBR3RCLEVBQUU7UUFrQmhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0tBQy9COzs7O0lBRUYsc0NBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFOQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDO2dCQUMvRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQixDQUFDLENBQUM7U0FDSjtLQUVGOzs7O0lBRUQsZ0RBQWtCOzs7SUFBbEI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qjs7Ozs7SUFFRCw4Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsSUFBVztRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FDM0QsQ0FBQztZQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7Ozs7O0lBRUQsbUNBQUs7Ozs7SUFBTCxVQUFNLFNBQVM7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7S0FDckQ7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0tBQ3hDOztnQkE3RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxreEJBYVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7O2dCQTFCUSxZQUFZOzs7NkJBNENsQixNQUFNOzs4QkE5Q1Q7O1NBNkJhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgX0dldEFsbHNUYWJsZTogIEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIF9jb2x1bW5EZWZzVGFibGU6IEFycmF5PGFueVtdPjtcbiAgX3NpbmdsZVNlbGVjdGlvblRhYmxlOiBBcnJheTxib29sZWFuPjtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGlhbG9nLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxoMiBtYXQtZGlhbG9nLXRpdGxlPnt7dGl0bGV9fTwvaDI+XG48bWF0LWRpYWxvZy1jb250ZW50ID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgZ2V0QWxsIG9mIGdldEFsbHNUYWJsZTsgbGV0IGkgPSBpbmRleFwiIHN0eWxlPVwid2lkdGg6IDQ1MHB4OyBoZWlnaHQ6IDMwMHB4OyAgbWFyZ2luOiA1MHB4O1wiPlxuICAgIDxhcHAtZGF0YS1ncmlkIFxuICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNUYWJsZVtpXVwiIFt0aGVtZUdyaWRdPSd0aGVtZUdyaWQnICBbZ2V0QWxsXT0nZ2V0QWxsJyBbZ2xvYmFsU2VhcmNoXT10cnVlIFtzaW5nbGVTZWxlY3Rpb25dPVwic2luZ2xlU2VsZWN0aW9uVGFibGVbaV1cIlxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbl09XCJnZXRBbGxSb3dzLmFzT2JzZXJ2YWJsZSgpXCIgKGdldFNlbGVjdGVkUm93cyk9J2pvaW5Sb3dzUmVjZWl2ZWQoJGV2ZW50KScgPlxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cbiAgPC9kaXY+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj57e1wiQ2FuY2VsXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICA8YnV0dG9uIG1hdC1idXR0b24gIChjbGljayk9XCJnZXRBbGxTZWxlY3RlZFJvd3MoKVwiIGNka0ZvY3VzSW5pdGlhbD57e1wiQWRkXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZ2V0QWxsUm93czogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0IDxib29sZWFuPigpO1xuICBwcml2YXRlIF9hZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHRhYmxlc1JlY2VpdmVkQ291bnRlcjogbnVtYmVyO1xuICBhbGxSb3dzUmVjZWl2ZWQ6IEFycmF5PGFueVtdPiA9IFtdO1xuXG4gIC8vSW5wdXRzXG4gIHRoZW1lR3JpZDogYW55O1xuICBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIGNvbHVtbkRlZnNUYWJsZTogQXJyYXk8YW55W10+O1xuICBzaW5nbGVTZWxlY3Rpb25UYWJsZTogQXJyYXk8Ym9vbGVhbj47XG4gIHRpdGxlc1RhYmxlOiBBcnJheTxzdHJpbmc+O1xuICBhZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlIDxib29sZWFuPiA7XG5cbiAgLy9PdXRwdXRzXG4gIEBPdXRwdXQoKSBqb2luVGFibGVzIDogRXZlbnRFbWl0dGVyPEFycmF5PGFueVtdPj47XG5cbiAgXG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERpYWxvZ0dyaWRDb21wb25lbnQ+KSB7XG4gICAgXG4gICAgdGhpcy5qb2luVGFibGVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID0gMDtcbiAgIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2FkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24gPSB0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGxTZWxlY3RlZFJvd3MoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0QWxsU2VsZWN0ZWRSb3dzKCkge1xuICAgIHRoaXMuZ2V0QWxsUm93cy5uZXh0KHRydWUpO1xuICB9XG5cbiAgam9pblJvd3NSZWNlaXZlZChkYXRhOiBhbnlbXSlcbiAge1xuICAgICAgdGhpcy5hbGxSb3dzUmVjZWl2ZWQucHVzaChkYXRhKTtcbiAgICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyKys7XG4gICAgICBpZih0aGlzLnRhYmxlc1JlY2VpdmVkQ291bnRlciA9PT0gdGhpcy5nZXRBbGxzVGFibGUubGVuZ3RoKVxuICAgICAge1xuICAgICAgICB0aGlzLmRvQWRkKHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgfVxuICB9XG5cbiAgZG9BZGQocm93c1RvQWRkKXtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCcsZGF0YTogcm93c1RvQWRkfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpe1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtldmVudDonQ2FuY2VsJ30pO1xuICB9XG5cbn1cbiJdfQ==