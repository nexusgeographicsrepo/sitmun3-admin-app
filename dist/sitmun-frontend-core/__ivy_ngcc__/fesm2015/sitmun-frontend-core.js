import { throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { parse } from 'url';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { isNullOrUndefined, isPrimitive } from 'util';
import { Injectable, Inject, Injector, Directive, Input, TemplateRef, ViewContainerRef, NgModule, defineInjectable, inject, INJECTOR } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * REST array of resource implementation
 * @template T
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from '@ngx-translate/core';
class ResourceArray {
    constructor() {
        /**
         * total number of elements in this array
         */
        this.totalElements = 0;
        /**
         * total number of pages in the response
         */
        this.totalPages = 1;
        /**
         * page number in the response
         */
        this.pageNumber = 1;
        /**
         * array components
         */
        this.result = [];
        /**
         * push a new resource to the array
         */
        this.push = (el) => {
            this.result.push(el);
        };
        /**
         * length of the array
         */
        this.length = () => {
            return this.result.length;
        };
        /**
         * load array data from REST request
         */
        this.init = (type, response, sortInfo) => {
            /** @type {?} */
            const result = ResourceHelper.createEmptyResult(this._embedded);
            result.sortInfo = sortInfo;
            ResourceHelper.instantiateResourceCollection(type, response, result);
            return result;
        };
        /**
         * Load next page
         */
        this.next = (type) => {
            if (this.next_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(this.next_uri), { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
            }
            return throwError('no next defined');
        };
        /**
         * Load previous page
         */
        this.prev = (type) => {
            if (this.prev_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(this.prev_uri), { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
            }
            return throwError('no prev defined');
        };
        /**
         * Load first page
         */
        this.first = (type) => {
            if (this.first_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(this.first_uri), { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
            }
            return throwError('no first defined');
        };
        /**
         * Load last page
         */
        this.last = (type) => {
            if (this.last_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(this.last_uri), { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
            }
            return throwError('no last defined');
        };
        /**
         * Load page with given pageNumber
         */
        this.page = (type, pageNumber) => {
            this.self_uri = this.self_uri.replace('{?page,size,sort}', '');
            this.self_uri = this.self_uri.replace('{&sort}', '');
            /** @type {?} */
            let urlParsed = parse(ResourceHelper.getProxy(this.self_uri));
            /** @type {?} */
            let query = ResourceArray.replaceOrAdd(urlParsed.query, 'size', this.pageSize.toString());
            query = ResourceArray.replaceOrAdd(query, 'page', pageNumber.toString());
            /** @type {?} */
            let uri = urlParsed.query ?
                ResourceHelper.getProxy(this.self_uri).replace(urlParsed.query, query) : ResourceHelper.getProxy(this.self_uri).concat(query);
            uri = this.addSortInfo(uri);
            return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
        };
        /**
         * Sort collection based on given sort attribute
         */
        this.sortElements = (type, ...sort) => {
            this.self_uri = this.self_uri.replace('{?page,size,sort}', '');
            this.self_uri = this.self_uri.replace('{&sort}', '');
            /** @type {?} */
            let uri = ResourceHelper.getProxy(this.self_uri).concat('?', 'size=', this.pageSize.toString(), '&page=', this.pageNumber.toString());
            uri = this.addSortInfo(uri);
            return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, sort)), catchError(error => throwError(error)));
        };
        /**
         * Load page with given size
         */
        this.size = (type, size) => {
            /** @type {?} */
            let uri = ResourceHelper.getProxy(this.self_uri).concat('?', 'size=', size.toString());
            uri = this.addSortInfo(uri);
            return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(response => this.init(type, response, this.sortInfo)), catchError(error => throwError(error)));
        };
    }
    /**
     * Add sort info to given URI
     * @param {?} uri
     * @return {?}
     */
    addSortInfo(uri) {
        if (this.sortInfo) {
            for (const item of this.sortInfo) {
                uri = uri.concat('&sort=', item.path, ',', item.order);
            }
        }
        return uri;
    }
    /**
     * Add replace or add param value to query string
     * @param {?} query
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    static replaceOrAdd(query, field, value) {
        if (query) {
            /** @type {?} */
            let idx = query.indexOf(field);
            /** @type {?} */
            let idxNextAmp = query.indexOf('&', idx) == -1 ? query.indexOf('/', idx) : query.indexOf('&', idx);
            if (idx != -1) {
                /** @type {?} */
                let seachValue = query.substring(idx, idxNextAmp);
                query = query.replace(seachValue, field + '=' + value);
            }
            else {
                query = query.concat("&" + field + '=' + value);
            }
        }
        else {
            query = "?" + field + '=' + value;
        }
        return query;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * REST API access helper
 */
class ResourceHelper {
    /**
     * get request option params
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    static optionParams(params, options) {
        if (options) {
            if (options.params) {
                for (const param of options.params) {
                    params = params.append(param.key, param.value.toString());
                }
            }
            if (options.size) {
                params = params.append('size', options.size.toString());
            }
            if (options.sort) {
                for (const s of options.sort) {
                    /** @type {?} */
                    let sortString = '';
                    sortString = s.path ? sortString.concat(s.path) : sortString;
                    sortString = s.order ? sortString.concat(',').concat(s.order) : sortString;
                    params = params.append('sort', sortString);
                }
            }
        }
        return params;
    }
    /**
     * resolve resource relations
     * @param {?} resource
     * @return {?}
     */
    static resolveRelations(resource) {
        /** @type {?} */
        const result = {};
        for (const key in resource) {
            if (!isNullOrUndefined(resource[key])) {
                if (ResourceHelper.className(resource[key])
                    .find((className) => className == 'Resource')) {
                    if (resource[key]['_links'])
                        result[key] = resource[key]['_links']['self']['href'];
                }
                else if (Array.isArray(resource[key])) {
                    /** @type {?} */
                    let array = resource[key];
                    if (array) {
                        result[key] = new Array();
                        array.forEach((element) => {
                            if (isPrimitive(element)) {
                                result[key].push(element);
                            }
                            else {
                                result[key].push(this.resolveRelations(element));
                            }
                        });
                    }
                }
                else {
                    result[key] = resource[key];
                }
            }
        }
        return /** @type {?} */ (result);
    }
    /**
     * create an empty resource from embedded data
     * @template T
     * @param {?} _embedded
     * @return {?}
     */
    static createEmptyResult(_embedded) {
        /** @type {?} */
        let resourceArray = new ResourceArray();
        resourceArray._embedded = _embedded;
        return resourceArray;
    }
    /**
     * get resource class name
     * @param {?} obj
     * @return {?}
     */
    static getClassName(obj) {
        /** @type {?} */
        var funcNameRegex = /function (.+?)\(/;
        /** @type {?} */
        var results = (funcNameRegex).exec(obj.constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    }
    /**
     * get resource class name from a prototype object
     * @param {?} objProto
     * @return {?}
     */
    static className(objProto) {
        /** @type {?} */
        let classNames = [];
        /** @type {?} */
        let obj = Object.getPrototypeOf(objProto);
        /** @type {?} */
        let className;
        while ((className = ResourceHelper.getClassName(obj)) !== 'Object') {
            classNames.push(className);
            obj = Object.getPrototypeOf(obj);
        }
        return classNames;
    }
    /**
     * instantiate a ResourceCollection from response embedded data
     * @template T
     * @param {?} type
     * @param {?} payload
     * @param {?} result
     * @param {?=} builder
     * @return {?}
     */
    static instantiateResourceCollection(type, payload, result, builder) {
        for (const embeddedClassName of Object.keys(payload[result._embedded])) {
            /** @type {?} */
            let embedded = payload[result._embedded];
            /** @type {?} */
            const items = embedded[embeddedClassName];
            for (let item of items) {
                /** @type {?} */
                let instance = new type();
                instance = this.searchSubtypes(builder, embeddedClassName, instance);
                this.instantiateResource(instance, item);
                result.push(instance);
            }
        }
        result.totalElements = payload.page ? payload.page.totalElements : result.length;
        result.totalPages = payload.page ? payload.page.totalPages : 1;
        result.pageNumber = payload.page ? payload.page.number : 1;
        result.pageSize = payload.page ? payload.page.size : 20;
        result.self_uri = payload._links && payload._links.self ? payload._links.self.href : undefined;
        result.next_uri = payload._links && payload._links.next ? payload._links.next.href : undefined;
        result.prev_uri = payload._links && payload._links.prev ? payload._links.prev.href : undefined;
        result.first_uri = payload._links && payload._links.first ? payload._links.first.href : undefined;
        result.last_uri = payload._links && payload._links.last ? payload._links.last.href : undefined;
        return result;
    }
    /**
     * search subtypes
     * @template T
     * @param {?} builder
     * @param {?} embeddedClassName
     * @param {?} instance
     * @return {?}
     */
    static searchSubtypes(builder, embeddedClassName, instance) {
        if (builder && builder.subtypes) {
            /** @type {?} */
            let keys = builder.subtypes.keys();
            Array.from(keys).forEach((subtypeKey) => {
                if (embeddedClassName.toLowerCase().startsWith(subtypeKey.toLowerCase())) {
                    /** @type {?} */
                    let subtype = builder.subtypes.get(subtypeKey);
                    instance = new subtype();
                }
            });
        }
        return instance;
    }
    /**
     * instantiate a Resource from response
     * @template T
     * @param {?} entity
     * @param {?} payload
     * @return {?}
     */
    static instantiateResource(entity, payload) {
        for (const p in payload) {
            //TODO array init
            /* if(entity[p].constructor === Array && isNullOrUndefined(payload[p]))
                             entity[p] = [];
                         else*/
            entity[p] = payload[p];
        }
        return entity;
    }
    /**
     * set proxy URL
     * @param {?} proxy_uri
     * @return {?}
     */
    static setProxyUri(proxy_uri) {
        ResourceHelper.proxy_uri = proxy_uri;
    }
    /**
     * set Root URI
     * @param {?} root_uri
     * @return {?}
     */
    static setRootUri(root_uri) {
        ResourceHelper.root_uri = root_uri;
    }
    /**
     * get proxy URL
     * @return {?}
     */
    static getURL() {
        return ResourceHelper.proxy_uri && ResourceHelper.proxy_uri != '' ?
            ResourceHelper.addSlash(ResourceHelper.proxy_uri) :
            ResourceHelper.addSlash(ResourceHelper.root_uri);
    }
    /**
     * add slash to URI
     * @param {?} uri
     * @return {?}
     */
    static addSlash(uri) {
        /** @type {?} */
        let uriParsed = parse(uri);
        if (isNullOrUndefined(uriParsed.search) && uri && uri[uri.length - 1] != '/')
            return uri + '/';
        return uri;
    }
    /**
     * get proxy from URL
     * @param {?} url
     * @return {?}
     */
    static getProxy(url) {
        if (!ResourceHelper.proxy_uri || ResourceHelper.proxy_uri == '')
            return url;
        return ResourceHelper.addSlash(url.replace(ResourceHelper.root_uri, ResourceHelper.proxy_uri));
    }
    /**
     * set HttpClient
     * @param {?} http
     * @return {?}
     */
    static setHttp(http) {
        ResourceHelper.http = http;
    }
    /**
     * get HttpClient
     * @return {?}
     */
    static getHttp() {
        return ResourceHelper.http;
    }
    /**
     * get root URI
     * @return {?}
     */
    static getRootUri() {
        return ResourceHelper.root_uri;
    }
}
/**
 * HttpHeaders
 */
ResourceHelper.headers = new HttpHeaders();
/**
 * Proxy URL
 */
ResourceHelper.proxy_uri = null;
/**
 * Root URL
 */
ResourceHelper.root_uri = null;
/**
 * HttpClient
 */
ResourceHelper.http = null;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract resource class
 * @abstract
 */
class Resource {
    /**
     * constructor
     */
    constructor() {
    }
    /**
     * get subtypes
     * @return {?}
     */
    get subtypes() {
        return this._subtypes;
    }
    /**
     * set subtypes
     * @param {?} _subtypes
     * @return {?}
     */
    set subtypes(_subtypes) {
        this._subtypes = _subtypes;
    }
    /**
     * Get collection of related resources
     * @template T
     * @param {?} type
     * @param {?} relation
     * @param {?=} _embedded
     * @param {?=} options
     * @param {?=} builder
     * @return {?}
     */
    getRelationArray(type, relation, _embedded, options, builder) {
        /** @type {?} */
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        const result = ResourceHelper.createEmptyResult(isNullOrUndefined(_embedded) ? "_embedded" : _embedded);
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(this._links[relation].href), {
                headers: ResourceHelper.headers,
                params: params
            });
            return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, builder)), map((array) => array.result));
        }
        else {
            return of([]);
        }
    }
    /**
     * Get related resource
     * @template T
     * @param {?} type
     * @param {?} relation
     * @param {?=} builder
     * @return {?}
     */
    getRelation(type, relation, builder) {
        /** @type {?} */
        let result = new type();
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(this._links[relation].href), { headers: ResourceHelper.headers });
            return observable.pipe(map((data) => {
                if (builder) {
                    for (const embeddedClassName of Object.keys(data['_links'])) {
                        if (embeddedClassName == 'self') {
                            /** @type {?} */
                            let href = data._links[embeddedClassName].href;
                            /** @type {?} */
                            let idx = href.lastIndexOf('/');
                            /** @type {?} */
                            let realClassName = href.replace(ResourceHelper.getRootUri(), "").substring(0, idx);
                            result = ResourceHelper.searchSubtypes(builder, realClassName, result);
                            break;
                        }
                    }
                }
                return ResourceHelper.instantiateResource(result, data);
            }));
        }
        else {
            return of(null);
        }
    }
    /**
     * Adds the given resource to the bound collection by the relation
     * @template T
     * @param {?} relation
     * @param {?} resource
     * @return {?}
     */
    addRelation(relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().post(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
        }
        else {
            return throwError('no relation found');
        }
    }
    /**
     * Bind the given resource to this resource by the given relation
     * @template T
     * @param {?} relation
     * @param {?} resource
     * @return {?}
     */
    updateRelation(relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().patch(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
        }
        else {
            return throwError('no relation found');
        }
    }
    /**
     * Bind the given resource to this resource by the given relation
     * @template T
     * @param {?} relation
     * @param {?} resource
     * @return {?}
     */
    substituteRelation(relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().put(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
        }
        else {
            return throwError('no relation found');
        }
    }
    /**
     * Bind the given resource to this resource by the given relation
     * @template T
     * @param {?} relation
     * @param {?} resources
     * @return {?}
     */
    substituteAllRelation(relation, resources) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            /** @type {?} */
            let header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().put(ResourceHelper.getProxy(this._links[relation].href), resources.map((resource) => resource._links.self.href), { headers: header });
        }
        else {
            return throwError('no relation found');
        }
    }
    /**
     * Unbind the resource with the given relation from this resource
     * @template T
     * @param {?} relation
     * @param {?} resource
     * @return {?}
     */
    deleteRelation(relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(resource._links)) {
            /** @type {?} */
            let link = resource._links['self'].href;
            /** @type {?} */
            let idx = link.lastIndexOf('/') + 1;
            if (idx == -1)
                return throwError('no relation found');
            /** @type {?} */
            let relationId = link.substring(idx);
            return ResourceHelper.getHttp().delete(ResourceHelper.getProxy(this._links[relation].href + '/' + relationId), { headers: ResourceHelper.headers });
        }
        else {
            return throwError('no relation found');
        }
    }
    /**
     * Unbind the resource with the given relation from this resource
     * @template T
     * @param {?} relation
     * @return {?}
     */
    deleteAllRelation(relation) {
        return ResourceHelper.getHttp().delete(ResourceHelper.getProxy(this._links[relation].href), { headers: ResourceHelper.headers });
    }
}
Resource.ɵfac = function Resource_Factory(t) { return new (t || Resource)(); };
Resource.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Resource, factory: Resource.ɵfac });
/** @nocollapse */
Resource.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Resource, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User model
 */
class User extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * ExternalService
 */
class ExternalService {
    /**
     * constructor
     * @param {?} externalConfigurationService
     */
    constructor(externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUri(externalConfigurationService.getProxyUri());
        ResourceHelper.setRootUri(externalConfigurationService.getRootUri());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }
    /**
     * update ExternalConfigurationHandler
     * @param {?} externalConfigurationService
     * @return {?}
     */
    updateExternalConfigurationHandlerInterface(externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUri(externalConfigurationService.getProxyUri());
        ResourceHelper.setRootUri(externalConfigurationService.getRootUri());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }
    /**
     * get ExternalConfiguration
     * @return {?}
     */
    getExternalConfiguration() {
        return this.externalConfigurationService.getExternalConfiguration();
    }
    /**
     * get proxy URL
     * @return {?}
     */
    getProxyUri() {
        return this.externalConfigurationService.getProxyUri();
    }
    /**
     * get Root URI
     * @return {?}
     */
    getRootUri() {
        return this.externalConfigurationService.getRootUri();
    }
    /**
     * get URL
     * @return {?}
     */
    getURL() {
        return ResourceHelper.getURL();
    }
    /**
     * get HttpClient
     * @return {?}
     */
    getHttp() {
        return ResourceHelper.getHttp();
    }
}
ExternalService.ɵfac = function ExternalService_Factory(t) { return new (t || ExternalService)(ɵngcc0.ɵɵinject('ExternalConfigurationService')); };
ExternalService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ExternalService, factory: ExternalService.ɵfac });
/** @nocollapse */
ExternalService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['ExternalConfigurationService',] }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ExternalService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['ExternalConfigurationService']
            }] }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * ResourceService
 */
