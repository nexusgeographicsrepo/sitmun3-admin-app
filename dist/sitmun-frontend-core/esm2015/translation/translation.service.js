/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../angular-hal/src/lib/rest.service';
import { Translation } from './translation.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TranslationService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Translation, "translations", injector);
        this.http = http;
        /**
         * API resource path
         */
        this.TRANSLATION_API = 'translations';
    }
    /**
     * remove translation
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save translation
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let language = {};
        language._links = {};
        language._links.self = {};
        language._links.self.href = "";
        if (item.language != null) {
            language = item.language;
            if (typeof item.language._links != 'undefined') {
                item.language = item.language._links.self.href;
            }
        }
        if (item._links != null) {
            delete item.language;
            // if (language._links.self.href == '') {
            //   item.deleteRelation('language', language).subscribe(result => {
            //   }, error => console.error(error));
            // } else {
            //   item.substituteRelation('language', language).subscribe(result => {
            //   }, error => console.error(error));
            // }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.resourceService.getResourceUrl(this.TRANSLATION_API), item);
        }
        return result;
    }
}
TranslationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TranslationService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/** @nocollapse */ TranslationService.ngInjectableDef = i0.defineInjectable({ factory: function TranslationService_Factory() { return new TranslationService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: TranslationService, providedIn: "root" });
if (false) {
    /**
     * API resource path
     * @type {?}
     */
    TranslationService.prototype.TRANSLATION_API;
    /** @type {?} */
    TranslationService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS8iLCJzb3VyY2VzIjpbInRyYW5zbGF0aW9uL3RyYW5zbGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFNbEQsTUFBTSx5QkFBMEIsU0FBUSxXQUF3Qjs7Ozs7O0lBTTlELFlBQVksUUFBa0IsRUFBUyxJQUFnQjtRQUNyRCxLQUFLLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURSLFNBQUksR0FBSixJQUFJLENBQVk7Ozs7K0JBSDlCLGNBQWM7S0FLdEM7Ozs7OztJQUdELE1BQU0sQ0FBQyxJQUFpQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FFaEQ7Ozs7OztJQUdELElBQUksQ0FBQyxJQUFpQjs7UUFDcEIsSUFBSSxNQUFNLENBQXFCOztRQUUvQixJQUFJLFFBQVEsR0FBTyxFQUFFLENBQUE7UUFDckIsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDckIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2hEO1NBQ0Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7Ozs7OztZQVNyQixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFHLElBQUksQ0FBQyxDQUFDO1NBQzNGO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNmOzs7WUFsREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVG9CLFFBQVE7WUFDcEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb24gfSBmcm9tICcuL3RyYW5zbGF0aW9uLm1vZGVsJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvblNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUcmFuc2xhdGlvbj4ge1xuXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xuICBwdWJsaWMgVFJBTlNMQVRJT05fQVBJID0gJ3RyYW5zbGF0aW9ucyc7XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcihUcmFuc2xhdGlvbiwgXCJ0cmFuc2xhdGlvbnNcIiwgaW5qZWN0b3IpO1xuICB9XG4gIFxuICAvKiogcmVtb3ZlIHRyYW5zbGF0aW9uKi9cbiAgcmVtb3ZlKGl0ZW06IFRyYW5zbGF0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcbiAgIFxuICB9XG4gIFxuICAvKiogc2F2ZSB0cmFuc2xhdGlvbiovXG4gIHNhdmUoaXRlbTogVHJhbnNsYXRpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcblxuICAgIGxldCBsYW5ndWFnZTphbnkgPSB7fVxuICAgIGxhbmd1YWdlLl9saW5rcyA9IHt9O1xuICAgIGxhbmd1YWdlLl9saW5rcy5zZWxmID0ge307XG4gICAgbGFuZ3VhZ2UuX2xpbmtzLnNlbGYuaHJlZiA9IFwiXCI7XG5cbiAgICBpZiAoaXRlbS5sYW5ndWFnZSAhPSBudWxsKSB7XG4gICAgICBsYW5ndWFnZSA9IGl0ZW0ubGFuZ3VhZ2U7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0ubGFuZ3VhZ2UuX2xpbmtzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGl0ZW0ubGFuZ3VhZ2UgPSBpdGVtLmxhbmd1YWdlLl9saW5rcy5zZWxmLmhyZWY7XG4gICAgICB9IFxuICAgIH1cblxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xuICAgICAgZGVsZXRlIGl0ZW0ubGFuZ3VhZ2U7XG4gICAgICAvLyBpZiAobGFuZ3VhZ2UuX2xpbmtzLnNlbGYuaHJlZiA9PSAnJykge1xuICAgICAgLy8gICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdsYW5ndWFnZScsIGxhbmd1YWdlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIC8vICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuXG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignbGFuZ3VhZ2UnLCBsYW5ndWFnZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAvLyAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgIC8vIH1cbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5UUkFOU0xBVElPTl9BUEkpICwgaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==