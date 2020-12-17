/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class DialogGridComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DialogGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-dialog-grid',
                template: `
  <div *ngFor="let getAll of getAllsTable; let i = index">
    <app-data-grid [columnDefs]="columnDefsTable[i]" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true>
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
    columnDefsTable: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DialogGridComponent.prototype.themeGrid;
    /** @type {?} */
    DialogGridComponent.prototype.getAllsTable;
    /** @type {?} */
    DialogGridComponent.prototype.columnDefsTable;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYXpELE1BQU07SUFNSixpQkFBaUI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7WUFuQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Q0FLWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7d0JBR0UsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRpYWxvZy1ncmlkJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAqbmdGb3I9XCJsZXQgZ2V0QWxsIG9mIGdldEFsbHNUYWJsZTsgbGV0IGkgPSBpbmRleFwiPlxuICAgIDxhcHAtZGF0YS1ncmlkIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNUYWJsZVtpXVwiIFt0aGVtZUdyaWRdPSd0aGVtZUdyaWQnICBbZ2V0QWxsXT0nZ2V0QWxsJyBbZ2xvYmFsU2VhcmNoXT10cnVlPlxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cbiAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdGhlbWVHcmlkOiBhbnk7XG4gIEBJbnB1dCgpIGdldEFsbHNUYWJsZTogQXJyYXk8KCkgPT4gT2JzZXJ2YWJsZTxhbnk+PjtcbiAgQElucHV0KCkgY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iXX0=