class ResourceService {
    /**
     * constructor
     * @param {?} externalService
     */
    constructor(externalService) {
        this.externalService = externalService;
    }
    /**
     * get URL
     * @return {?}
     */
    static getURL() {
        return ResourceHelper.getURL();
    }
    /**
     * get all resources from a base URI of a given type
     * @template T
     * @param {?} type
     * @param {?} resource
     * @param {?} _embedded
     * @param {?=} options
     * @param {?=} subType
     * @return {?}
     */
    getAll(type, resource, _embedded, options, subType) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource).concat('?projection=view');
        /** @type {?} */
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        const result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, subType)), catchError(error => throwError(error)));
    }
    /**
     * get resource from a base URI and a given id
     * @template T
     * @param {?} type
     * @param {?} resource
     * @param {?} id
     * @return {?}
     */
    get(type, resource, id) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource).concat('/', id, '?projection=view');
        /** @type {?} */
        const result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers });
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)), catchError(error => throwError(error)));
    }
    /**
     * get resource from its selflink
     * @template T
     * @param {?} type
     * @param {?} resourceLink
     * @return {?}
     */
    getBySelfLink(type, resourceLink) {
        /** @type {?} */
        const result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), { headers: ResourceHelper.headers });
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)), catchError(error => throwError(error)));
    }
    /**
     * search resources from a given base path, query and options
     * @template T
     * @param {?} type
     * @param {?} query
     * @param {?} resource
     * @param {?} _embedded
     * @param {?=} options
     * @return {?}
     */
    search(type, query, resource, _embedded, options) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource).concat('/search/', query);
        /** @type {?} */
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        const result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)), catchError(error => throwError(error)));
    }
    /**
     * search a single resource from a given base path, query and options
     * @template T
     * @param {?} type
     * @param {?} query
     * @param {?} resource
     * @param {?=} options
     * @return {?}
     */
    searchSingle(type, query, resource, options) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource).concat('/search/', query);
        /** @type {?} */
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        const result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(response => ResourceHelper.instantiateResource(result, response)), catchError(error => throwError(error)));
    }
    /**
     * search resources from a given base path, custom query and options
     * @template T
     * @param {?} type
     * @param {?} query
     * @param {?} resource
     * @param {?} _embedded
     * @param {?=} options
     * @return {?}
     */
    customQuery(type, query, resource, _embedded, options) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource + query);
        /** @type {?} */
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        const result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)), catchError(error => throwError(error)));
    }
    /**
     * get resource given a relation link
     * @template T
     * @param {?} type
     * @param {?} resourceLink
     * @return {?}
     */
    getByRelation(type, resourceLink) {
        /** @type {?} */
        let result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)), catchError(error => throwError(error)));
    }
    /**
     * get resource array given a relation link
     * @template T
     * @param {?} type
     * @param {?} resourceLink
     * @param {?} _embedded
     * @param {?=} builder
     * @return {?}
     */
    getByRelationArray(type, resourceLink, _embedded, builder) {
        /** @type {?} */
        const result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, builder)), catchError(error => throwError(error)));
    }
    /**
     * count resources given a path
     * @param {?} resource
     * @return {?}
     */
    count(resource) {
        /** @type {?} */
        const uri = this.getResourceUrl(resource).concat('/search/countAll');
        return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, observe: 'body' }).pipe(map((response) => Number(response.body)), catchError(error => throwError(error)));
    }
    /**
     * create resource from self link and entity data
     * @template T
     * @param {?} selfResource
     * @param {?} entity
     * @return {?}
     */
    create(selfResource, entity) {
        /** @type {?} */
        const uri = ResourceHelper.getURL() + selfResource;
        /** @type {?} */
        const payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().post(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map((response) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                let body = response.body;
                return throwError(body.error);
            }
        }), catchError(error => throwError(error)));
    }
    /**
     * update resource from a given entity data
     * @template T
     * @param {?} entity
     * @return {?}
     */
    update(entity) {
        /** @type {?} */
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        /** @type {?} */
        const payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().put(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map((response) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                let body = response.body;
                return throwError(body.error);
            }
        }), catchError(error => throwError(error)));
    }
    /**
     * patch resource from a given entity data
     * @template T
     * @param {?} entity
     * @return {?}
     */
    patch(entity) {
        /** @type {?} */
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        /** @type {?} */
        const payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
        /** @type {?} */
        let observable = ResourceHelper.getHttp().patch(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map((response) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                let body = response.body;
                return throwError(body.error);
            }
        }), catchError(error => throwError(error)));
    }
    /**
     * delete resource from a given entity data
     * @template T
     * @param {?} entity
     * @return {?}
     */
    delete(entity) {
        /** @type {?} */
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        return ResourceHelper.getHttp().delete(uri, { headers: ResourceHelper.headers }).pipe(catchError(error => throwError(error)));
    }
    /**
     * whether a resource array has next page of results
     * @template T
     * @param {?} resourceArray
     * @return {?}
     */
    hasNext(resourceArray) {
        return resourceArray.next_uri != undefined;
    }
    /**
     * whether a resource array has previous page of results
     * @template T
     * @param {?} resourceArray
     * @return {?}
     */
    hasPrev(resourceArray) {
        return resourceArray.prev_uri != undefined;
    }
    /**
     * whether a resource array has first page of results
     * @template T
     * @param {?} resourceArray
     * @return {?}
     */
    hasFirst(resourceArray) {
        return resourceArray.first_uri != undefined;
    }
    /**
     * whether a resource array has last page of results
     * @template T
     * @param {?} resourceArray
     * @return {?}
     */
    hasLast(resourceArray) {
        return resourceArray.last_uri != undefined;
    }
    /**
     * get resource array next page of results
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @return {?}
     */
    next(resourceArray, type) {
        return resourceArray.next(type);
    }
    /**
     * get resource array previous page of results
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @return {?}
     */
    prev(resourceArray, type) {
        return resourceArray.prev(type);
    }
    /**
     * get resource array first page of results
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @return {?}
     */
    first(resourceArray, type) {
        return resourceArray.first(type);
    }
    /**
     * get resource array last page of results
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @return {?}
     */
    last(resourceArray, type) {
        return resourceArray.last(type);
    }
    /**
     * get resource array page of results given a page number
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    page(resourceArray, type, id) {
        return resourceArray.page(type, id);
    }
    /**
     * sort resource array with a given sorting params
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @param {...?} sort
     * @return {?}
     */
    sortElements(resourceArray, type, ...sort) {
        return resourceArray.sortElements(type, ...sort);
    }
    /**
     * get resource array size
     * @template T
     * @param {?} resourceArray
     * @param {?} type
     * @param {?} size
     * @return {?}
     */
    size(resourceArray, type, size) {
        return resourceArray.size(type, size);
    }
    /**
     * get resource URL from a given path
     * @param {?=} resource
     * @return {?}
     */
    getResourceUrl(resource) {
        /** @type {?} */
        let url = ResourceService.getURL();
        if (!url.endsWith('/')) {
            url = url.concat('/');
        }
        if (resource) {
            return url.concat(resource);
        }
        return url;
    }
    /**
     * set proxy and root urls of given resource array
     * @template T
     * @param {?} result
     * @return {?}
     */
    setUrls(result) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
    }
    /**
     * set proxy and root urls of given resource
     * @template T
     * @param {?} result
     * @return {?}
     */
    setUrlsResource(result) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
    }
}
ResourceService.ɵfac = function ResourceService_Factory(t) { return new (t || ResourceService)(ɵngcc0.ɵɵinject(ExternalService)); };
ResourceService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ResourceService, factory: ResourceService.ɵfac });
/** @nocollapse */
ResourceService.ctorParameters = () => [
    { type: ExternalService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ResourceService, [{
        type: Injectable
    }], function () { return [{ type: ExternalService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * REST API access interface
 * @template T
 */
class RestService {
    /**
     * constructor
     * @param {?} type
     * @param {?} resource
     * @param {?} injector
     * @param {?=} _embedded
     */
    constructor(type, resource, injector, _embedded) {
        this.injector = injector;
        /**
         * _embedded field name
         */
        this._embedded = '_embedded';
        this.type = type;
        this.resource = resource;
        this.resourceService = injector.get(ResourceService);
        if (!isNullOrUndefined(_embedded))
            this._embedded = _embedded;
    }
    /**
     * error handler
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        return RestService.handleError(error);
    }
    /**
     * error handler
     * @param {?} error
     * @return {?}
     */
    static handleError(error) {
        return throwError(error);
    }
    /**
     * get all resources with optional options an subType params
     * @param {?=} options
     * @param {?=} subType
     * @return {?}
     */
    getAll(options, subType) {
        return this.resourceService.getAll(this.type, this.resource, this._embedded, options, subType).pipe(mergeMap((resourceArray) => {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return this.getAll(options);
            }
            else {
                this.resourceArray = resourceArray;
                return of(resourceArray.result);
            }
        }));
    }
    /**
     * get resource from a given id
     * @param {?} id
     * @return {?}
     */
    get(id) {
        return this.resourceService.get(this.type, this.resource, id);
    }
    /**
     * get resource from self link
     * @param {?} selfLink
     * @return {?}
     */
    getBySelfLink(selfLink) {
        return this.resourceService.getBySelfLink(this.type, selfLink);
    }
    /**
     * search resources from a given query string and optional options params
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    search(query, options) {
        return this.resourceService.search(this.type, query, this.resource, this._embedded, options).pipe(mergeMap((resourceArray) => {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return this.search(query, options);
            }
            else {
                this.resourceArray = resourceArray;
                return of(resourceArray.result);
            }
        }));
    }
    /**
     * search resource from a given query string and optional options params
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    searchSingle(query, options) {
        return this.resourceService.searchSingle(this.type, query, this.resource, options);
    }
    /**
     * search resources from a given custom query string and optional options params
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    customQuery(query, options) {
        return this.resourceService.customQuery(this.type, query, this.resource, this._embedded, options).pipe(mergeMap((resourceArray) => {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return this.customQuery(query, options);
            }
            else {
                this.resourceArray = resourceArray;
                return of(resourceArray.result);
            }
        }));
    }
    /**
     * get resource array given a relation link
     * @param {?} relation
     * @param {?=} builder
     * @return {?}
     */
    getByRelationArray(relation, builder) {
        return this.resourceService.getByRelationArray(this.type, relation, this._embedded, builder).pipe(map((resourceArray) => {
            this.resourceArray = resourceArray;
            return resourceArray.result;
        }));
    }
    /**
     * get resource given a relation link
     * @param {?} relation
     * @return {?}
     */
    getByRelation(relation) {
        return this.resourceService.getByRelation(this.type, relation);
    }
    /**
     * count resources given a path
     * @return {?}
     */
    count() {
        return this.resourceService.count(this.resource);
    }
    /**
     * create resource from self link and entity data
     * @param {?} entity
     * @return {?}
     */
    create(entity) {
        return this.resourceService.create(this.resource, entity);
    }
    /**
     * update resource from a given entity data
     * @param {?} entity
     * @return {?}
     */
    update(entity) {
        return this.resourceService.update(entity);
    }
    /**
     * patch resource from a given entity data
     * @param {?} entity
     * @return {?}
     */
    patch(entity) {
        return this.resourceService.patch(entity);
    }
    /**
     * delete resource from a given entity data
     * @param {?} entity
     * @return {?}
     */
    delete(entity) {
        return this.resourceService.delete(entity);
    }
    /**
     * get total number of elements of resource array
     * @return {?}
     */
    totalElement() {
        if (this.resourceArray && this.resourceArray.totalElements)
            return this.resourceArray.totalElements;
        return 0;
    }
    /**
     * whether a resource array has first page of results
     * @return {?}
     */
    hasFirst() {
        if (this.resourceArray)
            return this.resourceService.hasFirst(this.resourceArray);
        return false;
    }
    /**
     * whether a resource array has next page of results
     * @return {?}
     */
    hasNext() {
        if (this.resourceArray)
            return this.resourceService.hasNext(this.resourceArray);
        return false;
    }
    /**
     * whether a resource array has previous page of results
     * @return {?}
     */
    hasPrev() {
        if (this.resourceArray)
            return this.resourceService.hasPrev(this.resourceArray);
        return false;
    }
    /**
     * whether a resource array has last page of results
     * @return {?}
     */
    hasLast() {
        if (this.resourceArray)
            return this.resourceService.hasLast(this.resourceArray);
        return false;
    }
    /**
     * get resource array next page of results
     * @return {?}
     */
    next() {
        if (this.resourceArray)
            return this.resourceService.next(this.resourceArray, this.type).pipe(map((resourceArray) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            throwError('no resourceArray found');
    }
    /**
     * get resource array previous page of results
     * @return {?}
     */
    prev() {
        if (this.resourceArray)
            return this.resourceService.prev(this.resourceArray, this.type).pipe(map((resourceArray) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            throwError('no resourceArray found');
    }
    /**
     * get resource array first page of results
     * @return {?}
     */
    first() {
        if (this.resourceArray)
            return this.resourceService.first(this.resourceArray, this.type)
                .pipe(map((resourceArray) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            throwError('no resourceArray found');
    }
    /**
     * get resource array last page of results
     * @return {?}
     */
    last() {
        if (this.resourceArray)
            return this.resourceService.last(this.resourceArray, this.type)
                .pipe(map((resourceArray) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            throwError('no resourceArray found');
    }
    /**
     * get resource array page of results given a page number
     * @param {?} pageNumber
     * @return {?}
     */
    page(pageNumber) {
        if (this.resourceArray)
            return this.resourceService.page(this.resourceArray, this.type, pageNumber).pipe(map((resourceArray) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            throwError('no resourceArray found');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Account manager service
 */
class AccountService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(User, "account", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.ACCOUNT_API = this.API + '/account';
    }
    /**
     * get logged in user account
     * @return {?}
     */
    get() {
        /** @type {?} */
        let result;
        result = this.http.get(this.ACCOUNT_API);
        return result;
    }
    /**
     * save account
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        result = this.http.post(this.ACCOUNT_API, item);
        return result;
    }
    /**
     * change logged in user account
     * @param {?} item
     * @return {?}
     */
    changePassword(item) {
        /** @type {?} */
        let result;
        result = this.http.post(this.ACCOUNT_API + "/change-password", item);
        return result;
    }
}
AccountService.ɵfac = function AccountService_Factory(t) { return new (t || AccountService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
AccountService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AccountService, factory: AccountService.ɵfac });
/** @nocollapse */
AccountService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AccountService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Authentication service
 */
class AuthService {
    /**
     * constructor
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        /**
         * API base URL
         */
        this.SERVER_API_URL = '/api';
    }
    /**
     * get current user jwt token from session storage
     * @return {?}
     */
    getToken() {
        return sessionStorage.getItem('authenticationToken');
    }
    /**
     * login operation
     * @param {?} credentials
     * @return {?}
     */
    login(credentials) {
        /** @type {?} */
        const data = {
            username: credentials.username,
            password: credentials.password
        };
        return this.http.post(this.SERVER_API_URL + '/authenticate', data, { observe: 'response' }).map(authenticateSuccess.bind(this));
        /**
         * @param {?} resp
         * @return {?}
         */
        function authenticateSuccess(resp) {
            /** @type {?} */
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                /** @type {?} */
                const jwt = bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt);
                //const expiresAt = moment().add( resp.headers.get('Token-Validity'),'milisecond');
                //sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
                return jwt;
            }
        }
    }
    /**
     * login operation with jwt token
     * @param {?} jwt
     * @return {?}
     */
    loginWithToken(jwt) {
        if (jwt) {
            this.storeAuthenticationToken(jwt);
            return Promise.resolve(jwt);
        }
        else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }
    /**
     * store jwt token in session storage
     * @param {?} jwt
     * @return {?}
     */
    storeAuthenticationToken(jwt) {
        sessionStorage.setItem('authenticationToken', jwt);
    }
    /**
     * check whether current user is logged in
     * @return {?}
     */
    isLoggedIn() {
        //return moment().isBefore(this.getExpiration());
        return this.getToken();
    }
    /**
     * check whether current user is logged out
     * @return {?}
     */
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    /**
     * logout operation
     * @return {?}
     */
    logout() {
        return new Observable((observer) => {
            //localStorage.removeItem('authenticationToken');
            sessionStorage.removeItem('authenticationToken');
            //sessionStorage.removeItem('expires_at');
            observer.complete();
        });
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
AuthService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac });
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AuthService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Interceptor for authentication token in API requests
 */
class AuthInterceptor {
    /**
     * constructor
     */
    constructor() {
        /**
         * API base path
         */
        this.SERVER_API_URL = '/api';
        this.TEST_SERVER_API_URL = 'http://localhost:8080/api';
    }
    /**
     * request handler
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        if (!request || !request.url || !(request.url.includes("api"))) {
            return next.handle(request);
        }
        /** @type {?} */
        const token = sessionStorage.getItem('authenticationToken');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Principal service
 */
class Principal {
    /**
     * constructor
     * @param {?} account
     */
    constructor(account) {
        this.account = account;
        this.authenticated = false;
        this.authenticationState = new Subject();
    }
    /**
     * authenticate with given identity
     * @param {?} identity
     * @return {?}
     */
    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }
    /**
     * check whether current user has any of the given authorities
     * @param {?} authorities
     * @return {?}
     */
    hasAnyAuthority(authorities) {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }
    /**
     * check whether current user has any of the given authorities on the given territory
     * @param {?} authorities
     * @param {?} territory
     * @return {?}
     */
    hasAnyAuthorityOnTerritory(authorities, territory) {
        return Promise.resolve(this.hasAnyAuthorityDirectOnTerritory(authorities, territory));
    }
    /**
     * check whether current user has any of the given authorities without resolving promises
     * @param {?} authorities
     * @return {?}
     */
    hasAnyAuthorityDirect(authorities) {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        for (let i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authorities.includes(authorities[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * check whether current user has any of the given authorities on the given territory without resolving promises
     * @param {?} authorities
     * @param {?} territory
     * @return {?}
     */
    hasAnyAuthorityDirectOnTerritory(authorities, territory) {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        for (let i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authoritiesPerTerritory[territory] && this.userIdentity.authoritiesPerTerritory[territory].includes(authorities[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * check whether current user has the given authority
     * @param {?} authority
     * @return {?}
     */
    hasAuthority(authority) {
        if (!this.authenticated) {
            return Promise.resolve(false);
        }
        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.includes(authority));
        }, () => {
            return Promise.resolve(false);
        });
    }
    /**
     * check whether current user has the given authority on the given territory
     * @param {?} authority
     * @param {?} territory
     * @return {?}
     */
    hasAuthorityOnTerritory(authority, territory) {
        if (!this.authenticated) {
            return Promise.resolve(false);
        }
        return this.identity().then((id) => {
            return Promise.resolve(id.authoritiesPerTerritory && id.authoritiesPerTerritory[territory] && id.authoritiesPerTerritory[territory].includes(authority));
        }, () => {
            return Promise.resolve(false);
        });
    }
    /**
     * check user identity
     * @param {?=} force
     * @return {?}
     */
    identity(force) {
        if (force === true) {
            this.userIdentity = undefined;
        }
        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }
        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((response) => {
            /** @type {?} */
            const account = response;
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
            }
            else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }
    /**
     * check whether current user is authenticated
     * @return {?}
     */
    isAuthenticated() {
        return this.authenticated;
    }
    /**
     * check whether current user identity is resolved
     * @return {?}
     */
    isIdentityResolved() {
        return this.userIdentity !== undefined;
    }
    /**
     * get current user authentication state
     * @return {?}
     */
    getAuthenticationState() {
        return this.authenticationState.asObservable();
    }
}
Principal.ɵfac = function Principal_Factory(t) { return new (t || Principal)(ɵngcc0.ɵɵinject(AccountService)); };
Principal.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Principal, factory: Principal.ɵfac });
/** @nocollapse */
Principal.ctorParameters = () => [
    { type: AccountService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Principal, [{
        type: Injectable
    }], function () { return [{ type: AccountService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Interceptor for authentication expired response in API requests
 */
class AuthExpiredInterceptor {
    /**
     * constructor
     * @param {?} router
     * @param {?} authService
     * @param {?} principal
     */
    constructor(router, authService, principal) {
        this.router = router;
        this.authService = authService;
        this.principal = principal;
    }
    /**
     * request handler
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        return next.handle(request).do((event) => { }, (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.authService.logout().subscribe();
                    this.principal.authenticate(null);
                    this.router.navigate(['/']);
                }
            }
        });
    }
}
AuthExpiredInterceptor.ɵfac = function AuthExpiredInterceptor_Factory(t) { return new (t || AuthExpiredInterceptor)(ɵngcc0.ɵɵinject(ɵngcc2.Router), ɵngcc0.ɵɵinject(AuthService), ɵngcc0.ɵɵinject(Principal)); };
AuthExpiredInterceptor.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AuthExpiredInterceptor, factory: AuthExpiredInterceptor.ɵfac });
/** @nocollapse */
AuthExpiredInterceptor.ctorParameters = () => [
    { type: Router },
    { type: AuthService },
    { type: Principal }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AuthExpiredInterceptor, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc2.Router }, { type: AuthService }, { type: Principal }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Login service
 */
class LoginService {
    /**
     * constructor
     * @param {?} authServerProvider
     * @param {?} principal
     */
    constructor(authServerProvider, principal) {
        this.authServerProvider = authServerProvider;
        this.principal = principal;
    }
    /**
     * Login operation
     * @param {?} credentials
     * @param {?=} callback
     * @return {?}
     */
    login(credentials, callback) {
        /** @type {?} */
        const cb = callback || function () { };
        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                this.principal.identity(true).then((account) => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    resolve(data);
                });
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }
    /**
     * login with jwt token
     * @param {?} jwt
     * @return {?}
     */
    loginWithToken(jwt) {
        return this.authServerProvider.loginWithToken(jwt);
    }
    /**
     * logout operation
     * @return {?}
     */
    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(ɵngcc0.ɵɵinject(AuthService), ɵngcc0.ɵɵinject(Principal)); };
LoginService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: LoginService, factory: LoginService.ɵfac });
/** @nocollapse */
LoginService.ctorParameters = () => [
    { type: AuthService },
    { type: Principal }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LoginService, [{
        type: Injectable
    }], function () { return [{ type: AuthService }, { type: Principal }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User manager service
 */
class UserService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(User, "users", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.USER_API = this.API + '/users';
    }
    /**
     * remove user
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save user
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.USER_API, item);
        }
        return result;
    }
    /**
     * change password o given user id
     * @param {?} id
     * @param {?} item
     * @return {?}
     */
    changePassword(id, item) {
        /** @type {?} */
        let result;
        result = this.http.post(this.USER_API + "/" + id + "/change-password", item);
        return result;
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
UserService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: UserService, factory: UserService.ɵfac });
/** @nocollapse */
UserService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(UserService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User position model
 */
class UserPosition extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User position manager service
 */
class UserPositionService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(UserPosition, "user-positions", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.USER_POSITION_API = this.API + '/user-positions';
    }
    /**
     * remove user position
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save user position
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.user != null) {
                item.substituteRelation('user', item.user).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.territory != null) {
                item.substituteRelation('territory', item.territory).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.territory = item.territory._links.self.href;
            item.user = item.user._links.self.href;
            result = this.http.post(this.USER_POSITION_API, item);
        }
        return result;
    }
}
UserPositionService.ɵfac = function UserPositionService_Factory(t) { return new (t || UserPositionService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
UserPositionService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: UserPositionService, factory: UserPositionService.ɵfac });
/** @nocollapse */
UserPositionService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(UserPositionService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User permission model
 */
class UserConfiguration extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * User configuration manager service
 */
class UserConfigurationService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(UserConfiguration, "user-configurations", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.USER_CONFIGURATION_API = this.API + '/user-configurations';
    }
    /**
     * remove user configuration
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save user configuration
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.user != null) {
                item.substituteRelation('user', item.user).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.territory != null) {
                item.substituteRelation('territory', item.territory).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.role != null) {
                item.substituteRelation('role', item.role).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.territory = item.territory._links.self.href;
            item.role = item.role._links.self.href;
            item.user = item.user._links.self.href;
            result = this.http.post(this.USER_CONFIGURATION_API, item);
        }
        return result;
    }
}
UserConfigurationService.ɵfac = function UserConfigurationService_Factory(t) { return new (t || UserConfigurationService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
UserConfigurationService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: UserConfigurationService, factory: UserConfigurationService.ɵfac });
/** @nocollapse */
UserConfigurationService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(UserConfigurationService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Territory model
 */
class Territory extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Territory manager service
 */
class TerritoryService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Territory, "territories", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TERRITORY_API = this.API + '/territories';
    }
    /**
     * remove territory
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save territory
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item.type != null)
            item.type = item.type._links.self.href;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.TERRITORY_API, item);
        }
        return result;
    }
}
TerritoryService.ɵfac = function TerritoryService_Factory(t) { return new (t || TerritoryService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TerritoryService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TerritoryService, factory: TerritoryService.ɵfac });
/** @nocollapse */
TerritoryService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TerritoryService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Territory type model
 */
class TerritoryType extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * TerritoryType manager service
 */
class TerritoryTypeService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TerritoryType, "territory-types", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TERRITORYTYPE_API = this.API + '/territory-types';
    }
    /**
     * remove territory type
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save territory type
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.TERRITORYTYPE_API, item);
        }
        return result;
    }
}
TerritoryTypeService.ɵfac = function TerritoryTypeService_Factory(t) { return new (t || TerritoryTypeService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TerritoryTypeService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TerritoryTypeService, factory: TerritoryTypeService.ɵfac });
/** @nocollapse */
TerritoryTypeService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TerritoryTypeService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Territory type model
 */
class TerritoryGroupType extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TerritoryGroupTypeService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TerritoryGroupType, "territory-group-types", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TERRITORYGROUPTYPE_API = this.API + '/territory-group-types';
    }
    /**
     * remove territory
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save territory
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.TERRITORYGROUPTYPE_API, item);
        }
        return result;
    }
}
TerritoryGroupTypeService.ɵfac = function TerritoryGroupTypeService_Factory(t) { return new (t || TerritoryGroupTypeService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TerritoryGroupTypeService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TerritoryGroupTypeService, factory: TerritoryGroupTypeService.ɵfac, providedIn: 'root' });
/** @nocollapse */
TerritoryGroupTypeService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/** @nocollapse */ TerritoryGroupTypeService.ngInjectableDef = defineInjectable({ factory: function TerritoryGroupTypeService_Factory() { return new TerritoryGroupTypeService(inject(INJECTOR), inject(HttpClient)); }, token: TerritoryGroupTypeService, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TerritoryGroupTypeService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Role model
 */
class Role extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Role manager service
 */
class RoleService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Role, "roles", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.ROLE_API = this.API + '/roles';
    }
    /**
     * remove role
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save role
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.ROLE_API, item);
        }
        return result;
    }
}
RoleService.ɵfac = function RoleService_Factory(t) { return new (t || RoleService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
RoleService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RoleService, factory: RoleService.ɵfac });
/** @nocollapse */
RoleService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RoleService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Connection model
 */
class Connection extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Connection manager service
 */
class ConnectionService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Connection, "connections", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CONNECTION_API = this.API + '/connections';
    }
    /**
     * remove connection
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save connection
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }
}
ConnectionService.ɵfac = function ConnectionService_Factory(t) { return new (t || ConnectionService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ConnectionService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ConnectionService, factory: ConnectionService.ɵfac });
/** @nocollapse */
ConnectionService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ConnectionService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * GEOADMIN_task id
  @type {?} */
const GEOADMIN_TREE_TASK_ID = "geoadmin";
/**
 * Task model
 */
class Task extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task manager service
 */
class TaskService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Task, "tasks", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CONNECTION_API = this.API + '/tasks';
    }
    /**
     * remove task
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        const taskType = item.type;
        /** @type {?} */
        const taskGroup = item.group;
        /** @type {?} */
        let taskConnection = item.connection;
        /** @type {?} */
        let taskUI = item.ui;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }
}
TaskService.ɵfac = function TaskService_Factory(t) { return new (t || TaskService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskService, factory: TaskService.ɵfac });
/** @nocollapse */
TaskService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task type model
 */
class TaskType extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * TaskType manager service
 */
class TaskTypeService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TaskType, "task-types", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CONNECTION_API = this.API + '/task-types';
    }
    /**
     * remove task type
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task type
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }
}
TaskTypeService.ɵfac = function TaskTypeService_Factory(t) { return new (t || TaskTypeService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskTypeService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskTypeService, factory: TaskTypeService.ɵfac });
/** @nocollapse */
TaskTypeService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskTypeService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task group model
 */
class TaskGroup extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task group manager service
 */
class TaskGroupService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TaskGroup, "task-groups", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CONNECTION_API = this.API + '/task-groups';
    }
    /**
     * remove task group
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task group
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }
}
TaskGroupService.ɵfac = function TaskGroupService_Factory(t) { return new (t || TaskGroupService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskGroupService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskGroupService, factory: TaskGroupService.ɵfac });
/** @nocollapse */
TaskGroupService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskGroupService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task parameter model
 */
class TaskParameter extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task parameter manager service
 */
class TaskParameterService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TaskParameter, "task-parameters", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TASK_PARAMETER_API = this.API + '/task-parameters';
    }
    /**
     * remove task parameter
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task parameter
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.task != null) {
                item.substituteRelation('task', item.task).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.task = item.task._links.self.href;
            result = this.http.post(this.TASK_PARAMETER_API, item);
        }
        return result;
    }
}
TaskParameterService.ɵfac = function TaskParameterService_Factory(t) { return new (t || TaskParameterService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskParameterService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskParameterService, factory: TaskParameterService.ɵfac });
/** @nocollapse */
TaskParameterService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskParameterService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task availability model
 */
class TaskAvailability extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task availability manager service
 */
class TaskAvailabilityService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TaskAvailability, "task-availabilities", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TASK_AVAILABILITY_API = this.API + '/task-availabilities';
    }
    /**
     * remove task availability
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task availability
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.task != null) {
                item.substituteRelation('task', item.task).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.territory != null) {
                item.substituteRelation('territory', item.territory).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.territory = item.territory._links.self.href;
            item.task = item.task._links.self.href;
            result = this.http.post(this.TASK_AVAILABILITY_API, item);
        }
        return result;
    }
}
TaskAvailabilityService.ɵfac = function TaskAvailabilityService_Factory(t) { return new (t || TaskAvailabilityService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskAvailabilityService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskAvailabilityService, factory: TaskAvailabilityService.ɵfac });
/** @nocollapse */
TaskAvailabilityService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskAvailabilityService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task UI model
 */
class TaskUI extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Task UI manager service
 */
class TaskUIService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TaskUI, "task-uis", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CONNECTION_API = this.API + '/task-uis';
    }
    /**
     * remove task UI
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save task UI
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }
}
TaskUIService.ɵfac = function TaskUIService_Factory(t) { return new (t || TaskUIService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TaskUIService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TaskUIService, factory: TaskUIService.ɵfac });
/** @nocollapse */
TaskUIService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TaskUIService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service model
 */
class Service extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service manager service
 */
class ServiceService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Service, "services", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.SERVICE_API = this.API + '/services';
    }
    /**
     * remove service
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save service
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let serviceConnection = item.connection;
        if (item.connection != null) {
            if (typeof item.connection._links != 'undefined') {
                item.connection = item.connection._links.self.href;
            }
            else {
                serviceConnection._links = {};
                serviceConnection._links.self = {};
                serviceConnection._links.self.href = "";
            }
        }
        if (item._links != null) {
            //update relations
            delete item.connection;
            if (serviceConnection._links.self.href == '') {
                item.deleteRelation('connection', serviceConnection).subscribe(result => {
                }, error => console.error(error));
            }
            else {
                item.substituteRelation('connection', serviceConnection).subscribe(result => {
                }, error => console.error(error));
            }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.SERVICE_API, item);
        }
        return result;
    }
}
ServiceService.ɵfac = function ServiceService_Factory(t) { return new (t || ServiceService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ServiceService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ServiceService, factory: ServiceService.ɵfac });
/** @nocollapse */
ServiceService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ServiceService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service parameter model
 */
class ServiceParameter extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service parameter manager service
 */
class ServiceParameterService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(ServiceParameter, "service-parameters", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.SERVICE_PARAMETER_API = this.API + '/service-parameters';
    }
    /**
     * remove service parameter
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save service parameter
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            if (item.service != null) {
                /** @type {?} */
                let service = item.service;
                delete item.service;
                item.substituteRelation('service', service).subscribe(result => {
                }, error => console.error(error));
            }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            item.service = item.service._links.self.href;
            result = this.http.post(this.SERVICE_PARAMETER_API, item);
        }
        return result;
    }
}
ServiceParameterService.ɵfac = function ServiceParameterService_Factory(t) { return new (t || ServiceParameterService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ServiceParameterService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ServiceParameterService, factory: ServiceParameterService.ɵfac });
/** @nocollapse */
ServiceParameterService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ServiceParameterService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Cartography
 */
class Cartography extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Cartography manager service
 */
class CartographyService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Cartography, "cartographies", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CARTOGRAPHY_API = this.API + '/cartographies';
    }
    /**
     * remove cartography
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save cartography
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let cartographyConnection = item.connection;
        /** @type {?} */
        const cartographyService = item.service;
        /** @type {?} */
        const cartographySelectionService = item.selectionService;
        if (item.service != null)
            item.service = item.service._links.self.href;
        if (item.selectionService != null)
            item.selectionService = item.selectionService._links.self.href;
        if (item.connection != null) {
            if (typeof item.connection._links != 'undefined') {
                item.connection = item.connection._links.self.href;
            }
            else {
                cartographyConnection._links = {};
                cartographyConnection._links.self = {};
                cartographyConnection._links.self.href = "";
            }
        }
        if (item._links != null) {
            //update relations
            delete item.connection;
            delete item.service;
            delete item.selectionService;
            if (cartographyConnection._links.self.href == '') {
                item.deleteRelation('connection', cartographyConnection).subscribe(result => {
                    item.substituteRelation('service', cartographyService).subscribe(result => {
                        item.substituteRelation('selectionService', cartographySelectionService).subscribe(result => {
                        }, error => console.error(error));
                    }, error => console.error(error));
                }, error => console.error(error));
            }
            else {
                item.substituteRelation('connection', cartographyConnection).subscribe(result => {
                    item.substituteRelation('service', cartographyService).subscribe(result => {
                        item.substituteRelation('selectionService', cartographySelectionService).subscribe(result => {
                        }, error => console.error(error));
                    }, error => console.error(error));
                }, error => console.error(error));
            }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CARTOGRAPHY_API, item);
        }
        return result;
    }
}
CartographyService.ɵfac = function CartographyService_Factory(t) { return new (t || CartographyService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
CartographyService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: CartographyService, factory: CartographyService.ɵfac });
/** @nocollapse */
CartographyService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CartographyService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Cartography group
 */
class CartographyGroup extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * CartographyGroup manager service
 */
class CartographyGroupService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(CartographyGroup, "cartography-groups", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CARTOGRAPHY_GROUP_API = this.API + '/cartography-groups';
    }
    /**
     * remove cartography group
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save cartography group
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.CARTOGRAPHY_GROUP_API, item);
        }
        return result;
    }
}
CartographyGroupService.ɵfac = function CartographyGroupService_Factory(t) { return new (t || CartographyGroupService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
CartographyGroupService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: CartographyGroupService, factory: CartographyGroupService.ɵfac });
/** @nocollapse */
CartographyGroupService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CartographyGroupService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Cartography availability model
 */
class CartographyAvailability extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * CartographyAvailability manager service
 */
class CartographyAvailabilityService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(CartographyAvailability, "cartography-availabilities", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.CARTOGRAPHY_AVAILABILITY_API = this.API + '/cartography-availabilities';
    }
    /**
     * remove cartography availability
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save cartography availability
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.cartography != null) {
                item.substituteRelation('cartography', item.cartography).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.territory != null) {
                item.substituteRelation('territory', item.territory).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.territory = item.territory._links.self.href;
            item.cartography = item.cartography._links.self.href;
            result = this.http.post(this.CARTOGRAPHY_AVAILABILITY_API, item);
        }
        return result;
    }
}
CartographyAvailabilityService.ɵfac = function CartographyAvailabilityService_Factory(t) { return new (t || CartographyAvailabilityService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
CartographyAvailabilityService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: CartographyAvailabilityService, factory: CartographyAvailabilityService.ɵfac });
/** @nocollapse */
CartographyAvailabilityService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CartographyAvailabilityService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Background model
 */
class Background extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Background manager service
 */
class BackgroundService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Background, "backgrounds", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.BACKGROUND_API = this.API + '/backgrounds';
    }
    /**
     * remove background
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save background
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let backgroundCartographyGroup = item.cartographyGroup;
        if (item.cartographyGroup != null) {
            if (typeof item.cartographyGroup._links != 'undefined') {
                item.cartographyGroup = item.cartographyGroup._links.self.href;
            }
            else {
                backgroundCartographyGroup._links = {};
                backgroundCartographyGroup._links.self = {};
                backgroundCartographyGroup._links.self.href = "";
            }
        }
        if (item._links != null) {
            //update relations
            delete item.cartographyGroup;
            if (backgroundCartographyGroup._links.self.href == '') {
                item.deleteRelation('cartographyGroup', backgroundCartographyGroup).subscribe(result => {
                }, error => console.error(error));
            }
            else {
                item.substituteRelation('cartographyGroup', backgroundCartographyGroup).subscribe(result => {
                }, error => console.error(error));
            }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.BACKGROUND_API, item);
        }
        return result;
    }
}
BackgroundService.ɵfac = function BackgroundService_Factory(t) { return new (t || BackgroundService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
BackgroundService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BackgroundService, factory: BackgroundService.ɵfac });
/** @nocollapse */
BackgroundService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BackgroundService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Tree model
 */
class Tree extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Tree manager service
 */
class TreeService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Tree, "trees", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TREE_API = this.API + '/trees';
    }
    /**
     * remove tree
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save tree
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.TREE_API, item);
        }
        return result;
    }
}
TreeService.ɵfac = function TreeService_Factory(t) { return new (t || TreeService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TreeService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TreeService, factory: TreeService.ɵfac });
/** @nocollapse */
TreeService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TreeService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Tree node model
 */
class TreeNode extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Tree node manager service
 */
class TreeNodeService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(TreeNode, "tree-nodes", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.TREE_NODE_API = this.API + '/tree-nodes';
    }
    /**
     * remove tree node
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save tree node
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            /** @type {?} */
            const itemTree = item.tree;
            /** @type {?} */
            const itemCartography = item.cartography;
            /** @type {?} */
            const itemParent = item.parent;
            delete item.tree;
            delete item.cartography;
            delete item.parent;
            result = this.http.put(item._links.self.href, item);
            if (itemTree != null) {
                item.substituteRelation('tree', itemTree).subscribe(result => {
                }, error => console.error(error));
            }
            if (itemCartography != null) {
                item.substituteRelation('cartography', itemCartography).subscribe(result => {
                }, error => console.error(error));
            }
            if (itemParent != null) {
                item.substituteRelation('parent', itemParent).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            if (item.tree && item.tree._links && item.tree._links.self) {
                item.tree = item.tree._links.self.href;
            }
            if (item.cartography && item.cartography._links && item.cartography._links.self) {
                item.cartography = item.cartography._links.self.href;
            }
            result = this.http.post(this.TREE_NODE_API, item);
        }
        return result;
    }
}
TreeNodeService.ɵfac = function TreeNodeService_Factory(t) { return new (t || TreeNodeService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
TreeNodeService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TreeNodeService, factory: TreeNodeService.ɵfac });
/** @nocollapse */
TreeNodeService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TreeNodeService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Territorial appliction name
  @type {?} */
const TERRITORIAL_APP_NAME = "Aplicación Territorial";
/**
 * Application model
 */
class Application extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Application manager service
 */
class ApplicationService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(Application, "applications", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.APPLICATION_API = this.API + '/applications';
    }
    /**
     * remove application
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save application
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let applicationSituationMap = item.situationMap;
        if (item.situationMap != null) {
            if (typeof item.situationMap._links != 'undefined') {
                item.situationMap = item.situationMap._links.self.href;
            }
            else {
                applicationSituationMap._links = {};
                applicationSituationMap._links.self = {};
                applicationSituationMap._links.self.href = "";
            }
        }
        if (item._links != null) {
            //update relations
            delete item.situationMap;
            if (applicationSituationMap._links.self.href == '') {
                item.deleteRelation('situationMap', applicationSituationMap).subscribe(result => {
                }, error => console.error(error));
            }
            else {
                item.substituteRelation('situationMap', applicationSituationMap).subscribe(result => {
                }, error => console.error(error));
            }
            result = this.http.put(item._links.self.href, item);
        }
        else {
            result = this.http.post(this.APPLICATION_API, item);
        }
        return result;
    }
}
ApplicationService.ɵfac = function ApplicationService_Factory(t) { return new (t || ApplicationService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ApplicationService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ApplicationService, factory: ApplicationService.ɵfac });
/** @nocollapse */
ApplicationService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ApplicationService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Application background model
 */
class ApplicationBackground extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Application background manager service
 */
class ApplicationBackgroundService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(ApplicationBackground, "application-backgrounds", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.APPLICATION_BACKGROUND_API = this.API + '/application-backgrounds';
    }
    /**
     * remove application background
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save application background
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.application != null) {
                item.substituteRelation('application', item.application).subscribe(result => {
                }, error => console.error(error));
            }
            if (item.background != null) {
                item.substituteRelation('background', item.background).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.application = item.application._links.self.href;
            item.background = item.background._links.self.href;
            result = this.http.post(this.APPLICATION_BACKGROUND_API, item);
        }
        return result;
    }
}
ApplicationBackgroundService.ɵfac = function ApplicationBackgroundService_Factory(t) { return new (t || ApplicationBackgroundService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ApplicationBackgroundService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ApplicationBackgroundService, factory: ApplicationBackgroundService.ɵfac });
/** @nocollapse */
ApplicationBackgroundService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ApplicationBackgroundService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Application parameter model
 */
class ApplicationParameter extends Resource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Application parameter manager service
 */
class ApplicationParameterService extends RestService {
    /**
     * constructor
     * @param {?} injector
     * @param {?} http
     */
    constructor(injector, http) {
        super(ApplicationParameter, "application-parameters", injector);
        this.http = http;
        /**
         * API base path
         */
        this.API = '/api';
        /**
         * API resource path
         */
        this.APPLICATION_PARAMETER_API = this.API + '/application-parameters';
    }
    /**
     * remove application
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        return this.http.delete(item._links.self.href);
    }
    /**
     * save application
     * @param {?} item
     * @return {?}
     */
    save(item) {
        /** @type {?} */
        let result;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
            if (item.application != null) {
                item.substituteRelation('application', item.application).subscribe(result => {
                }, error => console.error(error));
            }
        }
        else {
            item.application = item.application._links.self.href;
            result = this.http.post(this.APPLICATION_PARAMETER_API, item);
        }
        return result;
    }
}
ApplicationParameterService.ɵfac = function ApplicationParameterService_Factory(t) { return new (t || ApplicationParameterService)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient)); };
ApplicationParameterService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ApplicationParameterService, factory: ApplicationParameterService.ɵfac });
/** @nocollapse */
ApplicationParameterService.ctorParameters = () => [
    { type: Injector },
    { type: HttpClient }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ApplicationParameterService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc1.HttpClient }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Layer model: configure Layer data and displaying configuration
 */
class Layer {
    constructor() {
        /**
         * layer visibility
         */
        this.visibility = false;
        /**
         * Transparency (Transparent) 0-1 (Opaque)
         */
        this.opacity = 1.0;
        /**
         * Service attributions
         */
        this.attributions = "";
        /**
         * Description
         */
        this.desc = "";
        /**
         * Transparent request parameter?
         */
        this.url_transparent = "true";
        /**
         * Request Background parameter color (Hexa)
         */
        this.url_bgcolor = "0x000000";
        /**
         * Extent for tiled services
         */
        this.extent = null;
        /**
         * Enabled for GetFeatureInfo requests (enabled to use the viewer features information tool)
         */
        this.queryable = false;
    }
}
/**
 * Optional parameter model: configure parameter-value pair to add to the request layer URL
 */
class OptionalParameter {
}
/**
 * Layer configuration model: modify the configuration of a layer when interacting with the map (make visible, move the layer ...)
 */
class LayerConfiguration {
}
/**
 * Layer group model
 */
class LayerGroup {
}
/**
 * Map options configuration model
 */
class MapOptionsConfiguration {
}
/**
 * Map component status model
 */
