import { CartographyGroup } from './cartography-group.model';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../angular-hal/src/lib/rest.service';
/** CartographyGroup manager service */
import * as ɵngcc0 from '@angular/core';
export declare class CartographyGroupService extends RestService<CartographyGroup> {
    private http;
    /** API resource path */
    CARTOGRAPHY_GROUP_API: string;
    /** constructor */
    constructor(injector: Injector, http: HttpClient);
    /** remove cartography group*/
    remove(item: CartographyGroup): Observable<Object>;
    /** save cartography group*/
    save(item: CartographyGroup): Observable<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CartographyGroupService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<CartographyGroupService>;
}

//# sourceMappingURL=cartography-group.service.d.ts.map