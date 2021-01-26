import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "../data-grid/data-grid.component";
import * as i5 from "@ngx-translate/core";
const _c0 = function (a0) { return { "margin-top": a0 }; };
function DialogGridComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelementStart(1, "app-data-grid", 7);
    i0.ɵɵlistener("getSelectedRows", function DialogGridComponent_div_3_Template_app_data_grid_getSelectedRows_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.joinRowsReceived($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const getAll_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(9, _c0, i_r2 > 0 ? "100px" : "0px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("columnDefs", ctx_r0.columnDefsTable[i_r2])("themeGrid", ctx_r0.themeGrid)("getAll", getAll_r1)("globalSearch", true)("singleSelection", ctx_r0.singleSelectionTable[i_r2])("title", ctx_r0.titlesTable[i_r2])("nonEditable", ctx_r0.nonEditable)("eventGetSelectedRowsSubscription", ctx_r0.getAllRows.asObservable());
} }
export class DialogGridComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.getAllRows = new Subject();
        this.allRowsReceived = [];
        this.joinTables = new EventEmitter();
        // this.nonEditable = true;
        this.tablesReceivedCounter = 0;
    }
    ngOnInit() {
        if (this.addButtonClickedSubscription) {
            this._addButtonClickedSubscription = this.addButtonClickedSubscription.subscribe(() => {
                this.getAllSelectedRows();
            });
        }
    }
    getAllSelectedRows() {
        this.getAllRows.next(true);
    }
    joinRowsReceived(data) {
        this.allRowsReceived.push(data);
        this.tablesReceivedCounter++;
        if (this.tablesReceivedCounter === this.getAllsTable.length) {
            this.doAdd(this.allRowsReceived);
            console.log(this.allRowsReceived);
        }
    }
    doAdd(rowsToAdd) {
        this.dialogRef.close({ event: 'Add', data: rowsToAdd });
    }
    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
}
/** @nocollapse */ DialogGridComponent.ɵfac = function DialogGridComponent_Factory(t) { return new (t || DialogGridComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
/** @nocollapse */ DialogGridComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DialogGridComponent, selectors: [["app-dialog-grid"]], outputs: { joinTables: "joinTables" }, decls: 11, vars: 8, consts: [["mat-dialog-title", ""], [1, "dialogConent"], ["class", "appDialogDataGridDiv", 3, "ngStyle", 4, "ngFor", "ngForOf"], ["mat-dialog-actions", "", "align", "end"], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "click"], [1, "appDialogDataGridDiv", 3, "ngStyle"], [3, "columnDefs", "themeGrid", "getAll", "globalSearch", "singleSelection", "title", "nonEditable", "eventGetSelectedRowsSubscription", "getSelectedRows"]], template: function DialogGridComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h4", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "mat-dialog-content", 1);
        i0.ɵɵtemplate(3, DialogGridComponent_div_3_Template, 2, 11, "div", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 3);
        i0.ɵɵelementStart(5, "button", 4);
        i0.ɵɵlistener("click", function DialogGridComponent_Template_button_click_5_listener() { return ctx.closeDialog(); });
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "translate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵlistener("click", function DialogGridComponent_Template_button_click_8_listener() { return ctx.getAllSelectedRows(); });
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "translate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.title);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.getAllsTable);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "cancel"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, "add"));
    } }, directives: [i1.MatDialogTitle, i1.MatDialogContent, i2.NgForOf, i1.MatDialogActions, i3.MatButton, i2.NgStyle, i4.DataGridComponent], pipes: [i5.TranslatePipe], styles: [".dialogConent[_ngcontent-%COMP%]{height:100%;margin:inherit!important;max-height:60vh!important;overflow:auto;padding:inherit!important;width:100%}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DialogGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-dialog-grid',
                templateUrl: './dialog-grid.component.html',
                styleUrls: ['./dialog-grid.component.css']
            }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, { joinTables: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9tYWluL2FuZ3VsYXItbGlicmFyeS9wcm9qZWN0cy9zaXRtdW4tZnJvbnRlbmQtZ3VpL3NyYy9saWIvIiwic291cmNlcyI6WyJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiLCJkaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7O0lDQXRELDhCQUNFO0lBQUEsd0NBR2dCO0lBRG9HLG9PQUE0QztJQUNoSyxpQkFBZ0I7SUFDbEIsaUJBQU07Ozs7O0lBTGdGLGdGQUE2QztJQUVqSSxlQUFpQztJQUFqQyx5REFBaUMsK0JBQUEscUJBQUEsc0JBQUEsc0RBQUEsbUNBQUEsbUNBQUEsc0VBQUE7O0FEWXJDLE1BQU0sT0FBTyxtQkFBbUI7SUF1QjlCLFlBQW9CLFNBQTRDO1FBQTVDLGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBcEJoRSxlQUFVLEdBQXFCLElBQUksT0FBTyxFQUFZLENBQUM7UUFHdkQsb0JBQWUsR0FBaUIsRUFBRSxDQUFDO1FBbUJqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVGLFFBQVE7UUFFTixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFFSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFXO1FBRXhCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUcsSUFBSSxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUMxRDtZQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDOzt5R0E3RFUsbUJBQW1COzJFQUFuQixtQkFBbUI7UUNoQmhDLDZCQUFxQjtRQUFBLFlBQVM7UUFBQSxpQkFBSztRQUNuQyw2Q0FDRTtRQUFBLHFFQUNFO1FBS0osaUJBQXFCO1FBQ3JCLDhCQUNFO1FBQUEsaUNBQTRDO1FBQXhCLGdHQUFTLGlCQUFhLElBQUM7UUFBQyxZQUF3Qjs7UUFBQSxpQkFBUztRQUM3RSxpQ0FBbUU7UUFBL0MsZ0dBQVMsd0JBQW9CLElBQUM7UUFBaUIsWUFBcUI7O1FBQUEsaUJBQVM7UUFDbkcsaUJBQU07O1FBWmUsZUFBUztRQUFULCtCQUFTO1FBRXZCLGVBQWtEO1FBQWxELDBDQUFrRDtRQVFYLGVBQXdCO1FBQXhCLG9EQUF3QjtRQUNELGVBQXFCO1FBQXJCLGtEQUFxQjs7a0RESzdFLG1CQUFtQjtjQUwvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLDhCQUE4QjtnQkFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDM0M7K0RBbUJXLFVBQVU7a0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nRGF0YSB7XG4gIF9HZXRBbGxzVGFibGU6ICBBcnJheTwoKSA9PiBPYnNlcnZhYmxlPGFueT4+O1xuICBfY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XG4gIF9zaW5nbGVTZWxlY3Rpb25UYWJsZTogQXJyYXk8Ym9vbGVhbj47XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRpYWxvZy1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy1ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nLWdyaWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGdldEFsbFJvd3M6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCA8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBfYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbjogYW55O1xuICB0YWJsZXNSZWNlaXZlZENvdW50ZXI6IG51bWJlcjtcbiAgYWxsUm93c1JlY2VpdmVkOiBBcnJheTxhbnlbXT4gPSBbXTtcblxuICAvL0lucHV0c1xuICB0aGVtZUdyaWQ6IGFueTtcbiAgZ2V0QWxsc1RhYmxlOiBBcnJheTwoKSA9PiBPYnNlcnZhYmxlPGFueT4+O1xuICBjb2x1bW5EZWZzVGFibGU6IEFycmF5PGFueVtdPjtcbiAgc2luZ2xlU2VsZWN0aW9uVGFibGU6IEFycmF5PGJvb2xlYW4+O1xuICB0aXRsZXNUYWJsZTogQXJyYXk8c3RyaW5nPjtcbiAgYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8Ym9vbGVhbj4gO1xuICBub25FZGl0YWJsZTogYm9vbGVhbjtcblxuICAvL091dHB1dHNcbiAgQE91dHB1dCgpIGpvaW5UYWJsZXMgOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55W10+PjtcblxuICBcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGlhbG9nR3JpZENvbXBvbmVudD4pIHtcbiAgICBcbiAgICB0aGlzLmpvaW5UYWJsZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy8gdGhpcy5ub25FZGl0YWJsZSA9IHRydWU7XG4gICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIgPSAwO1xuICAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbiA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFNlbGVjdGVkUm93cygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRBbGxTZWxlY3RlZFJvd3MoKSB7XG4gICAgdGhpcy5nZXRBbGxSb3dzLm5leHQodHJ1ZSk7XG4gIH1cblxuICBqb2luUm93c1JlY2VpdmVkKGRhdGE6IGFueVtdKVxuICB7XG4gICAgICB0aGlzLmFsbFJvd3NSZWNlaXZlZC5wdXNoKGRhdGEpO1xuICAgICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIrKztcbiAgICAgIGlmKHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID09PSB0aGlzLmdldEFsbHNUYWJsZS5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIHRoaXMuZG9BZGQodGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFsbFJvd3NSZWNlaXZlZCk7XG4gICAgICB9XG4gIH1cblxuICBkb0FkZChyb3dzVG9BZGQpe1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtldmVudDonQWRkJyxkYXRhOiByb3dzVG9BZGR9KTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nKCl7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2V2ZW50OidDYW5jZWwnfSk7XG4gIH1cblxufVxuIiwiPGg0IG1hdC1kaWFsb2ctdGl0bGU+e3t0aXRsZX19PC9oND5cclxuPG1hdC1kaWFsb2ctY29udGVudCBjbGFzcz1cImRpYWxvZ0NvbmVudFwiPlxyXG4gIDxkaXYgKm5nRm9yPVwibGV0IGdldEFsbCBvZiBnZXRBbGxzVGFibGU7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cImFwcERpYWxvZ0RhdGFHcmlkRGl2XCIgIFtuZ1N0eWxlXT1cInsnbWFyZ2luLXRvcCc6IGk+MD8nMTAwcHgnOicwcHgnfVwiPlxyXG4gICAgPGFwcC1kYXRhLWdyaWQgXHJcbiAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzVGFibGVbaV1cIiBbdGhlbWVHcmlkXT0ndGhlbWVHcmlkJyAgW2dldEFsbF09J2dldEFsbCcgW2dsb2JhbFNlYXJjaF09dHJ1ZSBbc2luZ2xlU2VsZWN0aW9uXT1cInNpbmdsZVNlbGVjdGlvblRhYmxlW2ldXCJcclxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtub25FZGl0YWJsZV09J25vbkVkaXRhYmxlJyBbZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb25dPVwiZ2V0QWxsUm93cy5hc09ic2VydmFibGUoKVwiIChnZXRTZWxlY3RlZFJvd3MpPSdqb2luUm93c1JlY2VpdmVkKCRldmVudCknID5cclxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cclxuICA8L2Rpdj5cclxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7XCJjYW5jZWxcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiZ2V0QWxsU2VsZWN0ZWRSb3dzKClcIiBjZGtGb2N1c0luaXRpYWw+e3tcImFkZFwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==