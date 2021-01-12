import { CodeList } from './codelist.model';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../angular-hal/src/lib/rest.service';
/** Connection manager service */
import * as ɵngcc0 from '@angular/core';
export declare class CodeListService extends RestService<CodeList> {
    private http;
    /** API resource path */
    CODELIST_API: string;
    /** constructor */
    constructor(injector: Injector, http: HttpClient);
    /** remove connection*/
    remove(item: CodeList): Observable<Object>;
    /** save connection*/
    save(item: CodeList): Observable<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CodeListService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<CodeListService>;
}

//# sourceMappingURL=codelist.service.d.ts.map