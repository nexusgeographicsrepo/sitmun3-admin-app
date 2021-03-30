/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../angular-hal/src/lib/rest.service';
import { Language } from './language.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var LanguageService = /** @class */ (function (_super) {
    tslib_1.__extends(LanguageService, _super);
    /** constructor */
    function LanguageService(injector, http) {
        var _this = _super.call(this, Language, "languages", injector) || this;
        _this.http = http;
        /**
         * API resource path
         */
        _this.LANGUAGES_API = 'languages';
        return _this;
    }
    /** remove translation*/
    /**
     * remove translation
     * @param {?} item
     * @return {?}
     */
    LanguageService.prototype.remove = /**
     * remove translation
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.http.delete(item._links.self.href);
    };
    /** save translation*/
    /**
     * save translation
     * @param {?} item
     * @return {?}
     */
    LanguageService.prototype.save = /**
     * save translation
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
            result = this.http.post(this.resourceService.getResourceUrl(this.LANGUAGES_API), item);
        }
        return result;
    };
    LanguageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    LanguageService.ctorParameters = function () { return [
        { type: Injector },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: LanguageService, providedIn: "root" });
    return LanguageService;
}(RestService));
export { LanguageService };
if (false) {
    /**
     * API resource path
     * @type {?}
     */
    LanguageService.prototype.LANGUAGES_API;
    /** @type {?} */
    LanguageService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS8iLCJzb3VyY2VzIjpbInRyYW5zbGF0aW9uL2xhbmd1YWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztJQU1QLDJDQUFxQjtJQUt4RCxrQkFBa0I7SUFDbEIseUJBQVksUUFBa0IsRUFBUyxJQUFnQjtRQUF2RCxZQUNFLGtCQUFNLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLFNBQ3ZDO1FBRnNDLFVBQUksR0FBSixJQUFJLENBQVk7Ozs7OEJBSGhDLFdBQVc7O0tBS2pDO0lBRUQsd0JBQXdCOzs7Ozs7SUFDeEIsZ0NBQU07Ozs7O0lBQU4sVUFBTyxJQUFjO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUVoRDtJQUVELHNCQUFzQjs7Ozs7O0lBQ3RCLDhCQUFJOzs7OztJQUFKLFVBQUssSUFBYzs7UUFDakIsSUFBSSxNQUFNLENBQXFCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNmOztnQkE1QkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUb0IsUUFBUTtnQkFDcEIsVUFBVTs7OzBCQURuQjtFQVVxQyxXQUFXO1NBQW5DLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSAnLi9sYW5ndWFnZS5tb2RlbCc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8TGFuZ3VhZ2U+IHtcblxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cbiAgcHVibGljIExBTkdVQUdFU19BUEkgPSAnbGFuZ3VhZ2VzJztcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIHN1cGVyKExhbmd1YWdlLCBcImxhbmd1YWdlc1wiLCBpbmplY3Rvcik7XG4gIH1cbiAgXG4gIC8qKiByZW1vdmUgdHJhbnNsYXRpb24qL1xuICByZW1vdmUoaXRlbTogTGFuZ3VhZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xuICAgXG4gIH1cbiAgXG4gIC8qKiBzYXZlIHRyYW5zbGF0aW9uKi9cbiAgc2F2ZShpdGVtOiBMYW5ndWFnZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkxBTkdVQUdFU19BUEkpICwgaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==