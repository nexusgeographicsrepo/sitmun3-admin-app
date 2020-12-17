/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
var DialogGridComponent = /** @class */ (function () {
    function DialogGridComponent() {
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
            this.joinTables.emit(this.allRowsReceived);
            console.log(this.allRowsReceived);
            this.tablesReceivedCounter = 0;
            this.allRowsReceived = [];
        }
    };
    DialogGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-dialog-grid',
                    template: "\n  <div *ngFor=\"let getAll of getAllsTable; let i = index\" style=\"width: 700px; height: 500px;  margin: 50px;\">\n    <app-data-grid \n    [columnDefs]=\"columnDefsTable[i]\" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true \n    [eventGetSelectedRowsSubscription]=\"getAllRows.asObservable()\" (getSelectedRows)='joinRowsReceived($event)' >\n    </app-data-grid>\n  </div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DialogGridComponent.ctorParameters = function () { return []; };
    DialogGridComponent.propDecorators = {
        themeGrid: [{ type: Input }],
        getAllsTable: [{ type: Input }],
        columnDefsTable: [{ type: Input }],
        addButtonClickedSubscription: [{ type: Input }],
        joinTables: [{ type: Output }]
    };
    return DialogGridComponent;
}());
export { DialogGridComponent };
if (false) {
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
    DialogGridComponent.prototype.addButtonClickedSubscription;
    /** @type {?} */
    DialogGridComponent.prototype.joinTables;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBNkJ6QzswQkFiK0IsSUFBSSxPQUFPLEVBQVk7K0JBR3RCLEVBQUU7UUFXaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7S0FDL0I7Ozs7SUFFRixzQ0FBUTs7O0lBQVI7UUFBQSxpQkFRQztRQU5DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUM7Z0JBQy9FLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzNCLENBQUMsQ0FBQztTQUNKO0tBRUY7Ozs7SUFFRCxnREFBa0I7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELDhDQUFnQjs7OztJQUFoQixVQUFpQixJQUFXO1FBRXhCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUMzRCxDQUFDO1lBQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDM0I7S0FDSjs7Z0JBekRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsMllBT1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7Ozs0QkFPRSxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQ0FDTCxLQUFLOzZCQUVMLE1BQU07OzhCQTFCVDs7U0FlYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kaWFsb2ctZ3JpZCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgKm5nRm9yPVwibGV0IGdldEFsbCBvZiBnZXRBbGxzVGFibGU7IGxldCBpID0gaW5kZXhcIiBzdHlsZT1cIndpZHRoOiA3MDBweDsgaGVpZ2h0OiA1MDBweDsgIG1hcmdpbjogNTBweDtcIj5cbiAgICA8YXBwLWRhdGEtZ3JpZCBcbiAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzVGFibGVbaV1cIiBbdGhlbWVHcmlkXT0ndGhlbWVHcmlkJyAgW2dldEFsbF09J2dldEFsbCcgW2dsb2JhbFNlYXJjaF09dHJ1ZSBcbiAgICBbZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb25dPVwiZ2V0QWxsUm93cy5hc09ic2VydmFibGUoKVwiIChnZXRTZWxlY3RlZFJvd3MpPSdqb2luUm93c1JlY2VpdmVkKCRldmVudCknID5cbiAgICA8L2FwcC1kYXRhLWdyaWQ+XG4gIDwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdldEFsbFJvd3M6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCA8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBfYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbjogYW55O1xuICB0YWJsZXNSZWNlaXZlZENvdW50ZXI6IG51bWJlcjtcbiAgYWxsUm93c1JlY2VpdmVkOiBBcnJheTxhbnlbXT4gPSBbXTtcbiAgQElucHV0KCkgdGhlbWVHcmlkOiBhbnk7XG4gIEBJbnB1dCgpIGdldEFsbHNUYWJsZTogQXJyYXk8KCkgPT4gT2JzZXJ2YWJsZTxhbnk+PjtcbiAgQElucHV0KCkgY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XG4gIEBJbnB1dCgpIGFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcblxuICBAT3V0cHV0KCkgam9pblRhYmxlcyA6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnlbXT4+O1xuXG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmpvaW5UYWJsZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIgPSAwO1xuICAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbiA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFNlbGVjdGVkUm93cygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRBbGxTZWxlY3RlZFJvd3MoKSB7XG4gICAgdGhpcy5nZXRBbGxSb3dzLm5leHQodHJ1ZSk7XG4gIH1cblxuICBqb2luUm93c1JlY2VpdmVkKGRhdGE6IGFueVtdKVxuICB7XG4gICAgICB0aGlzLmFsbFJvd3NSZWNlaXZlZC5wdXNoKGRhdGEpO1xuICAgICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIrKztcbiAgICAgIGlmKHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID09PSB0aGlzLmdldEFsbHNUYWJsZS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIHRoaXMuam9pblRhYmxlcy5lbWl0KHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgICB0aGlzLnRhYmxlc1JlY2VpdmVkQ291bnRlcj0wO1xuICAgICAgICB0aGlzLmFsbFJvd3NSZWNlaXZlZCA9IFtdO1xuICAgICAgfVxuICB9XG5cbn1cbiJdfQ==