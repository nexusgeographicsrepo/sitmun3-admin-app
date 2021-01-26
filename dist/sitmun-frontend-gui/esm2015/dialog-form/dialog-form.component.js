import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@ngx-translate/core";
function DialogFormComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
export class DialogFormComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
    }
    doAdd() {
        this.dialogRef.close({ event: 'Add' });
    }
    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
}
/** @nocollapse */ DialogFormComponent.ɵfac = function DialogFormComponent_Factory(t) { return new (t || DialogFormComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
/** @nocollapse */ DialogFormComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DialogFormComponent, selectors: [["app-dialog-form"]], decls: 11, vars: 8, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [4, "ngTemplateOutlet"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "click"]], template: function DialogFormComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h2", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "mat-dialog-content", 1);
        i0.ɵɵtemplate(3, DialogFormComponent_ng_container_3_Template, 1, 0, "ng-container", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "mat-dialog-actions", 3);
        i0.ɵɵelementStart(5, "button", 4);
        i0.ɵɵlistener("click", function DialogFormComponent_Template_button_click_5_listener() { return ctx.closeDialog(); });
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "translate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵlistener("click", function DialogFormComponent_Template_button_click_8_listener() { return ctx.doAdd(); });
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "translate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.title);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.HTMLReceived);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "Cancel"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, "Accept"));
    } }, directives: [i1.MatDialogTitle, i1.MatDialogContent, i2.NgTemplateOutlet, i1.MatDialogActions, i3.MatButton], pipes: [i4.TranslatePipe], styles: [""] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DialogFormComponent, [{
        type: Component,
        args: [{
                selector: 'app-dialog-form',
                templateUrl: './dialog-form.component.html',
                styleUrls: ['./dialog-form.component.css']
            }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9tYWluL2FuZ3VsYXItbGlicmFyeS9wcm9qZWN0cy9zaXRtdW4tZnJvbnRlbmQtZ3VpL3NyYy9saWIvIiwic291cmNlcyI6WyJkaWFsb2ctZm9ybS9kaWFsb2ctZm9ybS5jb21wb25lbnQudHMiLCJkaWFsb2ctZm9ybS9kaWFsb2ctZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE4QyxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7SUNBdEQsd0JBQ2U7O0FETWpCLE1BQU0sT0FBTyxtQkFBbUI7SUFLOUIsWUFBb0IsU0FBNEM7UUFBNUMsY0FBUyxHQUFULFNBQVMsQ0FBbUM7SUFBRyxDQUFDO0lBRXBFLFFBQVE7SUFFUixDQUFDO0lBR0QsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O3lHQWxCVSxtQkFBbUI7MkVBQW5CLG1CQUFtQjtRQ1RoQyw2QkFBcUI7UUFBQSxZQUFTO1FBQUEsaUJBQUs7UUFDbkMsNkNBQ0U7UUFBQSxzRkFDQTtRQUNGLGlCQUFxQjtRQUNyQiw2Q0FDRTtRQUFBLGlDQUE0QztRQUF4QixnR0FBUyxpQkFBYSxJQUFDO1FBQUMsWUFBd0I7O1FBQUEsaUJBQVM7UUFDN0UsaUNBQXNEO1FBQWxDLGdHQUFTLFdBQU8sSUFBQztRQUFpQixZQUF3Qjs7UUFBQSxpQkFBUztRQUN6RixpQkFBcUI7O1FBUkEsZUFBUztRQUFULCtCQUFTO1FBRWQsZUFBZ0M7UUFBaEMsbURBQWdDO1FBSUYsZUFBd0I7UUFBeEIsb0RBQXdCO1FBQ2QsZUFBd0I7UUFBeEIscURBQXdCOztrRERFbkUsbUJBQW1CO2NBTC9CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQzthQUMzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsRm9ybUNvbnRyb2wsVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7IFxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGlhbG9nLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kaWFsb2ctZm9ybS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuICB0aXRsZTogc3RyaW5nO1xuICBIVE1MUmVjZWl2ZWQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGlhbG9nRm9ybUNvbXBvbmVudD4pIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgfVxuXG5cbiAgZG9BZGQoKXtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCd9KTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nKCl7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2V2ZW50OidDYW5jZWwnfSk7XG4gIH1cblxufVxuIiwiPGgyIG1hdC1kaWFsb2ctdGl0bGU+e3t0aXRsZX19PC9oMj5cbjxtYXQtZGlhbG9nLWNvbnRlbnQgY2xhc3M9XCJtYXQtdHlwb2dyYXBoeVwiPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiSFRNTFJlY2VpdmVkXCI+XG4gIDwvbmctY29udGFpbmVyPiBcbjwvbWF0LWRpYWxvZy1jb250ZW50PlxuPG1hdC1kaWFsb2ctYWN0aW9ucyBhbGlnbj1cImVuZFwiPlxuICA8YnV0dG9uIG1hdC1idXR0b24gIChjbGljayk9XCJjbG9zZURpYWxvZygpXCI+e3tcIkNhbmNlbFwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiZG9BZGQoKVwiIGNka0ZvY3VzSW5pdGlhbD57e1wiQWNjZXB0XCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+Il19