class MapComponentStatus {
    constructor() {
        /**
         * loaded?
         */
        this.loaded = false;
    }
}
/** Map configuration manager service*/
class MapConfigurationManagerService {
    /**
     * constructor
     */
    constructor() {
        //
        this.layersSubject = new BehaviorSubject([]);
        this.layers = null;
        this.baseLayerGroupsSubject = new BehaviorSubject([]);
        this.baseLayerGroups = null;
        this.layerConfigurationSubject = new BehaviorSubject([]);
        this.addLayersSubject = new BehaviorSubject([]);
        this.removeLayersSubject = new BehaviorSubject([]);
        this.situationMapConfigurationSubject = new BehaviorSubject([]);
        this.mapOptionsConfigurationSubject = new BehaviorSubject([]);
        this.mapComponentStatusSubject = new BehaviorSubject([]);
        /**
         * layer count
         */
        this.count = 0;
    }
    /**
     * configure the overlay layers of the map, by passing as a parameter an array of objects of type Layer objects defining the layers to load.
     * @param {?} configuration
     * @return {?}
     */
    loadLayersConfiguration(configuration) {
        if (this.layers != null) {
            this.clearLayers(false);
        }
        this.setLayers(configuration);
    }
    /**
     * configure the base layers of the map by passing as a parameter an array of objects of type LayerGroup each of them with the corresponding Layer objects defining the layers to load.
     * @param {?} configuration
     * @return {?}
     */
    loadBaseLayersConfiguration(configuration) {
        this.setBaseLayerGroups(configuration);
    }
    /**
     * get base layer groups
     * @return {?}
     */
    getBaseLayerGroups() {
        return this.baseLayerGroupsSubject.asObservable();
    }
    /**
     * set base layer groups
     * @param {?} groups
     * @return {?}
     */
    setBaseLayerGroups(groups) {
        this.baseLayerGroups = groups;
        this.refreshBaseLayerGroups();
    }
    /**
     * @return {?}
     */
    refreshBaseLayerGroups() {
        // Send the new values so that all subscribers are updated
        this.baseLayerGroupsSubject.next(this.baseLayerGroups);
    }
    /**
     * get layers
     * @return {?}
     */
    getLayers() {
        return this.layersSubject.asObservable();
    }
    /**
     * remove all layers from map
     * @param {?} refresh
     * @return {?}
     */
    clearLayers(refresh) {
        while (this.layers.length) {
            this.layers.pop();
        }
        if (refresh) {
            this.refreshLayers();
        }
    }
    /**
     * set layers
     * @param {?} layers
     * @return {?}
     */
    setLayers(layers) {
        this.layers = layers;
        this.refreshLayers();
    }
    /**
     * add given layer to map
     * @param {?} layer
     * @return {?}
     */
    addLayer(layer) {
        this.layers.push(layer);
        this.refreshAddLayers(layer);
    }
    /**
     * add given layer to map at given index
     * @param {?} layer
     * @param {?} index
     * @return {?}
     */
    addLayerAt(layer, index) {
        if (index == 0) {
            this.layers = [layer].concat(this.layers);
        }
        else if (index >= this.layers.length) {
            this.layers.push(layer);
        }
        else {
            this.layers = this.layers.slice(0, index)
                .concat([layer])
                .concat(this.layers.slice(index, this.layers.length));
        }
        this.refreshAddLayers(layer);
        this.refreshLayerConfiguration(layer.id, null, null, index);
    }
    /**
     * remove given layer from map
     * @param {?} layer
     * @return {?}
     */
    removeLayer(layer) {
        /** @type {?} */
        var index = this.layers.indexOf(layer);
        this.removeLayerIndex(index);
    }
    /**
     * remove layer with given id from map
     * @param {?} id
     * @return {?}
     */
    removeLayerId(id) {
        /** @type {?} */
        var index = -1;
        for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
            if (this.layers[i].id == id) {
                index = i;
                break;
            }
        }
        this.removeLayerIndex(index);
    }
    /**
     * remove layer at given index from map
     * @param {?} index
     * @return {?}
     */
    removeLayerIndex(index) {
        /** @type {?} */
        var layer = this.layers[index];
        this.layers.splice(index, 1);
        this.refreshRemoveLayers(layer);
    }
    /**
     * refresh layers
     * @return {?}
     */
    refreshLayers() {
        // Send the new values so that all subscribers are updated
        this.layersSubject.next(this.layers);
    }
    /**
     * Observable for layers added
     * @return {?}
     */
    getLayersAdded() {
        return this.addLayersSubject.asObservable();
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    refreshAddLayers(layer) {
        // Send the new values so that all subscribers are updated
        this.addLayersSubject.next([layer]);
    }
    /**
     * @return {?}
     */
    getLayersRemoved() {
        return this.removeLayersSubject.asObservable();
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    refreshRemoveLayers(layer) {
        // Send the new values so that all subscribers are updated
        this.removeLayersSubject.next([layer]);
    }
    /**
     * @return {?}
     */
    getLayerConfigurationListener() {
        return this.layerConfigurationSubject.asObservable();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLayerIndexById(id) {
        /** @type {?} */
        var index = -1;
        for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
            if (this.layers[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    /**
     * move layer with given id to the given index
     * @param {?} id
     * @param {?} index
     * @return {?}
     */
    moveLayer(id, index) {
        /** @type {?} */
        var layerIndex = this.getLayerIndexById(id);
        if (layerIndex != -1) {
            /** @type {?} */
            var layer = this.layers.splice(layerIndex, 1);
            this.layers =
                this.layers.slice(0, index)
                    .concat(layer)
                    .concat(this.layers.slice(index, this.layers.length));
        }
        this.refreshLayerConfiguration(id, null, null, index);
    }
    /**
     * change visibility of layer with given id to the given value
     * @param {?} id
     * @param {?} visibility
     * @return {?}
     */
    changeLayerVisibility(id, visibility) {
        this.refreshLayerConfiguration(id, null, visibility, null);
    }
    /**
     * change opacity of layer with given id to the given value
     * @param {?} id
     * @param {?} opacity
     * @return {?}
     */
    changeLayerOpacity(id, opacity) {
        this.refreshLayerConfiguration(id, opacity, null, null);
    }
    /**
     * @param {?} id
     * @param {?} opacity
     * @param {?} visibility
     * @param {?} position
     * @return {?}
     */
    refreshLayerConfiguration(id, opacity, visibility, position) {
        /** @type {?} */
        var layer = new LayerConfiguration();
        layer.id = id;
        layer.opacity = opacity;
        layer.visibility = visibility;
        layer.position = position;
        this.layerConfigurationSubject.next([layer]);
    }
    /**
     * @return {?}
     */
    getSituationMapConfigurationListener() {
        return this.situationMapConfigurationSubject.asObservable();
    }
    /**
     * configure the situation map of the map component by passing as a parameter an array of objects of type LayerGroup, each of them with the corresponding Layer objects defining the layers to load as situation map.
     * @param {?} layers
     * @return {?}
     */
    loadSituationMapConfiguration(layers) {
        // Send the new values so that all subscribers are updated
        this.situationMapConfigurationSubject.next(layers);
    }
    /**
     * @return {?}
     */
    getMapOptionsConfigurationListener() {
        return this.mapOptionsConfigurationSubject.asObservable();
    }
    /**
     * load map options configuration
     * @param {?} configuration
     * @return {?}
     */
    loadMapOptionsConfiguration(configuration) {
        // Send the new values so that all subscribers are updated
        this.mapOptionsConfigurationSubject.next([configuration]);
    }
    /**
     * @return {?}
     */
    getMapComponentStatusListener() {
        return this.mapComponentStatusSubject.asObservable();
    }
    /**
     * set map component status
     * @param {?} status
     * @return {?}
     */
    setMapComponentStatus(status) {
        //Notify the map component status
        this.mapComponentStatusSubject.next([status]);
    }
}
MapConfigurationManagerService.ɵfac = function MapConfigurationManagerService_Factory(t) { return new (t || MapConfigurationManagerService)(); };
MapConfigurationManagerService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: MapConfigurationManagerService, factory: MapConfigurationManagerService.ɵfac, providedIn: 'root' });
/** @nocollapse */
MapConfigurationManagerService.ctorParameters = () => [];
/** @nocollapse */ MapConfigurationManagerService.ngInjectableDef = defineInjectable({ factory: function MapConfigurationManagerService_Factory() { return new MapConfigurationManagerService(); }, token: MapConfigurationManagerService, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MapConfigurationManagerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * \@howToUse
 * ```
 *     <some-element *sitmunHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *sitmunHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
class HasAnyAuthorityDirective {
    /**
     * constructor
     * @param {?} principal
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(principal, templateRef, viewContainerRef) {
        this.principal = principal;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * Set whether current user has any of the given authorities
     * @param {?} value
     * @return {?}
     */
    set sitmunHasAnyAuthority(value) {
        this.authorities = typeof value === 'string' ? [/** @type {?} */ (value)] : /** @type {?} */ (value);
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }
    /**
     * update view
     * @return {?}
     */
    updateView() {
        if (this.territory) {
            this.principal.hasAnyAuthorityOnTerritory(this.authorities, this.territory).then((result) => {
                this.viewContainerRef.clear();
                if (result) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            });
        }
        else {
            this.principal.hasAnyAuthority(this.authorities).then((result) => {
                this.viewContainerRef.clear();
                if (result) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            });
        }
    }
}
HasAnyAuthorityDirective.ɵfac = function HasAnyAuthorityDirective_Factory(t) { return new (t || HasAnyAuthorityDirective)(ɵngcc0.ɵɵdirectiveInject(Principal), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.TemplateRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef)); };
HasAnyAuthorityDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HasAnyAuthorityDirective, selectors: [["", "sitmunHasAnyAuthority", ""]], inputs: { sitmunHasAnyAuthority: "sitmunHasAnyAuthority", territory: "territory" } });
/** @nocollapse */
HasAnyAuthorityDirective.ctorParameters = () => [
    { type: Principal },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
HasAnyAuthorityDirective.propDecorators = {
    territory: [{ type: Input }],
    sitmunHasAnyAuthority: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HasAnyAuthorityDirective, [{
        type: Directive,
        args: [{
                selector: '[sitmunHasAnyAuthority]'
            }]
    }], function () { return [{ type: Principal }, { type: ɵngcc0.TemplateRef }, { type: ɵngcc0.ViewContainerRef }]; }, { sitmunHasAnyAuthority: [{
            type: Input
        }], territory: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * \@howToUse
 * ```
 *     <some-element *sitmunHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *sitmunHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
class HasAnyAuthorityOnTerritoryDirective {
    /**
     * constructor
     * @param {?} principal
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(principal, templateRef, viewContainerRef) {
        this.principal = principal;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * Set whether current user has any of the given authorities on territory
     * @param {?} opts
     * @return {?}
     */
    set sitmunHasAnyAuthorityOnTerritory(opts) {
        this.authorities = typeof opts.authorities === 'string' ? [/** @type {?} */ (opts.authorities)] : /** @type {?} */ (opts.authorities);
        this.territory = opts.territory;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }
    /**
     * update view
     * @return {?}
     */
    updateView() {
        if (this.territory) {
            this.principal.hasAnyAuthorityOnTerritory(this.authorities, this.territory).then((result) => {
                this.viewContainerRef.clear();
                if (result) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            });
        }
        else {
            this.principal.hasAnyAuthority(this.authorities).then((result) => {
                this.viewContainerRef.clear();
                if (result) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            });
        }
    }
}
HasAnyAuthorityOnTerritoryDirective.ɵfac = function HasAnyAuthorityOnTerritoryDirective_Factory(t) { return new (t || HasAnyAuthorityOnTerritoryDirective)(ɵngcc0.ɵɵdirectiveInject(Principal), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.TemplateRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef)); };
HasAnyAuthorityOnTerritoryDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HasAnyAuthorityOnTerritoryDirective, selectors: [["", "sitmunHasAnyAuthorityOnTerritory", ""]], inputs: { sitmunHasAnyAuthorityOnTerritory: "sitmunHasAnyAuthorityOnTerritory" } });
/** @nocollapse */
HasAnyAuthorityOnTerritoryDirective.ctorParameters = () => [
    { type: Principal },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
HasAnyAuthorityOnTerritoryDirective.propDecorators = {
    sitmunHasAnyAuthorityOnTerritory: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HasAnyAuthorityOnTerritoryDirective, [{
        type: Directive,
        args: [{
                selector: '[sitmunHasAnyAuthorityOnTerritory]'
            }]
    }], function () { return [{ type: Principal }, { type: ɵngcc0.TemplateRef }, { type: ɵngcc0.ViewContainerRef }]; }, { sitmunHasAnyAuthorityOnTerritory: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * load i18n assets
 * @param {?} http
 * @return {?}
 */
function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const ɵ0 = (createTranslateLoader);
/**
 * SITMUN frontend core module
 */
class SitmunFrontendCoreModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SitmunFrontendCoreModule,
            providers: [
                TerritoryService,
                TerritoryTypeService,
                TerritoryGroupTypeService,
                RoleService,
                AccountService,
                AuthService,
                UserService,
                ConnectionService,
                TaskService,
                TaskTypeService,
                TaskUIService,
                TaskGroupService,
                TaskParameterService,
                TaskAvailabilityService,
                ServiceService,
                ServiceParameterService,
                CartographyService,
                CartographyGroupService,
                CartographyAvailabilityService,
                BackgroundService,
                TreeService,
                TreeNodeService,
                ApplicationService,
                ApplicationParameterService,
                ApplicationBackgroundService,
                AuthInterceptor,
                AuthExpiredInterceptor,
                Principal,
                UserPositionService,
                UserConfigurationService,
                LoginService,
                MapConfigurationManagerService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthExpiredInterceptor,
                    multi: true
                }
            ]
        };
    }
}
SitmunFrontendCoreModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SitmunFrontendCoreModule });
SitmunFrontendCoreModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SitmunFrontendCoreModule_Factory(t) { return new (t || SitmunFrontendCoreModule)(); }, imports: [[
            /*RouterModule,
                HttpClientModule,
                CommonModule,
                AngularHalModule,*/
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: ɵ0,
                    deps: [HttpClient]
                }
            }),
        ], TranslateModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SitmunFrontendCoreModule, { declarations: function () { return [HasAnyAuthorityDirective, HasAnyAuthorityOnTerritoryDirective]; }, imports: function () { return [ɵngcc3.TranslateModule]; }, exports: function () { return [HasAnyAuthorityDirective, HasAnyAuthorityOnTerritoryDirective, TranslateModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SitmunFrontendCoreModule, [{
        type: NgModule,
        args: [{
                imports: [
                    /*RouterModule,
                        HttpClientModule,
                        CommonModule,
                        AngularHalModule,*/
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: ɵ0,
                            deps: [HttpClient]
                        }
                    }),
                ],
                declarations: [
                    HasAnyAuthorityDirective,
                    HasAnyAuthorityOnTerritoryDirective,
                ],
                exports: [
                    HasAnyAuthorityDirective,
                    HasAnyAuthorityOnTerritoryDirective,
                    TranslateModule
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Angular HAL module
 */
class AngularHalModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AngularHalModule,
            providers: [
                ExternalService,
                HttpClient,
                {
                    provide: ResourceService,
                    useClass: ResourceService,
                    deps: [ExternalService]
                }
            ]
        };
    }
}
AngularHalModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AngularHalModule });
AngularHalModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AngularHalModule_Factory(t) { return new (t || AngularHalModule)(); }, providers: [
        ExternalService,
        HttpClient,
        {
            provide: ResourceService,
            useClass: ResourceService,
            deps: [ExternalService]
        }
    ], imports: [[HttpClientModule], HttpClientModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AngularHalModule, { imports: function () { return [HttpClientModule]; }, exports: function () { return [HttpClientModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AngularHalModule, [{
        type: NgModule,
        args: [{
                imports: [HttpClientModule],
                declarations: [],
                exports: [HttpClientModule],
                providers: [
                    ExternalService,
                    HttpClient,
                    {
                        provide: ResourceService,
                        useClass: ResourceService,
                        deps: [ExternalService]
                    }
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AccountService, AuthService, AuthInterceptor, AuthExpiredInterceptor, LoginService, Principal, User, UserService, UserPosition, UserPositionService, UserConfiguration, UserConfigurationService, Territory, TerritoryService, TerritoryType, TerritoryTypeService, TerritoryGroupType, TerritoryGroupTypeService, Role, RoleService, Connection, ConnectionService, GEOADMIN_TREE_TASK_ID, Task, TaskService, TaskType, TaskTypeService, TaskGroup, TaskGroupService, TaskParameter, TaskParameterService, TaskAvailability, TaskAvailabilityService, TaskUI, TaskUIService, Service, ServiceService, ServiceParameter, ServiceParameterService, Cartography, CartographyService, CartographyGroup, CartographyGroupService, CartographyAvailability, CartographyAvailabilityService, Background, BackgroundService, Tree, TreeService, TreeNode, TreeNodeService, TERRITORIAL_APP_NAME, Application, ApplicationService, ApplicationBackground, ApplicationBackgroundService, ApplicationParameter, ApplicationParameterService, Layer, OptionalParameter, LayerConfiguration, LayerGroup, MapOptionsConfiguration, MapComponentStatus, MapConfigurationManagerService, createTranslateLoader, SitmunFrontendCoreModule, ExternalService, RestService, Resource, ResourceArray, ResourceHelper, AngularHalModule, ResourceService as ɵc, HasAnyAuthorityOnTerritoryDirective as ɵb, HasAnyAuthorityDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWNvcmUuanMiLCJzb3VyY2VzIjpbIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlLWFycmF5LnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UtaGVscGVyLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdXNlci91c2VyLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FuZ3VsYXItaGFsL3NyYy9saWIvZXh0ZXJuYWwuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYWNjb3VudC9hY2NvdW50LnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9hdXRoLmludGVyY2VwdG9yLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2F1dGgvcHJpbmNpcGFsLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9hdXRoLWV4cGlyZWQuaW50ZXJjZXB0b3IudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9sb2dpbi5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3VzZXIvdXNlci5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3VzZXIvdXNlci1wb3NpdGlvbi5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS91c2VyL3VzZXItcG9zaXRpb24uc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS91c2VyL3VzZXItY29uZmlndXJhdGlvbi5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS91c2VyL3VzZXItY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3RlcnJpdG9yeS90ZXJyaXRvcnkubW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGVycml0b3J5L3RlcnJpdG9yeS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3RlcnJpdG9yeS90ZXJyaXRvcnktdHlwZS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90ZXJyaXRvcnkvdGVycml0b3J5LXR5cGUuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90ZXJyaXRvcnkvdGVycml0b3J5LWdyb3VwLXR5cGUubW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGVycml0b3J5L3RlcnJpdG9yeS1ncm91cC10eXBlLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvcm9sZS9yb2xlLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3JvbGUvcm9sZS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2subW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXR5cGUubW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXR5cGUuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2stZ3JvdXAubW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLWdyb3VwLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXBhcmFtZXRlci5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2stcGFyYW1ldGVyLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLWF2YWlsYWJpbGl0eS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2stYXZhaWxhYmlsaXR5LnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXVpLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay11aS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3NlcnZpY2Uvc2VydmljZS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9zZXJ2aWNlL3NlcnZpY2Uuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9zZXJ2aWNlL3NlcnZpY2UtcGFyYW1ldGVyLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3NlcnZpY2Uvc2VydmljZS1wYXJhbWV0ZXIuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvY2FydG9ncmFwaHktYXZhaWxhYmlsaXR5Lm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0eS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2JhY2tncm91bmQubW9kZWwudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvYmFja2dyb3VuZC5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3RyZWUvdHJlZS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90cmVlL3RyZWUuc2VydmljZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90cmVlL3RyZWUtbm9kZS5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS90cmVlL3RyZWUtbm9kZS5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXBwbGljYXRpb24vYXBwbGljYXRpb24tYmFja2dyb3VuZC5tb2RlbC50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi1iYWNrZ3JvdW5kLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXBwbGljYXRpb24vYXBwbGljYXRpb24tcGFyYW1ldGVyLm1vZGVsLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5zZXJ2aWNlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL21hcC9tYXAtY29uZmlndXJhdGlvbi1tYW5hZ2VyLnNlcnZpY2UudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9oYXMtYW55LWF1dGhvcml0eS5kaXJlY3RpdmUudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9oYXMtYW55LWF1dGhvcml0eS1vbi10ZXJyaXRvcnkuZGlyZWN0aXZlLnRzIiwiQHNpdG11bi9mcm9udGVuZC1jb3JlL3NpdG11bi1mcm9udGVuZC1jb3JlLm1vZHVsZS50cyIsIkBzaXRtdW4vZnJvbnRlbmQtY29yZS9hbmd1bGFyLWhhbC9zcmMvbGliL2FuZ3VsYXItaGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6WyJvYnNlcnZhYmxlVGhyb3dFcnJvciIsInVybC5wYXJzZSIsIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLEFBQUE7QUFBc0M7QUFBSTtBQUVqQjtBQUFlO0FBU3hDOzs7YUF1QjJCLENBQUM7QUF2QjVCO0FBQXNCO0FBQW9CO2NBeUJsQixDQUFDLGZBekI2QjtBQUVwRDtBQUFZLDZCQXFCYSxDQUFDO0FBQzVCO0FBSXdCLENBQUMsREFKYjtBQUNBO2dCQVNhLEVBQUUsbEJBVEgsMEJBQUEsQ0FBQztBQUN6QjtBQUNPO0FBQ0E7Z0JBU0ksQ0FBQyxFQUFLLG5CQVRFLDBCQUFLLENBQUM7U0FVakIsVEFUUjtDQVNZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxsQkFSdEI7QUFTRixBQVJTO0FBQVksc0JBR0QsRUFBRTtBQUMzQjs2QkFPYSw3QkFORjtLQU9ILExBTkc7QUFNSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUM3Qiw3QkFQa0Isb0JBQVosQ0FBQyxFQUFLO0FBQ2pCLFlBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsU0FBSztBQUNMO0FBQ1c7RUFNUSxDQUFDLElBQWtCLEVBQUUsVEFMN0I7S0FLMEMsRUFBRSxRQUFnQixmQUxoRCxzQkFBVjtpQ0FNTCxqQ0FOYSxZQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNLO0FBQUM7QUFBQztBQUFJO0FBQ047QUFFVztBQy9FakI7QUFBSTtBQUFzQjtBQTREMUI7QUFBeUI7QUFDeEI7QUFBbUI7QUFBUSxJQUF4QixPQUFPLE9BQU87QUFBSyxRQUNmLE9BQU87QUFDZixZQUFZLFFBQVEsRUFBRSxnQkFBZ0I7QUFDdEMsWUFBWSxTQUFTLEVBQUU7QUFDdkIsZ0JBQWdCLGVBQWU7QUFDL0IsZ0JBQWdCLFVBQVU7QUFDMUIsZ0JBQWdCO0FBQ2hCLG9CQUFvQixPQUFPLEVBQUUsZUFBZTtBQUM1QyxvQkFBb0IsUUFBUSxFQUFFLGVBQWU7QUFDN0Msb0JBQW9CLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQztBQUMzQyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTDs0Q0E1QkMsUUFBUSxTQUFDO0VBQ04sT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsa0JBQzNCLFlBQVksRUFBRSxFQUFFLGtCQUNoQixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFDM0IsU0FBUyxFQUFFO09BQ1AsZUFBZTttQkFDZjtTQUFVO3FCQUNWO1NBQ0ksT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFFBQVEsRUFBRTtTQUFlO3lCQUN6QixJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7V0FDMUIsa0JBQUMsY0FDVDs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0s7QUFBQztBQUFDO0FBQUk7QUFDRTtBQUVLO0FBQUk7QUFBQztBQUFJO0FBQ047QUFHcEI7QUFBSTtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge2NhdGNoRXJyb3IsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1NvcnR9IGZyb20gJy4vc29ydCc7XHJcbmltcG9ydCB7QXJyYXlJbnRlcmZhY2V9IGZyb20gJy4vYXJyYXktaW50ZXJmYWNlJztcclxuaW1wb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQge1Jlc291cmNlfSBmcm9tICcuL3Jlc291cmNlJztcclxuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcclxuXHJcbi8qKiBSRVNUIGFycmF5IG9mIHJlc291cmNlIGltcGxlbWVudGF0aW9uICovXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUFycmF5PFQgZXh0ZW5kcyBSZXNvdXJjZT4gaW1wbGVtZW50cyBBcnJheUludGVyZmFjZTxUPiB7XHJcbiAgICAvKiogc29ydGluZyBpbmZvICovXHJcbiAgICBwdWJsaWMgc29ydEluZm86IFNvcnRbXTtcclxuICAgIC8qKiBwcm94eSB1cmwgKi9cclxuICAgIHB1YmxpYyBwcm94eVVybDogc3RyaW5nO1xyXG4gICAgLyoqIHJvb3QgdXJsICovXHJcbiAgICBwdWJsaWMgcm9vdFVybDogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBzZWxmIHVybCAqL1xyXG4gICAgcHVibGljIHNlbGZfdXJpOiBzdHJpbmc7XHJcbiAgICAvKiogbmV4dCByZXNvdXJjZSB1cmwgKi9cclxuICAgIHB1YmxpYyBuZXh0X3VyaTogc3RyaW5nO1xyXG4gICAgLyoqIHByZXZpb3VzIHJlc291cmNlIHVybCAqL1xyXG4gICAgcHVibGljIHByZXZfdXJpOiBzdHJpbmc7XHJcbiAgICAvKiogZmlyc3QgcmVzb3VyY2UgdXJsICovXHJcbiAgICBwdWJsaWMgZmlyc3RfdXJpOiBzdHJpbmc7XHJcbiAgICAvKiogbGFzdCByZXNvdXJjZSB1cmwgKi9cclxuICAgIHB1YmxpYyBsYXN0X3VyaTogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBlbWJlZGRlZCBhcnJheSBsaXN0ICovXHJcbiAgICBwdWJsaWMgX2VtYmVkZGVkO1xyXG5cclxuICAgIC8qKiB0b3RhbCBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBhcnJheSAqL1xyXG4gICAgcHVibGljIHRvdGFsRWxlbWVudHMgPSAwO1xyXG4gICAgLyoqIHRvdGFsIG51bWJlciBvZiBwYWdlcyBpbiB0aGUgcmVzcG9uc2UgKi9cclxuICAgIHB1YmxpYyB0b3RhbFBhZ2VzID0gMTtcclxuICAgIFxyXG4gICAgLyoqIHBhZ2UgbnVtYmVyIGluIHRoZSByZXNwb25zZSAqL1xyXG4gICAgcHVibGljIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgXHJcbiAgICAvKiogcGFnZSBzaXplICovXHJcbiAgICBwdWJsaWMgcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgICAvKiogYXJyYXkgY29tcG9uZW50cyAqL1xyXG4gICAgcHVibGljIHJlc3VsdDogVFtdID0gW107XHJcblxyXG4gICAgLyoqIHB1c2ggYSBuZXcgcmVzb3VyY2UgdG8gdGhlIGFycmF5ICovXHJcbiAgICBwdXNoID0gKGVsOiBUKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQucHVzaChlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBsZW5ndGggb2YgdGhlIGFycmF5ICovXHJcbiAgICBsZW5ndGggPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogbG9hZCBhcnJheSBkYXRhIGZyb20gUkVTVCByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGluaXQgPSAodHlwZTogeyBuZXcoKTogVCB9LCByZXNwb25zZTogYW55LCBzb3J0SW5mbzogU29ydFtdKTogUmVzb3VyY2VBcnJheTxUPiA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNvdXJjZUFycmF5PFQ+ID0gUmVzb3VyY2VIZWxwZXIuY3JlYXRlRW1wdHlSZXN1bHQ8VD4odGhpcy5fZW1iZWRkZWQpO1xyXG4gICAgICAgIHJlc3VsdC5zb3J0SW5mbyA9IHNvcnRJbmZvO1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uKHR5cGUsIHJlc3BvbnNlLCByZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBMb2FkIG5leHQgcGFnZSAqL1xyXG4gICAgbmV4dCA9ICh0eXBlOiB7IG5ldygpOiBUIH0pOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5uZXh0X3VyaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLm5leHRfdXJpKSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHRoaXMuaW5pdCh0eXBlLCByZXNwb25zZSwgdGhpcy5zb3J0SW5mbykpLFxyXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gbmV4dCBkZWZpbmVkJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBMb2FkIHByZXZpb3VzIHBhZ2UgKi9cclxuICAgIHByZXYgPSAodHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldl91cmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5wcmV2X3VyaSksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHRoaXMuc29ydEluZm8pKSxcclxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHByZXYgZGVmaW5lZCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTG9hZCBmaXJzdCBwYWdlICovXHJcbiAgICBmaXJzdCA9ICh0eXBlOiB7IG5ldygpOiBUIH0pOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdF91cmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5maXJzdF91cmkpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gdGhpcy5pbml0KHR5cGUsIHJlc3BvbnNlLCB0aGlzLnNvcnRJbmZvKSksXHJcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyBmaXJzdCBkZWZpbmVkJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBMb2FkIGxhc3QgcGFnZSAqL1xyXG4gICAgbGFzdCA9ICh0eXBlOiB7IG5ldygpOiBUIH0pOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0X3VyaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLmxhc3RfdXJpKSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHRoaXMuaW5pdCh0eXBlLCByZXNwb25zZSwgdGhpcy5zb3J0SW5mbykpLFxyXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gbGFzdCBkZWZpbmVkJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBMb2FkIHBhZ2Ugd2l0aCBnaXZlbiBwYWdlTnVtYmVyKi9cclxuICAgIHBhZ2UgPSAodHlwZTogeyBuZXcoKTogVCB9LCBwYWdlTnVtYmVyOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+ID0+IHtcclxuICAgICAgICB0aGlzLnNlbGZfdXJpID0gdGhpcy5zZWxmX3VyaS5yZXBsYWNlKCd7P3BhZ2Usc2l6ZSxzb3J0fScsICcnKTtcclxuICAgICAgICB0aGlzLnNlbGZfdXJpID0gdGhpcy5zZWxmX3VyaS5yZXBsYWNlKCd7JnNvcnR9JywgJycpO1xyXG4gICAgICAgIGxldCB1cmxQYXJzZWQgPSB1cmwucGFyc2UoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5zZWxmX3VyaSkpO1xyXG4gICAgICAgIGxldCBxdWVyeTogc3RyaW5nID0gUmVzb3VyY2VBcnJheS5yZXBsYWNlT3JBZGQodXJsUGFyc2VkLnF1ZXJ5LCAnc2l6ZScsIHRoaXMucGFnZVNpemUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcXVlcnkgPSBSZXNvdXJjZUFycmF5LnJlcGxhY2VPckFkZChxdWVyeSwgJ3BhZ2UnLCBwYWdlTnVtYmVyLnRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHVyaSA9IHVybFBhcnNlZC5xdWVyeSA/XHJcbiAgICAgICAgICAgIFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMuc2VsZl91cmkpLnJlcGxhY2UodXJsUGFyc2VkLnF1ZXJ5LCBxdWVyeSkgOiBSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLnNlbGZfdXJpKS5jb25jYXQocXVlcnkpO1xyXG4gICAgICAgIHVyaSA9IHRoaXMuYWRkU29ydEluZm8odXJpKTtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldCh1cmksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShcclxuICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHRoaXMuaW5pdCh0eXBlLCByZXNwb25zZSwgdGhpcy5zb3J0SW5mbykpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIFNvcnQgY29sbGVjdGlvbiBiYXNlZCBvbiBnaXZlbiBzb3J0IGF0dHJpYnV0ZSAqL1xyXG4gICAgc29ydEVsZW1lbnRzID0gKHR5cGU6IHsgbmV3KCk6IFQgfSwgLi4uc29ydDogU29ydFtdKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxmX3VyaSA9IHRoaXMuc2VsZl91cmkucmVwbGFjZSgnez9wYWdlLHNpemUsc29ydH0nLCAnJyk7XHJcbiAgICAgICAgdGhpcy5zZWxmX3VyaSA9IHRoaXMuc2VsZl91cmkucmVwbGFjZSgneyZzb3J0fScsICcnKTtcclxuICAgICAgICBsZXQgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5zZWxmX3VyaSkuY29uY2F0KCc/JywgJ3NpemU9JywgdGhpcy5wYWdlU2l6ZS50b1N0cmluZygpLCAnJnBhZ2U9JywgdGhpcy5wYWdlTnVtYmVyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHVyaSA9IHRoaXMuYWRkU29ydEluZm8odXJpKTtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldCh1cmksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShcclxuICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHRoaXMuaW5pdCh0eXBlLCByZXNwb25zZSwgc29ydCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIExvYWQgcGFnZSB3aXRoIGdpdmVuIHNpemUgKi9cclxuICAgIHNpemUgPSAodHlwZTogeyBuZXcoKTogVCB9LCBzaXplOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+ID0+IHtcclxuICAgICAgICBsZXQgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5zZWxmX3VyaSkuY29uY2F0KCc/JywgJ3NpemU9Jywgc2l6ZS50b1N0cmluZygpKTtcclxuICAgICAgICB1cmkgPSB0aGlzLmFkZFNvcnRJbmZvKHVyaSk7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHRoaXMuc29ydEluZm8pKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBBZGQgc29ydCBpbmZvIHRvIGdpdmVuIFVSSSAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTb3J0SW5mbyh1cmk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnNvcnRJbmZvKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnNvcnRJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB1cmkgPSB1cmkuY29uY2F0KCcmc29ydD0nLCBpdGVtLnBhdGgsICcsJywgaXRlbS5vcmRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVyaTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkIHJlcGxhY2Ugb3IgYWRkIHBhcmFtIHZhbHVlIHRvIHF1ZXJ5IHN0cmluZyAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZU9yQWRkKHF1ZXJ5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChxdWVyeSkge1xyXG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSBxdWVyeS5pbmRleE9mKGZpZWxkKTtcclxuICAgICAgICAgICAgbGV0IGlkeE5leHRBbXA6IG51bWJlciA9IHF1ZXJ5LmluZGV4T2YoJyYnLCBpZHgpID09IC0xID8gcXVlcnkuaW5kZXhPZignLycsIGlkeCkgOiBxdWVyeS5pbmRleE9mKCcmJywgaWR4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpZHggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWFjaFZhbHVlID0gcXVlcnkuc3Vic3RyaW5nKGlkeCwgaWR4TmV4dEFtcCk7XHJcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2Uoc2VhY2hWYWx1ZSwgZmllbGQgKyAnPScgKyB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LmNvbmNhdChcIiZcIiArIGZpZWxkICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlcnkgPSBcIj9cIiArIGZpZWxkICsgJz0nICsgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4vcmVzb3VyY2UnO1xyXG5pbXBvcnQge1Jlc291cmNlQXJyYXl9IGZyb20gJy4vcmVzb3VyY2UtYXJyYXknO1xyXG5pbXBvcnQge0hhbE9wdGlvbnN9IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJUeXBlQnVpbGRlcn0gZnJvbSAnLi9zdWJ0eXBlLWJ1aWxkZXInO1xyXG5pbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkLCBpc1ByaW1pdGl2ZX0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xyXG5cclxuLyoqIFJFU1QgQVBJIGFjY2VzcyBoZWxwZXIgKi9cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlSGVscGVyIHtcclxuXHJcbiAgICAvKiogSHR0cEhlYWRlcnMgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIC8qKiBQcm94eSBVUkwgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHByb3h5X3VyaTogc3RyaW5nID0gbnVsbDtcclxuICAgIC8qKiBSb290IFVSTCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcm9vdF91cmk6IHN0cmluZyA9IG51bGw7XHJcbiAgICAvKiogSHR0cENsaWVudCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaHR0cDogSHR0cENsaWVudCA9IG51bGw7XHJcblxyXG4gICAgLyoqIGdldCByZXF1ZXN0IGhlYWRlcnMgKi9cclxuICAgIC8qcHVibGljIHN0YXRpYyBnZXQgaGVhZGVycygpOiBIdHRwSGVhZGVycyB7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2hlYWRlcnMpKVxyXG4gICAgICAgICAgUmVzb3VyY2VIZWxwZXIuX2hlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuX2hlYWRlcnM7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKiogc2V0IHJlcXVlc3QgaGVhZGVycyAqL1xyXG4gICAgLypwdWJsaWMgc3RhdGljIHNldCBoZWFkZXJzKGhlYWRlcnM6IEh0dHBIZWFkZXJzKSB7XHJcbiAgICAgIFJlc291cmNlSGVscGVyLl9oZWFkZXJzID0gaGVhZGVycztcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKiBnZXQgcmVxdWVzdCBvcHRpb24gcGFyYW1zICovXHJcbiAgICBzdGF0aWMgb3B0aW9uUGFyYW1zKHBhcmFtczogSHR0cFBhcmFtcywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBIdHRwUGFyYW1zIHtcclxuICAgICAgICBpZiAob3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIG9wdGlvbnMucGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZChwYXJhbS5rZXksIHBhcmFtLnZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdzaXplJywgb3B0aW9ucy5zaXplLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zb3J0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygb3B0aW9ucy5zb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNvcnRTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBzb3J0U3RyaW5nID0gcy5wYXRoID8gc29ydFN0cmluZy5jb25jYXQocy5wYXRoKSA6IHNvcnRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydFN0cmluZyA9IHMub3JkZXIgPyBzb3J0U3RyaW5nLmNvbmNhdCgnLCcpLmNvbmNhdChzLm9yZGVyKSA6IHNvcnRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnc29ydCcsIHNvcnRTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNvbHZlIHJlc291cmNlIHJlbGF0aW9ucyAqL1xyXG4gICAgc3RhdGljIHJlc29sdmVSZWxhdGlvbnMocmVzb3VyY2U6IFJlc291cmNlKTogT2JqZWN0IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc291cmNlKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocmVzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChSZXNvdXJjZUhlbHBlci5jbGFzc05hbWUocmVzb3VyY2Vba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IGNsYXNzTmFtZSA9PSAnUmVzb3VyY2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZVtrZXldWydfbGlua3MnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByZXNvdXJjZVtrZXldWydfbGlua3MnXVsnc2VsZiddWydocmVmJ107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXk6IGFueVtdID0gcmVzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJpbWl0aXZlKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0ucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldLnB1c2godGhpcy5yZXNvbHZlUmVsYXRpb25zKGVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHJlc291cmNlW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBhbiBlbXB0eSByZXNvdXJjZSBmcm9tIGVtYmVkZGVkIGRhdGEqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUVtcHR5UmVzdWx0PFQgZXh0ZW5kcyBSZXNvdXJjZT4oX2VtYmVkZGVkOiBzdHJpbmcpOiBSZXNvdXJjZUFycmF5PFQ+IHtcclxuICAgICAgICBsZXQgcmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPiA9IG5ldyBSZXNvdXJjZUFycmF5PFQ+KCk7XHJcbiAgICAgICAgcmVzb3VyY2VBcnJheS5fZW1iZWRkZWQgPSBfZW1iZWRkZWQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBjbGFzcyBuYW1lKi9cclxuICAgIHN0YXRpYyBnZXRDbGFzc05hbWUob2JqOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uICguKz8pXFwoLztcclxuICAgICAgICB2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKG9iai5jb25zdHJ1Y3Rvci50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0gOiAnJztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgY2xhc3MgbmFtZSBmcm9tIGEgcHJvdG90eXBlIG9iamVjdCovXHJcbiAgICBzdGF0aWMgY2xhc3NOYW1lKG9ialByb3RvOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBbXTtcclxuICAgICAgICBsZXQgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9ialByb3RvKTtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHdoaWxlICgoY2xhc3NOYW1lID0gUmVzb3VyY2VIZWxwZXIuZ2V0Q2xhc3NOYW1lKG9iaikpICE9PSAnT2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogaW5zdGFudGlhdGUgYSBSZXNvdXJjZUNvbGxlY3Rpb24gZnJvbSByZXNwb25zZSBlbWJlZGRlZCBkYXRhKi9cclxuICAgIHN0YXRpYyBpbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbjxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcGF5bG9hZDogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBSZXNvdXJjZUFycmF5PFQ+LCBidWlsZGVyPzogU3ViVHlwZUJ1aWxkZXIpOiBSZXNvdXJjZUFycmF5PFQ+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGVtYmVkZGVkQ2xhc3NOYW1lIG9mIE9iamVjdC5rZXlzKHBheWxvYWRbcmVzdWx0Ll9lbWJlZGRlZF0pKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWJlZGRlZDogYW55ID0gcGF5bG9hZFtyZXN1bHQuX2VtYmVkZGVkXTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBlbWJlZGRlZFtlbWJlZGRlZENsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnN0YW5jZTogVCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuc2VhcmNoU3VidHlwZXMoYnVpbGRlciwgZW1iZWRkZWRDbGFzc05hbWUsIGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbnRpYXRlUmVzb3VyY2UoaW5zdGFuY2UsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQudG90YWxFbGVtZW50cyA9IHBheWxvYWQucGFnZSA/IHBheWxvYWQucGFnZS50b3RhbEVsZW1lbnRzIDogcmVzdWx0Lmxlbmd0aDtcclxuICAgICAgICByZXN1bHQudG90YWxQYWdlcyA9IHBheWxvYWQucGFnZSA/IHBheWxvYWQucGFnZS50b3RhbFBhZ2VzIDogMTtcclxuICAgICAgICByZXN1bHQucGFnZU51bWJlciA9IHBheWxvYWQucGFnZSA/IHBheWxvYWQucGFnZS5udW1iZXIgOiAxO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHBheWxvYWQucGFnZSA/IHBheWxvYWQucGFnZS5zaXplIDogMjA7XHJcblxyXG4gICAgICAgIHJlc3VsdC5zZWxmX3VyaSA9IHBheWxvYWQuX2xpbmtzICYmIHBheWxvYWQuX2xpbmtzLnNlbGYgPyBwYXlsb2FkLl9saW5rcy5zZWxmLmhyZWYgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmVzdWx0Lm5leHRfdXJpID0gcGF5bG9hZC5fbGlua3MgJiYgcGF5bG9hZC5fbGlua3MubmV4dCA/IHBheWxvYWQuX2xpbmtzLm5leHQuaHJlZiA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXN1bHQucHJldl91cmkgPSBwYXlsb2FkLl9saW5rcyAmJiBwYXlsb2FkLl9saW5rcy5wcmV2ID8gcGF5bG9hZC5fbGlua3MucHJldi5ocmVmIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJlc3VsdC5maXJzdF91cmkgPSBwYXlsb2FkLl9saW5rcyAmJiBwYXlsb2FkLl9saW5rcy5maXJzdCA/IHBheWxvYWQuX2xpbmtzLmZpcnN0LmhyZWYgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmVzdWx0Lmxhc3RfdXJpID0gcGF5bG9hZC5fbGlua3MgJiYgcGF5bG9hZC5fbGlua3MubGFzdCA/IHBheWxvYWQuX2xpbmtzLmxhc3QuaHJlZiA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggc3VidHlwZXMqL1xyXG4gICAgc3RhdGljIHNlYXJjaFN1YnR5cGVzPFQgZXh0ZW5kcyBSZXNvdXJjZT4oYnVpbGRlcjogU3ViVHlwZUJ1aWxkZXIsIGVtYmVkZGVkQ2xhc3NOYW1lOiBzdHJpbmcsIGluc3RhbmNlOiBUKSB7XHJcbiAgICAgICAgaWYgKGJ1aWxkZXIgJiYgYnVpbGRlci5zdWJ0eXBlcykge1xyXG4gICAgICAgICAgICBsZXQga2V5cyA9IGJ1aWxkZXIuc3VidHlwZXMua2V5cygpO1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGtleXMpLmZvckVhY2goKHN1YnR5cGVLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVtYmVkZGVkQ2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChzdWJ0eXBlS2V5LnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1YnR5cGU6IHsgbmV3KCk6IGFueSB9ID0gYnVpbGRlci5zdWJ0eXBlcy5nZXQoc3VidHlwZUtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgc3VidHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBpbnN0YW50aWF0ZSBhIFJlc291cmNlIGZyb20gcmVzcG9uc2UgKi9cclxuICAgIHN0YXRpYyBpbnN0YW50aWF0ZVJlc291cmNlPFQgZXh0ZW5kcyBSZXNvdXJjZT4oZW50aXR5OiBULCBwYXlsb2FkOiBPYmplY3QpOiBUIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHAgaW4gcGF5bG9hZCkge1xyXG4gICAgICAgICAgICAvL1RPRE8gYXJyYXkgaW5pdFxyXG4gICAgICAgICAgICAvKiBpZihlbnRpdHlbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ICYmIGlzTnVsbE9yVW5kZWZpbmVkKHBheWxvYWRbcF0pKVxyXG4gICAgICAgICAgICAgICAgIGVudGl0eVtwXSA9IFtdO1xyXG4gICAgICAgICAgICAgZWxzZSovXHJcbiAgICAgICAgICAgIGVudGl0eVtwXSA9IHBheWxvYWRbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBwcm94eSBVUkwgKi9cclxuICAgIHN0YXRpYyBzZXRQcm94eVVyaShwcm94eV91cmk6IHN0cmluZykge1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLnByb3h5X3VyaSA9IHByb3h5X3VyaTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0IFJvb3QgVVJJICovXHJcbiAgICBzdGF0aWMgc2V0Um9vdFVyaShyb290X3VyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgUmVzb3VyY2VIZWxwZXIucm9vdF91cmkgPSByb290X3VyaTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHByb3h5IFVSTCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRVUkwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpICYmIFJlc291cmNlSGVscGVyLnByb3h5X3VyaSAhPSAnJyA/XHJcbiAgICAgICAgICAgIFJlc291cmNlSGVscGVyLmFkZFNsYXNoKFJlc291cmNlSGVscGVyLnByb3h5X3VyaSkgOlxyXG4gICAgICAgICAgICBSZXNvdXJjZUhlbHBlci5hZGRTbGFzaChSZXNvdXJjZUhlbHBlci5yb290X3VyaSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGFkZCBzbGFzaCB0byBVUkkgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGFkZFNsYXNoKHVyaTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdXJpUGFyc2VkID0gdXJsLnBhcnNlKHVyaSk7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHVyaVBhcnNlZC5zZWFyY2gpICYmIHVyaSAmJiB1cmlbdXJpLmxlbmd0aCAtIDFdICE9ICcvJylcclxuICAgICAgICAgICAgcmV0dXJuIHVyaSArICcvJztcclxuICAgICAgICByZXR1cm4gdXJpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcHJveHkgZnJvbSBVUkwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJveHkodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpIHx8IFJlc291cmNlSGVscGVyLnByb3h5X3VyaSA9PSAnJylcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuYWRkU2xhc2godXJsLnJlcGxhY2UoUmVzb3VyY2VIZWxwZXIucm9vdF91cmksIFJlc291cmNlSGVscGVyLnByb3h5X3VyaSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZXQgSHR0cENsaWVudCovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldEh0dHAoaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLmh0dHAgPSBodHRwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgSHR0cENsaWVudCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHAoKTogSHR0cENsaWVudCB7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmh0dHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByb290IFVSSSovXHJcbiAgICBzdGF0aWMgZ2V0Um9vdFVyaSgpIHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIucm9vdF91cmk7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgb2YgYXMgb2JzZXJ2YWJsZU9mfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5cclxuaW1wb3J0IHtIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7UmVzb3VyY2VIZWxwZXJ9IGZyb20gJy4vcmVzb3VyY2UtaGVscGVyJztcclxuaW1wb3J0IHtSZXNvdXJjZUFycmF5fSBmcm9tICcuL3Jlc291cmNlLWFycmF5JztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcblxyXG5pbXBvcnQge0hhbE9wdGlvbnN9IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHtTdWJUeXBlQnVpbGRlcn0gZnJvbSAnLi9zdWJ0eXBlLWJ1aWxkZXInO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XHJcblxyXG4vKiogQWJzdHJhY3QgcmVzb3VyY2UgY2xhc3MqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZSB7XHJcblxyXG4gICAgLyoqIHByb3h5IFVSTCAqL1xyXG4gICAgcHVibGljIHByb3h5VXJsOiBzdHJpbmc7XHJcbiAgICAvKiogcm9vdCBVUkwgKi9cclxuICAgIHB1YmxpYyByb290VXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIGxpbmtzICovXHJcbiAgICBwdWJsaWMgX2xpbmtzOiBhbnk7XHJcbiAgICAvKiogc3VidHlwZXMgKi9cclxuICAgIHB1YmxpYyBfc3VidHlwZXM6IE1hcDxzdHJpbmcsIGFueT47XHJcblxyXG4gICAgXHJcbiAgICAvKiogZ2V0IHN1YnR5cGVzICovICAgIFxyXG4gICAgcHVibGljIGdldCBzdWJ0eXBlcygpOiBNYXA8c3RyaW5nLCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VidHlwZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBzdWJ0eXBlcyAqL1xyXG4gICAgcHVibGljIHNldCBzdWJ0eXBlcyhfc3VidHlwZXM6IE1hcDxzdHJpbmcsIGFueT4pIHtcclxuICAgICAgICB0aGlzLl9zdWJ0eXBlcyA9IF9zdWJ0eXBlcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCBjb2xsZWN0aW9uIG9mIHJlbGF0ZWQgcmVzb3VyY2VzICovXHJcbiAgICBwdWJsaWMgZ2V0UmVsYXRpb25BcnJheTxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVsYXRpb246IHN0cmluZywgX2VtYmVkZGVkPzogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucywgYnVpbGRlcj86IFN1YlR5cGVCdWlsZGVyKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KGlzTnVsbE9yVW5kZWZpbmVkKF9lbWJlZGRlZCkgPyBcIl9lbWJlZGRlZFwiIDogX2VtYmVkZGVkKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzKSAmJiAhaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3NbcmVsYXRpb25dKSkge1xyXG4gICAgICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uPFQ+KHR5cGUsIHJlc3BvbnNlLCByZXN1bHQsIGJ1aWxkZXIpKSxcclxuICAgICAgICAgICAgICAgIG1hcCgoYXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IGFycmF5LnJlc3VsdCksKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCByZWxhdGVkIHJlc291cmNlICovXHJcbiAgICBwdWJsaWMgZ2V0UmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlbGF0aW9uOiBzdHJpbmcsIGJ1aWxkZXI/OiBTdWJUeXBlQnVpbGRlcik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IFQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbWJlZGRlZENsYXNzTmFtZSBvZiBPYmplY3Qua2V5cyhkYXRhWydfbGlua3MnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVtYmVkZGVkQ2xhc3NOYW1lID09ICdzZWxmJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhyZWY6IHN0cmluZyA9IGRhdGEuX2xpbmtzW2VtYmVkZGVkQ2xhc3NOYW1lXS5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gaHJlZi5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWxDbGFzc05hbWUgPSBocmVmLnJlcGxhY2UoUmVzb3VyY2VIZWxwZXIuZ2V0Um9vdFVyaSgpLCBcIlwiKS5zdWJzdHJpbmcoMCwgaWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJlc291cmNlSGVscGVyLnNlYXJjaFN1YnR5cGVzKGJ1aWxkZXIsIHJlYWxDbGFzc05hbWUsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhlIGJvdW5kIGNvbGxlY3Rpb24gYnkgdGhlIHJlbGF0aW9uICovXHJcbiAgICBwdWJsaWMgYWRkUmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPihyZWxhdGlvbjogc3RyaW5nLCByZXNvdXJjZTogVCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rcykgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzW3JlbGF0aW9uXSkpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IFJlc291cmNlSGVscGVyLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAndGV4dC91cmktbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnBvc3QoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmLCB7aGVhZGVyczogaGVhZGVyfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyByZWxhdGlvbiBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQmluZCB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhpcyByZXNvdXJjZSBieSB0aGUgZ2l2ZW4gcmVsYXRpb24qL1xyXG4gICAgcHVibGljIHVwZGF0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ3RleHQvdXJpLWxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wYXRjaChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHJlc291cmNlLl9saW5rcy5zZWxmLmhyZWYsIHtoZWFkZXJzOiBoZWFkZXJ9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlbGF0aW9uIGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBCaW5kIHRoZSBnaXZlbiByZXNvdXJjZSB0byB0aGlzIHJlc291cmNlIGJ5IHRoZSBnaXZlbiByZWxhdGlvbiovXHJcbiAgICBwdWJsaWMgc3Vic3RpdHV0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ3RleHQvdXJpLWxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wdXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmLCB7aGVhZGVyczogaGVhZGVyfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyByZWxhdGlvbiBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKiogQmluZCB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhpcyByZXNvdXJjZSBieSB0aGUgZ2l2ZW4gcmVsYXRpb24qL1xyXG4gICAgcHVibGljIHN1YnN0aXR1dGVBbGxSZWxhdGlvbjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlbGF0aW9uOiBzdHJpbmcsIHJlc291cmNlczogUmVzb3VyY2VbXSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rcykgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzW3JlbGF0aW9uXSkpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IFJlc291cmNlSGVscGVyLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAndGV4dC91cmktbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnB1dChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHJlc291cmNlcy5tYXAoKHJlc291cmNlKSA9PiByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmKSwge2hlYWRlcnM6IGhlYWRlcn0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKiogVW5iaW5kIHRoZSByZXNvdXJjZSB3aXRoIHRoZSBnaXZlbiByZWxhdGlvbiBmcm9tIHRoaXMgcmVzb3VyY2UqL1xyXG4gICAgcHVibGljIGRlbGV0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZChyZXNvdXJjZS5fbGlua3MpKSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5rOiBzdHJpbmcgPSByZXNvdXJjZS5fbGlua3NbJ3NlbGYnXS5ocmVmO1xyXG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSBsaW5rLmxhc3RJbmRleE9mKCcvJykgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlkeCA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWxhdGlvbklkOiBzdHJpbmcgPSBsaW5rLnN1YnN0cmluZyhpZHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZShSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiArICcvJyArIHJlbGF0aW9uSWQpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBVbmJpbmQgdGhlIHJlc291cmNlIHdpdGggdGhlIGdpdmVuIHJlbGF0aW9uIGZyb20gdGhpcyByZXNvdXJjZSovXHJcbiAgICBwdWJsaWMgZGVsZXRlQWxsUmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPihyZWxhdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZShSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiApLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBVc2VyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vdXNlci1jb25maWd1cmF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlclBvc2l0aW9uIH0gZnJvbSAnLi91c2VyLXBvc2l0aW9uLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBVc2VyIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogdXNlcm5hbWUgKi9cclxuICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcclxuICAvKiogcGFzc3dvcmQgKi9cclxuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcclxuICAvKiogZmlyc3QgbmFtZSAqL1xyXG4gIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcclxuICAvKiogbGFzdCBuYW1lICovXHJcbiAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgLyoqIHdoZXRoZXIgdXNlciBpcyBibG9ja2VkICovXHJcbiAgcHVibGljIGJsb2NrZWQ6IGJvb2xlYW47XHJcbiAgLyoqIHdoZXRoZXIgdXNlciBpcyBhZG1pbmlzdHJhdG9yICovXHJcbiAgcHVibGljIGFkbWluaXN0cmF0b3I6IGJvb2xlYW47XHJcbiAgLyoqIHVzZXIgcG9zaXRpb25zICovXHJcbiAgcHVibGljIHBvc2l0aW9uczogVXNlclBvc2l0aW9uW107XHJcbiAgLyoqIHVzZXIgcGVybWlzc2lvbnMgKi9cclxuICBwdWJsaWMgcGVybWlzc2lvbnM6IFVzZXJDb25maWd1cmF0aW9uW107XHJcbn1cclxuIiwiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQge0V4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXJJbnRlcmZhY2V9IGZyb20gJy4vZXh0ZXJuYWwtY29uZmlndXJhdGlvbi5oYW5kbGVyJztcclxuaW1wb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb259IGZyb20gJy4vRXh0ZXJuYWxDb25maWd1cmF0aW9uJztcclxuXHJcblxyXG4vKiogRXh0ZXJuYWxTZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsU2VydmljZSB7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdFeHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlJykgcHJpdmF0ZSBleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlOiBFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlKSB7XHJcbiAgICAgICAgUmVzb3VyY2VIZWxwZXIuc2V0UHJveHlVcmkoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRQcm94eVVyaSgpKTtcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRSb290VXJpKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UuZ2V0Um9vdFVyaSgpKTtcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRIdHRwKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UuZ2V0SHR0cCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdXBkYXRlIEV4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXIgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2U6IEV4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXJJbnRlcmZhY2UpIHtcclxuXHR0aGlzLmV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UgPSBleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlO1xyXG5cclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRQcm94eVVyaShleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldFByb3h5VXJpKCkpO1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLnNldFJvb3RVcmkoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRSb290VXJpKCkpO1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLnNldEh0dHAoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRIdHRwKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgRXh0ZXJuYWxDb25maWd1cmF0aW9uICovXHJcbiAgICBwdWJsaWMgZ2V0RXh0ZXJuYWxDb25maWd1cmF0aW9uKCk6IEV4dGVybmFsQ29uZmlndXJhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRFeHRlcm5hbENvbmZpZ3VyYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHByb3h5IFVSTCAqL1xyXG4gICAgcHVibGljIGdldFByb3h5VXJpKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRQcm94eVVyaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgUm9vdCBVUkkgKi9cclxuICAgIHB1YmxpYyBnZXRSb290VXJpKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRSb290VXJpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBVUkwgKi9cclxuICAgIHB1YmxpYyBnZXRVUkwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0VVJMKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBIdHRwQ2xpZW50ICovXHJcbiAgICBwdWJsaWMgZ2V0SHR0cCgpOiBIdHRwQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQge3Rocm93RXJyb3IgYXMgb2JzZXJ2YWJsZVRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7UmVzb3VyY2VIZWxwZXJ9IGZyb20gJy4vcmVzb3VyY2UtaGVscGVyJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwUGFyYW1zLCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHtTb3J0fSBmcm9tICcuL3NvcnQnO1xyXG5pbXBvcnQge1Jlc291cmNlQXJyYXl9IGZyb20gJy4vcmVzb3VyY2UtYXJyYXknO1xyXG5pbXBvcnQge0V4dGVybmFsU2VydmljZX0gZnJvbSAnLi9leHRlcm5hbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtIYWxPcHRpb25zfSBmcm9tICcuL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7U3ViVHlwZUJ1aWxkZXJ9IGZyb20gJy4vc3VidHlwZS1idWlsZGVyJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xyXG5cclxuLyoqIFJlc291cmNlU2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlcnZpY2Uge1xyXG5cclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZXJuYWxTZXJ2aWNlOiBFeHRlcm5hbFNlcnZpY2UpIHt9XHJcblxyXG5cclxuICAgIC8qKiBnZXQgVVJMICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRVUkwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0VVJMKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBhbGwgcmVzb3VyY2VzIGZyb20gYSBiYXNlIFVSSSBvZiBhIGdpdmVuIHR5cGUgKi9cclxuICAgIHB1YmxpYyBnZXRBbGw8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlc291cmNlOiBzdHJpbmcsIF9lbWJlZGRlZDogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucywgc3ViVHlwZT86IFN1YlR5cGVCdWlsZGVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCc/cHJvamVjdGlvbj12aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KF9lbWJlZGRlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJscyhyZXN1bHQpO1xyXG4gICAgICAgIHJlc3VsdC5zb3J0SW5mbyA9IG9wdGlvbnMgPyBvcHRpb25zLnNvcnQgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIHBhcmFtczogcGFyYW1zfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzcG9uc2UgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZUNvbGxlY3Rpb24odHlwZSwgcmVzcG9uc2UsIHJlc3VsdCwgc3ViVHlwZSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGZyb20gYSBiYXNlIFVSSSBhbmQgYSBnaXZlbiBpZCAqL1xyXG4gICAgcHVibGljIGdldDxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzb3VyY2U6IHN0cmluZywgaWQ6IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2UpLmNvbmNhdCgnLycsIGlkLCAnP3Byb2plY3Rpb249dmlldycpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogVCA9IG5ldyB0eXBlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChkYXRhID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UocmVzdWx0LCBkYXRhKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgZnJvbSBpdHMgc2VsZmxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVNlbGZMaW5rPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCByZXNvdXJjZUxpbms6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogVCA9IG5ldyB0eXBlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KFJlc291cmNlSGVscGVyLmdldFByb3h5KHJlc291cmNlTGluayksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoZGF0YSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgZGF0YSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2VhcmNoIHJlc291cmNlcyBmcm9tIGEgZ2l2ZW4gYmFzZSBwYXRoLCBxdWVyeSBhbmQgb3B0aW9ucyAqL1xyXG4gICAgcHVibGljIHNlYXJjaDxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcXVlcnk6IHN0cmluZywgcmVzb3VyY2U6IHN0cmluZywgX2VtYmVkZGVkOiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvc2VhcmNoLycsIHF1ZXJ5KTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBSZXNvdXJjZUhlbHBlci5vcHRpb25QYXJhbXMobmV3IEh0dHBQYXJhbXMoKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNvdXJjZUFycmF5PFQ+ID0gUmVzb3VyY2VIZWxwZXIuY3JlYXRlRW1wdHlSZXN1bHQ8VD4oX2VtYmVkZGVkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIHBhcmFtczogcGFyYW1zfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzcG9uc2UgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZUNvbGxlY3Rpb24odHlwZSwgcmVzcG9uc2UsIHJlc3VsdCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2VhcmNoIGEgc2luZ2xlIHJlc291cmNlIGZyb20gYSBnaXZlbiBiYXNlIHBhdGgsIHF1ZXJ5IGFuZCBvcHRpb25zICovXHJcbiAgICBwdWJsaWMgc2VhcmNoU2luZ2xlPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCBxdWVyeTogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2UpLmNvbmNhdCgnL3NlYXJjaC8nLCBxdWVyeSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogVCA9IG5ldyB0eXBlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIHBhcmFtczogcGFyYW1zfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzcG9uc2UgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShyZXN1bHQsIHJlc3BvbnNlKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggcmVzb3VyY2VzIGZyb20gYSBnaXZlbiBiYXNlIHBhdGgsIGN1c3RvbSBxdWVyeSBhbmQgb3B0aW9ucyAqL1xyXG4gICAgcHVibGljIGN1c3RvbVF1ZXJ5PFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCBxdWVyeTogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nLCBfZW1iZWRkZWQ6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLmdldFJlc291cmNlVXJsKHJlc291cmNlICsgcXVlcnkpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFJlc291cmNlSGVscGVyLm9wdGlvblBhcmFtcyhuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgcGFyYW1zOiBwYXJhbXN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChyZXNwb25zZSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbih0eXBlLCByZXNwb25zZSwgcmVzdWx0KSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgZ2l2ZW4gYSByZWxhdGlvbiBsaW5rICovXHJcbiAgICBwdWJsaWMgZ2V0QnlSZWxhdGlvbjxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzb3VyY2VMaW5rOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQocmVzb3VyY2VMaW5rLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKGRhdGEgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShyZXN1bHQsIGRhdGEpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBnaXZlbiBhIHJlbGF0aW9uIGxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVJlbGF0aW9uQXJyYXk8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlc291cmNlTGluazogc3RyaW5nLCBfZW1iZWRkZWQ6IHN0cmluZywgYnVpbGRlcj86IFN1YlR5cGVCdWlsZGVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNvdXJjZUFycmF5PFQ+ID0gUmVzb3VyY2VIZWxwZXIuY3JlYXRlRW1wdHlSZXN1bHQ8VD4oX2VtYmVkZGVkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHJlc291cmNlTGluaywge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChyZXNwb25zZSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbih0eXBlLCByZXNwb25zZSwgcmVzdWx0LCBidWlsZGVyKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjb3VudCByZXNvdXJjZXMgZ2l2ZW4gYSBwYXRoICovXHJcbiAgICBwdWJsaWMgY291bnQocmVzb3VyY2U6IHN0cmluZyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvc2VhcmNoL2NvdW50QWxsJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIG9ic2VydmU6ICdib2R5J30pLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiBOdW1iZXIocmVzcG9uc2UuYm9keSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlIHJlc291cmNlIGZyb20gc2VsZiBsaW5rIGFuZCBlbnRpdHkgZGF0YSovXHJcbiAgICBwdWJsaWMgY3JlYXRlPFQgZXh0ZW5kcyBSZXNvdXJjZT4oc2VsZlJlc291cmNlOiBzdHJpbmcsIGVudGl0eTogVCkge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFVSTCgpICsgc2VsZlJlc291cmNlO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBSZXNvdXJjZUhlbHBlci5yZXNvbHZlUmVsYXRpb25zKGVudGl0eSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKGVudGl0eSk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkucG9zdCh1cmksIHBheWxvYWQsIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPD0gMjA3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UoZW50aXR5LCByZXNwb25zZS5ib2R5KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoYm9keS5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdXBkYXRlIHJlc291cmNlIGZyb20gYSBnaXZlbiBlbnRpdHkgZGF0YSovXHJcbiAgICBwdWJsaWMgdXBkYXRlPFQgZXh0ZW5kcyBSZXNvdXJjZT4oZW50aXR5OiBUKSB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkoZW50aXR5Ll9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBSZXNvdXJjZUhlbHBlci5yZXNvbHZlUmVsYXRpb25zKGVudGl0eSk7XHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UoZW50aXR5KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wdXQodXJpLCBwYXlsb2FkLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDw9IDIwNylcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKGVudGl0eSwgcmVzcG9uc2UuYm9keSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA1MDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBib2R5OiBhbnkgPSByZXNwb25zZS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGJvZHkuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHBhdGNoIHJlc291cmNlIGZyb20gYSBnaXZlbiBlbnRpdHkgZGF0YSovXHJcbiAgICBwdWJsaWMgcGF0Y2g8VCBleHRlbmRzIFJlc291cmNlPihlbnRpdHk6IFQpIHtcclxuICAgICAgICBjb25zdCB1cmkgPSBSZXNvdXJjZUhlbHBlci5nZXRQcm94eShlbnRpdHkuX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFJlc291cmNlSGVscGVyLnJlc29sdmVSZWxhdGlvbnMoZW50aXR5KTtcclxuICAgICAgICB0aGlzLnNldFVybHNSZXNvdXJjZShlbnRpdHkpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnBhdGNoKHVyaSwgcGF5bG9hZCwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8PSAyMDcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShlbnRpdHksIHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keTogYW55ID0gcmVzcG9uc2UuYm9keTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihib2R5LmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBkZWxldGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBkZWxldGU8VCBleHRlbmRzIFJlc291cmNlPihlbnRpdHk6IFQpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFByb3h5KGVudGl0eS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZSh1cmksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIG5leHQgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNOZXh0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lm5leHRfdXJpICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogd2hldGhlciBhIHJlc291cmNlIGFycmF5IGhhcyBwcmV2aW91cyBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGhhc1ByZXY8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucHJldl91cmkgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgaGFzRmlyc3Q8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuZmlyc3RfdXJpICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogd2hldGhlciBhIHJlc291cmNlIGFycmF5IGhhcyBsYXN0IHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgaGFzTGFzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5sYXN0X3VyaSAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBuZXh0IHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgbmV4dDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lm5leHQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBwcmV2aW91cyBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIHByZXY8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+LCB0eXBlOiB7IG5ldygpOiBUIH0pOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5wcmV2KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBmaXJzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LmZpcnN0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgbGFzdCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGxhc3Q8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+LCB0eXBlOiB7IG5ldygpOiBUIH0pOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5sYXN0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgcGFnZSBvZiByZXN1bHRzIGdpdmVuIGEgcGFnZSBudW1iZXIqL1xyXG4gICAgcHVibGljIHBhZ2U8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+LCB0eXBlOiB7IG5ldygpOiBUIH0sIGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5wYWdlKHR5cGUsIGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc29ydCByZXNvdXJjZSBhcnJheSB3aXRoIGEgZ2l2ZW4gc29ydGluZyBwYXJhbXMgKi9cclxuICAgIHB1YmxpYyBzb3J0RWxlbWVudHM8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+LCB0eXBlOiB7IG5ldygpOiBUIH0sIC4uLnNvcnQ6IFNvcnRbXSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnNvcnRFbGVtZW50cyh0eXBlLCAuLi5zb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IHNpemUqL1xyXG4gICAgcHVibGljIHNpemU8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+LCB0eXBlOiB7IG5ldygpOiBUIH0sIHNpemU6IG51bWJlcik6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnNpemUodHlwZSwgc2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBVUkwgZnJvbSBhIGdpdmVuIHBhdGgqL1xyXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChyZXNvdXJjZT86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVybCA9IFJlc291cmNlU2VydmljZS5nZXRVUkwoKTtcclxuICAgICAgICBpZiAoIXVybC5lbmRzV2l0aCgnLycpKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQoJy8nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc291cmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmwuY29uY2F0KHJlc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0IHByb3h5IGFuZCByb290IHVybHMgb2YgZ2l2ZW4gcmVzb3VyY2UgYXJyYXkgKi9cclxuICAgIHByaXZhdGUgc2V0VXJsczxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPikge1xyXG4gICAgICAgIHJlc3VsdC5wcm94eVVybCA9IHRoaXMuZXh0ZXJuYWxTZXJ2aWNlLmdldFByb3h5VXJpKCk7XHJcbiAgICAgICAgcmVzdWx0LnJvb3RVcmwgPSB0aGlzLmV4dGVybmFsU2VydmljZS5nZXRSb290VXJpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBwcm94eSBhbmQgcm9vdCB1cmxzIG9mIGdpdmVuIHJlc291cmNlICovXHJcbiAgICBwcml2YXRlIHNldFVybHNSZXNvdXJjZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc3VsdDogVCkge1xyXG4gICAgICAgIHJlc3VsdC5wcm94eVVybCA9IHRoaXMuZXh0ZXJuYWxTZXJ2aWNlLmdldFByb3h5VXJpKCk7XHJcbiAgICAgICAgcmVzdWx0LnJvb3RVcmwgPSB0aGlzLmV4dGVybmFsU2VydmljZS5nZXRSb290VXJpKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtvZiBhcyBvYnNlcnZhYmxlT2YsIHRocm93RXJyb3IgYXMgb2JzZXJ2YWJsZVRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgbWVyZ2VNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7UmVzb3VyY2VBcnJheX0gZnJvbSAnLi9yZXNvdXJjZS1hcnJheSc7XHJcbmltcG9ydCB7U29ydH0gZnJvbSAnLi9zb3J0JztcclxuaW1wb3J0IHtSZXNvdXJjZVNlcnZpY2V9IGZyb20gJy4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7U3ViVHlwZUJ1aWxkZXJ9IGZyb20gJy4vc3VidHlwZS1idWlsZGVyJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8qKiBIQUwgcGFyYW0gZGF0YSBtb2RlbCAqL1xyXG5leHBvcnQgdHlwZSBIYWxQYXJhbSA9IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIH07XHJcbi8qKiBIQUwgb3B0aW9uIGRhdGEgbW9kZWwgKi9cclxuZXhwb3J0IHR5cGUgSGFsT3B0aW9ucyA9IHsgbm90UGFnZWQ/OiBib29sZWFuLCBzaXplPzogbnVtYmVyLCBzb3J0PzogU29ydFtdLCBwYXJhbXM/OiBIYWxQYXJhbVtdIH07XHJcblxyXG4vKiogUkVTVCBBUEkgYWNjZXNzIGludGVyZmFjZSAqL1xyXG5leHBvcnQgY2xhc3MgUmVzdFNlcnZpY2U8VCBleHRlbmRzIFJlc291cmNlPiB7XHJcbiAgICAvKiogcmVzb3VyY2UgdHlwZSAqL1xyXG4gICAgcHJpdmF0ZSB0eXBlOiBhbnk7XHJcbiAgICAvKiogcmVzb3VyY2UgcGF0aCAqL1xyXG4gICAgcHJpdmF0ZSByZXNvdXJjZTogc3RyaW5nO1xyXG4gICAgLyoqIHJlc291cmNlIGFycmF5ICovXHJcbiAgICBwdWJsaWMgcmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPjtcclxuICAgIC8qKiByZXNvdXJjZSBzZXJ2aWNlICovXHJcbiAgICBwcml2YXRlIHJlc291cmNlU2VydmljZTogUmVzb3VyY2VTZXJ2aWNlO1xyXG4gICAgLyoqIF9lbWJlZGRlZCBmaWVsZCBuYW1lICovXHJcbiAgICBwcml2YXRlIF9lbWJlZGRlZDogc3RyaW5nID0gJ19lbWJlZGRlZCc7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiB7IG5ldygpOiBUIH0sXHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBfZW1iZWRkZWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2UgPSByZXNvdXJjZTtcclxuICAgICAgICB0aGlzLnJlc291cmNlU2VydmljZSA9IGluamVjdG9yLmdldChSZXNvdXJjZVNlcnZpY2UpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoX2VtYmVkZGVkKSlcclxuICAgICAgICAgICAgdGhpcy5fZW1iZWRkZWQgPSBfZW1iZWRkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGVycm9yIGhhbmRsZXIgKi9cclxuICAgIHByb3RlY3RlZCBoYW5kbGVFcnJvcihlcnJvcjogYW55KTpPYnNlcnZhYmxlPG5ldmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIFJlc3RTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZXJyb3IgaGFuZGxlciAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBoYW5kbGVFcnJvcihlcnJvcjogYW55KTpPYnNlcnZhYmxlPG5ldmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IGFsbCByZXNvdXJjZXMgd2l0aCBvcHRpb25hbCBvcHRpb25zIGFuIHN1YlR5cGUgcGFyYW1zICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsKG9wdGlvbnM/OiBIYWxPcHRpb25zLCBzdWJUeXBlPzogU3ViVHlwZUJ1aWxkZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXRBbGwodGhpcy50eXBlLCB0aGlzLnJlc291cmNlLCB0aGlzLl9lbWJlZGRlZCwgb3B0aW9ucywgc3ViVHlwZSkucGlwZShcclxuICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubm90UGFnZWQgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHJlc291cmNlQXJyYXkuZmlyc3RfdXJpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubm90UGFnZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpemUgPSByZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gaWQgKi9cclxuICAgIHB1YmxpYyBnZXQoaWQ6IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXQodGhpcy50eXBlLCB0aGlzLnJlc291cmNlLCBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIHNlbGYgbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5U2VsZkxpbmsoc2VsZkxpbms6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXRCeVNlbGZMaW5rKHRoaXMudHlwZSwgc2VsZkxpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggcmVzb3VyY2VzIGZyb20gYSBnaXZlbiBxdWVyeSBzdHJpbmcgYW5kIG9wdGlvbmFsIG9wdGlvbnMgcGFyYW1zICovXHJcbiAgICBwdWJsaWMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2Uuc2VhcmNoKHRoaXMudHlwZSwgcXVlcnksIHRoaXMucmVzb3VyY2UsIHRoaXMuX2VtYmVkZGVkLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBtZXJnZU1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub3RQYWdlZCAmJiAhaXNOdWxsT3JVbmRlZmluZWQocmVzb3VyY2VBcnJheS5maXJzdF91cmkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5ub3RQYWdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2l6ZSA9IHJlc291cmNlQXJyYXkudG90YWxFbGVtZW50cztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2gocXVlcnksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gcXVlcnkgc3RyaW5nIGFuZCBvcHRpb25hbCBvcHRpb25zIHBhcmFtcyAqL1xyXG4gICAgcHVibGljIHNlYXJjaFNpbmdsZShxdWVyeTogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5zZWFyY2hTaW5nbGUodGhpcy50eXBlLCBxdWVyeSwgdGhpcy5yZXNvdXJjZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIGN1c3RvbSBxdWVyeSBzdHJpbmcgYW5kIG9wdGlvbmFsIG9wdGlvbnMgcGFyYW1zICovXHJcbiAgICBwdWJsaWMgY3VzdG9tUXVlcnkocXVlcnk6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5jdXN0b21RdWVyeSh0aGlzLnR5cGUsIHF1ZXJ5LCB0aGlzLnJlc291cmNlLCB0aGlzLl9lbWJlZGRlZCwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubm90UGFnZWQgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHJlc291cmNlQXJyYXkuZmlyc3RfdXJpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubm90UGFnZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpemUgPSByZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnkocXVlcnksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgZ2l2ZW4gYSByZWxhdGlvbiBsaW5rICovXHJcbiAgICBwdWJsaWMgZ2V0QnlSZWxhdGlvbkFycmF5KHJlbGF0aW9uOiBzdHJpbmcsIGJ1aWxkZXI/OiBTdWJUeXBlQnVpbGRlcik6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldEJ5UmVsYXRpb25BcnJheSh0aGlzLnR5cGUsIHJlbGF0aW9uLCB0aGlzLl9lbWJlZGRlZCwgYnVpbGRlcikucGlwZShcclxuICAgICAgICAgICAgbWFwKChyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBnaXZlbiBhIHJlbGF0aW9uIGxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVJlbGF0aW9uKHJlbGF0aW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0QnlSZWxhdGlvbih0aGlzLnR5cGUsIHJlbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY291bnQgcmVzb3VyY2VzIGdpdmVuIGEgcGF0aCAqL1xyXG4gICAgcHVibGljIGNvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmNvdW50KHRoaXMucmVzb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGUgcmVzb3VyY2UgZnJvbSBzZWxmIGxpbmsgYW5kIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBjcmVhdGUoZW50aXR5OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmNyZWF0ZSh0aGlzLnJlc291cmNlLCBlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB1cGRhdGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoZW50aXR5OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLnVwZGF0ZShlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBwYXRjaCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gZW50aXR5IGRhdGEqL1xyXG4gICAgcHVibGljIHBhdGNoKGVudGl0eTogVCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5wYXRjaChlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBkZWxldGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBkZWxldGUoZW50aXR5OiBUKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuZGVsZXRlKGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCB0b3RhbCBudW1iZXIgb2YgZWxlbWVudHMgb2YgcmVzb3VyY2UgYXJyYXkgKi9cclxuICAgIHB1YmxpYyB0b3RhbEVsZW1lbnQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5ICYmIHRoaXMucmVzb3VyY2VBcnJheS50b3RhbEVsZW1lbnRzKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNGaXJzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuaGFzRmlyc3QodGhpcy5yZXNvdXJjZUFycmF5KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGhhc05leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzb3VyY2VBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmhhc05leHQodGhpcy5yZXNvdXJjZUFycmF5KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgcHJldmlvdXMgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNQcmV2KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5oYXNQcmV2KHRoaXMucmVzb3VyY2VBcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIGxhc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNMYXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5oYXNMYXN0KHRoaXMucmVzb3VyY2VBcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIG5leHQoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UubmV4dCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VBcnJheSA9IHJlc291cmNlQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlc291cmNlQXJyYXkgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgcHJldigpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5wcmV2KHRoaXMucmVzb3VyY2VBcnJheSwgdGhpcy50eXBlKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKChyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUFycmF5ID0gcmVzb3VyY2VBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBmaXJzdCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5maXJzdCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSlcclxuICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgbGFzdCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGxhc3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UubGFzdCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSlcclxuICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgcGFnZSBvZiByZXN1bHRzIGdpdmVuIGEgcGFnZSBudW1iZXIqL1xyXG4gICAgcHVibGljIHBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UucGFnZSh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSwgcGFnZU51bWJlcikucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VBcnJheSA9IHJlc291cmNlQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlc291cmNlQXJyYXkgZm91bmQnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlci91c2VyLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQWNjb3VudCBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQWNjb3VudFNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxVc2VyPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBQ0NPVU5UX0FQSSA9IHRoaXMuQVBJICsgJy9hY2NvdW50JztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlciwgXCJhY2NvdW50XCIsIGluamVjdG9yKTtcclxuICB9XHJcblxyXG4gIC8qKiBnZXQgbG9nZ2VkIGluIHVzZXIgYWNjb3VudCovXHJcbiAgZ2V0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICByZXN1bHQgPSB0aGlzLmh0dHAuZ2V0KHRoaXMuQUNDT1VOVF9BUEkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgYWNjb3VudCovXHJcbiAgc2F2ZShpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5BQ0NPVU5UX0FQSSAsIGl0ZW0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKiogY2hhbmdlIGxvZ2dlZCBpbiB1c2VyIGFjY291bnQqLyAgXHJcbiAgY2hhbmdlUGFzc3dvcmQoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQUNDT1VOVF9BUEkrXCIvY2hhbmdlLXBhc3N3b3JkXCIgLCBpdGVtKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcy1jb21wYXQnO1xyXG4vL2ltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuLyoqIEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgICBcclxuICAgIC8qKiBBUEkgYmFzZSBVUkwgKi9cclxuICAgIHB1YmxpYyBTRVJWRVJfQVBJX1VSTCA9ICcvYXBpJztcclxuICAgIFxyXG4gICAgLyoqIGNvbnN0cnVjdG9yKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFxyXG4gICAgKSB7fVxyXG4gICAgXHJcbiAgICAvKiogZ2V0IGN1cnJlbnQgdXNlciBqd3QgdG9rZW4gZnJvbSBzZXNzaW9uIHN0b3JhZ2UqL1xyXG4gICAgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhdXRoZW50aWNhdGlvblRva2VuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGxvZ2luIG9wZXJhdGlvbiAqL1xyXG4gICAgbG9naW4oY3JlZGVudGlhbHMpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogY3JlZGVudGlhbHMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuU0VSVkVSX0FQSV9VUkwgKyAnL2F1dGhlbnRpY2F0ZScsIGRhdGEsIHtvYnNlcnZlIDogJ3Jlc3BvbnNlJ30pLm1hcChhdXRoZW50aWNhdGVTdWNjZXNzLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGVTdWNjZXNzKHJlc3ApIHtcclxuICAgICAgICAgICAgY29uc3QgYmVhcmVyVG9rZW4gPSByZXNwLmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJyk7XHJcbiAgICAgICAgICAgIGlmIChiZWFyZXJUb2tlbiAmJiBiZWFyZXJUb2tlbi5zbGljZSgwLCA3KSA9PT0gJ0JlYXJlciAnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqd3QgPSBiZWFyZXJUb2tlbi5zbGljZSg3LCBiZWFyZXJUb2tlbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZUF1dGhlbnRpY2F0aW9uVG9rZW4oand0KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgZXhwaXJlc0F0ID0gbW9tZW50KCkuYWRkKCByZXNwLmhlYWRlcnMuZ2V0KCdUb2tlbi1WYWxpZGl0eScpLCdtaWxpc2Vjb25kJyk7XHJcbiAgICAgICAgICAgICAgICAvL3Nlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2V4cGlyZXNfYXQnLCBKU09OLnN0cmluZ2lmeShleHBpcmVzQXQudmFsdWVPZigpKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gand0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIGxvZ2luIG9wZXJhdGlvbiB3aXRoIGp3dCB0b2tlbiAqL1xyXG4gICAgbG9naW5XaXRoVG9rZW4oand0KSB7XHJcbiAgICAgICAgaWYgKGp3dCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlQXV0aGVudGljYXRpb25Ub2tlbihqd3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGp3dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdhdXRoLWp3dC1zZXJ2aWNlIFByb21pc2UgcmVqZWN0Jyk7IC8vIFB1dCBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlIGhlcmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHN0b3JlIGp3dCB0b2tlbiBpbiBzZXNzaW9uIHN0b3JhZ2UqL1xyXG4gICAgc3RvcmVBdXRoZW50aWNhdGlvblRva2VuKGp3dCkge1xyXG4gICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnYXV0aGVudGljYXRpb25Ub2tlbicsIGp3dCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBpcyBsb2dnZWQgaW4qL1xyXG4gICAgcHVibGljIGlzTG9nZ2VkSW4oKSB7XHJcbiAgICAgICAgLy9yZXR1cm4gbW9tZW50KCkuaXNCZWZvcmUodGhpcy5nZXRFeHBpcmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBpcyBsb2dnZWQgb3V0Ki9cclxuICAgIGlzTG9nZ2VkT3V0KCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc0xvZ2dlZEluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGxvZ291dCBvcGVyYXRpb24gKi9cclxuICAgIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGhlbnRpY2F0aW9uVG9rZW4nKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnYXV0aGVudGljYXRpb25Ub2tlbicpO1xyXG4gICAgICAgICAgICAvL3Nlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2V4cGlyZXNfYXQnKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqIEludGVyY2VwdG9yIGZvciBhdXRoZW50aWNhdGlvbiB0b2tlbiBpbiBBUEkgcmVxdWVzdHMgKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgICAvKiogQVBJIGJhc2UgcGF0aCovXHJcbiAgICBwdWJsaWMgU0VSVkVSX0FQSV9VUkwgPSAnL2FwaSc7XHJcbiAgICBwdWJsaWMgVEVTVF9TRVJWRVJfQVBJX1VSTCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpJztcclxuICAgIC8qKiBjb25zdHJ1Y3RvciovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogcmVxdWVzdCBoYW5kbGVyICovXHJcbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8ICFyZXF1ZXN0LnVybCB8fCAhKHJlcXVlc3QudXJsLmluY2x1ZGVzKFwiYXBpXCIpKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2F1dGhlbnRpY2F0aW9uVG9rZW4nKTtcclxuICAgICAgICBpZiAoISF0b2tlbikge1xyXG4gICAgICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XHJcbiAgICAgICAgICAgICAgICBzZXRIZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgdG9rZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xyXG5cclxuLyoqIFByaW5jaXBhbCBzZXJ2aWNlKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJpbmNpcGFsIHtcclxuICAgIHByaXZhdGUgdXNlcklkZW50aXR5OiBhbnk7XHJcbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYXV0aGVudGljYXRpb25TdGF0ZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgYWNjb3VudDogQWNjb3VudFNlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgICAvKiogYXV0aGVudGljYXRlIHdpdGggZ2l2ZW4gaWRlbnRpdHkqL1xyXG4gICAgYXV0aGVudGljYXRlKGlkZW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBpZGVudGl0eTtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBpZGVudGl0eSAhPT0gbnVsbDtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU3RhdGUubmV4dCh0aGlzLnVzZXJJZGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzICovXHJcbiAgICBoYXNBbnlBdXRob3JpdHkoYXV0aG9yaXRpZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmhhc0FueUF1dGhvcml0eURpcmVjdChhdXRob3JpdGllcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBoYXMgYW55IG9mIHRoZSBnaXZlbiBhdXRob3JpdGllcyBvbiB0aGUgZ2l2ZW4gdGVycml0b3J5ICovXHJcbiAgICBoYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeShhdXRob3JpdGllczogc3RyaW5nW10sdGVycml0b3J5OiBzdHJpbmcgKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmhhc0FueUF1dGhvcml0eURpcmVjdE9uVGVycml0b3J5KGF1dGhvcml0aWVzLHRlcnJpdG9yeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBoYXMgYW55IG9mIHRoZSBnaXZlbiBhdXRob3JpdGllcyB3aXRob3V0IHJlc29sdmluZyBwcm9taXNlcyovXHJcbiAgICBoYXNBbnlBdXRob3JpdHlEaXJlY3QoYXV0aG9yaXRpZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0ZWQgfHwgIXRoaXMudXNlcklkZW50aXR5IHx8ICF0aGlzLnVzZXJJZGVudGl0eS5hdXRob3JpdGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF1dGhvcml0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJZGVudGl0eS5hdXRob3JpdGllcy5pbmNsdWRlcyhhdXRob3JpdGllc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzIG9uIHRoZSBnaXZlbiB0ZXJyaXRvcnkgd2l0aG91dCByZXNvbHZpbmcgcHJvbWlzZXMgKi9cclxuICAgIGhhc0FueUF1dGhvcml0eURpcmVjdE9uVGVycml0b3J5KGF1dGhvcml0aWVzOiBzdHJpbmdbXSx0ZXJyaXRvcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGVkIHx8ICF0aGlzLnVzZXJJZGVudGl0eSB8fCAhdGhpcy51c2VySWRlbnRpdHkuYXV0aG9yaXRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXRob3JpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlcklkZW50aXR5LmF1dGhvcml0aWVzUGVyVGVycml0b3J5W3RlcnJpdG9yeV0gJiYgdGhpcy51c2VySWRlbnRpdHkuYXV0aG9yaXRpZXNQZXJUZXJyaXRvcnlbdGVycml0b3J5XS5pbmNsdWRlcyhhdXRob3JpdGllc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyB0aGUgZ2l2ZW4gYXV0aG9yaXR5ICovXHJcbiAgICBoYXNBdXRob3JpdHkoYXV0aG9yaXR5OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS50aGVuKChpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkLmF1dGhvcml0aWVzICYmIGlkLmF1dGhvcml0aWVzLmluY2x1ZGVzKGF1dGhvcml0eSkpO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyB0aGUgZ2l2ZW4gYXV0aG9yaXR5IG9uIHRoZSBnaXZlbiB0ZXJyaXRvcnkqL1xyXG4gICAgaGFzQXV0aG9yaXR5T25UZXJyaXRvcnkoYXV0aG9yaXR5OiBzdHJpbmcsdGVycml0b3J5OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS50aGVuKChpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkLmF1dGhvcml0aWVzUGVyVGVycml0b3J5ICYmIGlkLmF1dGhvcml0aWVzUGVyVGVycml0b3J5W3RlcnJpdG9yeV0gJiYgaWQuYXV0aG9yaXRpZXNQZXJUZXJyaXRvcnlbdGVycml0b3J5XS5pbmNsdWRlcyhhdXRob3JpdHkpKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB1c2VyIGlkZW50aXR5Ki9cclxuICAgIGlkZW50aXR5KGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkZW50aXR5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgYW5kIHNlZSBpZiB3ZSBoYXZlIHJldHJpZXZlZCB0aGUgdXNlcklkZW50aXR5IGRhdGEgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vIGlmIHdlIGhhdmUsIHJldXNlIGl0IGJ5IGltbWVkaWF0ZWx5IHJlc29sdmluZ1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJZGVudGl0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMudXNlcklkZW50aXR5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB1c2VySWRlbnRpdHkgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIsIHVwZGF0ZSB0aGUgaWRlbnRpdHkgb2JqZWN0LCBhbmQgdGhlbiByZXNvbHZlLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFjY291bnQuZ2V0KCkudG9Qcm9taXNlKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWNjb3VudCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICBpZiAoYWNjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcklkZW50aXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TdGF0ZS5uZXh0KHRoaXMudXNlcklkZW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcklkZW50aXR5O1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblN0YXRlLm5leHQodGhpcy51c2VySWRlbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2hlY2sgd2hldGhlciBjdXJyZW50IHVzZXIgaXMgYXV0aGVudGljYXRlZCAqL1xyXG4gICAgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGlkZW50aXR5IGlzIHJlc29sdmVkICovXHJcbiAgICBpc0lkZW50aXR5UmVzb2x2ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcklkZW50aXR5ICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBjdXJyZW50IHVzZXIgYXV0aGVudGljYXRpb24gc3RhdGUgKi9cclxuICAgIGdldEF1dGhlbnRpY2F0aW9uU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGlvblN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0b3IsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuXHJcbi8qKiBJbnRlcmNlcHRvciBmb3IgYXV0aGVudGljYXRpb24gZXhwaXJlZCByZXNwb25zZSBpbiBBUEkgcmVxdWVzdHMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aEV4cGlyZWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIFxyXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWxcclxuICAgICkge31cclxuXHJcbiAgICAvKiogcmVxdWVzdCBoYW5kbGVyICovXHJcbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLmRvKChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHt9LCAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpLnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpbmNpcGFsLmF1dGhlbnRpY2F0ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuXHJcbi8qKiBMb2dpbiBzZXJ2aWNlKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9naW5TZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2ZXJQcm92aWRlcjogQXV0aFNlcnZpY2UsIFxyXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWxcclxuICAgICkge31cclxuXHJcbiAgICAvKipMb2dpbiBvcGVyYXRpb24qL1xyXG4gICAgbG9naW4oY3JlZGVudGlhbHMsIGNhbGxiYWNrPykge1xyXG4gICAgICAgIGNvbnN0IGNiID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoU2VydmVyUHJvdmlkZXIubG9naW4oY3JlZGVudGlhbHMpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmluY2lwYWwuaWRlbnRpdHkodHJ1ZSkudGhlbigoYWNjb3VudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHRoZSBsb2dpbiB0aGUgbGFuZ3VhZ2Ugd2lsbCBiZSBjaGFuZ2VkIHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGxhbmd1YWdlIHNlbGVjdGVkIGJ5IHRoZSB1c2VyIGR1cmluZyBoaXMgcmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ291dCgpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipsb2dpbiB3aXRoIGp3dCB0b2tlbiAqL1xyXG4gICAgbG9naW5XaXRoVG9rZW4oand0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZlclByb3ZpZGVyLmxvZ2luV2l0aFRva2VuKGp3dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGxvZ291dCBvcGVyYXRpb24gKi9cclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgIHRoaXMuYXV0aFNlcnZlclByb3ZpZGVyLmxvZ291dCgpLnN1YnNjcmliZSgpO1xyXG4gICAgICAgdGhpcy5wcmluY2lwYWwuYXV0aGVudGljYXRlKG51bGwpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKiBVc2VyIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFVzZXI+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFVTRVJfQVBJID0gdGhpcy5BUEkgKyAnL3VzZXJzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlciwgXCJ1c2Vyc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdXNlciovXHJcbiAgcmVtb3ZlKGl0ZW06IFVzZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB1c2VyKi9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5VU0VSX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgICBcclxuICAvKiogY2hhbmdlIHBhc3N3b3JkIG8gZ2l2ZW4gdXNlciBpZCAqL1xyXG4gIGNoYW5nZVBhc3N3b3JkKGlkLGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlVTRVJfQVBJK1wiL1wiK2lkK1wiL2NoYW5nZS1wYXNzd29yZFwiICwgaXRlbSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHsgVGVycml0b3J5IH0gZnJvbSAnLi4vdGVycml0b3J5L3RlcnJpdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIubW9kZWwnO1xyXG4vKipcclxuICogVXNlciBwb3NpdGlvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVzZXJQb3NpdGlvbiBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIGVtYWlsICovXHJcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XHJcbiAgLyoqIG9yZ2FuaXphdGlvbiBuYW1lKi9cclxuICBwdWJsaWMgb3JnYW5pemF0aW9uOiBzdHJpbmc7XHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG4gIC8qKiBzeXN0ZW0gZGF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGRhdGVkRGF0ZTogYW55O1xyXG4gIC8qKiBwb3NpdGlvbiB0ZXJyaXRvcnkqL1xyXG4gIHB1YmxpYyB0ZXJyaXRvcnk6IFRlcnJpdG9yeTtcclxuICAvKiogdXNlciovXHJcbiAgcHVibGljIHVzZXI6IFVzZXI7XHJcbn1cclxuIiwiaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyUG9zaXRpb24gfSBmcm9tICcuL3VzZXItcG9zaXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogVXNlciBwb3NpdGlvbiBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclBvc2l0aW9uU2VydmljZSAgZXh0ZW5kcyBSZXN0U2VydmljZTxVc2VyUG9zaXRpb24+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFVTRVJfUE9TSVRJT05fQVBJID0gdGhpcy5BUEkgKyAnL3VzZXItcG9zaXRpb25zJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlclBvc2l0aW9uLCBcInVzZXItcG9zaXRpb25zXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB1c2VyIHBvc2l0aW9uKi9cclxuICByZW1vdmUoaXRlbTogVXNlclBvc2l0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdXNlciBwb3NpdGlvbiovXHJcbiAgc2F2ZShpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgICAgaWYgKGl0ZW0udXNlciAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3VzZXInLGl0ZW0udXNlcikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW0udGVycml0b3J5ICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndGVycml0b3J5JyxpdGVtLnRlcnJpdG9yeSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0udGVycml0b3J5ID0gaXRlbS50ZXJyaXRvcnkuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgaXRlbS51c2VyID0gaXRlbS51c2VyLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuVVNFUl9QT1NJVElPTl9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHsgVGVycml0b3J5IH0gZnJvbSAnLi4vdGVycml0b3J5L3RlcnJpdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIubW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIFVzZXIgcGVybWlzc2lvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVzZXJDb25maWd1cmF0aW9uIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiByb2xlICovICBcclxuICBwdWJsaWMgcm9sZTogUm9sZTtcclxuICAvKiogdGVycml0b3J5ICovIFxyXG4gIHB1YmxpYyB0ZXJyaXRvcnk6IFRlcnJpdG9yeTtcclxuICAvKiogdXNlciAqL1xyXG4gIHB1YmxpYyB1c2VyOiBVc2VyO1xyXG59XHJcbiIsImltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL3VzZXItY29uZmlndXJhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKiBVc2VyIGNvbmZpZ3VyYXRpb24gbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJDb25maWd1cmF0aW9uU2VydmljZSAgZXh0ZW5kcyBSZXN0U2VydmljZTxVc2VyQ29uZmlndXJhdGlvbj4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVVNFUl9DT05GSUdVUkFUSU9OX0FQSSA9IHRoaXMuQVBJICsgJy91c2VyLWNvbmZpZ3VyYXRpb25zJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlckNvbmZpZ3VyYXRpb24sIFwidXNlci1jb25maWd1cmF0aW9uc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdXNlciBjb25maWd1cmF0aW9uKi9cclxuICByZW1vdmUoaXRlbTogVXNlckNvbmZpZ3VyYXRpb24pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB1c2VyIGNvbmZpZ3VyYXRpb24qL1xyXG4gIHNhdmUoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtLnVzZXIgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd1c2VyJyxpdGVtLnVzZXIpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLnRlcnJpdG9yeSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3RlcnJpdG9yeScsaXRlbS50ZXJyaXRvcnkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLnJvbGUgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdyb2xlJyxpdGVtLnJvbGUpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnRlcnJpdG9yeSA9IGl0ZW0udGVycml0b3J5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIGl0ZW0ucm9sZSA9IGl0ZW0ucm9sZS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLnVzZXIgPSBpdGVtLnVzZXIuX2xpbmtzLnNlbGYuaHJlZjtcclxuICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5VU0VSX0NPTkZJR1VSQVRJT05fQVBJICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHsgVGVycml0b3J5VHlwZSB9IGZyb20gJy4vdGVycml0b3J5LXR5cGUubW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIFRlcnJpdG9yeSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRlcnJpdG9yeSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjsgIFxyXG4gIC8qKiBjb2RlICovXHJcbiAgcHVibGljIGNvZGU6IHN0cmluZztcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIGFkZHJlc3MqL1xyXG4gIHB1YmxpYyB0ZXJyaXRvcmlhbEF1dGhvcml0eUFkZHJlc3M6IHN0cmluZztcclxuICAvKiogYWRtaW4gKi9cclxuICBwdWJsaWMgdGVycml0b3JpYWxBdXRob3JpdHlOYW1lOiBzdHJpbmc7XHJcbiAgLyoqIHdoZXRoZXIgdGVycml0b3J5IGlzIGJsb2NrZWQqL1xyXG4gIHB1YmxpYyBibG9ja2VkOiBib29sZWFuO1xyXG4gIC8qKiBjb21tZW50cyovXHJcbiAgcHVibGljIGNvbW1lbnRzOiBzdHJpbmc7XHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG4gIC8qKiBjb250YWN0IGVtYWlsICovICBcclxuICBwdWJsaWMgdGVycml0b3JpYWxBdXRob3JpdHlFbWFpbDogc3RyaW5nO1xyXG4gIC8qKiBleHRlbnNpb24gKi9cclxuICBwdWJsaWMgZXh0ZW50OiBzdHJpbmc7XHJcbiAgLyoqIGxvZ28gaW1hZ2UgVVJMICovXHJcbiAgcHVibGljIHRlcnJpdG9yaWFsQXV0aG9yaXR5TG9nbzogc3RyaW5nO1xyXG4gIC8qKiBjb250YWN0IG9yZ2FuaXphdGlvbiBuYW1lICovXHJcbiAgLy8gcHVibGljIG9yZ2FuaXphdGlvbk5hbWU6IHN0cmluZztcclxuICAvKiogc2NvcGUqL1xyXG4gIHB1YmxpYyBzY29wZTogc3RyaW5nO1xyXG4gIC8qKiB0eXBlICovICBcclxuICBwdWJsaWMgdHlwZTogVGVycml0b3J5VHlwZTtcclxuICAvKiogZ3JvdXAgdHlwZSAqL1xyXG4gIGdyb3VwVHlwZToge1xyXG4gICAgaWQ6IDAsXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICB9O1xyXG4gIC8qKiB0ZXJyaXRvcnkgbWVtYmVycyovXHJcbiAgcHVibGljIG1lbWJlcnM6IFRlcnJpdG9yeVtdO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuL3RlcnJpdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGVycml0b3J5IG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUZXJyaXRvcnlTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGVycml0b3J5PiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBURVJSSVRPUllfQVBJID0gdGhpcy5BUEkgKyAnL3RlcnJpdG9yaWVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGVycml0b3J5LCBcInRlcnJpdG9yaWVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB0ZXJyaXRvcnkqL1xyXG4gIHJlbW92ZShpdGVtOiBUZXJyaXRvcnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0ZXJyaXRvcnkqL1xyXG4gIHNhdmUoaXRlbTogVGVycml0b3J5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLnR5cGUhPW51bGwpXHJcbiAgICAgIGl0ZW0udHlwZSA9IGl0ZW0udHlwZS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlRFUlJJVE9SWV9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRlcnJpdG9yeSB0eXBlIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGVycml0b3J5VHlwZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAgLyoqIGlkICovXHJcbiAgIHB1YmxpYyBpZDogbnVtYmVyOyAgXHJcbiAgLyoqIG5hbWUgKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IFRlcnJpdG9yeSB9IGZyb20gJy4vdGVycml0b3J5Lm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGVycml0b3J5VHlwZSB9IGZyb20gJy4vdGVycml0b3J5LXR5cGUubW9kZWwnO1xyXG5cclxuLyoqIFRlcnJpdG9yeVR5cGUgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRlcnJpdG9yeVR5cGVTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGVycml0b3J5VHlwZT4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVEVSUklUT1JZVFlQRV9BUEkgPSB0aGlzLkFQSSArICcvdGVycml0b3J5LXR5cGVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGVycml0b3J5VHlwZSwgXCJ0ZXJyaXRvcnktdHlwZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRlcnJpdG9yeSB0eXBlKi9cclxuICByZW1vdmUoaXRlbTogVGVycml0b3J5VHlwZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRlcnJpdG9yeSB0eXBlKi9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5URVJSSVRPUllUWVBFX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcblxyXG4vKipcclxuICogVGVycml0b3J5IHR5cGUgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXJyaXRvcnlHcm91cFR5cGUgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgVGVycml0b3J5R3JvdXBUeXBlIH0gZnJvbSAnLi90ZXJyaXRvcnktZ3JvdXAtdHlwZS5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGVycml0b3J5R3JvdXBUeXBlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRlcnJpdG9yeUdyb3VwVHlwZT4ge1xuICBcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cbiAgcHVibGljIEFQSSA9ICcvYXBpJztcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXG4gIHB1YmxpYyBURVJSSVRPUllHUk9VUFRZUEVfQVBJID0gdGhpcy5BUEkgKyAnL3RlcnJpdG9yeS1ncm91cC10eXBlcyc7XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcihUZXJyaXRvcnlHcm91cFR5cGUsIFwidGVycml0b3J5LWdyb3VwLXR5cGVzXCIsIGluamVjdG9yKTtcbiAgfVxuICBcbiAgLyoqIHJlbW92ZSB0ZXJyaXRvcnkqL1xuICByZW1vdmUoaXRlbTogVGVycml0b3J5R3JvdXBUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcbiAgIFxuICB9XG4gIFxuICAvKiogc2F2ZSB0ZXJyaXRvcnkqL1xuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlRFUlJJVE9SWUdST1VQVFlQRV9BUEkgLCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBcbn0iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuXHJcbi8qKlxyXG4gKiBSb2xlIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUm9sZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogY29tbWVudHMqL1xyXG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBSb2xlIH0gZnJvbSAnLi9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogUm9sZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUm9sZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxSb2xlPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBST0xFX0FQSSA9IHRoaXMuQVBJICsgJy9yb2xlcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFJvbGUsIFwicm9sZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHJvbGUqL1xyXG4gIHJlbW92ZShpdGVtOiBSb2xlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgcm9sZSovXHJcbiAgc2F2ZShpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuUk9MRV9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG4vKipcclxuICogQ29ubmVjdGlvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24gZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgLyoqIHVzZXIqL1xyXG4gIHB1YmxpYyB1c2VyOiBzdHJpbmc7XHJcbiAgLyoqIHBhc3N3b3JkKi9cclxuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcclxuICAvKiogY29ubmVjdGlvbiBzdHJpbmcqL1xyXG4gIHB1YmxpYyBjb25uZWN0aW9uU3RyaW5nOiBzdHJpbmc7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICcuL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIENvbm5lY3Rpb24gbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q29ubmVjdGlvbj4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ09OTkVDVElPTl9BUEkgPSB0aGlzLkFQSSArICcvY29ubmVjdGlvbnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihDb25uZWN0aW9uLCBcImNvbm5lY3Rpb25zXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBjb25uZWN0aW9uKi9cclxuICByZW1vdmUoaXRlbTogQ29ubmVjdGlvbikge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIGNvbm5lY3Rpb24qL1xyXG4gIHNhdmUoaXRlbTogQ29ubmVjdGlvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQ09OTkVDVElPTl9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tICcuLi9yb2xlL3JvbGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUYXNrVHlwZSB9IGZyb20gJy4vdGFzay10eXBlLm1vZGVsJztcclxuaW1wb3J0IHsgVGFza0dyb3VwIH0gZnJvbSAnLi90YXNrLWdyb3VwLm1vZGVsJztcclxuaW1wb3J0IHsgVGFza0F2YWlsYWJpbGl0eSB9IGZyb20gJy4vdGFzay1hdmFpbGFiaWxpdHkubW9kZWwnO1xyXG5pbXBvcnQgeyBUYXNrUGFyYW1ldGVyIH0gZnJvbSAnLi90YXNrLXBhcmFtZXRlci5tb2RlbCc7XHJcblxyXG4vL0ZJWE1FIGVuc3VyZSB0YXNrIGNyZWF0aW9uIGluIGFkbWluIGFwcCB1cG9uIGluaXRpYWxpemF0aW9uIChhcyBpdCBpcyBkb25lIHdpdGggUm9sZXMgYW5kIGRlZmF1bHQgVXNlcnMpXHJcbi8qKiBHRU9BRE1JTl90YXNrIGlkICovXHJcbmV4cG9ydCBjb25zdCBHRU9BRE1JTl9UUkVFX1RBU0tfSUQ6c3RyaW5nICA9IFwiZ2VvYWRtaW5cIjtcclxuXHJcbmltcG9ydCB7IFRhc2tVSSB9IGZyb20gJy4vdGFzay11aS5tb2RlbCc7XHJcbi8qKiBUYXNrIG1vZGVsICovXHJcbmV4cG9ydCBjbGFzcyBUYXNrIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gIC8qKiBuYW1lICovICBcclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIC8qKiBvcmRlciovXHJcbiAgcHVibGljIG9yZGVyOiBOdW1iZXI7XHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG4gIC8qKiB0YXNrIGdyb3VwKi9cclxuICBwdWJsaWMgZ3JvdXA6IFRhc2tHcm91cDtcclxuICAvKiogdGFzayB0eXBlKi9cclxuICBwdWJsaWMgdHlwZTogVGFza1R5cGU7XHJcbiAgLyoqIHRhc2sgVUkqL1xyXG4gIHB1YmxpYyB1aTogVGFza1VJO1xyXG4gIC8qKiBwYXJhbWV0ZXJzKi9cclxuICBwdWJsaWMgcGFyYW1ldGVyczogVGFza1BhcmFtZXRlcltdO1xyXG4gIC8qKiBjb25uZWN0aW9uKi9cclxuICBwdWJsaWMgY29ubmVjdGlvbjogQ29ubmVjdGlvbjtcclxuICAvKiogcm9sZXMqL1xyXG4gIHB1YmxpYyByb2xlczogUm9sZVtdO1xyXG4gIC8qKiBhdmFpbGFiaWxpdGllcyovXHJcbiAgcHVibGljIGF2YWlsYWJpbGl0aWVzOiBUYXNrQXZhaWxhYmlsaXR5W107XHJcbn1cclxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFzayBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGFza1NlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUYXNrPiB7XHJcblxyXG4gICAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICAgIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICAgIHB1YmxpYyBDT05ORUNUSU9OX0FQSSA9IHRoaXMuQVBJICsgJy90YXNrcyc7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHN1cGVyKFRhc2ssIFwidGFza3NcIiwgaW5qZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZW1vdmUgdGFzayovXHJcbiAgICByZW1vdmUoaXRlbTogVGFzaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBzYXZlIHRhc2sqL1xyXG4gICAgc2F2ZShpdGVtOiBUYXNrKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICAgICAgY29uc3QgdGFza1R5cGUgPSBpdGVtLnR5cGU7XHJcbiAgICAgICAgY29uc3QgdGFza0dyb3VwID0gaXRlbS5ncm91cDtcclxuICAgICAgICBsZXQgdGFza0Nvbm5lY3Rpb24gPSBpdGVtLmNvbm5lY3Rpb247XHJcbiAgICAgICAgbGV0IHRhc2tVSSA9IGl0ZW0udWk7XHJcbiAgICAgICAgaWYgKGl0ZW0uX2xpbmtzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQ09OTkVDVElPTl9BUEksIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuLyoqXHJcbiAqIFRhc2sgdHlwZSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhc2tUeXBlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi8gIFxyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRhc2tUeXBlIH0gZnJvbSAnLi90YXNrLXR5cGUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRhc2tUeXBlIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUYXNrVHlwZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUYXNrVHlwZT4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ09OTkVDVElPTl9BUEkgPSB0aGlzLkFQSSArICcvdGFzay10eXBlcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRhc2tUeXBlLCBcInRhc2stdHlwZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRhc2sgdHlwZSovXHJcbiAgcmVtb3ZlKGl0ZW06IFRhc2tUeXBlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdGFzayB0eXBlKi9cclxuICBzYXZlKGl0ZW06IFRhc2tUeXBlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5DT05ORUNUSU9OX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbi8qKlxyXG4gKiBUYXNrIGdyb3VwIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFza0dyb3VwIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi8gIFxyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRhc2tHcm91cCB9IGZyb20gJy4vdGFzay1ncm91cC5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFzayBncm91cCBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGFza0dyb3VwU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRhc2tHcm91cD4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ09OTkVDVElPTl9BUEkgPSB0aGlzLkFQSSArICcvdGFzay1ncm91cHMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUYXNrR3JvdXAsIFwidGFzay1ncm91cHNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRhc2sgZ3JvdXAqL1xyXG4gIHJlbW92ZShpdGVtOiBUYXNrR3JvdXApIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0YXNrIGdyb3VwKi9cclxuICBzYXZlKGl0ZW06IFRhc2tHcm91cCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQ09OTkVDVElPTl9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge1Rhc2t9IGZyb20gJy4vdGFzay5tb2RlbCc7ICBcclxuLyoqXHJcbiAqIFRhc2sgcGFyYW1ldGVyIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFza1BhcmFtZXRlciBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSovICBcclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgLyoqIHZhbHVlKi9cclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBcclxuICAvKiogb3JkZXIqLyAgXHJcbiAgcHVibGljIG9yZGVyOiBOdW1iZXI7XHJcbiAgXHJcbiAgLyoqIHRhc2sqLyAgXHJcbiAgcHVibGljIHRhc2s6VGFzaztcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVGFza1BhcmFtZXRlciB9IGZyb20gJy4vdGFzay1wYXJhbWV0ZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRhc2sgcGFyYW1ldGVyIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpIFxyXG5leHBvcnQgY2xhc3MgVGFza1BhcmFtZXRlclNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUYXNrUGFyYW1ldGVyPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBUQVNLX1BBUkFNRVRFUl9BUEkgPSB0aGlzLkFQSSArICcvdGFzay1wYXJhbWV0ZXJzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGFza1BhcmFtZXRlciwgXCJ0YXNrLXBhcmFtZXRlcnNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRhc2sgcGFyYW1ldGVyKi9cclxuICByZW1vdmUoaXRlbTogVGFza1BhcmFtZXRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRhc2sgcGFyYW1ldGVyKi9cclxuICBzYXZlKGl0ZW06IFRhc2tQYXJhbWV0ZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgICAgaWYgKGl0ZW0udGFzayAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3Rhc2snLGl0ZW0udGFzaykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnRhc2sgPSBpdGVtLnRhc2suX2xpbmtzLnNlbGYuaHJlZjtcclxuICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5UQVNLX1BBUkFNRVRFUl9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuLi90ZXJyaXRvcnkvdGVycml0b3J5Lm1vZGVsJztcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5tb2RlbCc7XHJcbi8qKlxyXG4gKiBUYXNrIGF2YWlsYWJpbGl0eSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhc2tBdmFpbGFiaWxpdHkgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIHRlcnJpdG9yeSovXHJcbiAgcHVibGljIHRlcnJpdG9yeTogVGVycml0b3J5O1xyXG4gIC8qKiB0YXNrKi9cclxuICBwdWJsaWMgdGFzazogVGFzaztcclxufVxyXG4iLCJpbXBvcnQgeyBUYXNrQXZhaWxhYmlsaXR5IH0gZnJvbSAnLi90YXNrLWF2YWlsYWJpbGl0eS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFzayBhdmFpbGFiaWxpdHkgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBUYXNrQXZhaWxhYmlsaXR5U2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRhc2tBdmFpbGFiaWxpdHk+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFRBU0tfQVZBSUxBQklMSVRZX0FQSSA9IHRoaXMuQVBJICsgJy90YXNrLWF2YWlsYWJpbGl0aWVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGFza0F2YWlsYWJpbGl0eSwgXCJ0YXNrLWF2YWlsYWJpbGl0aWVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB0YXNrIGF2YWlsYWJpbGl0eSovXHJcbiAgcmVtb3ZlKGl0ZW06IFRhc2tBdmFpbGFiaWxpdHkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0YXNrIGF2YWlsYWJpbGl0eSovXHJcbiAgc2F2ZShpdGVtOiBUYXNrQXZhaWxhYmlsaXR5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtLnRhc2sgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0YXNrJyxpdGVtLnRhc2spLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLnRlcnJpdG9yeSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3RlcnJpdG9yeScsaXRlbS50ZXJyaXRvcnkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnRlcnJpdG9yeSA9IGl0ZW0udGVycml0b3J5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIGl0ZW0udGFzayA9IGl0ZW0udGFzay5fbGlua3Muc2VsZi5ocmVmO1xyXG4gIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlRBU0tfQVZBSUxBQklMSVRZX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbi8qKlxyXG4gKiBUYXNrIFVJIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFza1VJIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0b29sdGlwKi8gIFxyXG4gIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XHJcbiAgICBcclxuICAvKiogb3JkZXIqLyBcclxuICBwdWJsaWMgb3JkZXI6IG51bWJlcjtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVGFza1VJIH0gZnJvbSAnLi90YXNrLXVpLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBUYXNrIFVJIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUYXNrVUlTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGFza1VJPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBDT05ORUNUSU9OX0FQSSA9IHRoaXMuQVBJICsgJy90YXNrLXVpcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRhc2tVSSwgXCJ0YXNrLXVpc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGFzayBVSSovXHJcbiAgcmVtb3ZlKGl0ZW06IFRhc2tVSSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRhc2sgVUkqL1xyXG4gIHNhdmUoaXRlbTogVGFza1VJKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkgeyAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLkNPTk5FQ1RJT05fQVBJICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtDb25uZWN0aW9ufSBmcm9tICcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQge1NlcnZpY2VQYXJhbWV0ZXJ9IGZyb20gJy4vc2VydmljZS1wYXJhbWV0ZXIubW9kZWwnO1xyXG4vKipcclxuICogU2VydmljZSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2UgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBcclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqIHVybCovICBcclxuICBwdWJsaWMgc2VydmljZVVSTDogc3RyaW5nO1xyXG5cclxuICAvKiogcHJvamVjdGlvbnMqLyAgXHJcbiAgcHVibGljIHN1cHBvcnRlZFNSUzogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBsZWdlbmQqL1xyXG4gIHB1YmxpYyBsZWdlbmQ6IHN0cmluZztcclxuXHJcbiAgLyoqIGluZm9VcmwqLyAgXHJcbiAgcHVibGljIGluZm9Vcmw6IHN0cmluZztcclxuICBcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlOiBhbnk7XHJcblxyXG4gIC8qKiBjb25uZWN0aW9uKi9cclxuICBwdWJsaWMgY29ubmVjdGlvbjogQ29ubmVjdGlvbjtcclxuICBcclxuICAvKiogcGFyYW1ldGVycyovICBcclxuICBwdWJsaWMgcGFyYW1ldGVyczogU2VydmljZVBhcmFtZXRlcltdO1xyXG59XHJcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFNlcnZpY2UgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8U2VydmljZT4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgU0VSVklDRV9BUEkgPSB0aGlzLkFQSSArICcvc2VydmljZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihTZXJ2aWNlLCBcInNlcnZpY2VzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBzZXJ2aWNlKi9cclxuICByZW1vdmUoaXRlbTogU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHNlcnZpY2UqL1xyXG4gIHNhdmUoaXRlbTogU2VydmljZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBsZXQgc2VydmljZUNvbm5lY3Rpb24gPSBpdGVtLmNvbm5lY3Rpb247XHJcblxyXG4gICAgaWYgKGl0ZW0uY29ubmVjdGlvbiE9bnVsbCl7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmNvbm5lY3Rpb24uX2xpbmtzIT0gJ3VuZGVmaW5lZCcpIHsgXHJcbiAgICAgICAgICAgIGl0ZW0uY29ubmVjdGlvbiA9IGl0ZW0uY29ubmVjdGlvbi5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2VDb25uZWN0aW9uLl9saW5rcz0ge307XHJcbiAgICAgICAgICAgIHNlcnZpY2VDb25uZWN0aW9uLl9saW5rcy5zZWxmID0ge307XHJcbiAgICAgICAgICAgIHNlcnZpY2VDb25uZWN0aW9uLl9saW5rcy5zZWxmLmhyZWY9XCJcIjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5jb25uZWN0aW9uOyAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAoc2VydmljZUNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZj09Jycpe1xyXG4gICAgICAgICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdjb25uZWN0aW9uJyxzZXJ2aWNlQ29ubmVjdGlvbikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7ICAgICBcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2Nvbm5lY3Rpb24nLHNlcnZpY2VDb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgXHJcblxyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICB9IFxyXG4gICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5TRVJWSUNFX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlLm1vZGVsJzsgXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHBhcmFtZXRlciBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VQYXJhbWV0ZXIgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAvKiogdmFsdWUqLyAgXHJcbiAgcHVibGljIHZhbHVlOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHNlcnZpY2UqL1xyXG4gIHB1YmxpYyBzZXJ2aWNlOiBTZXJ2aWNlO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlUGFyYW1ldGVyIH0gZnJvbSAnLi9zZXJ2aWNlLXBhcmFtZXRlci5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogU2VydmljZSBwYXJhbWV0ZXIgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlUGFyYW1ldGVyU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFNlcnZpY2VQYXJhbWV0ZXI+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFNFUlZJQ0VfUEFSQU1FVEVSX0FQSSA9IHRoaXMuQVBJICsgJy9zZXJ2aWNlLXBhcmFtZXRlcnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihTZXJ2aWNlUGFyYW1ldGVyLCBcInNlcnZpY2UtcGFyYW1ldGVyc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgc2VydmljZSBwYXJhbWV0ZXIqL1xyXG4gIHJlbW92ZShpdGVtOiBTZXJ2aWNlUGFyYW1ldGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgc2VydmljZSBwYXJhbWV0ZXIqL1xyXG4gIHNhdmUoaXRlbTogU2VydmljZVBhcmFtZXRlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAoaXRlbS5zZXJ2aWNlICE9bnVsbCl7XHJcbiAgICAgICAgICBsZXQgc2VydmljZSA9ICBpdGVtLnNlcnZpY2U7XHJcbiAgICAgICAgICBkZWxldGUgaXRlbS5zZXJ2aWNlO1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3NlcnZpY2UnLHNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uc2VydmljZSA9IGl0ZW0uc2VydmljZS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlNFUlZJQ0VfUEFSQU1FVEVSX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9zZXJ2aWNlLm1vZGVsJztcclxuaW1wb3J0IHtDb25uZWN0aW9ufSBmcm9tICcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5fSBmcm9tICcuL2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0eS5tb2RlbCc7XHJcbi8qKlxyXG4gKiBDYXJ0b2dyYXBoeVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5IGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdHlwZSA6IHN0cmluZztcclxuXHJcbiAgLyoqIHdoZXRoZXIgbGF5ZXIgaXMgdmlzaWJsZSovXHJcbiAgcHVibGljIHZpc2libGU6IEJvb2xlYW47XHJcblxyXG4gIC8qKiB0cmFuc3BhcmVuY3kqLyBcclxuICBwdWJsaWMgdHJhbnNwYXJlbmN5OiBOdW1iZXI7XHJcblxyXG4gIC8qKiB3aGV0aGVyIGxheWVyIGlzIHF1ZXJ5YWJsZSovICBcclxuICBwdWJsaWMgcXVlcnlhYmxlOiBCb29sZWFuO1xyXG5cclxuICAvKiogd2hldGhlciBsYXllciBpcyBxdWVyeWFibGUqLyBcclxuICBwdWJsaWMgcXVlcnlBY3Q6IEJvb2xlYW47XHJcblxyXG4gIC8qKiBxdWVyeSBsYXllciovXHJcbiAgcHVibGljIHF1ZXJ5TGF5OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBzeXN0ZW0gY3JlYXRlZCBkYXRlKi9cclxuICBwdWJsaWMgY3JlYXRlZERhdGU6IGFueTtcclxuXHJcbiAgLyoqIG9yZGVyKi8gIFxyXG4gIHB1YmxpYyBvcmRlcjogTnVtYmVyOyBcclxuICBcclxuICAvKiogbWluaW11bSBzY2FsZSovXHJcbiAgcHVibGljIG1pbmltdW1TY2FsZTogTnVtYmVyO1xyXG5cclxuICAvKiogbWF4aW11bSBzY2FsZSovXHJcbiAgcHVibGljIG1heGltdW1TY2FsZTogTnVtYmVyO1xyXG5cclxuICAvKiogbGF5ZXJzKi8gIFxyXG4gIHB1YmxpYyBsYXllcnM6IHN0cmluZztcclxuXHJcbiAgLyoqIHNlcnZpY2UqL1xyXG4gIHB1YmxpYyBzZXJ2aWNlIDogU2VydmljZTtcclxuICBcclxuICAvKiogY29ubmVjdGlvbiovXHJcbiAgcHVibGljIGNvbm5lY3Rpb246IENvbm5lY3Rpb247XHJcblxyXG4gIC8qKiBhdmFpbGFiaWxpdGllcyovXHJcbiAgcHVibGljIGF2YWlsYWJpbGl0aWVzIDogQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHlbXTtcclxuXHJcbiAgLyoqIHdoZXRoZXIgbGF5ZXIgaXMgcXVlcnlhYmxlKi8gXHJcbiAgcHVibGljIHNlbGVjdGFibGU6IEJvb2xlYW47XHJcblxyXG4gIC8qKiBzZWxlY3Rpb24gbGF5ZXIqL1xyXG4gIHB1YmxpYyBzZWxlY3Rpb25MYXllcjogc3RyaW5nO1xyXG5cclxuICAvKiogc2VsZWN0aW9uIHNlcnZpY2UqLyAgXHJcbiAgcHVibGljIHNlbGVjdGlvblNlcnZpY2U6IFNlcnZpY2U7XHJcblxyXG4gIC8qKiBsZWdlbmQgdGlwKi8gIFxyXG4gIHB1YmxpYyBsZWdlbmRUaXA6IHN0cmluZztcclxuICBcclxuICAvKiogbGVnZW5kIHVybCovXHJcbiAgcHVibGljIGxlZ2VuZFVybDogc3RyaW5nO1xyXG5cclxuICAvKiogd2hldGhlciBsYXllciBpcyBlZGl0YWJsZSovXHJcbiAgcHVibGljIGVkaXRhYmxlOiBCb29sZWFuO1xyXG5cclxuICAvKiogbWV0YWRhdGEgVVJMKi9cclxuICBwdWJsaWMgbWV0YWRhdGFVcmw6IHN0cmluZztcclxuXHJcbiAgLyoqIHdoZXRoZXIgbGF5ZXIgaXMgdGhlbWFibGUqL1xyXG4gIHB1YmxpYyB0aGVtZWFibGU6IEJvb2xlYW47XHJcbiAgXHJcbiAgLyoqIGdlb21ldHJ5IHR5cGUqL1xyXG4gIHB1YmxpYyBnZW9tZXRyeVR5cGU6IHN0cmluZztcclxuICBcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHkgfSBmcm9tICcuL2NhcnRvZ3JhcGh5Lm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBDYXJ0b2dyYXBoeSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q2FydG9ncmFwaHk+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENBUlRPR1JBUEhZX0FQSSA9IHRoaXMuQVBJICsgJy9jYXJ0b2dyYXBoaWVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQ2FydG9ncmFwaHksIFwiY2FydG9ncmFwaGllc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgY2FydG9ncmFwaHkqL1xyXG4gIHJlbW92ZShpdGVtOiBDYXJ0b2dyYXBoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIGNhcnRvZ3JhcGh5Ki9cclxuICBzYXZlKGl0ZW06IENhcnRvZ3JhcGh5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGxldCBjYXJ0b2dyYXBoeUNvbm5lY3Rpb24gPSBpdGVtLmNvbm5lY3Rpb247XHJcblxyXG4gICAgY29uc3QgY2FydG9ncmFwaHlTZXJ2aWNlID0gaXRlbS5zZXJ2aWNlO1xyXG4gICAgY29uc3QgY2FydG9ncmFwaHlTZWxlY3Rpb25TZXJ2aWNlID0gaXRlbS5zZWxlY3Rpb25TZXJ2aWNlO1xyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgaWYgKGl0ZW0uc2VydmljZSE9bnVsbClcclxuICAgICAgaXRlbS5zZXJ2aWNlID0gaXRlbS5zZXJ2aWNlLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICBpZiAoaXRlbS5zZWxlY3Rpb25TZXJ2aWNlIT1udWxsKVxyXG4gICAgICBpdGVtLnNlbGVjdGlvblNlcnZpY2UgPSBpdGVtLnNlbGVjdGlvblNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZjsgIFxyXG4gICAgaWYgKGl0ZW0uY29ubmVjdGlvbiE9bnVsbCl7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmNvbm5lY3Rpb24uX2xpbmtzIT0gJ3VuZGVmaW5lZCcpIHsgXHJcbiAgICAgICAgICAgIGl0ZW0uY29ubmVjdGlvbiA9IGl0ZW0uY29ubmVjdGlvbi5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhcnRvZ3JhcGh5Q29ubmVjdGlvbi5fbGlua3M9IHt9O1xyXG4gICAgICAgICAgICBjYXJ0b2dyYXBoeUNvbm5lY3Rpb24uX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgY2FydG9ncmFwaHlDb25uZWN0aW9uLl9saW5rcy5zZWxmLmhyZWY9XCJcIjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5jb25uZWN0aW9uO1xyXG4gICAgICBkZWxldGUgaXRlbS5zZXJ2aWNlOyAgICAgICAgICAgIFxyXG4gICAgICBkZWxldGUgaXRlbS5zZWxlY3Rpb25TZXJ2aWNlO1xyXG4gICAgICBcclxuICAgICBpZiAoY2FydG9ncmFwaHlDb25uZWN0aW9uLl9saW5rcy5zZWxmLmhyZWY9PScnKXtcclxuICAgICAgICAgaXRlbS5kZWxldGVSZWxhdGlvbignY29ubmVjdGlvbicsY2FydG9ncmFwaHlDb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHsgICAgIFxyXG4gICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignc2VydmljZScsY2FydG9ncmFwaHlTZXJ2aWNlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdzZWxlY3Rpb25TZXJ2aWNlJyxjYXJ0b2dyYXBoeVNlbGVjdGlvblNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignY29ubmVjdGlvbicsY2FydG9ncmFwaHlDb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdzZXJ2aWNlJyxjYXJ0b2dyYXBoeVNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdzZWxlY3Rpb25TZXJ2aWNlJyxjYXJ0b2dyYXBoeVNlbGVjdGlvblNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgXHJcblxyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICB9IFxyXG4gICAgICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQ0FSVE9HUkFQSFlfQVBJICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS5tb2RlbCc7XHJcbmltcG9ydCB7Um9sZX0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJztcclxuLyoqXHJcbiAqIENhcnRvZ3JhcGh5IGdyb3VwXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlHcm91cCBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAvKiogbWVtYmVycyovXHJcbiAgcHVibGljIG1lbWJlcnM6IENhcnRvZ3JhcGh5W107XHJcbiAgLyoqIHJvbGVzKi9cclxuICBwdWJsaWMgcm9sZXM6IFJvbGVbXTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHlHcm91cCB9IGZyb20gJy4vY2FydG9ncmFwaHktZ3JvdXAubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIENhcnRvZ3JhcGh5R3JvdXAgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5R3JvdXBTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q2FydG9ncmFwaHlHcm91cD4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ0FSVE9HUkFQSFlfR1JPVVBfQVBJID0gdGhpcy5BUEkgKyAnL2NhcnRvZ3JhcGh5LWdyb3Vwcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5R3JvdXAsIFwiY2FydG9ncmFwaHktZ3JvdXBzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBjYXJ0b2dyYXBoeSBncm91cCovXHJcbiAgcmVtb3ZlKGl0ZW06IENhcnRvZ3JhcGh5R3JvdXApIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBjYXJ0b2dyYXBoeSBncm91cCovXHJcbiAgc2F2ZShpdGVtOiBDYXJ0b2dyYXBoeUdyb3VwKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLkNBUlRPR1JBUEhZX0dST1VQX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7IFRlcnJpdG9yeSB9IGZyb20gJy4uL3RlcnJpdG9yeS90ZXJyaXRvcnkubW9kZWwnO1xyXG5pbXBvcnQgeyBDYXJ0b2dyYXBoeSB9IGZyb20gJy4vY2FydG9ncmFwaHkubW9kZWwnO1xyXG4vKipcclxuICogQ2FydG9ncmFwaHkgYXZhaWxhYmlsaXR5IG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHkgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIHRlcnJpdG9yeSovXHJcbiAgcHVibGljIHRlcnJpdG9yeTogVGVycml0b3J5O1xyXG4gIFxyXG4gIC8qKiBzeXN0ZW0gY3JlYXRlZCBkYXRlKi9cclxuICBwdWJsaWMgY3JlYXRlZERhdGU6IGFueTtcclxuICBcclxuICAvKiogY2FydG9ncmFwaHkqL1xyXG4gIHB1YmxpYyBjYXJ0b2dyYXBoeTogQ2FydG9ncmFwaHk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHkgfSBmcm9tICcuL2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0eS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHkgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eT4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ0FSVE9HUkFQSFlfQVZBSUxBQklMSVRZX0FQSSA9IHRoaXMuQVBJICsgJy9jYXJ0b2dyYXBoeS1hdmFpbGFiaWxpdGllcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5LCBcImNhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0aWVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBjYXJ0b2dyYXBoeSBhdmFpbGFiaWxpdHkqL1xyXG4gIHJlbW92ZShpdGVtOiBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIGNhcnRvZ3JhcGh5IGF2YWlsYWJpbGl0eSovXHJcbiAgc2F2ZShpdGVtOiBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS5jYXJ0b2dyYXBoeSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2NhcnRvZ3JhcGh5JyxpdGVtLmNhcnRvZ3JhcGh5KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS50ZXJyaXRvcnkgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0ZXJyaXRvcnknLGl0ZW0udGVycml0b3J5KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS50ZXJyaXRvcnkgPSBpdGVtLnRlcnJpdG9yeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLmNhcnRvZ3JhcGh5ID0gaXRlbS5jYXJ0b2dyYXBoeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLkNBUlRPR1JBUEhZX0FWQUlMQUJJTElUWV9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXB9IGZyb20gJy4vY2FydG9ncmFwaHktZ3JvdXAubW9kZWwnO1xyXG4vKipcclxuICogQmFja2dyb3VuZCBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICBcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIGRlc2NyaXB0aW9uKi9cclxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBcclxuICAvKiogd2hldGhlciBiYWNrZ3JvdW5kIGlzIGFjdGl2ZSovXHJcbiAgcHVibGljIGFjdGl2ZTogQm9vbGVhbjtcclxuICBcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlOiBhbnk7XHJcblxyXG4gIC8qKiBjYXJ0b2dyYXBoeSBncm91cCovXHJcbiAgcHVibGljIGNhcnRvZ3JhcGh5R3JvdXA6IENhcnRvZ3JhcGh5R3JvdXA7XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFja2dyb3VuZCB9IGZyb20gJy4vYmFja2dyb3VuZC5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQmFja2dyb3VuZCBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZFNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxCYWNrZ3JvdW5kPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBCQUNLR1JPVU5EX0FQSSA9IHRoaXMuQVBJICsgJy9iYWNrZ3JvdW5kcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKEJhY2tncm91bmQsIFwiYmFja2dyb3VuZHNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGJhY2tncm91bmQqL1xyXG4gIHJlbW92ZShpdGVtOiBCYWNrZ3JvdW5kKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpOyAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBiYWNrZ3JvdW5kKi9cclxuICBzYXZlKGl0ZW06IEJhY2tncm91bmQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgbGV0IGJhY2tncm91bmRDYXJ0b2dyYXBoeUdyb3VwID0gaXRlbS5jYXJ0b2dyYXBoeUdyb3VwO1xyXG5cclxuICAgIGlmIChpdGVtLmNhcnRvZ3JhcGh5R3JvdXAhPW51bGwpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS5jYXJ0b2dyYXBoeUdyb3VwLl9saW5rcyE9ICd1bmRlZmluZWQnKSB7IFxyXG4gICAgICAgICAgICBpdGVtLmNhcnRvZ3JhcGh5R3JvdXAgPSBpdGVtLmNhcnRvZ3JhcGh5R3JvdXAuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cC5fbGlua3M9IHt9O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cC5fbGlua3Muc2VsZiA9IHt9O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cC5fbGlua3Muc2VsZi5ocmVmPVwiXCI7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgfVxyXG5cclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICAvL3VwZGF0ZSByZWxhdGlvbnNcclxuICAgICAgZGVsZXRlIGl0ZW0uY2FydG9ncmFwaHlHcm91cDsgICAgICAgIFxyXG4gICAgICBcclxuICAgICAgaWYgKGJhY2tncm91bmRDYXJ0b2dyYXBoeUdyb3VwLl9saW5rcy5zZWxmLmhyZWY9PScnKXtcclxuICAgICAgICAgaXRlbS5kZWxldGVSZWxhdGlvbignY2FydG9ncmFwaHlHcm91cCcsYmFja2dyb3VuZENhcnRvZ3JhcGh5R3JvdXApLnN1YnNjcmliZShyZXN1bHQgPT4geyAgICAgXHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdjYXJ0b2dyYXBoeUdyb3VwJyxiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgIFxyXG5cclxuICAgICAgXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTsgICAgICAgICAgIFxyXG4gICAgICAgfSBcclxuICAgICAgIFxyXG4gICAgICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQkFDS0dST1VORF9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7Um9sZX0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJzsgICAgXHJcbi8qKlxyXG4gKiBUcmVlIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIG5vZGVzICovXHJcbiAgcHVibGljIG5vZGVzOiBUcmVlTm9kZVtdO1xyXG4gIC8qKiBhdmFpbGFibGUgcm9sZXMgKi9cclxuICBwdWJsaWMgYXZhaWxhYmxlUm9sZXMgOiBSb2xlW107XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRyZWUgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRyZWUgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyZWVTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VHJlZT4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgYmFzZSBwYXRoICovXHJcbiAgcHVibGljIEFQSSA9ICcvYXBpJztcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVFJFRV9BUEkgPSB0aGlzLkFQSSArICcvdHJlZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUcmVlLCBcInRyZWVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB0cmVlKi9cclxuICByZW1vdmUoaXRlbTogVHJlZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRyZWUqL1xyXG4gIHNhdmUoaXRlbTogVHJlZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuVFJFRV9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5fSBmcm9tICcuLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5tb2RlbCc7XHJcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlLm1vZGVsJztcclxuLyoqXHJcbiAqIFRyZWUgbm9kZSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogdG9vbHRpcCovXHJcbiAgcHVibGljIHRvb2x0aXA6IHN0cmluZztcclxuICAvKiogb3JkZXIqL1xyXG4gIHB1YmxpYyBvcmRlbiA6IG51bWJlcjtcclxuICAvKiogd2hldGhlciB0cmVlIG5vZGUgaXMgYWN0aXZlKi9cclxuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xyXG4gIC8qKiBwYXJlbnQgdHJlZSBub2RlICovXHJcbiAgcHVibGljIHBhcmVudDogVHJlZU5vZGU7XHJcbiAgLyoqIGRpc3BsYXllZCBjYXJ0b2dyYXBoeSAqLyAgXHJcbiAgcHVibGljIGNhcnRvZ3JhcGh5OiBDYXJ0b2dyYXBoeTtcclxuICAvKiogdHJlZSAqLyAgXHJcbiAgcHVibGljIHRyZWU6IFRyZWU7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRyZWUgbm9kZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKSBcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRyZWVOb2RlPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBUUkVFX05PREVfQVBJID0gdGhpcy5BUEkgKyAnL3RyZWUtbm9kZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUcmVlTm9kZSwgXCJ0cmVlLW5vZGVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB0cmVlIG5vZGUqL1xyXG4gIHJlbW92ZShpdGVtOiBUcmVlTm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRyZWUgbm9kZSovXHJcbiAgc2F2ZShpdGVtOiBUcmVlTm9kZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgY29uc3QgaXRlbVRyZWUgPSBpdGVtLnRyZWU7XHJcbiAgICAgIGNvbnN0IGl0ZW1DYXJ0b2dyYXBoeSA9IGl0ZW0uY2FydG9ncmFwaHk7XHJcbiAgICAgIGNvbnN0IGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudDtcclxuICAgICAgICBcclxuICAgICAgZGVsZXRlIGl0ZW0udHJlZTtcclxuICAgICAgZGVsZXRlIGl0ZW0uY2FydG9ncmFwaHk7XHJcbiAgICAgIGRlbGV0ZSBpdGVtLnBhcmVudDtcclxuICAgICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbVRyZWUgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0cmVlJyxpdGVtVHJlZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtQ2FydG9ncmFwaHkgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdjYXJ0b2dyYXBoeScsaXRlbUNhcnRvZ3JhcGh5KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1QYXJlbnQgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdwYXJlbnQnLGl0ZW1QYXJlbnQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpdGVtLnRyZWUgJiYgaXRlbS50cmVlLl9saW5rcyAmJiBpdGVtLnRyZWUuX2xpbmtzLnNlbGYpIHtcclxuICAgICAgICBpdGVtLnRyZWUgPSBpdGVtLnRyZWUuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS5jYXJ0b2dyYXBoeSAmJiBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcyAmJiBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmKSB7XHJcbiAgICAgICAgaXRlbS5jYXJ0b2dyYXBoeSA9IGl0ZW0uY2FydG9ncmFwaHkuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgfSAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLlRSRUVfTk9ERV9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge1RyZWV9IGZyb20gJy4uL3RyZWUvdHJlZS5tb2RlbCc7XHJcbmltcG9ydCB7Um9sZX0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeUdyb3VwfSBmcm9tICcuLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1ncm91cC5tb2RlbCc7XHJcbmltcG9ydCB7QXBwbGljYXRpb25QYXJhbWV0ZXJ9IGZyb20gJy4vYXBwbGljYXRpb24tcGFyYW1ldGVyLm1vZGVsJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvbkJhY2tncm91bmR9IGZyb20gJy4vYXBwbGljYXRpb24tYmFja2dyb3VuZC5tb2RlbCc7XHJcblxyXG4vL0ZJWE1FIGVuc3VyZSBhcHBsaWNhdGlvbiBjcmVhdGlvbiBpbiBhZG1pbiBhcHAgdXBvbiBpbml0aWFsaXphdGlvbiAoYXMgaXQgaXMgZG9uZSB3aXRoIFJvbGVzIGFuZCBkZWZhdWx0IFVzZXJzKVxyXG4vKiogVGVycml0b3JpYWwgYXBwbGljdGlvbiBuYW1lICovXHJcbmV4cG9ydCBjb25zdCBURVJSSVRPUklBTF9BUFBfTkFNRTpzdHJpbmcgID0gXCJBcGxpY2FjacODwrNuIFRlcnJpdG9yaWFsXCI7XHJcblxyXG4vKipcclxuICogQXBwbGljYXRpb24gbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjsgIFxyXG4gIFxyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICBcclxuICAvKiogdGl0bGUqL1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0aGVtZSovXHJcbiAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG4gIFxyXG4gIC8qKiBhdmFpbGFibGUgcm9sZXMqL1xyXG4gIHB1YmxpYyBhdmFpbGFibGVSb2xlcyA6IFJvbGVbXTtcclxuICBcclxuICAvKiogdHJlZXMqL1xyXG4gIHB1YmxpYyB0cmVlcyA6IFRyZWVbXTtcclxuICBcclxuICAvKiogc2NhbGVzIChjb21tYS1zZXBhcmF0ZWQgdmFsdWVzKSovXHJcbiAgcHVibGljIHNjYWxlczogc3RyaW5nW107XHJcbiAgXHJcbiAgLyoqIHByb2plY3Rpb25zKGNvbW1hLXNlcGFyYXRlZCBFUFNHIGNvZGVzKSovXHJcbiAgcHVibGljIHNyczogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB3aGV0aGVyIGFwcGxpY2F0aW9uIHRyZWUgd2lsbCBhdXRvIHJlZnJlc2gqLyAgXHJcbiAgcHVibGljIHRyZWVBdXRvUmVmcmVzaDogQm9vbGVhbjtcclxuXHJcbiAgLyoqIGJhY2tncm91bmRzKi9cclxuICBwdWJsaWMgYmFja2dyb3VuZHM6IEFwcGxpY2F0aW9uQmFja2dyb3VuZFtdO1xyXG5cclxuICAvKiogc2l0dWF0aW9uIG1hcCovXHJcbiAgcHVibGljIHNpdHVhdGlvbk1hcDogQ2FydG9ncmFwaHlHcm91cDsgICAgXHJcbiAgXHJcbiAgLyoqIHBhcmFtZXRlcnMqL1xyXG4gIHB1YmxpYyBwYXJhbWV0ZXJzOiBBcHBsaWNhdGlvblBhcmFtZXRlcltdO1xyXG59XHJcbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQXBwbGljYXRpb24gbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPEFwcGxpY2F0aW9uPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUFBMSUNBVElPTl9BUEkgPSB0aGlzLkFQSSArICcvYXBwbGljYXRpb25zJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQXBwbGljYXRpb24sIFwiYXBwbGljYXRpb25zXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBhcHBsaWNhdGlvbiovXHJcbiAgcmVtb3ZlKGl0ZW06IEFwcGxpY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgYXBwbGljYXRpb24qL1xyXG4gIHNhdmUoaXRlbTogQXBwbGljYXRpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgbGV0IGFwcGxpY2F0aW9uU2l0dWF0aW9uTWFwID0gaXRlbS5zaXR1YXRpb25NYXA7XHJcblxyXG4gICAgaWYgKGl0ZW0uc2l0dWF0aW9uTWFwIT1udWxsKXtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0uc2l0dWF0aW9uTWFwLl9saW5rcyE9ICd1bmRlZmluZWQnKSB7IFxyXG4gICAgICAgICAgICBpdGVtLnNpdHVhdGlvbk1hcCA9IGl0ZW0uc2l0dWF0aW9uTWFwLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBwbGljYXRpb25TaXR1YXRpb25NYXAuX2xpbmtzPSB7fTtcclxuICAgICAgICAgICAgYXBwbGljYXRpb25TaXR1YXRpb25NYXAuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgYXBwbGljYXRpb25TaXR1YXRpb25NYXAuX2xpbmtzLnNlbGYuaHJlZj1cIlwiO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgLy91cGRhdGUgcmVsYXRpb25zXHJcbiAgICAgIGRlbGV0ZSBpdGVtLnNpdHVhdGlvbk1hcDsgICAgICAgIFxyXG4gICAgICBcclxuICAgICAgaWYgKGFwcGxpY2F0aW9uU2l0dWF0aW9uTWFwLl9saW5rcy5zZWxmLmhyZWY9PScnKXtcclxuICAgICAgICAgaXRlbS5kZWxldGVSZWxhdGlvbignc2l0dWF0aW9uTWFwJyxhcHBsaWNhdGlvblNpdHVhdGlvbk1hcCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7ICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignc2l0dWF0aW9uTWFwJyxhcHBsaWNhdGlvblNpdHVhdGlvbk1hcCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICB9IFxyXG4gICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5BUFBMSUNBVElPTl9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gICAgXHJcbiAgICBcclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtCYWNrZ3JvdW5kfSBmcm9tICcuLi9jYXJ0b2dyYXBoeS9iYWNrZ3JvdW5kLm1vZGVsJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9hcHBsaWNhdGlvbi5tb2RlbCc7IFxyXG5cclxuLyoqXHJcbiAqIEFwcGxpY2F0aW9uIGJhY2tncm91bmQgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkJhY2tncm91bmQgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIG9yZGVyKi9cclxuICBwdWJsaWMgb3JkZXI6IE51bWJlcjtcclxuICBcclxuICAvKiogYmFja2dyb3VuZCovXHJcbiAgcHVibGljIGJhY2tncm91bmQ6IEJhY2tncm91bmQ7XHJcbiAgXHJcbiAgLyoqIGFwcGxpY2F0aW9uKi9cclxuICBwdWJsaWMgYXBwbGljYXRpb246IEFwcGxpY2F0aW9uO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBcHBsaWNhdGlvbkJhY2tncm91bmQgfSBmcm9tICcuL2FwcGxpY2F0aW9uLWJhY2tncm91bmQubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIEFwcGxpY2F0aW9uIGJhY2tncm91bmQgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkJhY2tncm91bmRTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8QXBwbGljYXRpb25CYWNrZ3JvdW5kPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSBiYXNlIHBhdGggKi9cclxuICBwdWJsaWMgQVBJID0gJy9hcGknO1xyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUFBMSUNBVElPTl9CQUNLR1JPVU5EX0FQSSA9IHRoaXMuQVBJICsgJy9hcHBsaWNhdGlvbi1iYWNrZ3JvdW5kcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKEFwcGxpY2F0aW9uQmFja2dyb3VuZCwgXCJhcHBsaWNhdGlvbi1iYWNrZ3JvdW5kc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgYXBwbGljYXRpb24gYmFja2dyb3VuZCovXHJcbiAgcmVtb3ZlKGl0ZW06IEFwcGxpY2F0aW9uQmFja2dyb3VuZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIGFwcGxpY2F0aW9uIGJhY2tncm91bmQqL1xyXG4gIHNhdmUoaXRlbTogQXBwbGljYXRpb25CYWNrZ3JvdW5kKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtLmFwcGxpY2F0aW9uICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignYXBwbGljYXRpb24nLGl0ZW0uYXBwbGljYXRpb24pLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLmJhY2tncm91bmQgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdiYWNrZ3JvdW5kJyxpdGVtLmJhY2tncm91bmQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS5hcHBsaWNhdGlvbiA9IGl0ZW0uYXBwbGljYXRpb24uX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgaXRlbS5iYWNrZ3JvdW5kID0gaXRlbS5iYWNrZ3JvdW5kLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQVBQTElDQVRJT05fQkFDS0dST1VORF9BUEkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICcuL2FwcGxpY2F0aW9uLm1vZGVsJzsgXHJcblxyXG4vKipcclxuICogQXBwbGljYXRpb24gcGFyYW1ldGVyIG1vZGVsIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uUGFyYW1ldGVyIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB2YWx1ZSovICAgIFxyXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBhcHBsaWNhdGlvbiovXHJcbiAgcHVibGljIGFwcGxpY2F0aW9uOiBBcHBsaWNhdGlvbjtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb25QYXJhbWV0ZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQXBwbGljYXRpb24gcGFyYW1ldGVyIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpIFxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25QYXJhbWV0ZXJTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8QXBwbGljYXRpb25QYXJhbWV0ZXI+IHtcclxuICBcclxuICAvKiogQVBJIGJhc2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUEkgPSAnL2FwaSc7XHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIEFQUExJQ0FUSU9OX1BBUkFNRVRFUl9BUEkgPSB0aGlzLkFQSSArICcvYXBwbGljYXRpb24tcGFyYW1ldGVycyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKEFwcGxpY2F0aW9uUGFyYW1ldGVyLCBcImFwcGxpY2F0aW9uLXBhcmFtZXRlcnNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGFwcGxpY2F0aW9uKi9cclxuICByZW1vdmUoaXRlbTogQXBwbGljYXRpb25QYXJhbWV0ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBhcHBsaWNhdGlvbiovXHJcbiAgc2F2ZShpdGVtOiBBcHBsaWNhdGlvblBhcmFtZXRlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS5hcHBsaWNhdGlvbiAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2FwcGxpY2F0aW9uJyxpdGVtLmFwcGxpY2F0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uYXBwbGljYXRpb24gPSBpdGVtLmFwcGxpY2F0aW9uLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMuQVBQTElDQVRJT05fUEFSQU1FVEVSX0FQSSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogTGF5ZXIgbW9kZWw6IGNvbmZpZ3VyZSBMYXllciBkYXRhIGFuZCBkaXNwbGF5aW5nIGNvbmZpZ3VyYXRpb24gKi8gXHJcbmV4cG9ydCBjbGFzcyBMYXllciB7XHJcbiAgLy8gRGlzcGxheSBkYXRhXHJcbiAgLyoqIGxheWVyIHZpc2liaWxpdHkqLyAgXHJcbiAgdmlzaWJpbGl0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8qKiBUcmFuc3BhcmVuY3kgKFRyYW5zcGFyZW50KSAwLTEgKE9wYXF1ZSkqL1xyXG4gIG9wYWNpdHk6IG51bWJlciA9IDEuMDtcclxuXHJcbiAgLy8gQ29uZmlndXJhdGlvbiBkYXRhXHJcbiAgLyoqIHRpdGxlKi9cclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBJZCB0byBpbmRleCovXHJcbiAgaWQ6IGFueTtcclxuICBcclxuICAvKiogU2VydmljZSBOYW1lKi9cclxuICBzZXJ2ZXJOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTZXJ2aWNlIGF0dHJpYnV0aW9ucyovXHJcbiAgYXR0cmlidXRpb25zOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAvKiogUmVxdWVzdCBmb3JtYXQgKGltYWdlL2pwZywgLi4uKSovXHJcbiAgZm9ybWF0OiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFJlcXVlc3Qgc2VydmljZSB2ZXJzaW9uKi9cclxuICB2ZXJzaW9uOnN0cmluZztcclxuXHJcbiAgLyoqIFNlcnZpY2UgdXJsKi9cclxuICB1cmw6IHN0cmluZztcclxuXHJcbiAgLyoqIElzIGJhc2UgbGF5ZXI/Ki9cclxuICBpc0Jhc2VMYXllcjogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFJlcXVlc3QgbGF5ZXIgbmFtZSovXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogSXMgdGlsZWQ/Ki9cclxuICB0aWxlZDogYm9vbGVhbjtcclxuICBcclxuICAvKiogRGVzY3JpcHRpb24qL1xyXG4gIGRlc2M6IHN0cmluZyA9IFwiXCI7XHJcbiAgXHJcbiAgLyoqICBUcmFuc3BhcmVudCByZXF1ZXN0IHBhcmFtZXRlcj8qL1xyXG4gIHVybF90cmFuc3BhcmVudDogc3RyaW5nID0gXCJ0cnVlXCI7XHJcbiAgXHJcbiAgLyoqIFJlcXVlc3QgQmFja2dyb3VuZCBwYXJhbWV0ZXIgY29sb3IgKEhleGEpKi9cclxuICB1cmxfYmdjb2xvcjogc3RyaW5nID0gXCIweDAwMDAwMFwiO1xyXG4gIFxyXG4gIC8qKiBSZXF1ZXN0IEV4Y2VwdGlvbiBVUkwqL1xyXG4gIHVybF9leGNlcHRpb246IHN0cmluZztcclxuICBcclxuICAvKiogRXh0ZW50IGZvciB0aWxlZCBzZXJ2aWNlcyovXHJcbiAgZXh0ZW50OiBhbnkgPSBudWxsO1xyXG5cclxuICAvKiogVGlsZSBoZWlnaHQgKGlmIG5vdCBkZWZpbmVkLCB0aGUgZGVmYXVsdCBtYXAgaXMgdGFrZW4pKi9cclxuICB0aWxlSGVpZ2h0PzpudW1iZXI7XHJcbiAgXHJcbiAgLyoqIFRpbGUgd2lkdGggKGlmIG5vdCBkZWZpbmVkLCB0aGUgZGVmYXVsdCBtYXAgaXMgdGFrZW4pKi9cclxuICB0aWxlV2lkdGg/Om51bWJlcjtcclxuICBcclxuICAvKiogRW5hYmxlZCBmb3IgR2V0RmVhdHVyZUluZm8gcmVxdWVzdHMgKGVuYWJsZWQgdG8gdXNlIHRoZSB2aWV3ZXIgZmVhdHVyZXMgaW5mb3JtYXRpb24gdG9vbCkqL1xyXG4gIHF1ZXJ5YWJsZT86Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIFxyXG4gIC8qKiBNaW5pbXVtIHNjYWxlKi9cclxuICBtaW5pbXVtU2NhbGU/Om51bWJlcjtcclxuICBcclxuICAvKiogTWF4aW11bSBzY2FsZSovXHJcbiAgbWF4aW11bVNjYWxlPzpudW1iZXI7XHJcbiAgXHJcbiAgLyoqIExpc3Qgb2YgYXZhaWxhYmxlIENSUyovXHJcbiAgcHJvamVjdGlvbnM/OnN0cmluZztcclxuICBcclxuICAvKiogRmVhdHVyZXMgaW5mb3JtYXRpb24gVVJMKi9cclxuICBpbmZvVXJsPzpzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIE1ldGFkYXRhIGluZm9ybWF0aW9uIFVSTCovXHJcbiAgbWV0YWRhdGFVcmw/OnN0cmluZztcclxuICBcclxuICAvKiogTGVnZW5kIFVSTCovXHJcbiAgbGVnZW5kVXJsPzpzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIEFycmF5IG9mIE9wdGlvbmFsUGFyYW1ldGVyIG9iamVjdCB0aGF0IGRlZmluZXMgb3RoZXIgb3B0aW9uYWwgcGFyYW1ldGVyLXZhbHVlIHBhaXJzIGZvciB0aGUgcmVxdWVzdCAoVElNRSAuLi4pKi9cclxuICBvcHRpb25hbFBhcmFtZXRlcnM/OkFycmF5PE9wdGlvbmFsUGFyYW1ldGVyPjtcclxufVxyXG5cclxuLyoqIE9wdGlvbmFsIHBhcmFtZXRlciBtb2RlbDogY29uZmlndXJlIHBhcmFtZXRlci12YWx1ZSBwYWlyIHRvIGFkZCB0byB0aGUgcmVxdWVzdCBsYXllciBVUkwgKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbmFsUGFyYW1ldGVyIHtcclxuICAvKioga2V5Ki9rZXk6c3RyaW5nO1xyXG4gIC8qKiB2YWx1ZSovdmFsdWU6c3RyaW5nO1xyXG59XHJcblxyXG4vKiogTGF5ZXIgY29uZmlndXJhdGlvbiBtb2RlbDogbW9kaWZ5IHRoZSBjb25maWd1cmF0aW9uIG9mIGEgbGF5ZXIgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBtYXAgKG1ha2UgdmlzaWJsZSwgbW92ZSB0aGUgbGF5ZXIgLi4uKSAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJDb25maWd1cmF0aW9uIHtcclxuICAvKiogSWRlbnRpZmllciB0byBpbmRleCovaWQ6IGFueTtcclxuICAvKiogTGF5ZXIgdmlzaWJpbGl0eSovdmlzaWJpbGl0eTogYm9vbGVhbjtcclxuICAvKiogTGF5ZXIgdHJhbnNwYXJlbmN5IChUcmFuc3BhcmVudCkgMC0xIChPcGFxdWUpKi9vcGFjaXR5OiBudW1iZXI7XHJcbiAgLyoqIExheWVyIHBvc2l0aW9uKi9wb3NpdGlvbjogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogTGF5ZXIgZ3JvdXAgbW9kZWwqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJHcm91cCB7XHJcbiAgLyoqIGluaXRpYWxseSBhY3RpdmF0ZWQgKGFsbCB2aXNpYmxlIGxheWVycykqL2FjdGl2ZT86Ym9vbGVhbjtcclxuICAvKiogZ3JvdXAgbmFtZSovbmFtZT86IFN0cmluZztcclxuICAvKiogZ3JvdXAgaWQqL2lkOiBTdHJpbmc7XHJcbiAgLyoqIGFycmF5IG9mIGNoaWxkIExheWVycyovbGF5ZXJzOiBBcnJheTxMYXllcj47XHJcbn1cclxuXHJcbi8qKiBNYXAgb3B0aW9ucyBjb25maWd1cmF0aW9uIG1vZGVsKi9cclxuZXhwb3J0IGNsYXNzIE1hcE9wdGlvbnNDb25maWd1cmF0aW9uIHtcclxuICAvKiogc2NhbGVzKi9zY2FsZXM/OiBzdHJpbmc7XHJcbiAgLyoqIHByb2plY3Rpb25zKi9wcm9qZWN0aW9ucz86IHN0cmluZztcclxuICAvKiogbWluaW11bSBzY2FsZSovbWluU2NhbGU/Om51bWJlcjtcclxuICAvKiogbWF4aW11bSBzY2FsZSovbWF4U2NhbGU/Om51bWJlcjtcclxuICAvKiogZXh0ZW50Ki9leHRlbnQ/OmFueTtcclxuICAvKiogbWF4aW11bSBleHRlbnQqL21heEV4dGVudD86YW55O1xyXG4gIC8qKiB0aWxlIHdpZHRoKi90aWxlV2lkdGg/Om51bWJlcjtcclxuICAvKiogdGlsZSBoZWlnaHQqL3RpbGVIZWlnaHQ/Om51bWJlcjtcclxuICAvKiogcGFyYW1ldGVycyovcGFyYW1ldGVycz86IEFycmF5PE9wdGlvbmFsUGFyYW1ldGVyPlxyXG59XHJcblxyXG4vKiogTWFwIGNvbXBvbmVudCBzdGF0dXMgbW9kZWwqL1xyXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50U3RhdHVzIHtcclxuICAgIC8qKiBsb2FkZWQ/Ki9sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuLyoqIE1hcCBjb25maWd1cmF0aW9uIG1hbmFnZXIgc2VydmljZSovXHJcbmV4cG9ydCBjbGFzcyBNYXBDb25maWd1cmF0aW9uTWFuYWdlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgbGF5ZXJzU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG4gIHByaXZhdGUgbGF5ZXJzOiBBcnJheTxMYXllcj4gPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGJhc2VMYXllckdyb3Vwc1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICBwcml2YXRlIGJhc2VMYXllckdyb3VwczogQXJyYXk8TGF5ZXJHcm91cD4gPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGxheWVyQ29uZmlndXJhdGlvblN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgcHJpdmF0ZSBhZGRMYXllcnNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgcHJpdmF0ZSByZW1vdmVMYXllcnNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIHByaXZhdGUgc2l0dWF0aW9uTWFwQ29uZmlndXJhdGlvblN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICBwcml2YXRlIG1hcE9wdGlvbnNDb25maWd1cmF0aW9uU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBwcml2YXRlIG1hcENvbXBvbmVudFN0YXR1c1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yKi9cclxuICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgIC8vXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBsYXllciBjb3VudCAqL1xyXG4gIGNvdW50ID0gMDtcclxuXHJcbiAgLyoqIGNvbmZpZ3VyZSB0aGUgb3ZlcmxheSBsYXllcnMgb2YgdGhlIG1hcCwgYnkgcGFzc2luZyBhcyBhIHBhcmFtZXRlciBhbiBhcnJheSBvZiBvYmplY3RzIG9mIHR5cGUgTGF5ZXIgb2JqZWN0cyBkZWZpbmluZyB0aGUgbGF5ZXJzIHRvIGxvYWQuKi9cclxuICBsb2FkTGF5ZXJzQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5sYXllcnMgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNsZWFyTGF5ZXJzKGZhbHNlKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0TGF5ZXJzKGNvbmZpZ3VyYXRpb24pO1xyXG4gIH1cclxuICBcclxuICAvKipjb25maWd1cmUgdGhlIGJhc2UgbGF5ZXJzIG9mIHRoZSBtYXAgYnkgcGFzc2luZyBhcyBhIHBhcmFtZXRlciBhbiBhcnJheSBvZiBvYmplY3RzIG9mIHR5cGUgTGF5ZXJHcm91cCBlYWNoIG9mIHRoZW0gd2l0aCB0aGUgY29ycmVzcG9uZGluZyBMYXllciBvYmplY3RzIGRlZmluaW5nIHRoZSBsYXllcnMgdG8gbG9hZC4qL1xyXG4gIGxvYWRCYXNlTGF5ZXJzQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uKSB7XHJcbiAgICB0aGlzLnNldEJhc2VMYXllckdyb3Vwcyhjb25maWd1cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKiBnZXQgYmFzZSBsYXllciBncm91cHMqL1xyXG4gIGdldEJhc2VMYXllckdyb3VwcygpOiBPYnNlcnZhYmxlPExheWVyR3JvdXBbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZUxheWVyR3JvdXBzU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKiBzZXQgYmFzZSBsYXllciBncm91cHMqL1xyXG4gIHNldEJhc2VMYXllckdyb3Vwcyhncm91cHM6QXJyYXk8TGF5ZXJHcm91cD4pIHtcclxuICAgIHRoaXMuYmFzZUxheWVyR3JvdXBzID0gZ3JvdXBzO1xyXG4gICAgdGhpcy5yZWZyZXNoQmFzZUxheWVyR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hCYXNlTGF5ZXJHcm91cHMoKSB7XHJcbiAgICAvLyBTZW5kIHRoZSBuZXcgdmFsdWVzIHNvIHRoYXQgYWxsIHN1YnNjcmliZXJzIGFyZSB1cGRhdGVkXHJcbiAgICB0aGlzLmJhc2VMYXllckdyb3Vwc1N1YmplY3QubmV4dCh0aGlzLmJhc2VMYXllckdyb3Vwcyk7XHJcbiAgfVxyXG5cclxuICAvKiogZ2V0IGxheWVycyovXHJcbiAgZ2V0TGF5ZXJzKCk6IE9ic2VydmFibGU8TGF5ZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKiByZW1vdmUgYWxsIGxheWVycyBmcm9tIG1hcCovXHJcbiAgY2xlYXJMYXllcnMocmVmcmVzaDpib29sZWFuKSB7XHJcbiAgICB3aGlsZSh0aGlzLmxheWVycy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5sYXllcnMucG9wKCk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVmcmVzaCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hMYXllcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBzZXQgbGF5ZXJzKi9cclxuICBzZXRMYXllcnMobGF5ZXJzOkFycmF5PExheWVyPikge1xyXG4gICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XHJcbiAgICB0aGlzLnJlZnJlc2hMYXllcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBhZGQgZ2l2ZW4gbGF5ZXIgdG8gbWFwKi9cclxuICBhZGRMYXllcihsYXllcjpMYXllcikge1xyXG4gICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XHJcbiAgICB0aGlzLnJlZnJlc2hBZGRMYXllcnMobGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqIGFkZCBnaXZlbiBsYXllciB0byBtYXAgYXQgZ2l2ZW4gaW5kZXgqL1xyXG4gIGFkZExheWVyQXQobGF5ZXI6TGF5ZXIsIGluZGV4Om51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgdGhpcy5sYXllcnMgPSBbbGF5ZXJdLmNvbmNhdCh0aGlzLmxheWVycyk7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID49IHRoaXMubGF5ZXJzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzID0gdGhpcy5sYXllcnMuc2xpY2UoMCwgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChbbGF5ZXJdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQodGhpcy5sYXllcnMuc2xpY2UoaW5kZXgsIHRoaXMubGF5ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoQWRkTGF5ZXJzKGxheWVyKTtcclxuICAgIHRoaXMucmVmcmVzaExheWVyQ29uZmlndXJhdGlvbihsYXllci5pZCwgbnVsbCwgbnVsbCwgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIHJlbW92ZSBnaXZlbiBsYXllciBmcm9tIG1hcCovXHJcbiAgcmVtb3ZlTGF5ZXIobGF5ZXI6TGF5ZXIpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMubGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xyXG4gICAgdGhpcy5yZW1vdmVMYXllckluZGV4KGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKiByZW1vdmUgbGF5ZXIgd2l0aCBnaXZlbiBpZCBmcm9tIG1hcCAqL1xyXG4gIHJlbW92ZUxheWVySWQoaWQpIHtcclxuICAgIHZhciBpbmRleCA9IC0xO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlMZW4gPSB0aGlzLmxheWVycy5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubGF5ZXJzW2ldLmlkID09IGlkKSB7XHJcbiAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbW92ZUxheWVySW5kZXgoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIHJlbW92ZSBsYXllciBhdCBnaXZlbiBpbmRleCBmcm9tIG1hcCAqL1xyXG4gIHJlbW92ZUxheWVySW5kZXgoaW5kZXg6bnVtYmVyKSB7XHJcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVyc1tpbmRleF07XHJcbiAgICB0aGlzLmxheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVtb3ZlTGF5ZXJzKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKiByZWZyZXNoIGxheWVycyAqL1xyXG4gIHByaXZhdGUgcmVmcmVzaExheWVycygpIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHRoaXMubGF5ZXJzU3ViamVjdC5uZXh0KHRoaXMubGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKiBPYnNlcnZhYmxlIGZvciBsYXllcnMgYWRkZWQgKi9cclxuICBnZXRMYXllcnNBZGRlZCgpOiBPYnNlcnZhYmxlPExheWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmFkZExheWVyc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hBZGRMYXllcnMobGF5ZXI6TGF5ZXIpIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHRoaXMuYWRkTGF5ZXJzU3ViamVjdC5uZXh0KFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJzUmVtb3ZlZCgpOiBPYnNlcnZhYmxlPExheWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLnJlbW92ZUxheWVyc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hSZW1vdmVMYXllcnMobGF5ZXI6TGF5ZXIpIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJzU3ViamVjdC5uZXh0KFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGF5ZXJDb25maWd1cmF0aW9uTGlzdGVuZXIoKTogT2JzZXJ2YWJsZTxMYXllckNvbmZpZ3VyYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDb25maWd1cmF0aW9uU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TGF5ZXJJbmRleEJ5SWQoaWQ6c3RyaW5nKTpudW1iZXJ7XHJcbiAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gdGhpcy5sYXllcnMubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyc1tpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuICBcclxuICAvKiogbW92ZSBsYXllciB3aXRoIGdpdmVuIGlkIHRvIHRoZSBnaXZlbiBpbmRleCovXHJcbiAgbW92ZUxheWVyKGlkLCBpbmRleCkge1xyXG4gICAgdmFyIGxheWVySW5kZXggPSB0aGlzLmdldExheWVySW5kZXhCeUlkKGlkKTtcclxuICAgIGlmIChsYXllckluZGV4ICE9IC0xKSB7XHJcbiAgICAgIHZhciBsYXllciA9IHRoaXMubGF5ZXJzLnNwbGljZShsYXllckluZGV4LCAxKTtcclxuICAgICAgdGhpcy5sYXllcnMgPSBcclxuICAgICAgICB0aGlzLmxheWVycy5zbGljZSgwLCBpbmRleClcclxuICAgICAgICAuY29uY2F0KGxheWVyKVxyXG4gICAgICAgIC5jb25jYXQodGhpcy5sYXllcnMuc2xpY2UoaW5kZXgsIHRoaXMubGF5ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoTGF5ZXJDb25maWd1cmF0aW9uKGlkLCBudWxsLCBudWxsLCBpbmRleCk7XHJcbiAgfVxyXG5cclxuICAvKiogY2hhbmdlIHZpc2liaWxpdHkgb2YgbGF5ZXIgd2l0aCBnaXZlbiBpZCB0byB0aGUgZ2l2ZW4gdmFsdWUqL1xyXG4gIGNoYW5nZUxheWVyVmlzaWJpbGl0eShpZCwgdmlzaWJpbGl0eSkge1xyXG4gICAgdGhpcy5yZWZyZXNoTGF5ZXJDb25maWd1cmF0aW9uKGlkLCBudWxsLCB2aXNpYmlsaXR5LCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKiBjaGFuZ2Ugb3BhY2l0eSBvZiBsYXllciB3aXRoIGdpdmVuIGlkIHRvIHRoZSBnaXZlbiB2YWx1ZSovXHJcbiAgY2hhbmdlTGF5ZXJPcGFjaXR5KGlkLCBvcGFjaXR5KSB7XHJcbiAgICB0aGlzLnJlZnJlc2hMYXllckNvbmZpZ3VyYXRpb24oaWQsIG9wYWNpdHksIG51bGwsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoTGF5ZXJDb25maWd1cmF0aW9uKGlkLCBvcGFjaXR5LCB2aXNpYmlsaXR5LCBwb3NpdGlvbikge1xyXG4gICAgLy8gU2VuZCB0aGUgbmV3IHZhbHVlcyBzbyB0aGF0IGFsbCBzdWJzY3JpYmVycyBhcmUgdXBkYXRlZFxyXG4gICAgdmFyIGxheWVyID0gbmV3IExheWVyQ29uZmlndXJhdGlvbigpO1xyXG4gICAgbGF5ZXIuaWQgPSBpZDtcclxuICAgIGxheWVyLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG4gICAgbGF5ZXIudmlzaWJpbGl0eSA9IHZpc2liaWxpdHk7XHJcbiAgICBsYXllci5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy5sYXllckNvbmZpZ3VyYXRpb25TdWJqZWN0Lm5leHQoW2xheWVyXSk7XHJcbiAgfVxyXG5cclxuICBnZXRTaXR1YXRpb25NYXBDb25maWd1cmF0aW9uTGlzdGVuZXIoKTogT2JzZXJ2YWJsZTxMYXllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXR1YXRpb25NYXBDb25maWd1cmF0aW9uU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKiBjb25maWd1cmUgdGhlIHNpdHVhdGlvbiBtYXAgb2YgdGhlIG1hcCBjb21wb25lbnQgYnkgcGFzc2luZyBhcyBhIHBhcmFtZXRlciBhbiBhcnJheSBvZiBvYmplY3RzIG9mIHR5cGUgTGF5ZXJHcm91cCwgZWFjaCBvZiB0aGVtIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgTGF5ZXIgb2JqZWN0cyBkZWZpbmluZyB0aGUgbGF5ZXJzIHRvIGxvYWQgYXMgc2l0dWF0aW9uIG1hcC4qL1xyXG4gIGxvYWRTaXR1YXRpb25NYXBDb25maWd1cmF0aW9uKGxheWVyczpBcnJheTxMYXllcj4pIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHRoaXMuc2l0dWF0aW9uTWFwQ29uZmlndXJhdGlvblN1YmplY3QubmV4dChsYXllcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFwT3B0aW9uc0NvbmZpZ3VyYXRpb25MaXN0ZW5lcigpOiBPYnNlcnZhYmxlPE1hcE9wdGlvbnNDb25maWd1cmF0aW9uW10+IHtcclxuICAgIHJldHVybiB0aGlzLm1hcE9wdGlvbnNDb25maWd1cmF0aW9uU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKiBsb2FkIG1hcCBvcHRpb25zIGNvbmZpZ3VyYXRpb24gKi9cclxuICBsb2FkTWFwT3B0aW9uc0NvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbjpNYXBPcHRpb25zQ29uZmlndXJhdGlvbikge1xyXG4gICAgLy8gU2VuZCB0aGUgbmV3IHZhbHVlcyBzbyB0aGF0IGFsbCBzdWJzY3JpYmVycyBhcmUgdXBkYXRlZFxyXG4gICAgdGhpcy5tYXBPcHRpb25zQ29uZmlndXJhdGlvblN1YmplY3QubmV4dChbY29uZmlndXJhdGlvbl0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFwQ29tcG9uZW50U3RhdHVzTGlzdGVuZXIoKTogT2JzZXJ2YWJsZTxNYXBDb21wb25lbnRTdGF0dXNbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwQ29tcG9uZW50U3RhdHVzU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNldCBtYXAgY29tcG9uZW50IHN0YXR1cyAqL1xyXG4gIHNldE1hcENvbXBvbmVudFN0YXR1cyhzdGF0dXM6TWFwQ29tcG9uZW50U3RhdHVzKSB7XHJcbiAgICAvL05vdGlmeSB0aGUgbWFwIGNvbXBvbmVudCBzdGF0dXNcclxuICAgIHRoaXMubWFwQ29tcG9uZW50U3RhdHVzU3ViamVjdC5uZXh0KFtzdGF0dXNdKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFByaW5jaXBhbCB9IGZyb20gJy4vcHJpbmNpcGFsLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEB3aGF0SXREb2VzIENvbmRpdGlvbmFsbHkgaW5jbHVkZXMgYW4gSFRNTCBlbGVtZW50IGlmIGN1cnJlbnQgdXNlciBoYXMgYW55XHJcbiAqIG9mIHRoZSBhdXRob3JpdGllcyBwYXNzZWQgYXMgdGhlIGBleHByZXNzaW9uYC5cclxuICpcclxuICogQGhvd1RvVXNlXHJcbiAqIGBgYFxyXG4gKiAgICAgPHNvbWUtZWxlbWVudCAqc2l0bXVuSGFzQW55QXV0aG9yaXR5PVwiJ1JPTEVfQURNSU4nXCI+Li4uPC9zb21lLWVsZW1lbnQ+XHJcbiAqXHJcbiAqICAgICA8c29tZS1lbGVtZW50ICpzaXRtdW5IYXNBbnlBdXRob3JpdHk9XCJbJ1JPTEVfQURNSU4nLCAnUk9MRV9VU0VSJ11cIj4uLi48L3NvbWUtZWxlbWVudD5cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3NpdG11bkhhc0FueUF1dGhvcml0eV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIYXNBbnlBdXRob3JpdHlEaXJlY3RpdmUge1xyXG4gICAgXHJcbiAgICAvKiogYXV0aG9yaXRpZXMgdG8gY2hlY2sgKi9cclxuICAgIHB1YmxpYyBhdXRob3JpdGllczogc3RyaW5nW107IFxyXG4gICAgXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogdGVycml0b3J5IHRvIGNoZWNrIGF1dGhvcml0aWVzKi9cclxuICAgIEBJbnB1dCgpIHRlcnJpdG9yeTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKiogU2V0IHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHNpdG11bkhhc0FueUF1dGhvcml0eSh2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5hdXRob3JpdGllcyA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBbIDxzdHJpbmc+IHZhbHVlIF0gOiA8c3RyaW5nW10+IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIC8vIEdldCBub3RpZmllZCBlYWNoIHRpbWUgYXV0aGVudGljYXRpb24gc3RhdGUgY2hhbmdlcy5cclxuICAgICAgICB0aGlzLnByaW5jaXBhbC5nZXRBdXRoZW50aWNhdGlvblN0YXRlKCkuc3Vic2NyaWJlKChpZGVudGl0eSkgPT4gdGhpcy51cGRhdGVWaWV3KCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogdXBkYXRlIHZpZXcgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50ZXJyaXRvcnkpe1xyXG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmhhc0FueUF1dGhvcml0eU9uVGVycml0b3J5KHRoaXMuYXV0aG9yaXRpZXMsdGhpcy50ZXJyaXRvcnkpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmhhc0FueUF1dGhvcml0eSh0aGlzLmF1dGhvcml0aWVzKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi9wcmluY2lwYWwuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQHdoYXRJdERvZXMgQ29uZGl0aW9uYWxseSBpbmNsdWRlcyBhbiBIVE1MIGVsZW1lbnQgaWYgY3VycmVudCB1c2VyIGhhcyBhbnlcclxuICogb2YgdGhlIGF1dGhvcml0aWVzIHBhc3NlZCBhcyB0aGUgYGV4cHJlc3Npb25gLlxyXG4gKlxyXG4gKiBAaG93VG9Vc2VcclxuICogYGBgXHJcbiAqICAgICA8c29tZS1lbGVtZW50ICpzaXRtdW5IYXNBbnlBdXRob3JpdHk9XCInUk9MRV9BRE1JTidcIj4uLi48L3NvbWUtZWxlbWVudD5cclxuICpcclxuICogICAgIDxzb21lLWVsZW1lbnQgKnNpdG11bkhhc0FueUF1dGhvcml0eT1cIlsnUk9MRV9BRE1JTicsICdST0xFX1VTRVInXVwiPi4uLjwvc29tZS1lbGVtZW50PlxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbc2l0bXVuSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnlEaXJlY3RpdmUge1xyXG5cclxuICAgIC8qKiBhdXRob3JpdGllcyB0byBjaGVjayAqL1xyXG4gICAgcHVibGljIGF1dGhvcml0aWVzOiBzdHJpbmdbXTsgXHJcblxyXG4gICAgLyoqIHRlcnJpdG9yeSB0byBjaGVjayBhdXRob3JpdGllcyovXHJcbiAgICBwdWJsaWMgdGVycml0b3J5OiBzdHJpbmc7IFxyXG5cclxuICAgIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmluY2lwYWw6IFByaW5jaXBhbCwgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBTZXQgd2hldGhlciBjdXJyZW50IHVzZXIgaGFzIGFueSBvZiB0aGUgZ2l2ZW4gYXV0aG9yaXRpZXMgb24gdGVycml0b3J5ICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHNpdG11bkhhc0FueUF1dGhvcml0eU9uVGVycml0b3J5KG9wdHM6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLmF1dGhvcml0aWVzID0gdHlwZW9mIG9wdHMuYXV0aG9yaXRpZXMgPT09ICdzdHJpbmcnID8gWyA8c3RyaW5nPiBvcHRzLmF1dGhvcml0aWVzIF0gOiA8c3RyaW5nW10+IG9wdHMuYXV0aG9yaXRpZXM7XHJcbiAgICAgICAgdGhpcy50ZXJyaXRvcnkgPSBvcHRzLnRlcnJpdG9yeTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICAvLyBHZXQgbm90aWZpZWQgZWFjaCB0aW1lIGF1dGhlbnRpY2F0aW9uIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAgICAgdGhpcy5wcmluY2lwYWwuZ2V0QXV0aGVudGljYXRpb25TdGF0ZSgpLnN1YnNjcmliZSgoaWRlbnRpdHkpID0+IHRoaXMudXBkYXRlVmlldygpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIHVwZGF0ZSB2aWV3ICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudGVycml0b3J5KXtcclxuICAgICAgICB0aGlzLnByaW5jaXBhbC5oYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeSh0aGlzLmF1dGhvcml0aWVzLHRoaXMudGVycml0b3J5KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnByaW5jaXBhbC5oYXNBbnlBdXRob3JpdHkodGhpcy5hdXRob3JpdGllcykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbi8vaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJy4uLy4uL2xpYi9hbmd1bGFyLWhhbCc7XHJcblxyXG5pbXBvcnQge1RlcnJpdG9yeVNlcnZpY2V9IGZyb20gJy4vdGVycml0b3J5L3RlcnJpdG9yeS5zZXJ2aWNlJztcclxuaW1wb3J0IHtUZXJyaXRvcnlUeXBlU2VydmljZX0gZnJvbSAnLi90ZXJyaXRvcnkvdGVycml0b3J5LXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VGVycml0b3J5R3JvdXBUeXBlU2VydmljZX0gZnJvbSAnLi90ZXJyaXRvcnkvdGVycml0b3J5LWdyb3VwLXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VXNlclBvc2l0aW9uU2VydmljZX0gZnJvbSAnLi91c2VyL3VzZXItcG9zaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7VXNlckNvbmZpZ3VyYXRpb25TZXJ2aWNlfSBmcm9tICcuL3VzZXIvdXNlci1jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1JvbGVTZXJ2aWNlfSBmcm9tICcuL3JvbGUvcm9sZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtVc2VyU2VydmljZX0gZnJvbSAnLi91c2VyL3VzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7Q29ubmVjdGlvblNlcnZpY2V9IGZyb20gJy4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tTZXJ2aWNlfSBmcm9tICcuL3Rhc2svdGFzay5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrVHlwZVNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VGFza0dyb3VwU2VydmljZX0gZnJvbSAnLi90YXNrL3Rhc2stZ3JvdXAuc2VydmljZSc7XHJcbmltcG9ydCB7VGFza1BhcmFtZXRlclNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXBhcmFtZXRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrQXZhaWxhYmlsaXR5U2VydmljZX0gZnJvbSAnLi90YXNrL3Rhc2stYXZhaWxhYmlsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tVSVNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXVpLnNlcnZpY2UnO1xyXG5pbXBvcnQge1NlcnZpY2VTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2Uvc2VydmljZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtTZXJ2aWNlUGFyYW1ldGVyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL3NlcnZpY2UtcGFyYW1ldGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5U2VydmljZX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eVNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHktYXZhaWxhYmlsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXBTZXJ2aWNlfSBmcm9tICcuL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQge0JhY2tncm91bmRTZXJ2aWNlfSBmcm9tICcuL2NhcnRvZ3JhcGh5L2JhY2tncm91bmQuc2VydmljZSc7XHJcbmltcG9ydCB7VHJlZVNlcnZpY2V9IGZyb20gJy4vdHJlZS90cmVlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1RyZWVOb2RlU2VydmljZX0gZnJvbSAnLi90cmVlL3RyZWUtbm9kZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvblNlcnZpY2V9IGZyb20gJy4vYXBwbGljYXRpb24vYXBwbGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7QXBwbGljYXRpb25QYXJhbWV0ZXJTZXJ2aWNlfSBmcm9tICcuL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvbkJhY2tncm91bmRTZXJ2aWNlfSBmcm9tICcuL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLWJhY2tncm91bmQuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcENvbmZpZ3VyYXRpb25NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vbWFwL21hcC1jb25maWd1cmF0aW9uLW1hbmFnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFByaW5jaXBhbCB9IGZyb20gJy4vYXV0aC9wcmluY2lwYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJy4vYXV0aC9hdXRoLmludGVyY2VwdG9yJztcclxuaW1wb3J0IHsgQXV0aEV4cGlyZWRJbnRlcmNlcHRvciB9IGZyb20gJy4vYXV0aC9hdXRoLWV4cGlyZWQuaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBIYXNBbnlBdXRob3JpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2F1dGgvaGFzLWFueS1hdXRob3JpdHkuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnlEaXJlY3RpdmUgfSBmcm9tICcuL2F1dGgvaGFzLWFueS1hdXRob3JpdHktb24tdGVycml0b3J5LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJy4vYXV0aC9sb2dpbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuL2FjY291bnQvYWNjb3VudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlclBvc2l0aW9ufSBmcm9tICcuL3VzZXIvdXNlci1wb3NpdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7VHJhbnNsYXRlSHR0cExvYWRlcn0gZnJvbSAnQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXInO1xyXG5pbXBvcnQge1RyYW5zbGF0ZUxvYWRlciwgVHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbi8qKiBsb2FkIGkxOG4gYXNzZXRzKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuL2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xyXG59XHJcblxyXG5cclxuLyoqIFNJVE1VTiBmcm9udGVuZCBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIC8qUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsKi9cclxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgbG9hZGVyOiB7XHJcbiAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxyXG4gICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVUcmFuc2xhdGVMb2FkZXIpLFxyXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSGFzQW55QXV0aG9yaXR5RGlyZWN0aXZlLFxyXG4gICAgSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnlEaXJlY3RpdmUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIYXNBbnlBdXRob3JpdHlEaXJlY3RpdmUsXHJcbiAgICBIYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeURpcmVjdGl2ZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBUZXJyaXRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIFRlcnJpdG9yeVR5cGVTZXJ2aWNlLFxyXG4gICAgICAgIFRlcnJpdG9yeUdyb3VwVHlwZVNlcnZpY2UsXHJcbiAgICAgICAgUm9sZVNlcnZpY2UsXHJcbiAgICAgICAgQWNjb3VudFNlcnZpY2UsXHJcbiAgICAgICAgQXV0aFNlcnZpY2UsXHJcbiAgICAgICAgVXNlclNlcnZpY2UsXHJcbiAgICAgICAgQ29ubmVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgVGFza1NlcnZpY2UsXHJcbiAgICAgICAgVGFza1R5cGVTZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tVSVNlcnZpY2UsXHJcbiAgICAgICAgVGFza0dyb3VwU2VydmljZSxcclxuICAgICAgICBUYXNrUGFyYW1ldGVyU2VydmljZSxcclxuICAgICAgICBUYXNrQXZhaWxhYmlsaXR5U2VydmljZSxcclxuICAgICAgICBTZXJ2aWNlU2VydmljZSxcclxuICAgICAgICBTZXJ2aWNlUGFyYW1ldGVyU2VydmljZSxcclxuICAgICAgICBDYXJ0b2dyYXBoeVNlcnZpY2UsXHJcbiAgICAgICAgQ2FydG9ncmFwaHlHcm91cFNlcnZpY2UsXHJcbiAgICAgICAgQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHlTZXJ2aWNlLFxyXG4gICAgICAgIEJhY2tncm91bmRTZXJ2aWNlLFxyXG4gICAgICAgIFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgIFRyZWVOb2RlU2VydmljZSxcclxuICAgICAgICBBcHBsaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgQXBwbGljYXRpb25QYXJhbWV0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIEFwcGxpY2F0aW9uQmFja2dyb3VuZFNlcnZpY2UsXHJcbiAgICAgICAgQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgIEF1dGhFeHBpcmVkSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgUHJpbmNpcGFsLFxyXG4gICAgICAgIFVzZXJQb3NpdGlvblNlcnZpY2UsXHJcbiAgICAgICAgVXNlckNvbmZpZ3VyYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIExvZ2luU2VydmljZSxcclxuICAgICAgICBNYXBDb25maWd1cmF0aW9uTWFuYWdlclNlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXHJcbiAgICAgICAgICB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLCB7XHJcbiAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcclxuICAgICAgICAgIHVzZUNsYXNzOiBBdXRoRXhwaXJlZEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7SGFsUGFyYW0sIFJlc3RTZXJ2aWNlfSBmcm9tICcuL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7RXh0ZXJuYWxTZXJ2aWNlfSBmcm9tICcuL2V4dGVybmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Jlc291cmNlU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlfSBmcm9tICcuL2V4dGVybmFsLWNvbmZpZ3VyYXRpb24uaGFuZGxlcic7XHJcblxyXG5pbXBvcnQgJ3J4anMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvY29uY2F0JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2RlZmVyJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb20nO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL21lcmdlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL29mJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3RpbWVyJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jb25jYXRNYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9leHBhbmQnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlcic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlyc3QnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2xldCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvcHVibGlzaFJlcGxheSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvcmVkdWNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlV2hpbGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcclxuaW1wb3J0IHtTdWJUeXBlQnVpbGRlcn0gZnJvbSAnLi9zdWJ0eXBlLWJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IHtFeHRlcm5hbFNlcnZpY2V9IGZyb20gJy4vZXh0ZXJuYWwuc2VydmljZSc7XHJcbmV4cG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuZXhwb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9yZXNvdXJjZSc7XHJcbmV4cG9ydCB7UmVzb3VyY2VBcnJheX0gZnJvbSAnLi9yZXNvdXJjZS1hcnJheSc7XHJcbmV4cG9ydCB7U29ydH0gZnJvbSAnLi9zb3J0JztcclxuZXhwb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5leHBvcnQge0V4dGVybmFsQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9FeHRlcm5hbENvbmZpZ3VyYXRpb24nO1xyXG5leHBvcnQge0V4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXJJbnRlcmZhY2V9IGZyb20gJy4vZXh0ZXJuYWwtY29uZmlndXJhdGlvbi5oYW5kbGVyJztcclxuZXhwb3J0IHtIYWxPcHRpb25zLCBIYWxQYXJhbX0gZnJvbSAnLi9yZXN0LnNlcnZpY2UnO1xyXG5leHBvcnQge1N1YlR5cGVCdWlsZGVyfSBmcm9tICcuL3N1YnR5cGUtYnVpbGRlcic7XHJcblxyXG5cclxuLyoqIEFuZ3VsYXIgSEFMIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcclxuICAgIGV4cG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEV4dGVybmFsU2VydmljZSxcclxuICAgICAgICBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICB1c2VDbGFzczogUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICBkZXBzOiBbRXh0ZXJuYWxTZXJ2aWNlXVxyXG4gICAgICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFySGFsTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIEV4dGVybmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBSZXNvdXJjZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW0V4dGVybmFsU2VydmljZV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iXX0=