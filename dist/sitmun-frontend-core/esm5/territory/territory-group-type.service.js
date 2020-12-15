/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TerritoryGroupType } from './territory-group-type.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../angular-hal/src/lib/rest.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var TerritoryGroupTypeService = /** @class */ (function (_super) {
    tslib_1.__extends(TerritoryGroupTypeService, _super);
    /** constructor */
    function TerritoryGroupTypeService(injector, http) {
        var _this = _super.call(this, TerritoryGroupType, "territory-group-types", injector) || this;
        _this.http = http;
        /**
         * API base path
         */
        _this.API = '/api';
        /**
         * API resource path
         */
        _this.TERRITORYGROUPTYPE_API = _this.API + '/territory-group-types';
        return _this;
    }
    /** remove territory*/
    /**
     * remove territory
     * @param {?} item
     * @return {?}
     */
    TerritoryGroupTypeService.prototype.remove = /**
     * remove territory
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.http.delete(item._links.self.href);
    };
    /** save territory*/
    /**
     * save territory
     * @param {?} item
     * @return {?}
     */
    TerritoryGroupTypeService.prototype.save = /**
     * save territory
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.TERRITORYGROUPTYPE_API, item);
        }
        return result;
    };
    TerritoryGroupTypeService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TerritoryGroupTypeService.ctorParameters = function () { return [
        { type: Injector },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ TerritoryGroupTypeService.ngInjectableDef = i0.defineInjectable({ factory: function TerritoryGroupTypeService_Factory() { return new TerritoryGroupTypeService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: TerritoryGroupTypeService, providedIn: "root" });
    return TerritoryGroupTypeService;
}(RestService));
export { TerritoryGroupTypeService };
if (false) {
    /**
     * API base path
     * @type {?}
     */
    TerritoryGroupTypeService.prototype.API;
    /**
     * API resource path
     * @type {?}
     */
    TerritoryGroupTypeService.prototype.TERRITORYGROUPTYPE_API;
    /** @type {?} */
    TerritoryGroupTypeService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVycml0b3J5LWdyb3VwLXR5cGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS8iLCJzb3VyY2VzIjpbInRlcnJpdG9yeS90ZXJyaXRvcnktZ3JvdXAtdHlwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7OztJQUlqQixxREFBK0I7SUFPNUUsa0JBQWtCO0lBQ2xCLG1DQUFZLFFBQWtCLEVBQVMsSUFBZ0I7UUFBdkQsWUFDRSxrQkFBTSxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLENBQUMsU0FDN0Q7UUFGc0MsVUFBSSxHQUFKLElBQUksQ0FBWTs7OztvQkFMMUMsTUFBTTs7Ozt1Q0FFYSxLQUFJLENBQUMsR0FBRyxHQUFHLHdCQUF3Qjs7S0FLbEU7SUFFRCxzQkFBc0I7Ozs7OztJQUN0QiwwQ0FBTTs7Ozs7SUFBTixVQUFPLElBQXdCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUVoRDtJQUVELG9CQUFvQjs7Ozs7O0lBQ3BCLHdDQUFJOzs7OztJQUFKLFVBQUssSUFBUzs7UUFDWixJQUFJLE1BQU0sQ0FBcUI7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0Q7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7O2dCQTlCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5vQixRQUFRO2dCQUNwQixVQUFVOzs7b0NBRm5CO0VBUStDLFdBQVc7U0FBN0MseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVycml0b3J5R3JvdXBUeXBlIH0gZnJvbSAnLi90ZXJyaXRvcnktZ3JvdXAtdHlwZS5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGVycml0b3J5R3JvdXBUeXBlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRlcnJpdG9yeUdyb3VwVHlwZT4ge1xuICBcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cbiAgcHVibGljIEFQSSA9ICcvYXBpJztcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXG4gIHB1YmxpYyBURVJSSVRPUllHUk9VUFRZUEVfQVBJID0gdGhpcy5BUEkgKyAnL3RlcnJpdG9yeS1ncm91cC10eXBlcyc7XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcihUZXJyaXRvcnlHcm91cFR5cGUsIFwidGVycml0b3J5LWdyb3VwLXR5cGVzXCIsIGluamVjdG9yKTtcbiAgfVxuICBcbiAgLyoqIHJlbW92ZSB0ZXJyaXRvcnkqL1xuICByZW1vdmUoaXRlbTogVGVycml0b3J5R3JvdXBUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcbiAgIFxuICB9XG4gIFxuICAvKiogc2F2ZSB0ZXJyaXRvcnkqL1xuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlRFUlJJVE9SWUdST1VQVFlQRV9BUEkgLCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbn0iXX0=