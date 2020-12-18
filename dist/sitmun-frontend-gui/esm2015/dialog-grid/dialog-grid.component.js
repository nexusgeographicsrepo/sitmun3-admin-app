/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class DialogGridComponent {
    constructor() {
        this.getAllRows = new Subject();
        this.allRowsReceived = [];
        this.joinTables = new EventEmitter();
        this.tablesReceivedCounter = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.addButtonClickedSubscription) {
            this._addButtonClickedSubscription = this.addButtonClickedSubscription.subscribe(() => {
                this.getAllSelectedRows();
            });
        }
    }
    /**
     * @return {?}
     */
    getAllSelectedRows() {
        this.getAllRows.next(true);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    joinRowsReceived(data) {
        this.allRowsReceived.push(data);
        this.tablesReceivedCounter++;
        if (this.tablesReceivedCounter === this.getAllsTable.length) {
            this.joinTables.emit(this.allRowsReceived);
            console.log(this.allRowsReceived);
            this.tablesReceivedCounter = 0;
            this.allRowsReceived = [];
        }
    }
}
DialogGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-dialog-grid',
                template: `
  <div *ngFor="let getAll of getAllsTable; let i = index" style="width: 700px; height: 500px;  margin: 50px;">
    <app-data-grid 
    [columnDefs]="columnDefsTable[i]" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]="singleSelectionTable[i]"
    [eventGetSelectedRowsSubscription]="getAllRows.asObservable()" (getSelectedRows)='joinRowsReceived($event)' >
    </app-data-grid>
  </div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DialogGridComponent.ctorParameters = () => [];
DialogGridComponent.propDecorators = {
    themeGrid: [{ type: Input }],
    getAllsTable: [{ type: Input }],
    columnDefsTable: [{ type: Input }],
    singleSelectionTable: [{ type: Input }],
    addButtonClickedSubscription: [{ type: Input }],
    joinTables: [{ type: Output }]
};
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
    DialogGridComponent.prototype.singleSelectionTable;
    /** @type {?} */
    DialogGridComponent.prototype.addButtonClickedSubscription;
    /** @type {?} */
    DialogGridComponent.prototype.joinTables;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFjM0MsTUFBTTtJQWdCSjswQkFkK0IsSUFBSSxPQUFPLEVBQVk7K0JBR3RCLEVBQUU7UUFZaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7S0FDL0I7Ozs7SUFFRixRQUFRO1FBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzNCLENBQUMsQ0FBQztTQUNKO0tBRUY7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsSUFBVztRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FDM0QsQ0FBQztZQUNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzNCO0tBQ0o7OztZQTFERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7O0NBT1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7O3dCQU9FLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO21DQUNMLEtBQUs7MkNBQ0wsS0FBSzt5QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGlhbG9nLWdyaWQnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2ICpuZ0Zvcj1cImxldCBnZXRBbGwgb2YgZ2V0QWxsc1RhYmxlOyBsZXQgaSA9IGluZGV4XCIgc3R5bGU9XCJ3aWR0aDogNzAwcHg7IGhlaWdodDogNTAwcHg7ICBtYXJnaW46IDUwcHg7XCI+XG4gICAgPGFwcC1kYXRhLWdyaWQgXG4gICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1RhYmxlW2ldXCIgW3RoZW1lR3JpZF09J3RoZW1lR3JpZCcgIFtnZXRBbGxdPSdnZXRBbGwnIFtnbG9iYWxTZWFyY2hdPXRydWUgW3NpbmdsZVNlbGVjdGlvbl09XCJzaW5nbGVTZWxlY3Rpb25UYWJsZVtpXVwiXG4gICAgW2V2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uXT1cImdldEFsbFJvd3MuYXNPYnNlcnZhYmxlKClcIiAoZ2V0U2VsZWN0ZWRSb3dzKT0nam9pblJvd3NSZWNlaXZlZCgkZXZlbnQpJyA+XG4gICAgPC9hcHAtZGF0YS1ncmlkPlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBnZXRBbGxSb3dzOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QgPGJvb2xlYW4+KCk7XG4gIHByaXZhdGUgX2FkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb246IGFueTtcbiAgdGFibGVzUmVjZWl2ZWRDb3VudGVyOiBudW1iZXI7XG4gIGFsbFJvd3NSZWNlaXZlZDogQXJyYXk8YW55W10+ID0gW107XG4gIEBJbnB1dCgpIHRoZW1lR3JpZDogYW55O1xuICBASW5wdXQoKSBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnNUYWJsZTogQXJyYXk8YW55W10+O1xuICBASW5wdXQoKSBzaW5nbGVTZWxlY3Rpb25UYWJsZTogQXJyYXk8Ym9vbGVhbj47XG4gIEBJbnB1dCgpIGFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcblxuICBAT3V0cHV0KCkgam9pblRhYmxlcyA6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnlbXT4+O1xuXG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmpvaW5UYWJsZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIgPSAwO1xuICAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbiA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFNlbGVjdGVkUm93cygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRBbGxTZWxlY3RlZFJvd3MoKSB7XG4gICAgdGhpcy5nZXRBbGxSb3dzLm5leHQodHJ1ZSk7XG4gIH1cblxuICBqb2luUm93c1JlY2VpdmVkKGRhdGE6IGFueVtdKVxuICB7XG4gICAgICB0aGlzLmFsbFJvd3NSZWNlaXZlZC5wdXNoKGRhdGEpO1xuICAgICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIrKztcbiAgICAgIGlmKHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID09PSB0aGlzLmdldEFsbHNUYWJsZS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIHRoaXMuam9pblRhYmxlcy5lbWl0KHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgICB0aGlzLnRhYmxlc1JlY2VpdmVkQ291bnRlcj0wO1xuICAgICAgICB0aGlzLmFsbFJvd3NSZWNlaXZlZCA9IFtdO1xuICAgICAgfVxuICB9XG5cbn1cbiJdfQ==