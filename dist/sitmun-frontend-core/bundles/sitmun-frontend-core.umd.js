(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('url'), require('@angular/common/http'), require('util'), require('@angular/core'), require('rxjs-compat'), require('@angular/router'), require('@ngx-translate/http-loader'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@sitmun/frontend-core', ['exports', 'rxjs', 'rxjs/operators', 'url', '@angular/common/http', 'util', '@angular/core', 'rxjs-compat', '@angular/router', '@ngx-translate/http-loader', '@ngx-translate/core'], factory) :
    (factory((global.sitmun = global.sitmun || {}, global.sitmun['frontend-core'] = {}),global.rxjs,global.rxjs.operators,null,global.ng.common.http,null,global.ng.core,null,global.ng.router,null,null));
}(this, (function (exports,rxjs,operators,url,i1,util,i0,rxjsCompat,router,httpLoader,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    // unsupported: template constraints.
    /**
     * REST array of resource implementation
     * @template T
     */
    var  
    // unsupported: template constraints.
    /**
     * REST array of resource implementation
     * @template T
     */
    ResourceArray = (function () {
        function ResourceArray() {
            var _this = this;
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
            this.push = function (el) {
                _this.result.push(el);
            };
            /**
             * length of the array
             */
            this.length = function () {
                return _this.result.length;
            };
            /**
             * load array data from REST request
             */
            this.init = function (type, response, sortInfo) {
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(_this._embedded);
                result.sortInfo = sortInfo;
                ResourceHelper.instantiateResourceCollection(type, response, result);
                return result;
            };
            /**
             * Load next page
             */
            this.next = function (type) {
                if (_this.next_uri) {
                    return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.next_uri), { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
                }
                return rxjs.throwError('no next defined');
            };
            /**
             * Load previous page
             */
            this.prev = function (type) {
                if (_this.prev_uri) {
                    return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.prev_uri), { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
                }
                return rxjs.throwError('no prev defined');
            };
            /**
             * Load first page
             */
            this.first = function (type) {
                if (_this.first_uri) {
                    return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.first_uri), { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
                }
                return rxjs.throwError('no first defined');
            };
            /**
             * Load last page
             */
            this.last = function (type) {
                if (_this.last_uri) {
                    return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.last_uri), { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
                }
                return rxjs.throwError('no last defined');
            };
            /**
             * Load page with given pageNumber
             */
            this.page = function (type, pageNumber) {
                _this.self_uri = _this.self_uri.replace('{?page,size,sort}', '');
                _this.self_uri = _this.self_uri.replace('{&sort}', '');
                /** @type {?} */
                var urlParsed = url.parse(ResourceHelper.getProxy(_this.self_uri));
                /** @type {?} */
                var query = ResourceArray.replaceOrAdd(urlParsed.query, 'size', _this.pageSize.toString());
                query = ResourceArray.replaceOrAdd(query, 'page', pageNumber.toString());
                /** @type {?} */
                var uri = urlParsed.query ?
                    ResourceHelper.getProxy(_this.self_uri).replace(urlParsed.query, query) : ResourceHelper.getProxy(_this.self_uri).concat(query);
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
            /**
             * Sort collection based on given sort attribute
             */
            this.sortElements = function (type) {
                var sort = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    sort[_i - 1] = arguments[_i];
                }
                _this.self_uri = _this.self_uri.replace('{?page,size,sort}', '');
                _this.self_uri = _this.self_uri.replace('{&sort}', '');
                /** @type {?} */
                var uri = ResourceHelper.getProxy(_this.self_uri).concat('?', 'size=', _this.pageSize.toString(), '&page=', _this.pageNumber.toString());
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, sort); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
            /**
             * Load page with given size
             */
            this.size = function (type, size) {
                /** @type {?} */
                var uri = ResourceHelper.getProxy(_this.self_uri).concat('?', 'size=', size.toString());
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(operators.map(function (response) { return _this.init(type, response, _this.sortInfo); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        }
        /**
         * Add sort info to given URI
         * @param {?} uri
         * @return {?}
         */
        ResourceArray.prototype.addSortInfo = /**
         * Add sort info to given URI
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                if (this.sortInfo) {
                    try {
                        for (var _a = __values(this.sortInfo), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var item = _b.value;
                            uri = uri.concat('&sort=', item.path, ',', item.order);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                return uri;
                var e_1, _c;
            };
        /**
         * Add replace or add param value to query string
         * @param {?} query
         * @param {?} field
         * @param {?} value
         * @return {?}
         */
        ResourceArray.replaceOrAdd = /**
         * Add replace or add param value to query string
         * @param {?} query
         * @param {?} field
         * @param {?} value
         * @return {?}
         */
            function (query, field, value) {
                if (query) {
                    /** @type {?} */
                    var idx = query.indexOf(field);
                    /** @type {?} */
                    var idxNextAmp = query.indexOf('&', idx) == -1 ? query.indexOf('/', idx) : query.indexOf('&', idx);
                    if (idx != -1) {
                        /** @type {?} */
                        var seachValue = query.substring(idx, idxNextAmp);
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
            };
        return ResourceArray;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * REST API access helper
     */
    var ResourceHelper = (function () {
        function ResourceHelper() {
        }
        /** get request headers */
        /*public static get headers(): HttpHeaders {
            if (isNullOrUndefined(this._headers))
              ResourceHelper._headers = new HttpHeaders();
            return ResourceHelper._headers;
        }*/
        /** set request headers */
        /*public static set headers(headers: HttpHeaders) {
          ResourceHelper._headers = headers;
        }*/
        /** get request option params */
        /**
         * get request option params
         * @param {?} params
         * @param {?=} options
         * @return {?}
         */
        ResourceHelper.optionParams = /**
         * get request option params
         * @param {?} params
         * @param {?=} options
         * @return {?}
         */
            function (params, options) {
                if (options) {
                    if (options.params) {
                        try {
                            for (var _a = __values(options.params), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var param = _b.value;
                                params = params.append(param.key, param.value.toString());
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                    }
                    if (options.size) {
                        params = params.append('size', options.size.toString());
                    }
                    if (options.sort) {
                        try {
                            for (var _d = __values(options.sort), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var s = _e.value;
                                /** @type {?} */
                                var sortString = '';
                                sortString = s.path ? sortString.concat(s.path) : sortString;
                                sortString = s.order ? sortString.concat(',').concat(s.order) : sortString;
                                params = params.append('sort', sortString);
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_e && !_e.done && (_f = _d.return))
                                    _f.call(_d);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                    }
                }
                return params;
                var e_1, _c, e_2, _f;
            };
        /** resolve resource relations */
        /**
         * resolve resource relations
         * @param {?} resource
         * @return {?}
         */
        ResourceHelper.resolveRelations = /**
         * resolve resource relations
         * @param {?} resource
         * @return {?}
         */
            function (resource) {
                var _this = this;
                /** @type {?} */
                var result = {};
                var _loop_1 = function (key) {
                    if (!util.isNullOrUndefined(resource[key])) {
                        if (ResourceHelper.className(resource[key])
                            .find(function (className) { return className == 'Resource'; })) {
                            if (resource[key]['_links'])
                                result[key] = resource[key]['_links']['self']['href'];
                        }
                        else if (Array.isArray(resource[key])) {
                            /** @type {?} */
                            var array = resource[key];
                            if (array) {
                                result[key] = new Array();
                                array.forEach(function (element) {
                                    if (util.isPrimitive(element)) {
                                        result[key].push(element);
                                    }
                                    else {
                                        result[key].push(_this.resolveRelations(element));
                                    }
                                });
                            }
                        }
                        else {
                            result[key] = resource[key];
                        }
                    }
                };
                for (var key in resource) {
                    _loop_1(key);
                }
                return /** @type {?} */ (result);
            };
        /** create an empty resource from embedded data*/
        /**
         * create an empty resource from embedded data
         * @template T
         * @param {?} _embedded
         * @return {?}
         */
        ResourceHelper.createEmptyResult = /**
         * create an empty resource from embedded data
         * @template T
         * @param {?} _embedded
         * @return {?}
         */
            function (_embedded) {
                /** @type {?} */
                var resourceArray = new ResourceArray();
                resourceArray._embedded = _embedded;
                return resourceArray;
            };
        /** get resource class name*/
        /**
         * get resource class name
         * @param {?} obj
         * @return {?}
         */
        ResourceHelper.getClassName = /**
         * get resource class name
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                /** @type {?} */
                var funcNameRegex = /function (.+?)\(/;
                /** @type {?} */
                var results = (funcNameRegex).exec(obj.constructor.toString());
                return (results && results.length > 1) ? results[1] : '';
            };
        /** get resource class name from a prototype object*/
        /**
         * get resource class name from a prototype object
         * @param {?} objProto
         * @return {?}
         */
        ResourceHelper.className = /**
         * get resource class name from a prototype object
         * @param {?} objProto
         * @return {?}
         */
            function (objProto) {
                /** @type {?} */
                var classNames = [];
                /** @type {?} */
                var obj = Object.getPrototypeOf(objProto);
                /** @type {?} */
                var className;
                while ((className = ResourceHelper.getClassName(obj)) !== 'Object') {
                    classNames.push(className);
                    obj = Object.getPrototypeOf(obj);
                }
                return classNames;
            };
        /** instantiate a ResourceCollection from response embedded data*/
        /**
         * instantiate a ResourceCollection from response embedded data
         * @template T
         * @param {?} type
         * @param {?} payload
         * @param {?} result
         * @param {?=} builder
         * @param {?=} embeddedName
         * @return {?}
         */
        ResourceHelper.instantiateResourceCollection = /**
         * instantiate a ResourceCollection from response embedded data
         * @template T
         * @param {?} type
         * @param {?} payload
         * @param {?} result
         * @param {?=} builder
         * @param {?=} embeddedName
         * @return {?}
         */
            function (type, payload, result, builder, embeddedName) {
                try {
                    for (var _a = __values(Object.keys(payload[result._embedded])), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var embeddedClassName = _b.value;
                        if (!embeddedName || (embeddedName && embeddedClassName == embeddedName)) {
                            /** @type {?} */
                            var embedded = payload[result._embedded];
                            /** @type {?} */
                            var items = embedded[embeddedClassName];
                            try {
                                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                                    var item = items_1_1.value;
                                    /** @type {?} */
                                    var instance = new type();
                                    instance = this.searchSubtypes(builder, embeddedClassName, instance);
                                    this.instantiateResource(instance, item);
                                    result.push(instance);
                                }
                            }
                            catch (e_3_1) {
                                e_3 = { error: e_3_1 };
                            }
                            finally {
                                try {
                                    if (items_1_1 && !items_1_1.done && (_c = items_1.return))
                                        _c.call(items_1);
                                }
                                finally {
                                    if (e_3)
                                        throw e_3.error;
                                }
                            }
                        }
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_d = _a.return))
                            _d.call(_a);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
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
                var e_4, _d, e_3, _c;
            };
        /** search subtypes*/
        /**
         * search subtypes
         * @template T
         * @param {?} builder
         * @param {?} embeddedClassName
         * @param {?} instance
         * @return {?}
         */
        ResourceHelper.searchSubtypes = /**
         * search subtypes
         * @template T
         * @param {?} builder
         * @param {?} embeddedClassName
         * @param {?} instance
         * @return {?}
         */
            function (builder, embeddedClassName, instance) {
                if (builder && builder.subtypes) {
                    /** @type {?} */
                    var keys = builder.subtypes.keys();
                    Array.from(keys).forEach(function (subtypeKey) {
                        if (embeddedClassName.toLowerCase().startsWith(subtypeKey.toLowerCase())) {
                            /** @type {?} */
                            var subtype = builder.subtypes.get(subtypeKey);
                            instance = new subtype();
                        }
                    });
                }
                return instance;
            };
        /** instantiate a Resource from response */
        /**
         * instantiate a Resource from response
         * @template T
         * @param {?} entity
         * @param {?} payload
         * @return {?}
         */
        ResourceHelper.instantiateResource = /**
         * instantiate a Resource from response
         * @template T
         * @param {?} entity
         * @param {?} payload
         * @return {?}
         */
            function (entity, payload) {
                for (var p in payload) {
                    //TODO array init
                    /* if(entity[p].constructor === Array && isNullOrUndefined(payload[p]))
                                     entity[p] = [];
                                 else*/
                    entity[p] = payload[p];
                }
                return entity;
            };
        /** set proxy URL */
        /**
         * set proxy URL
         * @param {?} proxy_uri
         * @return {?}
         */
        ResourceHelper.setProxyUri = /**
         * set proxy URL
         * @param {?} proxy_uri
         * @return {?}
         */
            function (proxy_uri) {
                ResourceHelper.proxy_uri = proxy_uri;
            };
        /** set Root URI */
        /**
         * set Root URI
         * @param {?} root_uri
         * @return {?}
         */
        ResourceHelper.setRootUri = /**
         * set Root URI
         * @param {?} root_uri
         * @return {?}
         */
            function (root_uri) {
                ResourceHelper.root_uri = root_uri;
            };
        /**
         * get proxy URL
         * @return {?}
         */
        ResourceHelper.getURL = /**
         * get proxy URL
         * @return {?}
         */
            function () {
                return ResourceHelper.proxy_uri && ResourceHelper.proxy_uri != '' ?
                    ResourceHelper.addSlash(ResourceHelper.proxy_uri) :
                    ResourceHelper.addSlash(ResourceHelper.root_uri);
            };
        /**
         * add slash to URI
         * @param {?} uri
         * @return {?}
         */
        ResourceHelper.addSlash = /**
         * add slash to URI
         * @param {?} uri
         * @return {?}
         */
            function (uri) {
                /** @type {?} */
                var uriParsed = url.parse(uri);
                if (util.isNullOrUndefined(uriParsed.search) && uri && uri[uri.length - 1] != '/')
                    return uri + '/';
                return uri;
            };
        /**
         * get proxy from URL
         * @param {?} url
         * @return {?}
         */
        ResourceHelper.getProxy = /**
         * get proxy from URL
         * @param {?} url
         * @return {?}
         */
            function (url$$1) {
                if (!ResourceHelper.proxy_uri || ResourceHelper.proxy_uri == '')
                    return url$$1;
                return ResourceHelper.addSlash(url$$1.replace(ResourceHelper.root_uri, ResourceHelper.proxy_uri));
            };
        /**
         * set HttpClient
         * @param {?} http
         * @return {?}
         */
        ResourceHelper.setHttp = /**
         * set HttpClient
         * @param {?} http
         * @return {?}
         */
            function (http) {
                ResourceHelper.http = http;
            };
        /**
         * get HttpClient
         * @return {?}
         */
        ResourceHelper.getHttp = /**
         * get HttpClient
         * @return {?}
         */
            function () {
                return ResourceHelper.http;
            };
        /** get root URI*/
        /**
         * get root URI
         * @return {?}
         */
        ResourceHelper.getRootUri = /**
         * get root URI
         * @return {?}
         */
            function () {
                return ResourceHelper.root_uri;
            };
        /**
         * HttpHeaders
         */
        ResourceHelper.headers = new i1.HttpHeaders();
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
        return ResourceHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract resource class
     * @abstract
     */
    var Resource = (function () {
        /** constructor*/
        function Resource() {
        }
        Object.defineProperty(Resource.prototype, "subtypes", {
            get: /**
             * get subtypes
             * @return {?}
             */ function () {
                return this._subtypes;
            },
            set: /**
             * set subtypes
             * @param {?} _subtypes
             * @return {?}
             */ function (_subtypes) {
                this._subtypes = _subtypes;
            },
            enumerable: true,
            configurable: true
        });
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
        Resource.prototype.getRelationArray = /**
         * Get collection of related resources
         * @template T
         * @param {?} type
         * @param {?} relation
         * @param {?=} _embedded
         * @param {?=} options
         * @param {?=} builder
         * @return {?}
         */
            function (type, relation, _embedded, options, builder) {
                /** @type {?} */
                var params = ResourceHelper.optionParams(new i1.HttpParams(), options);
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(util.isNullOrUndefined(_embedded) ? "_embedded" : _embedded);
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(this._links[relation].href), {
                        headers: ResourceHelper.headers,
                        params: params
                    });
                    return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, builder); }), operators.map(function (array) { return array.result; }));
                }
                else {
                    return rxjs.of([]);
                }
            };
        /**
         * Get related resource
         * @template T
         * @param {?} type
         * @param {?} relation
         * @param {?=} builder
         * @return {?}
         */
        Resource.prototype.getRelation = /**
         * Get related resource
         * @template T
         * @param {?} type
         * @param {?} relation
         * @param {?=} builder
         * @return {?}
         */
            function (type, relation, builder) {
                /** @type {?} */
                var result = new type();
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(this._links[relation].href), { headers: ResourceHelper.headers });
                    return observable.pipe(operators.map(function (data) {
                        if (builder) {
                            try {
                                for (var _a = __values(Object.keys(data['_links'])), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var embeddedClassName = _b.value;
                                    if (embeddedClassName == 'self') {
                                        /** @type {?} */
                                        var href = data._links[embeddedClassName].href;
                                        /** @type {?} */
                                        var idx = href.lastIndexOf('/');
                                        /** @type {?} */
                                        var realClassName = href.replace(ResourceHelper.getRootUri(), "").substring(0, idx);
                                        result = ResourceHelper.searchSubtypes(builder, realClassName, result);
                                        break;
                                    }
                                }
                            }
                            catch (e_1_1) {
                                e_1 = { error: e_1_1 };
                            }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return))
                                        _c.call(_a);
                                }
                                finally {
                                    if (e_1)
                                        throw e_1.error;
                                }
                            }
                        }
                        return ResourceHelper.instantiateResource(result, data);
                        var e_1, _c;
                    }));
                }
                else {
                    return rxjs.of(null);
                }
            };
        /**
         * Adds the given resource to the bound collection by the relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
        Resource.prototype.addRelation = /**
         * Adds the given resource to the bound collection by the relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
            function (relation, resource) {
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
                    return ResourceHelper.getHttp().post(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
                }
                else {
                    return rxjs.throwError('no relation found');
                }
            };
        /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
        Resource.prototype.updateRelation = /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
            function (relation, resource) {
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
                    return ResourceHelper.getHttp().patch(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
                }
                else {
                    return rxjs.throwError('no relation found');
                }
            };
        /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
        Resource.prototype.substituteRelation = /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
            function (relation, resource) {
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
                    return ResourceHelper.getHttp().put(ResourceHelper.getProxy(this._links[relation].href), resource._links.self.href, { headers: header });
                }
                else {
                    return rxjs.throwError('no relation found');
                }
            };
        /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resources
         * @return {?}
         */
        Resource.prototype.substituteAllRelation = /**
         * Bind the given resource to this resource by the given relation
         * @template T
         * @param {?} relation
         * @param {?} resources
         * @return {?}
         */
            function (relation, resources) {
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(this._links[relation])) {
                    /** @type {?} */
                    var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
                    return ResourceHelper.getHttp().put(ResourceHelper.getProxy(this._links[relation].href), resources.map(function (resource) { return resource._links.self.href; }), { headers: header });
                }
                else {
                    return rxjs.throwError('no relation found');
                }
            };
        /**
         * Unbind the resource with the given relation from this resource
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
        Resource.prototype.deleteRelation = /**
         * Unbind the resource with the given relation from this resource
         * @template T
         * @param {?} relation
         * @param {?} resource
         * @return {?}
         */
            function (relation, resource) {
                if (!util.isNullOrUndefined(this._links) && !util.isNullOrUndefined(resource._links)) {
                    /** @type {?} */
                    var link = resource._links['self'].href;
                    /** @type {?} */
                    var idx = link.lastIndexOf('/') + 1;
                    if (idx == -1)
                        return rxjs.throwError('no relation found');
                    /** @type {?} */
                    var relationId = link.substring(idx);
                    return ResourceHelper.getHttp().delete(ResourceHelper.getProxy(this._links[relation].href + '/' + relationId), { headers: ResourceHelper.headers });
                }
                else {
                    return rxjs.throwError('no relation found');
                }
            };
        /**
         * Unbind the resource with the given relation from this resource
         * @template T
         * @param {?} relation
         * @return {?}
         */
        Resource.prototype.deleteAllRelation = /**
         * Unbind the resource with the given relation from this resource
         * @template T
         * @param {?} relation
         * @return {?}
         */
            function (relation) {
                return ResourceHelper.getHttp().delete(ResourceHelper.getProxy(this._links[relation].href), { headers: ResourceHelper.headers });
            };
        Resource.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        Resource.ctorParameters = function () { return []; };
        return Resource;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User model
     */
    var /**
     * User model
     */ User = (function (_super) {
        __extends(User, _super);
        function User() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return User;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * ExternalService
     */
    var ExternalService = (function () {
        /** constructor */
        function ExternalService(externalConfigurationService) {
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
        ExternalService.prototype.updateExternalConfigurationHandlerInterface = /**
         * update ExternalConfigurationHandler
         * @param {?} externalConfigurationService
         * @return {?}
         */
            function (externalConfigurationService) {
                this.externalConfigurationService = externalConfigurationService;
                ResourceHelper.setProxyUri(externalConfigurationService.getProxyUri());
                ResourceHelper.setRootUri(externalConfigurationService.getRootUri());
                ResourceHelper.setHttp(externalConfigurationService.getHttp());
            };
        /**
         * get ExternalConfiguration
         * @return {?}
         */
        ExternalService.prototype.getExternalConfiguration = /**
         * get ExternalConfiguration
         * @return {?}
         */
            function () {
                return this.externalConfigurationService.getExternalConfiguration();
            };
        /**
         * get proxy URL
         * @return {?}
         */
        ExternalService.prototype.getProxyUri = /**
         * get proxy URL
         * @return {?}
         */
            function () {
                return this.externalConfigurationService.getProxyUri();
            };
        /**
         * get Root URI
         * @return {?}
         */
        ExternalService.prototype.getRootUri = /**
         * get Root URI
         * @return {?}
         */
            function () {
                return this.externalConfigurationService.getRootUri();
            };
        /**
         * get URL
         * @return {?}
         */
        ExternalService.prototype.getURL = /**
         * get URL
         * @return {?}
         */
            function () {
                return ResourceHelper.getURL();
            };
        /**
         * get HttpClient
         * @return {?}
         */
        ExternalService.prototype.getHttp = /**
         * get HttpClient
         * @return {?}
         */
            function () {
                return ResourceHelper.getHttp();
            };
        ExternalService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ExternalService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: ['ExternalConfigurationService',] }] }
            ];
        };
        return ExternalService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * ResourceService
     */
    var ResourceService = (function () {
        /** constructor */
        function ResourceService(externalService) {
            this.externalService = externalService;
        }
        /**
         * get URL
         * @return {?}
         */
        ResourceService.getURL = /**
         * get URL
         * @return {?}
         */
            function () {
                return ResourceHelper.getURL();
            };
        /**
         * get all resources from a base URI of a given type
         * @template T
         * @param {?} type
         * @param {?} resource
         * @param {?} _embedded
         * @param {?=} options
         * @param {?=} subType
         * @param {?=} embeddedName
         * @return {?}
         */
        ResourceService.prototype.getAll = /**
         * get all resources from a base URI of a given type
         * @template T
         * @param {?} type
         * @param {?} resource
         * @param {?} _embedded
         * @param {?=} options
         * @param {?=} subType
         * @param {?=} embeddedName
         * @return {?}
         */
            function (type, resource, _embedded, options, subType, embeddedName) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource).concat('?projection=view');
                /** @type {?} */
                var params = ResourceHelper.optionParams(new i1.HttpParams(), options);
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(_embedded);
                this.setUrls(result);
                result.sortInfo = options ? options.sort : undefined;
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
                return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, subType, embeddedName); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * get resource from a base URI and a given id
         * @template T
         * @param {?} type
         * @param {?} resource
         * @param {?} id
         * @return {?}
         */
        ResourceService.prototype.get = /**
         * get resource from a base URI and a given id
         * @template T
         * @param {?} type
         * @param {?} resource
         * @param {?} id
         * @return {?}
         */
            function (type, resource, id) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource).concat('/', id, '?projection=view');
                /** @type {?} */
                var result = new type();
                this.setUrlsResource(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers });
                return observable.pipe(operators.map(function (data) { return ResourceHelper.instantiateResource(result, data); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * get resource from its selflink
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @return {?}
         */
        ResourceService.prototype.getBySelfLink = /**
         * get resource from its selflink
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @return {?}
         */
            function (type, resourceLink) {
                /** @type {?} */
                var result = new type();
                this.setUrlsResource(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), { headers: ResourceHelper.headers });
                return observable.pipe(operators.map(function (data) { return ResourceHelper.instantiateResource(result, data); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
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
        ResourceService.prototype.search = /**
         * search resources from a given base path, query and options
         * @template T
         * @param {?} type
         * @param {?} query
         * @param {?} resource
         * @param {?} _embedded
         * @param {?=} options
         * @return {?}
         */
            function (type, query, resource, _embedded, options) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource).concat('/search/', query);
                /** @type {?} */
                var params = ResourceHelper.optionParams(new i1.HttpParams(), options);
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(_embedded);
                this.setUrls(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
                return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * search a single resource from a given base path, query and options
         * @template T
         * @param {?} type
         * @param {?} query
         * @param {?} resource
         * @param {?=} options
         * @return {?}
         */
        ResourceService.prototype.searchSingle = /**
         * search a single resource from a given base path, query and options
         * @template T
         * @param {?} type
         * @param {?} query
         * @param {?} resource
         * @param {?=} options
         * @return {?}
         */
            function (type, query, resource, options) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource).concat('/search/', query);
                /** @type {?} */
                var params = ResourceHelper.optionParams(new i1.HttpParams(), options);
                /** @type {?} */
                var result = new type();
                this.setUrlsResource(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
                return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResource(result, response); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
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
        ResourceService.prototype.customQuery = /**
         * search resources from a given base path, custom query and options
         * @template T
         * @param {?} type
         * @param {?} query
         * @param {?} resource
         * @param {?} _embedded
         * @param {?=} options
         * @return {?}
         */
            function (type, query, resource, _embedded, options) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource + query);
                /** @type {?} */
                var params = ResourceHelper.optionParams(new i1.HttpParams(), options);
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(_embedded);
                this.setUrls(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
                return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * get resource given a relation link
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @return {?}
         */
        ResourceService.prototype.getByRelation = /**
         * get resource given a relation link
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @return {?}
         */
            function (type, resourceLink) {
                /** @type {?} */
                var result = new type();
                this.setUrlsResource(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
                return observable.pipe(operators.map(function (data) { return ResourceHelper.instantiateResource(result, data); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * get resource array given a relation link
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @param {?} _embedded
         * @param {?=} builder
         * @return {?}
         */
        ResourceService.prototype.getByRelationArray = /**
         * get resource array given a relation link
         * @template T
         * @param {?} type
         * @param {?} resourceLink
         * @param {?} _embedded
         * @param {?=} builder
         * @return {?}
         */
            function (type, resourceLink, _embedded, builder) {
                /** @type {?} */
                var result = ResourceHelper.createEmptyResult(_embedded);
                this.setUrls(result);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
                return observable.pipe(operators.map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, builder); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * count resources given a path
         * @param {?} resource
         * @return {?}
         */
        ResourceService.prototype.count = /**
         * count resources given a path
         * @param {?} resource
         * @return {?}
         */
            function (resource) {
                /** @type {?} */
                var uri = this.getResourceUrl(resource).concat('/search/countAll');
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, observe: 'body' }).pipe(operators.map(function (response) { return Number(response.body); }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * create resource from self link and entity data
         * @template T
         * @param {?} selfResource
         * @param {?} entity
         * @return {?}
         */
        ResourceService.prototype.create = /**
         * create resource from self link and entity data
         * @template T
         * @param {?} selfResource
         * @param {?} entity
         * @return {?}
         */
            function (selfResource, entity) {
                /** @type {?} */
                var uri = ResourceHelper.getURL() + selfResource;
                /** @type {?} */
                var payload = ResourceHelper.resolveRelations(entity);
                this.setUrlsResource(entity);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().post(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
                return observable.pipe(operators.map(function (response) {
                    if (response.status >= 200 && response.status <= 207)
                        return ResourceHelper.instantiateResource(entity, response.body);
                    else if (response.status == 500) {
                        /** @type {?} */
                        var body = response.body;
                        return rxjs.throwError(body.error);
                    }
                }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * update resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
        ResourceService.prototype.update = /**
         * update resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                /** @type {?} */
                var uri = ResourceHelper.getProxy(entity._links.self.href);
                /** @type {?} */
                var payload = ResourceHelper.resolveRelations(entity);
                this.setUrlsResource(entity);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().put(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
                return observable.pipe(operators.map(function (response) {
                    if (response.status >= 200 && response.status <= 207)
                        return ResourceHelper.instantiateResource(entity, response.body);
                    else if (response.status == 500) {
                        /** @type {?} */
                        var body = response.body;
                        return rxjs.throwError(body.error);
                    }
                }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * update resource from a given entity data
         * @template T
         * @param {?} resourceArray
         * @param {?} resourceLink
         * @return {?}
         */
        ResourceService.prototype.updateCollection = /**
         * update resource from a given entity data
         * @template T
         * @param {?} resourceArray
         * @param {?} resourceLink
         * @return {?}
         */
            function (resourceArray, resourceLink) {
                /** @type {?} */
                var uri = ResourceHelper.getProxy(resourceLink);
                /** @type {?} */
                var headersReq = ResourceHelper.headers;
                headersReq.set("Content-Type", "text/uri-list");
                /** @type {?} */
                var observable = ResourceHelper.getHttp().put(uri, resourceArray, { headers: headersReq, observe: 'response' });
                return observable.pipe(operators.map(function (response) {
                    if (response.status >= 200 && response.status <= 207)
                        return "";
                    else if (response.status == 500) {
                        /** @type {?} */
                        var body = response.body;
                        return rxjs.throwError(body.error);
                    }
                }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * patch resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
        ResourceService.prototype.patch = /**
         * patch resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                /** @type {?} */
                var uri = ResourceHelper.getProxy(entity._links.self.href);
                /** @type {?} */
                var payload = ResourceHelper.resolveRelations(entity);
                this.setUrlsResource(entity);
                /** @type {?} */
                var observable = ResourceHelper.getHttp().patch(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
                return observable.pipe(operators.map(function (response) {
                    if (response.status >= 200 && response.status <= 207)
                        return ResourceHelper.instantiateResource(entity, response.body);
                    else if (response.status == 500) {
                        /** @type {?} */
                        var body = response.body;
                        return rxjs.throwError(body.error);
                    }
                }), operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * delete resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
        ResourceService.prototype.delete = /**
         * delete resource from a given entity data
         * @template T
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                /** @type {?} */
                var uri = ResourceHelper.getProxy(entity._links.self.href);
                return ResourceHelper.getHttp().delete(uri, { headers: ResourceHelper.headers }).pipe(operators.catchError(function (error) { return rxjs.throwError(error); }));
            };
        /**
         * whether a resource array has next page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
        ResourceService.prototype.hasNext = /**
         * whether a resource array has next page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
            function (resourceArray) {
                return resourceArray.next_uri != undefined;
            };
        /**
         * whether a resource array has previous page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
        ResourceService.prototype.hasPrev = /**
         * whether a resource array has previous page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
            function (resourceArray) {
                return resourceArray.prev_uri != undefined;
            };
        /**
         * whether a resource array has first page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
        ResourceService.prototype.hasFirst = /**
         * whether a resource array has first page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
            function (resourceArray) {
                return resourceArray.first_uri != undefined;
            };
        /**
         * whether a resource array has last page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
        ResourceService.prototype.hasLast = /**
         * whether a resource array has last page of results
         * @template T
         * @param {?} resourceArray
         * @return {?}
         */
            function (resourceArray) {
                return resourceArray.last_uri != undefined;
            };
        /**
         * get resource array next page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
        ResourceService.prototype.next = /**
         * get resource array next page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
            function (resourceArray, type) {
                return resourceArray.next(type);
            };
        /**
         * get resource array previous page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
        ResourceService.prototype.prev = /**
         * get resource array previous page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
            function (resourceArray, type) {
                return resourceArray.prev(type);
            };
        /**
         * get resource array first page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
        ResourceService.prototype.first = /**
         * get resource array first page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
            function (resourceArray, type) {
                return resourceArray.first(type);
            };
        /**
         * get resource array last page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
        ResourceService.prototype.last = /**
         * get resource array last page of results
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @return {?}
         */
            function (resourceArray, type) {
                return resourceArray.last(type);
            };
        /**
         * get resource array page of results given a page number
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {?} id
         * @return {?}
         */
        ResourceService.prototype.page = /**
         * get resource array page of results given a page number
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {?} id
         * @return {?}
         */
            function (resourceArray, type, id) {
                return resourceArray.page(type, id);
            };
        /**
         * sort resource array with a given sorting params
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {...?} sort
         * @return {?}
         */
        ResourceService.prototype.sortElements = /**
         * sort resource array with a given sorting params
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {...?} sort
         * @return {?}
         */
            function (resourceArray, type) {
                var sort = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    sort[_i - 2] = arguments[_i];
                }
                return resourceArray.sortElements.apply(resourceArray, __spread([type], sort));
            };
        /**
         * get resource array size
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {?} size
         * @return {?}
         */
        ResourceService.prototype.size = /**
         * get resource array size
         * @template T
         * @param {?} resourceArray
         * @param {?} type
         * @param {?} size
         * @return {?}
         */
            function (resourceArray, type, size) {
                return resourceArray.size(type, size);
            };
        /**
         * get resource URL from a given path
         * @param {?=} resource
         * @return {?}
         */
        ResourceService.prototype.getResourceUrl = /**
         * get resource URL from a given path
         * @param {?=} resource
         * @return {?}
         */
            function (resource) {
                /** @type {?} */
                var url$$1 = ResourceService.getURL();
                if (!url$$1.endsWith('/')) {
                    url$$1 = url$$1.concat('/');
                }
                if (resource) {
                    return url$$1.concat(resource);
                }
                return url$$1;
            };
        /**
         * set proxy and root urls of given resource array
         * @template T
         * @param {?} result
         * @return {?}
         */
        ResourceService.prototype.setUrls = /**
         * set proxy and root urls of given resource array
         * @template T
         * @param {?} result
         * @return {?}
         */
            function (result) {
                result.proxyUrl = this.externalService.getProxyUri();
                result.rootUrl = this.externalService.getRootUri();
            };
        /**
         * set proxy and root urls of given resource
         * @template T
         * @param {?} result
         * @return {?}
         */
        ResourceService.prototype.setUrlsResource = /**
         * set proxy and root urls of given resource
         * @template T
         * @param {?} result
         * @return {?}
         */
            function (result) {
                result.proxyUrl = this.externalService.getProxyUri();
                result.rootUrl = this.externalService.getRootUri();
            };
        ResourceService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ResourceService.ctorParameters = function () {
            return [
                { type: ExternalService }
            ];
        };
        return ResourceService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    // unsupported: template constraints.
    /**
     * REST API access interface
     * @template T
     */
    var  
    // unsupported: template constraints.
    /**
     * REST API access interface
     * @template T
     */
    RestService = (function () {
        /** constructor */
        function RestService(type, resource, injector, _embedded) {
            this.injector = injector;
            /**
             * _embedded field name
             */
            this._embedded = '_embedded';
            this.type = type;
            this.resource = resource;
            this.resourceService = injector.get(ResourceService);
            if (!util.isNullOrUndefined(_embedded))
                this._embedded = _embedded;
        }
        /** error handler */
        /**
         * error handler
         * @param {?} error
         * @return {?}
         */
        RestService.prototype.handleError = /**
         * error handler
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return RestService.handleError(error);
            };
        /** error handler */
        /**
         * error handler
         * @param {?} error
         * @return {?}
         */
        RestService.handleError = /**
         * error handler
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return rxjs.throwError(error);
            };
        /**
         * get all resources with optional options an subType params
         * @param {?=} options
         * @param {?=} subType
         * @param {?=} embeddedName
         * @return {?}
         */
        RestService.prototype.getAll = /**
         * get all resources with optional options an subType params
         * @param {?=} options
         * @param {?=} subType
         * @param {?=} embeddedName
         * @return {?}
         */
            function (options, subType, embeddedName) {
                var _this = this;
                return this.resourceService.getAll(this.type, this.resource, this._embedded, options, subType, embeddedName).pipe(operators.mergeMap(function (resourceArray) {
                    if (options && options.notPaged && !util.isNullOrUndefined(resourceArray.first_uri)) {
                        options.notPaged = false;
                        options.size = resourceArray.totalElements;
                        return _this.getAll(options);
                    }
                    else {
                        _this.resourceArray = resourceArray;
                        return rxjs.of(resourceArray.result);
                    }
                }));
            };
        /**
         * get resource from a given id
         * @param {?} id
         * @return {?}
         */
        RestService.prototype.get = /**
         * get resource from a given id
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return this.resourceService.get(this.type, this.resource, id);
            };
        /**
         * get resource from self link
         * @param {?} selfLink
         * @return {?}
         */
        RestService.prototype.getBySelfLink = /**
         * get resource from self link
         * @param {?} selfLink
         * @return {?}
         */
            function (selfLink) {
                return this.resourceService.getBySelfLink(this.type, selfLink);
            };
        /**
         * search resources from a given query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
        RestService.prototype.search = /**
         * search resources from a given query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
            function (query, options) {
                var _this = this;
                return this.resourceService.search(this.type, query, this.resource, this._embedded, options).pipe(operators.mergeMap(function (resourceArray) {
                    if (options && options.notPaged && !util.isNullOrUndefined(resourceArray.first_uri)) {
                        options.notPaged = false;
                        options.size = resourceArray.totalElements;
                        return _this.search(query, options);
                    }
                    else {
                        _this.resourceArray = resourceArray;
                        return rxjs.of(resourceArray.result);
                    }
                }));
            };
        /**
         * search resource from a given query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
        RestService.prototype.searchSingle = /**
         * search resource from a given query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
            function (query, options) {
                return this.resourceService.searchSingle(this.type, query, this.resource, options);
            };
        /**
         * search resources from a given custom query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
        RestService.prototype.customQuery = /**
         * search resources from a given custom query string and optional options params
         * @param {?} query
         * @param {?=} options
         * @return {?}
         */
            function (query, options) {
                var _this = this;
                return this.resourceService.customQuery(this.type, query, this.resource, this._embedded, options).pipe(operators.mergeMap(function (resourceArray) {
                    if (options && options.notPaged && !util.isNullOrUndefined(resourceArray.first_uri)) {
                        options.notPaged = false;
                        options.size = resourceArray.totalElements;
                        return _this.customQuery(query, options);
                    }
                    else {
                        _this.resourceArray = resourceArray;
                        return rxjs.of(resourceArray.result);
                    }
                }));
            };
        /**
         * get resource array given a relation link
         * @param {?} relation
         * @param {?=} builder
         * @return {?}
         */
        RestService.prototype.getByRelationArray = /**
         * get resource array given a relation link
         * @param {?} relation
         * @param {?=} builder
         * @return {?}
         */
            function (relation, builder) {
                var _this = this;
                return this.resourceService.getByRelationArray(this.type, relation, this._embedded, builder).pipe(operators.map(function (resourceArray) {
                    _this.resourceArray = resourceArray;
                    return resourceArray.result;
                }));
            };
        /**
         * get resource given a relation link
         * @param {?} relation
         * @return {?}
         */
        RestService.prototype.getByRelation = /**
         * get resource given a relation link
         * @param {?} relation
         * @return {?}
         */
            function (relation) {
                return this.resourceService.getByRelation(this.type, relation);
            };
        /**
         * count resources given a path
         * @return {?}
         */
        RestService.prototype.count = /**
         * count resources given a path
         * @return {?}
         */
            function () {
                return this.resourceService.count(this.resource);
            };
        /**
         * create resource from self link and entity data
         * @param {?} entity
         * @return {?}
         */
        RestService.prototype.create = /**
         * create resource from self link and entity data
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                return this.resourceService.create(this.resource, entity);
            };
        /**
         * update resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
        RestService.prototype.update = /**
         * update resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                return this.resourceService.update(entity);
            };
        /**
         * patch resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
        RestService.prototype.patch = /**
         * patch resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                return this.resourceService.patch(entity);
            };
        /**
         * delete resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
        RestService.prototype.delete = /**
         * delete resource from a given entity data
         * @param {?} entity
         * @return {?}
         */
            function (entity) {
                return this.resourceService.delete(entity);
            };
        /**
         * get total number of elements of resource array
         * @return {?}
         */
        RestService.prototype.totalElement = /**
         * get total number of elements of resource array
         * @return {?}
         */
            function () {
                if (this.resourceArray && this.resourceArray.totalElements)
                    return this.resourceArray.totalElements;
                return 0;
            };
        /**
         * whether a resource array has first page of results
         * @return {?}
         */
        RestService.prototype.hasFirst = /**
         * whether a resource array has first page of results
         * @return {?}
         */
            function () {
                if (this.resourceArray)
                    return this.resourceService.hasFirst(this.resourceArray);
                return false;
            };
        /**
         * whether a resource array has next page of results
         * @return {?}
         */
        RestService.prototype.hasNext = /**
         * whether a resource array has next page of results
         * @return {?}
         */
            function () {
                if (this.resourceArray)
                    return this.resourceService.hasNext(this.resourceArray);
                return false;
            };
        /**
         * whether a resource array has previous page of results
         * @return {?}
         */
        RestService.prototype.hasPrev = /**
         * whether a resource array has previous page of results
         * @return {?}
         */
            function () {
                if (this.resourceArray)
                    return this.resourceService.hasPrev(this.resourceArray);
                return false;
            };
        /**
         * whether a resource array has last page of results
         * @return {?}
         */
        RestService.prototype.hasLast = /**
         * whether a resource array has last page of results
         * @return {?}
         */
            function () {
                if (this.resourceArray)
                    return this.resourceService.hasLast(this.resourceArray);
                return false;
            };
        /**
         * get resource array next page of results
         * @return {?}
         */
        RestService.prototype.next = /**
         * get resource array next page of results
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.resourceArray)
                    return this.resourceService.next(this.resourceArray, this.type).pipe(operators.map(function (resourceArray) {
                        _this.resourceArray = resourceArray;
                        return resourceArray.result;
                    }));
                else
                    rxjs.throwError('no resourceArray found');
            };
        /**
         * get resource array previous page of results
         * @return {?}
         */
        RestService.prototype.prev = /**
         * get resource array previous page of results
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.resourceArray)
                    return this.resourceService.prev(this.resourceArray, this.type).pipe(operators.map(function (resourceArray) {
                        _this.resourceArray = resourceArray;
                        return resourceArray.result;
                    }));
                else
                    rxjs.throwError('no resourceArray found');
            };
        /**
         * get resource array first page of results
         * @return {?}
         */
        RestService.prototype.first = /**
         * get resource array first page of results
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.resourceArray)
                    return this.resourceService.first(this.resourceArray, this.type)
                        .pipe(operators.map(function (resourceArray) {
                        _this.resourceArray = resourceArray;
                        return resourceArray.result;
                    }));
                else
                    rxjs.throwError('no resourceArray found');
            };
        /**
         * get resource array last page of results
         * @return {?}
         */
        RestService.prototype.last = /**
         * get resource array last page of results
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.resourceArray)
                    return this.resourceService.last(this.resourceArray, this.type)
                        .pipe(operators.map(function (resourceArray) {
                        _this.resourceArray = resourceArray;
                        return resourceArray.result;
                    }));
                else
                    rxjs.throwError('no resourceArray found');
            };
        /**
         * get resource array page of results given a page number
         * @param {?} pageNumber
         * @return {?}
         */
        RestService.prototype.page = /**
         * get resource array page of results given a page number
         * @param {?} pageNumber
         * @return {?}
         */
            function (pageNumber) {
                var _this = this;
                if (this.resourceArray)
                    return this.resourceService.page(this.resourceArray, this.type, pageNumber).pipe(operators.map(function (resourceArray) {
                        _this.resourceArray = resourceArray;
                        return resourceArray.result;
                    }));
                else
                    rxjs.throwError('no resourceArray found');
            };
        return RestService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Account manager service
     */
    var AccountService = (function (_super) {
        __extends(AccountService, _super);
        /** constructor */
        function AccountService(injector, http) {
            var _this = _super.call(this, User, "account", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.ACCOUNT_API = 'account';
            return _this;
        }
        /** get logged in user account*/
        /**
         * get logged in user account
         * @return {?}
         */
        AccountService.prototype.get = /**
         * get logged in user account
         * @return {?}
         */
            function () {
                /** @type {?} */
                var result;
                result = this.http.get(this.resourceService.getResourceUrl(this.ACCOUNT_API));
                return result;
            };
        /** save account*/
        /**
         * save account
         * @param {?} item
         * @return {?}
         */
        AccountService.prototype.save = /**
         * save account
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                result = this.http.post(this.resourceService.getResourceUrl(this.ACCOUNT_API), item);
                return result;
            };
        /** change logged in user account*/
        /**
         * change logged in user account
         * @param {?} item
         * @return {?}
         */
        AccountService.prototype.changePassword = /**
         * change logged in user account
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                result = this.http.post(this.resourceService.getResourceUrl(this.ACCOUNT_API + "/change-password"), item);
                return result;
            };
        AccountService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        AccountService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return AccountService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Authentication service
     */
    var AuthService = (function () {
        /** constructor*/
        function AuthService(http, resourceService) {
            this.http = http;
            this.resourceService = resourceService;
            /**
             * API resource path
             */
            this.AUTH_API = 'authenticate';
        }
        /** get current user jwt token from session storage*/
        /**
         * get current user jwt token from session storage
         * @return {?}
         */
        AuthService.prototype.getToken = /**
         * get current user jwt token from session storage
         * @return {?}
         */
            function () {
                return sessionStorage.getItem('authenticationToken');
            };
        /** login operation */
        /**
         * login operation
         * @param {?} credentials
         * @return {?}
         */
        AuthService.prototype.login = /**
         * login operation
         * @param {?} credentials
         * @return {?}
         */
            function (credentials) {
                /** @type {?} */
                var data = {
                    username: credentials.username,
                    password: credentials.password
                };
                return this.http.post(this.resourceService.getResourceUrl(this.AUTH_API), data, { observe: 'response' }).map(authenticateSuccess.bind(this));
                /**
                 * @param {?} resp
                 * @return {?}
                 */
                function authenticateSuccess(resp) {
                    if (resp.ok) {
                        /** @type {?} */
                        var jwt = resp.body.id_token;
                        this.storeAuthenticationToken(jwt);
                        //const expiresAt = moment().add( resp.headers.get('Token-Validity'),'milisecond');
                        //sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
                        return jwt;
                    }
                }
            };
        /** login operation with jwt token */
        /**
         * login operation with jwt token
         * @param {?} jwt
         * @return {?}
         */
        AuthService.prototype.loginWithToken = /**
         * login operation with jwt token
         * @param {?} jwt
         * @return {?}
         */
            function (jwt) {
                if (jwt) {
                    this.storeAuthenticationToken(jwt);
                    return Promise.resolve(jwt);
                }
                else {
                    return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
                }
            };
        /** store jwt token in session storage*/
        /**
         * store jwt token in session storage
         * @param {?} jwt
         * @return {?}
         */
        AuthService.prototype.storeAuthenticationToken = /**
         * store jwt token in session storage
         * @param {?} jwt
         * @return {?}
         */
            function (jwt) {
                sessionStorage.setItem('authenticationToken', jwt);
            };
        /**
         * check whether current user is logged in
         * @return {?}
         */
        AuthService.prototype.isLoggedIn = /**
         * check whether current user is logged in
         * @return {?}
         */
            function () {
                //return moment().isBefore(this.getExpiration());
                return this.getToken();
            };
        /** check whether current user is logged out*/
        /**
         * check whether current user is logged out
         * @return {?}
         */
        AuthService.prototype.isLoggedOut = /**
         * check whether current user is logged out
         * @return {?}
         */
            function () {
                return !this.isLoggedIn();
            };
        /** logout operation */
        /**
         * logout operation
         * @return {?}
         */
        AuthService.prototype.logout = /**
         * logout operation
         * @return {?}
         */
            function () {
                return new rxjsCompat.Observable(function (observer) {
                    //localStorage.removeItem('authenticationToken');
                    sessionStorage.removeItem('authenticationToken');
                    //sessionStorage.removeItem('expires_at');
                    observer.complete();
                });
            };
        AuthService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: ResourceService }
            ];
        };
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Interceptor for authentication token in API requests
     */
    var /**
     * Interceptor for authentication token in API requests
     */ AuthInterceptor = (function () {
        /** constructor*/
        function AuthInterceptor() {
        }
        /** request handler */
        /**
         * request handler
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        AuthInterceptor.prototype.intercept = /**
         * request handler
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
            function (request, next) {
                if (!request || !request.url || !(request.url.includes("/api/"))) {
                    request.headers.append('Access-Control-Allow-Origin', '*');
                    return next.handle(request);
                }
                /** @type {?} */
                var token = sessionStorage.getItem('authenticationToken');
                if (!!token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                }
                return next.handle(request);
            };
        return AuthInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Principal service
     */
    var Principal = (function () {
        /** constructor */
        function Principal(account) {
            this.account = account;
            this.authenticated = false;
            this.authenticationState = new rxjs.Subject();
        }
        /** authenticate with given identity*/
        /**
         * authenticate with given identity
         * @param {?} identity
         * @return {?}
         */
        Principal.prototype.authenticate = /**
         * authenticate with given identity
         * @param {?} identity
         * @return {?}
         */
            function (identity) {
                this.userIdentity = identity;
                this.authenticated = identity !== null;
                this.authenticationState.next(this.userIdentity);
            };
        /** check whether current user has any of the given authorities */
        /**
         * check whether current user has any of the given authorities
         * @param {?} authorities
         * @return {?}
         */
        Principal.prototype.hasAnyAuthority = /**
         * check whether current user has any of the given authorities
         * @param {?} authorities
         * @return {?}
         */
            function (authorities) {
                return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
            };
        /** check whether current user has any of the given authorities on the given territory */
        /**
         * check whether current user has any of the given authorities on the given territory
         * @param {?} authorities
         * @param {?} territory
         * @return {?}
         */
        Principal.prototype.hasAnyAuthorityOnTerritory = /**
         * check whether current user has any of the given authorities on the given territory
         * @param {?} authorities
         * @param {?} territory
         * @return {?}
         */
            function (authorities, territory) {
                return Promise.resolve(this.hasAnyAuthorityDirectOnTerritory(authorities, territory));
            };
        /** check whether current user has any of the given authorities without resolving promises*/
        /**
         * check whether current user has any of the given authorities without resolving promises
         * @param {?} authorities
         * @return {?}
         */
        Principal.prototype.hasAnyAuthorityDirect = /**
         * check whether current user has any of the given authorities without resolving promises
         * @param {?} authorities
         * @return {?}
         */
            function (authorities) {
                if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
                    return false;
                }
                for (var i = 0; i < authorities.length; i++) {
                    if (this.userIdentity.authorities.includes(authorities[i])) {
                        return true;
                    }
                }
                return false;
            };
        /** check whether current user has any of the given authorities on the given territory without resolving promises */
        /**
         * check whether current user has any of the given authorities on the given territory without resolving promises
         * @param {?} authorities
         * @param {?} territory
         * @return {?}
         */
        Principal.prototype.hasAnyAuthorityDirectOnTerritory = /**
         * check whether current user has any of the given authorities on the given territory without resolving promises
         * @param {?} authorities
         * @param {?} territory
         * @return {?}
         */
            function (authorities, territory) {
                if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
                    return false;
                }
                for (var i = 0; i < authorities.length; i++) {
                    if (this.userIdentity.authoritiesPerTerritory[territory] && this.userIdentity.authoritiesPerTerritory[territory].includes(authorities[i])) {
                        return true;
                    }
                }
                return false;
            };
        /** check whether current user has the given authority */
        /**
         * check whether current user has the given authority
         * @param {?} authority
         * @return {?}
         */
        Principal.prototype.hasAuthority = /**
         * check whether current user has the given authority
         * @param {?} authority
         * @return {?}
         */
            function (authority) {
                if (!this.authenticated) {
                    return Promise.resolve(false);
                }
                return this.identity().then(function (id) {
                    return Promise.resolve(id.authorities && id.authorities.includes(authority));
                }, function () {
                    return Promise.resolve(false);
                });
            };
        /** check whether current user has the given authority on the given territory*/
        /**
         * check whether current user has the given authority on the given territory
         * @param {?} authority
         * @param {?} territory
         * @return {?}
         */
        Principal.prototype.hasAuthorityOnTerritory = /**
         * check whether current user has the given authority on the given territory
         * @param {?} authority
         * @param {?} territory
         * @return {?}
         */
            function (authority, territory) {
                if (!this.authenticated) {
                    return Promise.resolve(false);
                }
                return this.identity().then(function (id) {
                    return Promise.resolve(id.authoritiesPerTerritory && id.authoritiesPerTerritory[territory] && id.authoritiesPerTerritory[territory].includes(authority));
                }, function () {
                    return Promise.resolve(false);
                });
            };
        /** check user identity*/
        /**
         * check user identity
         * @param {?=} force
         * @return {?}
         */
        Principal.prototype.identity = /**
         * check user identity
         * @param {?=} force
         * @return {?}
         */
            function (force) {
                var _this = this;
                if (force === true) {
                    this.userIdentity = undefined;
                }
                // check and see if we have retrieved the userIdentity data from the server.
                // if we have, reuse it by immediately resolving
                if (this.userIdentity) {
                    return Promise.resolve(this.userIdentity);
                }
                // retrieve the userIdentity data from the server, update the identity object, and then resolve.
                return this.account.get().toPromise().then(function (response) {
                    /** @type {?} */
                    var account = response;
                    if (account) {
                        _this.userIdentity = account;
                        _this.authenticated = true;
                    }
                    else {
                        _this.userIdentity = null;
                        _this.authenticated = false;
                    }
                    _this.authenticationState.next(_this.userIdentity);
                    return _this.userIdentity;
                }).catch(function (err) {
                    _this.userIdentity = null;
                    _this.authenticated = false;
                    _this.authenticationState.next(_this.userIdentity);
                    return null;
                });
            };
        /** check whether current user is authenticated */
        /**
         * check whether current user is authenticated
         * @return {?}
         */
        Principal.prototype.isAuthenticated = /**
         * check whether current user is authenticated
         * @return {?}
         */
            function () {
                return this.authenticated;
            };
        /** check whether current user identity is resolved */
        /**
         * check whether current user identity is resolved
         * @return {?}
         */
        Principal.prototype.isIdentityResolved = /**
         * check whether current user identity is resolved
         * @return {?}
         */
            function () {
                return this.userIdentity !== undefined;
            };
        /** get current user authentication state */
        /**
         * get current user authentication state
         * @return {?}
         */
        Principal.prototype.getAuthenticationState = /**
         * get current user authentication state
         * @return {?}
         */
            function () {
                return this.authenticationState.asObservable();
            };
        Principal.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        Principal.ctorParameters = function () {
            return [
                { type: AccountService }
            ];
        };
        return Principal;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Interceptor for authentication expired response in API requests
     */
    var AuthExpiredInterceptor = (function () {
        /** constructor */
        function AuthExpiredInterceptor(router$$1, authService, principal) {
            this.router = router$$1;
            this.authService = authService;
            this.principal = principal;
        }
        /** request handler */
        /**
         * request handler
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        AuthExpiredInterceptor.prototype.intercept = /**
         * request handler
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
            function (request, next) {
                var _this = this;
                return next.handle(request).do(function (event) { }, function (err) {
                    /** @type {?} */
                    var intercept = request.url.indexOf("/api/") != -1;
                    //tractem request
                    if (intercept) {
                        if (err instanceof i1.HttpErrorResponse) {
                            if (err.status === 401) {
                                _this.authService.logout().subscribe();
                                _this.principal.authenticate(null);
                                _this.router.navigate(['/']);
                            }
                        }
                    }
                });
            };
        AuthExpiredInterceptor.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        AuthExpiredInterceptor.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: AuthService },
                { type: Principal }
            ];
        };
        return AuthExpiredInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Login service
     */
    var LoginService = (function () {
        /** constructor */
        function LoginService(authServerProvider, principal) {
            this.authServerProvider = authServerProvider;
            this.principal = principal;
        }
        /**Login operation*/
        /**
         * Login operation
         * @param {?} credentials
         * @param {?=} callback
         * @return {?}
         */
        LoginService.prototype.login = /**
         * Login operation
         * @param {?} credentials
         * @param {?=} callback
         * @return {?}
         */
            function (credentials, callback) {
                var _this = this;
                /** @type {?} */
                var cb = callback || function () { };
                return new Promise(function (resolve, reject) {
                    _this.authServerProvider.login(credentials).subscribe(function (data) {
                        _this.principal.identity(true).then(function (account) {
                            // After the login the language will be changed to
                            // the language selected by the user during his registration
                            resolve(data);
                        });
                        return cb();
                    }, function (err) {
                        _this.logout();
                        reject(err);
                        return cb(err);
                    });
                });
            };
        /**login with jwt token */
        /**
         * login with jwt token
         * @param {?} jwt
         * @return {?}
         */
        LoginService.prototype.loginWithToken = /**
         * login with jwt token
         * @param {?} jwt
         * @return {?}
         */
            function (jwt) {
                return this.authServerProvider.loginWithToken(jwt);
            };
        /** logout operation */
        /**
         * logout operation
         * @return {?}
         */
        LoginService.prototype.logout = /**
         * logout operation
         * @return {?}
         */
            function () {
                this.authServerProvider.logout().subscribe();
                this.principal.authenticate(null);
            };
        LoginService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        LoginService.ctorParameters = function () {
            return [
                { type: AuthService },
                { type: Principal }
            ];
        };
        return LoginService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DashboardService = (function () {
        /** constructor */
        function DashboardService(http, resourceService) {
            this.http = http;
            this.resourceService = resourceService;
            /**
             * API resource path
             */
            this.DASHBOARD_API = 'dashboard/info';
            this.DASHBOARD_EMBEDDED = 'dashboard';
        }
        /** get all kpi */
        /**
         * get all kpi
         * @return {?}
         */
        DashboardService.prototype.getAll = /**
         * get all kpi
         * @return {?}
         */
            function () {
                var _this = this;
                return this.http.get(this.resourceService.getResourceUrl(this.DASHBOARD_API)).map(function (response) { return response[_this.DASHBOARD_EMBEDDED]; });
            };
        DashboardService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        DashboardService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: ResourceService }
            ];
        };
        /** @nocollapse */ DashboardService.ngInjectableDef = i0.defineInjectable({ factory: function DashboardService_Factory() { return new DashboardService(i0.inject(i1.HttpClient), i0.inject(ResourceService)); }, token: DashboardService, providedIn: "root" });
        return DashboardService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User manager service
     */
    var UserService = (function (_super) {
        __extends(UserService, _super);
        /** constructor */
        function UserService(injector, http) {
            var _this = _super.call(this, User, "users", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.USER_API = 'users';
            return _this;
        }
        /** remove user*/
        /**
         * remove user
         * @param {?} item
         * @return {?}
         */
        UserService.prototype.remove = /**
         * remove user
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save user*/
        /**
         * save user
         * @param {?} item
         * @return {?}
         */
        UserService.prototype.save = /**
         * save user
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.USER_API), item);
                }
                return result;
            };
        /** change password o given user id */
        /**
         * change password o given user id
         * @param {?} id
         * @param {?} item
         * @return {?}
         */
        UserService.prototype.changePassword = /**
         * change password o given user id
         * @param {?} id
         * @param {?} item
         * @return {?}
         */
            function (id, item) {
                /** @type {?} */
                var result;
                result = this.http.post(this.resourceService.getResourceUrl(this.USER_API + "/" + id + "/change-password"), item);
                return result;
            };
        UserService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        UserService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return UserService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User position model
     */
    var /**
     * User position model
     */ UserPosition = (function (_super) {
        __extends(UserPosition, _super);
        function UserPosition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return UserPosition;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User position manager service
     */
    var UserPositionService = (function (_super) {
        __extends(UserPositionService, _super);
        /** constructor */
        function UserPositionService(injector, http) {
            var _this = _super.call(this, UserPosition, "user-positions", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.USER_POSITION_API = 'user-positions';
            return _this;
        }
        /** remove user position*/
        /**
         * remove user position
         * @param {?} item
         * @return {?}
         */
        UserPositionService.prototype.remove = /**
         * remove user position
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save user position*/
        /**
         * save user position
         * @param {?} item
         * @return {?}
         */
        UserPositionService.prototype.save = /**
         * save user position
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.user != null) {
                        item.substituteRelation('user', item.user).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.territory != null) {
                        item.substituteRelation('territory', item.territory).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.territory = item.territory._links.self.href;
                    item.user = item.user._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.USER_POSITION_API), item);
                }
                return result;
            };
        UserPositionService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        UserPositionService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return UserPositionService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User permission model
     */
    var /**
     * User permission model
     */ UserConfiguration = (function (_super) {
        __extends(UserConfiguration, _super);
        function UserConfiguration() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return UserConfiguration;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * User configuration manager service
     */
    var UserConfigurationService = (function (_super) {
        __extends(UserConfigurationService, _super);
        /** constructor */
        function UserConfigurationService(injector, http) {
            var _this = _super.call(this, UserConfiguration, "user-configurations", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.USER_CONFIGURATION_API = 'user-configurations';
            return _this;
        }
        /** remove user configuration*/
        /**
         * remove user configuration
         * @param {?} item
         * @return {?}
         */
        UserConfigurationService.prototype.remove = /**
         * remove user configuration
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save user configuration*/
        /**
         * save user configuration
         * @param {?} item
         * @return {?}
         */
        UserConfigurationService.prototype.save = /**
         * save user configuration
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.user != null) {
                        item.substituteRelation('user', item.user).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.territory != null) {
                        item.substituteRelation('territory', item.territory).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.role != null) {
                        item.substituteRelation('role', item.role).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.roleChildren != null) {
                        item.substituteRelation('roleChildren', item.roleChildren).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.territory = item.territory._links.self.href;
                    item.role = item.role != null ? item.role._links.self.href : null;
                    item.user = item.user._links.self.href;
                    item.roleChildren = item.roleChildren != null ? item.roleChildren._links.self.href : null;
                    result = this.http.post(this.resourceService.getResourceUrl(this.USER_CONFIGURATION_API), item);
                }
                return result;
            };
        UserConfigurationService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        UserConfigurationService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return UserConfigurationService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Territory model
     */
    var /**
     * Territory model
     */ Territory = (function (_super) {
        __extends(Territory, _super);
        function Territory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Territory;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Territory manager service
     */
    var TerritoryService = (function (_super) {
        __extends(TerritoryService, _super);
        /** constructor */
        function TerritoryService(injector, http) {
            var _this = _super.call(this, Territory, "territories", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TERRITORY_API = 'territories';
            return _this;
        }
        /** remove territory*/
        /**
         * remove territory
         * @param {?} item
         * @return {?}
         */
        TerritoryService.prototype.remove = /**
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
        TerritoryService.prototype.save = /**
         * save territory
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var territoryGroupType = {};
                territoryGroupType._links = {};
                territoryGroupType._links.self = {};
                territoryGroupType._links.self.href = "";
                if (item.groupType != null) {
                    territoryGroupType = item.groupType;
                    if (typeof item.groupType._links != 'undefined') {
                        item.groupType = item.groupType._links.self.href;
                    }
                }
                if (item._links != null) {
                    //update relations
                    delete item.groupType;
                    if (territoryGroupType._links.self.href == '') {
                        item.deleteRelation('groupType', territoryGroupType).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.substituteRelation('groupType', territoryGroupType).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.type != null)
                        item.type = item.type._links.self.href;
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    result = this.http.post(this.resourceService.getResourceUrl(this.TERRITORY_API), item);
                }
                return result;
            };
        TerritoryService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TerritoryService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TerritoryService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Territory type model
     */
    var /**
     * Territory type model
     */ TerritoryType = (function (_super) {
        __extends(TerritoryType, _super);
        function TerritoryType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TerritoryType;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * TerritoryType manager service
     */
    var TerritoryTypeService = (function (_super) {
        __extends(TerritoryTypeService, _super);
        /** constructor */
        function TerritoryTypeService(injector, http) {
            var _this = _super.call(this, TerritoryType, "territory-types", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TERRITORYTYPE_API = 'territory-types';
            return _this;
        }
        /** remove territory type*/
        /**
         * remove territory type
         * @param {?} item
         * @return {?}
         */
        TerritoryTypeService.prototype.remove = /**
         * remove territory type
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save territory type*/
        /**
         * save territory type
         * @param {?} item
         * @return {?}
         */
        TerritoryTypeService.prototype.save = /**
         * save territory type
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.TERRITORYTYPE_API), item);
                }
                return result;
            };
        TerritoryTypeService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TerritoryTypeService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TerritoryTypeService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Territory type model
     */
    var /**
     * Territory type model
     */ TerritoryGroupType = (function (_super) {
        __extends(TerritoryGroupType, _super);
        function TerritoryGroupType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TerritoryGroupType;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TerritoryGroupTypeService = (function (_super) {
        __extends(TerritoryGroupTypeService, _super);
        /** constructor */
        function TerritoryGroupTypeService(injector, http) {
            var _this = _super.call(this, TerritoryGroupType, "territory-group-types", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TERRITORYGROUPTYPE_API = 'territory-group-types';
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.TERRITORYGROUPTYPE_API), item);
                }
                return result;
            };
        TerritoryGroupTypeService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TerritoryGroupTypeService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ TerritoryGroupTypeService.ngInjectableDef = i0.defineInjectable({ factory: function TerritoryGroupTypeService_Factory() { return new TerritoryGroupTypeService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: TerritoryGroupTypeService, providedIn: "root" });
        return TerritoryGroupTypeService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Role model
     */
    var /**
     * Role model
     */ Role = (function (_super) {
        __extends(Role, _super);
        function Role() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Role;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Role manager service
     */
    var RoleService = (function (_super) {
        __extends(RoleService, _super);
        /** constructor */
        function RoleService(injector, http) {
            var _this = _super.call(this, Role, "roles", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.ROLE_API = 'roles';
            return _this;
        }
        /** remove role*/
        /**
         * remove role
         * @param {?} item
         * @return {?}
         */
        RoleService.prototype.remove = /**
         * remove role
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save role*/
        /**
         * save role
         * @param {?} item
         * @return {?}
         */
        RoleService.prototype.save = /**
         * save role
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.ROLE_API), item);
                }
                return result;
            };
        RoleService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        RoleService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return RoleService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Connection model
     */
    var /**
     * Connection model
     */ Connection = (function (_super) {
        __extends(Connection, _super);
        function Connection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Connection;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Connection manager service
     */
    var ConnectionService = (function (_super) {
        __extends(ConnectionService, _super);
        /** constructor */
        function ConnectionService(injector, http) {
            var _this = _super.call(this, Connection, "connections", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CONNECTION_API = 'connections';
            return _this;
        }
        /** remove connection*/
        /**
         * remove connection
         * @param {?} item
         * @return {?}
         */
        ConnectionService.prototype.remove = /**
         * remove connection
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save connection*/
        /**
         * save connection
         * @param {?} item
         * @return {?}
         */
        ConnectionService.prototype.save = /**
         * save connection
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
                }
                return result;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        ConnectionService.prototype.testConnection = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API) + "/test", item);
                return result;
            };
        ConnectionService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ConnectionService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ConnectionService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * GEOADMIN_task id
      @type {?} */
    var GEOADMIN_TREE_TASK_ID = "geoadmin";
    /**
     * Task model
     */
    var /**
     * Task model
     */ Task = (function (_super) {
        __extends(Task, _super);
        function Task() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Task;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task manager service
     */
    var TaskService = (function (_super) {
        __extends(TaskService, _super);
        /** constructor */
        function TaskService(injector, http) {
            var _this = _super.call(this, Task, "tasks", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CONNECTION_API = 'tasks';
            return _this;
        }
        /** remove task*/
        /**
         * remove task
         * @param {?} item
         * @return {?}
         */
        TaskService.prototype.remove = /**
         * remove task
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task*/
        /**
         * save task
         * @param {?} item
         * @return {?}
         */
        TaskService.prototype.save = /**
         * save task
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    if (!item.service) {
                        /** @type {?} */
                        var service = {};
                        service._links = {};
                        service._links.self = {};
                        service._links.self.href = "";
                        item.deleteRelation('service', service).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.service._links.self.href = item.service._links.self.href.split("{")[0];
                        item.substituteRelation('service', item.service).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.service = item.service._links.self.href;
                    }
                    if (!item.cartography) {
                        /** @type {?} */
                        var cartography = {};
                        cartography._links = {};
                        cartography._links.self = {};
                        cartography._links.self.href = "";
                        item.deleteRelation('cartography', cartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.cartography._links.self.href = item.cartography._links.self.href.split("{")[0];
                        item.substituteRelation('cartography', item.cartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.cartography = item.cartography._links.self.href;
                    }
                    if (!item.connection) {
                        /** @type {?} */
                        var connection = {};
                        connection._links = {};
                        connection._links.self = {};
                        connection._links.self.href = "";
                        item.deleteRelation('connection', connection).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.connection._links.self.href = item.connection._links.self.href.split("{")[0];
                        item.substituteRelation('connection', item.connection).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.connection = item.connection._links.self.href;
                    }
                    if (!item.ui) ;
                    else {
                        item.ui._links.self.href = item.ui._links.self.href.split("{")[0];
                        item.substituteRelation('ui', item.ui).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.ui = item.ui._links.self.href;
                    }
                    if (!item.group) ;
                    else {
                        item.group._links.self.href = item.group._links.self.href.split("{")[0];
                        item.substituteRelation('group', item.group).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.group = item.group._links.self.href;
                    }
                    if (!item.type) ;
                    else {
                        item.type._links.self.href = item.type._links.self.href.split("{")[0];
                        item.substituteRelation('type', item.type).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                        item.type = item.type._links.self.href;
                    }
                    if (item.roles) {
                        /** @type {?} */
                        var roles = __spread(item.roles);
                        delete item.roles;
                        item.substituteAllRelation('roles', roles).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    if (item.cartography) {
                        item.cartography = item.cartography._links.self.href;
                    }
                    if (item.connection) {
                        item.connection = item.connection._links.self.href;
                    }
                    if (item.service) {
                        item.service = item.service._links.self.href;
                    }
                    if (item.ui) {
                        item.ui = item.ui._links.self.href;
                    }
                    if (item.group) {
                        item.group = item.group._links.self.href;
                    }
                    if (item.type) {
                        item.type = item.type._links.self.href;
                    }
                    result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
                }
                return result;
            };
        TaskService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task type model
     */
    var /**
     * Task type model
     */ TaskType = (function (_super) {
        __extends(TaskType, _super);
        function TaskType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskType;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * TaskType manager service
     */
    var TaskTypeService = (function (_super) {
        __extends(TaskTypeService, _super);
        /** constructor */
        function TaskTypeService(injector, http) {
            var _this = _super.call(this, TaskType, "task-types", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CONNECTION_API = 'task-types';
            return _this;
        }
        /** remove task type*/
        /**
         * remove task type
         * @param {?} item
         * @return {?}
         */
        TaskTypeService.prototype.remove = /**
         * remove task type
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task type*/
        /**
         * save task type
         * @param {?} item
         * @return {?}
         */
        TaskTypeService.prototype.save = /**
         * save task type
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
                }
                return result;
            };
        TaskTypeService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskTypeService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskTypeService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task group model
     */
    var /**
     * Task group model
     */ TaskGroup = (function (_super) {
        __extends(TaskGroup, _super);
        function TaskGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskGroup;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task group manager service
     */
    var TaskGroupService = (function (_super) {
        __extends(TaskGroupService, _super);
        /** constructor */
        function TaskGroupService(injector, http) {
            var _this = _super.call(this, TaskGroup, "task-groups", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CONNECTION_API = 'task-groups';
            return _this;
        }
        /** remove task group*/
        /**
         * remove task group
         * @param {?} item
         * @return {?}
         */
        TaskGroupService.prototype.remove = /**
         * remove task group
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task group*/
        /**
         * save task group
         * @param {?} item
         * @return {?}
         */
        TaskGroupService.prototype.save = /**
         * save task group
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
                }
                return result;
            };
        TaskGroupService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskGroupService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskGroupService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task parameter model
     */
    var /**
     * Task parameter model
     */ TaskParameter = (function (_super) {
        __extends(TaskParameter, _super);
        function TaskParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskParameter;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task parameter manager service
     */
    var TaskParameterService = (function (_super) {
        __extends(TaskParameterService, _super);
        /** constructor */
        function TaskParameterService(injector, http) {
            var _this = _super.call(this, TaskParameter, "task-parameters", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TASK_PARAMETER_API = 'task-parameters';
            return _this;
        }
        /** remove task parameter*/
        /**
         * remove task parameter
         * @param {?} item
         * @return {?}
         */
        TaskParameterService.prototype.remove = /**
         * remove task parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task parameter*/
        /**
         * save task parameter
         * @param {?} item
         * @return {?}
         */
        TaskParameterService.prototype.save = /**
         * save task parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.task != null) {
                        item.substituteRelation('task', item.task).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.task = item.task._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.TASK_PARAMETER_API), item);
                }
                return result;
            };
        TaskParameterService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskParameterService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskParameterService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task availability model
     */
    var /**
     * Task availability model
     */ TaskAvailability = (function (_super) {
        __extends(TaskAvailability, _super);
        function TaskAvailability() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskAvailability;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task availability manager service
     */
    var TaskAvailabilityService = (function (_super) {
        __extends(TaskAvailabilityService, _super);
        /** constructor */
        function TaskAvailabilityService(injector, http) {
            var _this = _super.call(this, TaskAvailability, "task-availabilities", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TASK_AVAILABILITY_API = 'task-availabilities';
            return _this;
        }
        /** remove task availability*/
        /**
         * remove task availability
         * @param {?} item
         * @return {?}
         */
        TaskAvailabilityService.prototype.remove = /**
         * remove task availability
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task availability*/
        /**
         * save task availability
         * @param {?} item
         * @return {?}
         */
        TaskAvailabilityService.prototype.save = /**
         * save task availability
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.task != null) {
                        item.substituteRelation('task', item.task).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.territory != null) {
                        item.substituteRelation('territory', item.territory).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.territory = item.territory._links.self.href;
                    item.task = item.task._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.TASK_AVAILABILITY_API), item);
                }
                return result;
            };
        TaskAvailabilityService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskAvailabilityService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskAvailabilityService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task UI model
     */
    var /**
     * Task UI model
     */ TaskUI = (function (_super) {
        __extends(TaskUI, _super);
        function TaskUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskUI;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task UI manager service
     */
    var TaskUIService = (function (_super) {
        __extends(TaskUIService, _super);
        /** constructor */
        function TaskUIService(injector, http) {
            var _this = _super.call(this, TaskUI, "task-uis", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CONNECTION_API = 'task-uis';
            return _this;
        }
        /** remove task UI*/
        /**
         * remove task UI
         * @param {?} item
         * @return {?}
         */
        TaskUIService.prototype.remove = /**
         * remove task UI
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save task UI*/
        /**
         * save task UI
         * @param {?} item
         * @return {?}
         */
        TaskUIService.prototype.save = /**
         * save task UI
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
                }
                return result;
            };
        TaskUIService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TaskUIService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TaskUIService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task model
     */
    var /**
     * Task model
     */ Translation = (function (_super) {
        __extends(Translation, _super);
        function Translation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Translation;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslationService = (function (_super) {
        __extends(TranslationService, _super);
        /** constructor */
        function TranslationService(injector, http) {
            var _this = _super.call(this, Translation, "translations", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TRANSLATION_API = 'translations';
            return _this;
        }
        /** remove translation*/
        /**
         * remove translation
         * @param {?} item
         * @return {?}
         */
        TranslationService.prototype.remove = /**
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
        TranslationService.prototype.save = /**
         * save translation
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var language = {};
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
            };
        TranslationService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TranslationService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ TranslationService.ngInjectableDef = i0.defineInjectable({ factory: function TranslationService_Factory() { return new TranslationService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: TranslationService, providedIn: "root" });
        return TranslationService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Task model
     */
    var /**
     * Task model
     */ Language = (function (_super) {
        __extends(Language, _super);
        function Language() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Language;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LanguageService = (function (_super) {
        __extends(LanguageService, _super);
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        LanguageService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: LanguageService, providedIn: "root" });
        return LanguageService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service model
     */
    var /**
     * Service model
     */ Service = (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Service;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service manager service
     */
    var ServiceService = (function (_super) {
        __extends(ServiceService, _super);
        /** constructor */
        function ServiceService(injector, http) {
            var _this = _super.call(this, Service, "services", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.SERVICE_API = 'services';
            return _this;
        }
        /** remove service*/
        /**
         * remove service
         * @param {?} item
         * @return {?}
         */
        ServiceService.prototype.remove = /**
         * remove service
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save service*/
        /**
         * save service
         * @param {?} item
         * @return {?}
         */
        ServiceService.prototype.save = /**
         * save service
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var serviceConnection = item.connection;
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
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    result = this.http.post(this.resourceService.getResourceUrl(this.SERVICE_API), item);
                }
                return result;
            };
        ServiceService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ServiceService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ServiceService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service parameter model
     */
    var /**
     * Service parameter model
     */ ServiceParameter = (function (_super) {
        __extends(ServiceParameter, _super);
        function ServiceParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServiceParameter;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service parameter manager service
     */
    var ServiceParameterService = (function (_super) {
        __extends(ServiceParameterService, _super);
        /** constructor */
        function ServiceParameterService(injector, http) {
            var _this = _super.call(this, ServiceParameter, "service-parameters", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.SERVICE_PARAMETER_API = 'service-parameters';
            return _this;
        }
        /** remove service parameter*/
        /**
         * remove service parameter
         * @param {?} item
         * @return {?}
         */
        ServiceParameterService.prototype.remove = /**
         * remove service parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save service parameter*/
        /**
         * save service parameter
         * @param {?} item
         * @return {?}
         */
        ServiceParameterService.prototype.save = /**
         * save service parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    if (item.service != null) {
                        /** @type {?} */
                        var service = item.service;
                        delete item.service;
                        item.substituteRelation('service', service).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    item.service = item.service._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.SERVICE_PARAMETER_API), item);
                }
                return result;
            };
        ServiceParameterService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ServiceParameterService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ServiceParameterService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Capabilitie model
     */
    var /**
     * Capabilitie model
     */ Capabilitie = (function (_super) {
        __extends(Capabilitie, _super);
        function Capabilitie() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Capabilitie;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CapabilitiesService = (function (_super) {
        __extends(CapabilitiesService, _super);
        /** constructor */
        function CapabilitiesService(injector, http) {
            var _this = _super.call(this, Capabilitie, "helpers/capabilities?url=", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CAPABILITIES_API = 'helpers/capabilities?url=';
            return _this;
        }
        /** save service*/
        /**
         * save service
         * @param {?} url
         * @return {?}
         */
        CapabilitiesService.prototype.getInfo = /**
         * save service
         * @param {?} url
         * @return {?}
         */
            function (url$$1) {
                /** @type {?} */
                var result;
                if (url$$1) {
                    /** @type {?} */
                    var finalUrl = this.resourceService.getResourceUrl(this.CAPABILITIES_API);
                    finalUrl = finalUrl.concat(url$$1);
                    console.log(finalUrl);
                    result = this.http.get(finalUrl);
                }
                return result;
            };
        CapabilitiesService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        CapabilitiesService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ CapabilitiesService.ngInjectableDef = i0.defineInjectable({ factory: function CapabilitiesService_Factory() { return new CapabilitiesService(i0.inject(i0.INJECTOR), i0.inject(i1.HttpClient)); }, token: CapabilitiesService, providedIn: "root" });
        return CapabilitiesService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Cartography
     */
    var /**
     * Cartography
     */ Cartography = (function (_super) {
        __extends(Cartography, _super);
        function Cartography() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Cartography;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Cartography manager service
     */
    var CartographyService = (function (_super) {
        __extends(CartographyService, _super);
        /** constructor */
        function CartographyService(injector, http) {
            var _this = _super.call(this, Cartography, "cartographies", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CARTOGRAPHY_API = 'cartographies';
            return _this;
        }
        /** remove cartography*/
        /**
         * remove cartography
         * @param {?} item
         * @return {?}
         */
        CartographyService.prototype.remove = /**
         * remove cartography
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save cartography*/
        /**
         * save cartography
         * @param {?} item
         * @return {?}
         */
        CartographyService.prototype.save = /**
         * save cartography
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var cartographyConnection = {};
                cartographyConnection._links = {};
                cartographyConnection._links.self = {};
                cartographyConnection._links.self.href = "";
                /** @type {?} */
                var cartographyService = {};
                cartographyService._links = {};
                cartographyService._links.self = {};
                cartographyService._links.self.href = "";
                /** @type {?} */
                var cartographySelectionService = {};
                cartographySelectionService._links = {};
                cartographySelectionService._links.self = {};
                cartographySelectionService._links.self.href = "";
                if (item.service != null) {
                    cartographyService = item.service;
                    if (typeof item.service._links != 'undefined') {
                        item.service = item.service._links.self.href;
                    }
                }
                if (item.selectionService != null) {
                    cartographySelectionService = item.selectionService;
                    if (typeof item.selectionService._links != 'undefined') {
                        item.selectionService = item.selectionService._links.self.href;
                    }
                }
                if (item.connection != null) {
                    cartographyConnection = item.connection;
                    if (typeof item.connection._links != 'undefined') {
                        item.connection = item.connection._links.self.href;
                    }
                }
                if (item._links != null) {
                    //update relations
                    delete item.connection;
                    delete item.service;
                    delete item.selectionService;
                    // if (cartographyConnection._links.self.href == '' && cartographyConnection) {
                    //   item.deleteRelation('spatialSelectionConnection', cartographyConnection).subscribe(result => {
                    //   }, error => console.error(error));
                    // } else {
                    //   item.substituteRelation('spatialSelectionConnection', cartographyConnection).subscribe(result => {
                    //   }, error => console.error(error));
                    // }
                    if (cartographyService._links.self.href == '') {
                        item.deleteRelation('service', cartographyService).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.substituteRelation('service', cartographyService).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (cartographySelectionService._links.self.href == '' && cartographySelectionService) {
                        item.deleteRelation('spatialSelectionService', cartographySelectionService).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.substituteRelation('spatialSelectionService', cartographySelectionService).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_API), item);
                }
                return result;
            };
        CartographyService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CartographyService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CartographyService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Cartography group
     */
    var /**
     * Cartography group
     */ CartographyGroup = (function (_super) {
        __extends(CartographyGroup, _super);
        function CartographyGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CartographyGroup;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * CartographyGroup manager service
     */
    var CartographyGroupService = (function (_super) {
        __extends(CartographyGroupService, _super);
        /** constructor */
        function CartographyGroupService(injector, http) {
            var _this = _super.call(this, CartographyGroup, "cartography-groups", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CARTOGRAPHY_GROUP_API = 'cartography-groups';
            return _this;
        }
        /** remove cartography group*/
        /**
         * remove cartography group
         * @param {?} item
         * @return {?}
         */
        CartographyGroupService.prototype.remove = /**
         * remove cartography group
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save cartography group*/
        /**
         * save cartography group
         * @param {?} item
         * @return {?}
         */
        CartographyGroupService.prototype.save = /**
         * save cartography group
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_GROUP_API), item);
                }
                return result;
            };
        CartographyGroupService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CartographyGroupService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CartographyGroupService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Cartography availability model
     */
    var /**
     * Cartography availability model
     */ CartographyAvailability = (function (_super) {
        __extends(CartographyAvailability, _super);
        function CartographyAvailability() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CartographyAvailability;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * CartographyAvailability manager service
     */
    var CartographyAvailabilityService = (function (_super) {
        __extends(CartographyAvailabilityService, _super);
        /** constructor */
        function CartographyAvailabilityService(injector, http) {
            var _this = _super.call(this, CartographyAvailability, "cartography-availabilities", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CARTOGRAPHY_AVAILABILITY_API = 'cartography-availabilities';
            return _this;
        }
        /** remove cartography availability*/
        /**
         * remove cartography availability
         * @param {?} item
         * @return {?}
         */
        CartographyAvailabilityService.prototype.remove = /**
         * remove cartography availability
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save cartography availability*/
        /**
         * save cartography availability
         * @param {?} item
         * @return {?}
         */
        CartographyAvailabilityService.prototype.save = /**
         * save cartography availability
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.cartography != null) {
                        item.substituteRelation('cartography', item.cartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.territory != null) {
                        item.substituteRelation('territory', item.territory).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.territory = item.territory._links.self.href;
                    item.cartography = item.cartography._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_AVAILABILITY_API), item);
                }
                return result;
            };
        CartographyAvailabilityService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CartographyAvailabilityService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CartographyAvailabilityService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Cartography availability model
     */
    var /**
     * Cartography availability model
     */ CartographyFilter = (function (_super) {
        __extends(CartographyFilter, _super);
        function CartographyFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CartographyFilter;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * CartographyFilter manager service
     */
    var CartographyFilterService = (function (_super) {
        __extends(CartographyFilterService, _super);
        /** constructor */
        function CartographyFilterService(injector, http) {
            var _this = _super.call(this, CartographyFilter, "cartography-filters", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CARTOGRAPHY_FILTER_API = 'cartography-filters';
            return _this;
        }
        /** remove cartography filter*/
        /**
         * remove cartography filter
         * @param {?} item
         * @return {?}
         */
        CartographyFilterService.prototype.remove = /**
         * remove cartography filter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save cartography availability*/
        /**
         * save cartography availability
         * @param {?} item
         * @return {?}
         */
        CartographyFilterService.prototype.save = /**
         * save cartography availability
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.cartography != null) {
                        item.substituteRelation('cartography', item.cartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.territorialLevel != null && item.territorialLevel != undefined) {
                        item.substituteRelation('territorialLevel', item.territorialLevel).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.cartography = item.cartography._links.self.href;
                    item.territorialLevel = item.territorialLevel._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_FILTER_API), item);
                }
                return result;
            };
        CartographyFilterService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CartographyFilterService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CartographyFilterService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service parameter model
     */
    var /**
     * Service parameter model
     */ CartographyParameter = (function (_super) {
        __extends(CartographyParameter, _super);
        function CartographyParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CartographyParameter;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Service parameter manager service
     */
    var CartographyParameterService = (function (_super) {
        __extends(CartographyParameterService, _super);
        /** constructor */
        function CartographyParameterService(injector, http) {
            var _this = _super.call(this, CartographyParameter, "cartography-parameters", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CARTOGRAPHY_PARAMETER_API = 'cartography-parameters';
            return _this;
        }
        /** remove service parameter*/
        /**
         * remove service parameter
         * @param {?} item
         * @return {?}
         */
        CartographyParameterService.prototype.remove = /**
         * remove service parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save service parameter*/
        /**
         * save service parameter
         * @param {?} item
         * @return {?}
         */
        CartographyParameterService.prototype.save = /**
         * save service parameter
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    if (item.cartography != null) {
                        /** @type {?} */
                        var cartography = item.cartography;
                        delete item.cartography;
                        item.substituteRelation('cartography', cartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    item.cartography = item.cartography._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_PARAMETER_API), item);
                }
                return result;
            };
        CartographyParameterService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CartographyParameterService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CartographyParameterService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Background model
     */
    var /**
     * Background model
     */ Background = (function (_super) {
        __extends(Background, _super);
        function Background() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Background;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Background manager service
     */
    var BackgroundService = (function (_super) {
        __extends(BackgroundService, _super);
        /** constructor */
        function BackgroundService(injector, http) {
            var _this = _super.call(this, Background, "backgrounds", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.BACKGROUND_API = 'backgrounds';
            return _this;
        }
        /** remove background*/
        /**
         * remove background
         * @param {?} item
         * @return {?}
         */
        BackgroundService.prototype.remove = /**
         * remove background
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save background*/
        /**
         * save background
         * @param {?} item
         * @return {?}
         */
        BackgroundService.prototype.save = /**
         * save background
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var backgroundCartographyGroup = {};
                backgroundCartographyGroup._links = {};
                backgroundCartographyGroup._links.self = {};
                backgroundCartographyGroup._links.self.href = "";
                item.cartographyGroup;
                if (item.cartographyGroup != null) {
                    backgroundCartographyGroup = item.cartographyGroup;
                    if (typeof item.cartographyGroup._links != 'undefined') {
                        item.cartographyGroup = item.cartographyGroup._links.self.href;
                    }
                }
                if (item._links != null) {
                    //update relations
                    delete item.cartographyGroup;
                    if (backgroundCartographyGroup._links.self.href == '') {
                        item.deleteRelation('cartographyGroup', backgroundCartographyGroup).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.substituteRelation('cartographyGroup', backgroundCartographyGroup).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    result = this.http.post(this.resourceService.getResourceUrl(this.BACKGROUND_API), item);
                }
                return result;
            };
        BackgroundService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        BackgroundService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return BackgroundService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Tree model
     */
    var /**
     * Tree model
     */ Tree = (function (_super) {
        __extends(Tree, _super);
        function Tree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Tree;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Tree manager service
     */
    var TreeService = (function (_super) {
        __extends(TreeService, _super);
        /** constructor */
        function TreeService(injector, http) {
            var _this = _super.call(this, Tree, "trees", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TREE_API = 'trees';
            return _this;
        }
        /** remove tree*/
        /**
         * remove tree
         * @param {?} item
         * @return {?}
         */
        TreeService.prototype.remove = /**
         * remove tree
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save tree*/
        /**
         * save tree
         * @param {?} item
         * @return {?}
         */
        TreeService.prototype.save = /**
         * save tree
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.TREE_API), item);
                }
                return result;
            };
        TreeService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TreeService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TreeService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Tree node model
     */
    var /**
     * Tree node model
     */ TreeNode = (function (_super) {
        __extends(TreeNode, _super);
        function TreeNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TreeNode;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Tree node manager service
     */
    var TreeNodeService = (function (_super) {
        __extends(TreeNodeService, _super);
        /** constructor */
        function TreeNodeService(injector, http) {
            var _this = _super.call(this, TreeNode, "tree-nodes", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.TREE_NODE_API = 'tree-nodes';
            return _this;
        }
        /** remove tree node*/
        /**
         * remove tree node
         * @param {?} item
         * @return {?}
         */
        TreeNodeService.prototype.remove = /**
         * remove tree node
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save tree node*/
        /**
         * save tree node
         * @param {?} item
         * @return {?}
         */
        TreeNodeService.prototype.save = /**
         * save tree node
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    /** @type {?} */
                    var itemTree = item.tree;
                    /** @type {?} */
                    var itemCartography = item.cartography;
                    /** @type {?} */
                    var itemParent = item.parent;
                    delete item.tree;
                    delete item.cartography;
                    delete item.parent;
                    result = this.http.put(item._links.self.href, item);
                    if (itemTree != null) {
                        item.substituteRelation('tree', itemTree).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (itemCartography != null) {
                        item.substituteRelation('cartography', itemCartography).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (itemParent != null) {
                        item.substituteRelation('parent', itemParent).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        /** @type {?} */
                        var treeNodeParent = {};
                        treeNodeParent._links = {};
                        treeNodeParent._links.self = {};
                        treeNodeParent._links.self.href = "";
                        item.deleteRelation('parent', treeNodeParent).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    if (item.tree && item.tree._links && item.tree._links.self) {
                        item.tree = item.tree._links.self.href;
                    }
                    if (item.cartography && item.cartography._links && item.cartography._links.self) {
                        item.cartography = item.cartography._links.self.href;
                    }
                    result = this.http.post(this.resourceService.getResourceUrl(this.TREE_NODE_API), item);
                }
                return result;
            };
        TreeNodeService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        TreeNodeService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return TreeNodeService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Territorial appliction name
      @type {?} */
    var TERRITORIAL_APP_NAME = "Aplicación Territorial";
    /**
     * Application model
     */
    var /**
     * Application model
     */ Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Application;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Application manager service
     */
    var ApplicationService = (function (_super) {
        __extends(ApplicationService, _super);
        /** constructor */
        function ApplicationService(injector, http) {
            var _this = _super.call(this, Application, "applications", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.APPLICATION_API = 'applications';
            return _this;
        }
        /** remove application*/
        /**
         * remove application
         * @param {?} item
         * @return {?}
         */
        ApplicationService.prototype.remove = /**
         * remove application
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save application*/
        /**
         * save application
         * @param {?} item
         * @return {?}
         */
        ApplicationService.prototype.save = /**
         * save application
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var applicationSituationMap = {};
                applicationSituationMap._links = {};
                applicationSituationMap._links.self = {};
                applicationSituationMap._links.self.href = "";
                if (item.situationMap != null) {
                    applicationSituationMap = item.situationMap;
                    if (typeof item.situationMap._links != 'undefined') {
                        item.situationMap = item.situationMap._links.self.href;
                    }
                }
                if (item._links != null) {
                    //update relations
                    delete item.situationMap;
                    if (applicationSituationMap._links.self.href == '') {
                        item.deleteRelation('situationMap', applicationSituationMap).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        item.substituteRelation('situationMap', applicationSituationMap).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    result = this.http.put(item._links.self.href, item);
                }
                else {
                    result = this.http.post(this.resourceService.getResourceUrl(this.APPLICATION_API), item);
                }
                return result;
            };
        ApplicationService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ApplicationService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ApplicationService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Application background model
     */
    var /**
     * Application background model
     */ ApplicationBackground = (function (_super) {
        __extends(ApplicationBackground, _super);
        function ApplicationBackground() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ApplicationBackground;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Application background manager service
     */
    var ApplicationBackgroundService = (function (_super) {
        __extends(ApplicationBackgroundService, _super);
        /** constructor */
        function ApplicationBackgroundService(injector, http) {
            var _this = _super.call(this, ApplicationBackground, "application-backgrounds", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.APPLICATION_BACKGROUND_API = 'application-backgrounds';
            return _this;
        }
        /** remove application background*/
        /**
         * remove application background
         * @param {?} item
         * @return {?}
         */
        ApplicationBackgroundService.prototype.remove = /**
         * remove application background
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save application background*/
        /**
         * save application background
         * @param {?} item
         * @return {?}
         */
        ApplicationBackgroundService.prototype.save = /**
         * save application background
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.application != null) {
                        item.substituteRelation('application', item.application).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                    if (item.background != null) {
                        item.substituteRelation('background', item.background).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.application = item.application._links.self.href;
                    item.background = item.background._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.APPLICATION_BACKGROUND_API), item);
                }
                return result;
            };
        ApplicationBackgroundService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ApplicationBackgroundService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ApplicationBackgroundService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Application parameter model
     */
    var /**
     * Application parameter model
     */ ApplicationParameter = (function (_super) {
        __extends(ApplicationParameter, _super);
        function ApplicationParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ApplicationParameter;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Application parameter manager service
     */
    var ApplicationParameterService = (function (_super) {
        __extends(ApplicationParameterService, _super);
        /** constructor */
        function ApplicationParameterService(injector, http) {
            var _this = _super.call(this, ApplicationParameter, "application-parameters", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.APPLICATION_PARAMETER_API = 'application-parameters';
            return _this;
        }
        /** remove application*/
        /**
         * remove application
         * @param {?} item
         * @return {?}
         */
        ApplicationParameterService.prototype.remove = /**
         * remove application
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save application*/
        /**
         * save application
         * @param {?} item
         * @return {?}
         */
        ApplicationParameterService.prototype.save = /**
         * save application
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var result;
                if (item._links != null) {
                    result = this.http.put(item._links.self.href, item);
                    if (item.application != null) {
                        item.substituteRelation('application', item.application).subscribe(function (result) {
                        }, function (error) { return console.error(error); });
                    }
                }
                else {
                    item.application = item.application._links.self.href;
                    result = this.http.post(this.resourceService.getResourceUrl(this.APPLICATION_PARAMETER_API), item);
                }
                return result;
            };
        ApplicationParameterService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ApplicationParameterService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return ApplicationParameterService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Connection model
     */
    var /**
     * Connection model
     */ CodeList = (function (_super) {
        __extends(CodeList, _super);
        function CodeList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeList;
    }(Resource));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Connection manager service
     */
    var CodeListService = (function (_super) {
        __extends(CodeListService, _super);
        /** constructor */
        function CodeListService(injector, http) {
            var _this = _super.call(this, CodeList, "codelist-values", injector) || this;
            _this.http = http;
            /**
             * API resource path
             */
            _this.CODELIST_API = 'codelist-values';
            return _this;
        }
        /** remove connection*/
        /**
         * remove connection
         * @param {?} item
         * @return {?}
         */
        CodeListService.prototype.remove = /**
         * remove connection
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.http.delete(item._links.self.href);
            };
        /** save connection*/
        /**
         * save connection
         * @param {?} item
         * @return {?}
         */
        CodeListService.prototype.save = /**
         * save connection
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
                    result = this.http.post(this.resourceService.getResourceUrl(this.CODELIST_API), item);
                }
                return result;
            };
        CodeListService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        CodeListService.ctorParameters = function () {
            return [
                { type: i0.Injector },
                { type: i1.HttpClient }
            ];
        };
        return CodeListService;
    }(RestService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Layer model: configure Layer data and displaying configuration
     */
    var /**
     * Layer model: configure Layer data and displaying configuration
     */ Layer = (function () {
        function Layer() {
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
        return Layer;
    }());
    /**
     * Optional parameter model: configure parameter-value pair to add to the request layer URL
     */
    var /**
     * Optional parameter model: configure parameter-value pair to add to the request layer URL
     */ OptionalParameter = (function () {
        function OptionalParameter() {
        }
        return OptionalParameter;
    }());
    /**
     * Layer configuration model: modify the configuration of a layer when interacting with the map (make visible, move the layer ...)
     */
    var /**
     * Layer configuration model: modify the configuration of a layer when interacting with the map (make visible, move the layer ...)
     */ LayerConfiguration = (function () {
        function LayerConfiguration() {
        }
        return LayerConfiguration;
    }());
    /**
     * Layer group model
     */
    var /**
     * Layer group model
     */ LayerGroup = (function () {
        function LayerGroup() {
        }
        return LayerGroup;
    }());
    /**
     * Map options configuration model
     */
    var /**
     * Map options configuration model
     */ MapOptionsConfiguration = (function () {
        function MapOptionsConfiguration() {
        }
        return MapOptionsConfiguration;
    }());
    /**
     * Map component status model
     */
    var /**
     * Map component status model
     */ MapComponentStatus = (function () {
        function MapComponentStatus() {
            /**
             * loaded?
             */
            this.loaded = false;
        }
        return MapComponentStatus;
    }());
    var MapConfigurationManagerService = (function () {
        /** constructor*/
        function MapConfigurationManagerService() {
            //
            this.layersSubject = new rxjs.BehaviorSubject([]);
            this.layers = null;
            this.baseLayerGroupsSubject = new rxjs.BehaviorSubject([]);
            this.baseLayerGroups = null;
            this.layerConfigurationSubject = new rxjs.BehaviorSubject([]);
            this.addLayersSubject = new rxjs.BehaviorSubject([]);
            this.removeLayersSubject = new rxjs.BehaviorSubject([]);
            this.situationMapConfigurationSubject = new rxjs.BehaviorSubject([]);
            this.mapOptionsConfigurationSubject = new rxjs.BehaviorSubject([]);
            this.mapComponentStatusSubject = new rxjs.BehaviorSubject([]);
            /**
             * layer count
             */
            this.count = 0;
        }
        /** configure the overlay layers of the map, by passing as a parameter an array of objects of type Layer objects defining the layers to load.*/
        /**
         * configure the overlay layers of the map, by passing as a parameter an array of objects of type Layer objects defining the layers to load.
         * @param {?} configuration
         * @return {?}
         */
        MapConfigurationManagerService.prototype.loadLayersConfiguration = /**
         * configure the overlay layers of the map, by passing as a parameter an array of objects of type Layer objects defining the layers to load.
         * @param {?} configuration
         * @return {?}
         */
            function (configuration) {
                if (this.layers != null) {
                    this.clearLayers(false);
                }
                this.setLayers(configuration);
            };
        /**configure the base layers of the map by passing as a parameter an array of objects of type LayerGroup each of them with the corresponding Layer objects defining the layers to load.*/
        /**
         * configure the base layers of the map by passing as a parameter an array of objects of type LayerGroup each of them with the corresponding Layer objects defining the layers to load.
         * @param {?} configuration
         * @return {?}
         */
        MapConfigurationManagerService.prototype.loadBaseLayersConfiguration = /**
         * configure the base layers of the map by passing as a parameter an array of objects of type LayerGroup each of them with the corresponding Layer objects defining the layers to load.
         * @param {?} configuration
         * @return {?}
         */
            function (configuration) {
                this.setBaseLayerGroups(configuration);
            };
        /** get base layer groups*/
        /**
         * get base layer groups
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getBaseLayerGroups = /**
         * get base layer groups
         * @return {?}
         */
            function () {
                return this.baseLayerGroupsSubject.asObservable();
            };
        /** set base layer groups*/
        /**
         * set base layer groups
         * @param {?} groups
         * @return {?}
         */
        MapConfigurationManagerService.prototype.setBaseLayerGroups = /**
         * set base layer groups
         * @param {?} groups
         * @return {?}
         */
            function (groups) {
                this.baseLayerGroups = groups;
                this.refreshBaseLayerGroups();
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.refreshBaseLayerGroups = /**
         * @return {?}
         */
            function () {
                // Send the new values so that all subscribers are updated
                this.baseLayerGroupsSubject.next(this.baseLayerGroups);
            };
        /** get layers*/
        /**
         * get layers
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getLayers = /**
         * get layers
         * @return {?}
         */
            function () {
                return this.layersSubject.asObservable();
            };
        /** remove all layers from map*/
        /**
         * remove all layers from map
         * @param {?} refresh
         * @return {?}
         */
        MapConfigurationManagerService.prototype.clearLayers = /**
         * remove all layers from map
         * @param {?} refresh
         * @return {?}
         */
            function (refresh) {
                while (this.layers.length) {
                    this.layers.pop();
                }
                if (refresh) {
                    this.refreshLayers();
                }
            };
        /** set layers*/
        /**
         * set layers
         * @param {?} layers
         * @return {?}
         */
        MapConfigurationManagerService.prototype.setLayers = /**
         * set layers
         * @param {?} layers
         * @return {?}
         */
            function (layers) {
                this.layers = layers;
                this.refreshLayers();
            };
        /** add given layer to map*/
        /**
         * add given layer to map
         * @param {?} layer
         * @return {?}
         */
        MapConfigurationManagerService.prototype.addLayer = /**
         * add given layer to map
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                this.layers.push(layer);
                this.refreshAddLayers(layer);
            };
        /** add given layer to map at given index*/
        /**
         * add given layer to map at given index
         * @param {?} layer
         * @param {?} index
         * @return {?}
         */
        MapConfigurationManagerService.prototype.addLayerAt = /**
         * add given layer to map at given index
         * @param {?} layer
         * @param {?} index
         * @return {?}
         */
            function (layer, index) {
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
            };
        /** remove given layer from map*/
        /**
         * remove given layer from map
         * @param {?} layer
         * @return {?}
         */
        MapConfigurationManagerService.prototype.removeLayer = /**
         * remove given layer from map
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                /** @type {?} */
                var index = this.layers.indexOf(layer);
                this.removeLayerIndex(index);
            };
        /** remove layer with given id from map */
        /**
         * remove layer with given id from map
         * @param {?} id
         * @return {?}
         */
        MapConfigurationManagerService.prototype.removeLayerId = /**
         * remove layer with given id from map
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var index = -1;
                for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
                    if (this.layers[i].id == id) {
                        index = i;
                        break;
                    }
                }
                this.removeLayerIndex(index);
            };
        /** remove layer at given index from map */
        /**
         * remove layer at given index from map
         * @param {?} index
         * @return {?}
         */
        MapConfigurationManagerService.prototype.removeLayerIndex = /**
         * remove layer at given index from map
         * @param {?} index
         * @return {?}
         */
            function (index) {
                /** @type {?} */
                var layer = this.layers[index];
                this.layers.splice(index, 1);
                this.refreshRemoveLayers(layer);
            };
        /**
         * refresh layers
         * @return {?}
         */
        MapConfigurationManagerService.prototype.refreshLayers = /**
         * refresh layers
         * @return {?}
         */
            function () {
                // Send the new values so that all subscribers are updated
                this.layersSubject.next(this.layers);
            };
        /** Observable for layers added */
        /**
         * Observable for layers added
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getLayersAdded = /**
         * Observable for layers added
         * @return {?}
         */
            function () {
                return this.addLayersSubject.asObservable();
            };
        /**
         * @param {?} layer
         * @return {?}
         */
        MapConfigurationManagerService.prototype.refreshAddLayers = /**
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                // Send the new values so that all subscribers are updated
                this.addLayersSubject.next([layer]);
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getLayersRemoved = /**
         * @return {?}
         */
            function () {
                return this.removeLayersSubject.asObservable();
            };
        /**
         * @param {?} layer
         * @return {?}
         */
        MapConfigurationManagerService.prototype.refreshRemoveLayers = /**
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                // Send the new values so that all subscribers are updated
                this.removeLayersSubject.next([layer]);
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getLayerConfigurationListener = /**
         * @return {?}
         */
            function () {
                return this.layerConfigurationSubject.asObservable();
            };
        /**
         * @param {?} id
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getLayerIndexById = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var index = -1;
                for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
                    if (this.layers[i].id == id) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        /** move layer with given id to the given index*/
        /**
         * move layer with given id to the given index
         * @param {?} id
         * @param {?} index
         * @return {?}
         */
        MapConfigurationManagerService.prototype.moveLayer = /**
         * move layer with given id to the given index
         * @param {?} id
         * @param {?} index
         * @return {?}
         */
            function (id, index) {
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
            };
        /** change visibility of layer with given id to the given value*/
        /**
         * change visibility of layer with given id to the given value
         * @param {?} id
         * @param {?} visibility
         * @return {?}
         */
        MapConfigurationManagerService.prototype.changeLayerVisibility = /**
         * change visibility of layer with given id to the given value
         * @param {?} id
         * @param {?} visibility
         * @return {?}
         */
            function (id, visibility) {
                this.refreshLayerConfiguration(id, null, visibility, null);
            };
        /** change opacity of layer with given id to the given value*/
        /**
         * change opacity of layer with given id to the given value
         * @param {?} id
         * @param {?} opacity
         * @return {?}
         */
        MapConfigurationManagerService.prototype.changeLayerOpacity = /**
         * change opacity of layer with given id to the given value
         * @param {?} id
         * @param {?} opacity
         * @return {?}
         */
            function (id, opacity) {
                this.refreshLayerConfiguration(id, opacity, null, null);
            };
        /**
         * @param {?} id
         * @param {?} opacity
         * @param {?} visibility
         * @param {?} position
         * @return {?}
         */
        MapConfigurationManagerService.prototype.refreshLayerConfiguration = /**
         * @param {?} id
         * @param {?} opacity
         * @param {?} visibility
         * @param {?} position
         * @return {?}
         */
            function (id, opacity, visibility, position) {
                /** @type {?} */
                var layer = new LayerConfiguration();
                layer.id = id;
                layer.opacity = opacity;
                layer.visibility = visibility;
                layer.position = position;
                this.layerConfigurationSubject.next([layer]);
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getSituationMapConfigurationListener = /**
         * @return {?}
         */
            function () {
                return this.situationMapConfigurationSubject.asObservable();
            };
        /** configure the situation map of the map component by passing as a parameter an array of objects of type LayerGroup, each of them with the corresponding Layer objects defining the layers to load as situation map.*/
        /**
         * configure the situation map of the map component by passing as a parameter an array of objects of type LayerGroup, each of them with the corresponding Layer objects defining the layers to load as situation map.
         * @param {?} layers
         * @return {?}
         */
        MapConfigurationManagerService.prototype.loadSituationMapConfiguration = /**
         * configure the situation map of the map component by passing as a parameter an array of objects of type LayerGroup, each of them with the corresponding Layer objects defining the layers to load as situation map.
         * @param {?} layers
         * @return {?}
         */
            function (layers) {
                // Send the new values so that all subscribers are updated
                this.situationMapConfigurationSubject.next(layers);
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getMapOptionsConfigurationListener = /**
         * @return {?}
         */
            function () {
                return this.mapOptionsConfigurationSubject.asObservable();
            };
        /** load map options configuration */
        /**
         * load map options configuration
         * @param {?} configuration
         * @return {?}
         */
        MapConfigurationManagerService.prototype.loadMapOptionsConfiguration = /**
         * load map options configuration
         * @param {?} configuration
         * @return {?}
         */
            function (configuration) {
                // Send the new values so that all subscribers are updated
                this.mapOptionsConfigurationSubject.next([configuration]);
            };
        /**
         * @return {?}
         */
        MapConfigurationManagerService.prototype.getMapComponentStatusListener = /**
         * @return {?}
         */
            function () {
                return this.mapComponentStatusSubject.asObservable();
            };
        /** set map component status */
        /**
         * set map component status
         * @param {?} status
         * @return {?}
         */
        MapConfigurationManagerService.prototype.setMapComponentStatus = /**
         * set map component status
         * @param {?} status
         * @return {?}
         */
            function (status) {
                //Notify the map component status
                this.mapComponentStatusSubject.next([status]);
            };
        MapConfigurationManagerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        MapConfigurationManagerService.ctorParameters = function () { return []; };
        /** @nocollapse */ MapConfigurationManagerService.ngInjectableDef = i0.defineInjectable({ factory: function MapConfigurationManagerService_Factory() { return new MapConfigurationManagerService(); }, token: MapConfigurationManagerService, providedIn: "root" });
        return MapConfigurationManagerService;
    }());

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
    var HasAnyAuthorityDirective = (function () {
        /** constructor */
        function HasAnyAuthorityDirective(principal, templateRef, viewContainerRef) {
            this.principal = principal;
            this.templateRef = templateRef;
            this.viewContainerRef = viewContainerRef;
        }
        Object.defineProperty(HasAnyAuthorityDirective.prototype, "sitmunHasAnyAuthority", {
            /** Set whether current user has any of the given authorities */
            set: /**
             * Set whether current user has any of the given authorities
             * @param {?} value
             * @return {?}
             */ function (value) {
                var _this = this;
                this.authorities = typeof value === 'string' ? [/** @type {?} */ (value)] : /** @type {?} */ (value);
                this.updateView();
                // Get notified each time authentication state changes.
                this.principal.getAuthenticationState().subscribe(function (identity) { return _this.updateView(); });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * update view
         * @return {?}
         */
        HasAnyAuthorityDirective.prototype.updateView = /**
         * update view
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.territory) {
                    this.principal.hasAnyAuthorityOnTerritory(this.authorities, this.territory).then(function (result) {
                        _this.viewContainerRef.clear();
                        if (result) {
                            _this.viewContainerRef.createEmbeddedView(_this.templateRef);
                        }
                    });
                }
                else {
                    this.principal.hasAnyAuthority(this.authorities).then(function (result) {
                        _this.viewContainerRef.clear();
                        if (result) {
                            _this.viewContainerRef.createEmbeddedView(_this.templateRef);
                        }
                    });
                }
            };
        HasAnyAuthorityDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[sitmunHasAnyAuthority]'
                    },] },
        ];
        /** @nocollapse */
        HasAnyAuthorityDirective.ctorParameters = function () {
            return [
                { type: Principal },
                { type: i0.TemplateRef },
                { type: i0.ViewContainerRef }
            ];
        };
        HasAnyAuthorityDirective.propDecorators = {
            territory: [{ type: i0.Input }],
            sitmunHasAnyAuthority: [{ type: i0.Input }]
        };
        return HasAnyAuthorityDirective;
    }());

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
    var HasAnyAuthorityOnTerritoryDirective = (function () {
        /** constructor */
        function HasAnyAuthorityOnTerritoryDirective(principal, templateRef, viewContainerRef) {
            this.principal = principal;
            this.templateRef = templateRef;
            this.viewContainerRef = viewContainerRef;
        }
        Object.defineProperty(HasAnyAuthorityOnTerritoryDirective.prototype, "sitmunHasAnyAuthorityOnTerritory", {
            /** Set whether current user has any of the given authorities on territory */
            set: /**
             * Set whether current user has any of the given authorities on territory
             * @param {?} opts
             * @return {?}
             */ function (opts) {
                var _this = this;
                this.authorities = typeof opts.authorities === 'string' ? [/** @type {?} */ (opts.authorities)] : /** @type {?} */ (opts.authorities);
                this.territory = opts.territory;
                this.updateView();
                // Get notified each time authentication state changes.
                this.principal.getAuthenticationState().subscribe(function (identity) { return _this.updateView(); });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * update view
         * @return {?}
         */
        HasAnyAuthorityOnTerritoryDirective.prototype.updateView = /**
         * update view
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.territory) {
                    this.principal.hasAnyAuthorityOnTerritory(this.authorities, this.territory).then(function (result) {
                        _this.viewContainerRef.clear();
                        if (result) {
                            _this.viewContainerRef.createEmbeddedView(_this.templateRef);
                        }
                    });
                }
                else {
                    this.principal.hasAnyAuthority(this.authorities).then(function (result) {
                        _this.viewContainerRef.clear();
                        if (result) {
                            _this.viewContainerRef.createEmbeddedView(_this.templateRef);
                        }
                    });
                }
            };
        HasAnyAuthorityOnTerritoryDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[sitmunHasAnyAuthorityOnTerritory]'
                    },] },
        ];
        /** @nocollapse */
        HasAnyAuthorityOnTerritoryDirective.ctorParameters = function () {
            return [
                { type: Principal },
                { type: i0.TemplateRef },
                { type: i0.ViewContainerRef }
            ];
        };
        HasAnyAuthorityOnTerritoryDirective.propDecorators = {
            sitmunHasAnyAuthorityOnTerritory: [{ type: i0.Input }]
        };
        return HasAnyAuthorityOnTerritoryDirective;
    }());

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
        return new httpLoader.TranslateHttpLoader(http, './assets/i18n/', '.json');
    }
    var ɵ0 = (createTranslateLoader);
    /**
     * SITMUN frontend core module
     */
    var SitmunFrontendCoreModule = (function () {
        function SitmunFrontendCoreModule() {
        }
        /**
         * @return {?}
         */
        SitmunFrontendCoreModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: SitmunFrontendCoreModule,
                    providers: [
                        CodeListService,
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
                        CapabilitiesService,
                        ServiceParameterService,
                        CartographyService,
                        CartographyGroupService,
                        CartographyAvailabilityService,
                        CartographyParameterService,
                        CartographyFilterService,
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
                        TranslationService,
                        LanguageService,
                        DashboardService,
                        MapConfigurationManagerService,
                        {
                            provide: i1.HTTP_INTERCEPTORS,
                            useClass: AuthInterceptor,
                            multi: true
                        },
                        {
                            provide: i1.HTTP_INTERCEPTORS,
                            useClass: AuthExpiredInterceptor,
                            multi: true
                        }
                    ]
                };
            };
        SitmunFrontendCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            /*RouterModule,
                                HttpClientModule,
                                CommonModule,
                                AngularHalModule,*/
                            core.TranslateModule.forRoot({
                                loader: {
                                    provide: core.TranslateLoader,
                                    useFactory: ɵ0,
                                    deps: [i1.HttpClient]
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
                            core.TranslateModule
                        ]
                    },] },
        ];
        return SitmunFrontendCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Angular HAL module
     */
    var AngularHalModule = (function () {
        function AngularHalModule() {
        }
        /**
         * @return {?}
         */
        AngularHalModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: AngularHalModule,
                    providers: [
                        ExternalService,
                        i1.HttpClient,
                        {
                            provide: ResourceService,
                            useClass: ResourceService,
                            deps: [ExternalService]
                        }
                    ]
                };
            };
        AngularHalModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [i1.HttpClientModule],
                        declarations: [],
                        exports: [i1.HttpClientModule],
                        providers: [
                            ExternalService,
                            i1.HttpClient,
                            {
                                provide: ResourceService,
                                useClass: ResourceService,
                                deps: [ExternalService]
                            }
                        ]
                    },] },
        ];
        return AngularHalModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AccountService = AccountService;
    exports.AuthService = AuthService;
    exports.AuthInterceptor = AuthInterceptor;
    exports.AuthExpiredInterceptor = AuthExpiredInterceptor;
    exports.LoginService = LoginService;
    exports.Principal = Principal;
    exports.DashboardService = DashboardService;
    exports.User = User;
    exports.UserService = UserService;
    exports.UserPosition = UserPosition;
    exports.UserPositionService = UserPositionService;
    exports.UserConfiguration = UserConfiguration;
    exports.UserConfigurationService = UserConfigurationService;
    exports.Territory = Territory;
    exports.TerritoryService = TerritoryService;
    exports.TerritoryType = TerritoryType;
    exports.TerritoryTypeService = TerritoryTypeService;
    exports.TerritoryGroupType = TerritoryGroupType;
    exports.TerritoryGroupTypeService = TerritoryGroupTypeService;
    exports.Role = Role;
    exports.RoleService = RoleService;
    exports.Connection = Connection;
    exports.ConnectionService = ConnectionService;
    exports.GEOADMIN_TREE_TASK_ID = GEOADMIN_TREE_TASK_ID;
    exports.Task = Task;
    exports.TaskService = TaskService;
    exports.TaskType = TaskType;
    exports.TaskTypeService = TaskTypeService;
    exports.TaskGroup = TaskGroup;
    exports.TaskGroupService = TaskGroupService;
    exports.TaskParameter = TaskParameter;
    exports.TaskParameterService = TaskParameterService;
    exports.TaskAvailability = TaskAvailability;
    exports.TaskAvailabilityService = TaskAvailabilityService;
    exports.TaskUI = TaskUI;
    exports.TaskUIService = TaskUIService;
    exports.TranslationService = TranslationService;
    exports.Translation = Translation;
    exports.Language = Language;
    exports.LanguageService = LanguageService;
    exports.Service = Service;
    exports.ServiceService = ServiceService;
    exports.ServiceParameter = ServiceParameter;
    exports.ServiceParameterService = ServiceParameterService;
    exports.Capabilitie = Capabilitie;
    exports.CapabilitiesService = CapabilitiesService;
    exports.Cartography = Cartography;
    exports.CartographyService = CartographyService;
    exports.CartographyGroup = CartographyGroup;
    exports.CartographyGroupService = CartographyGroupService;
    exports.CartographyAvailability = CartographyAvailability;
    exports.CartographyAvailabilityService = CartographyAvailabilityService;
    exports.CartographyFilter = CartographyFilter;
    exports.CartographyFilterService = CartographyFilterService;
    exports.CartographyParameter = CartographyParameter;
    exports.CartographyParameterService = CartographyParameterService;
    exports.Background = Background;
    exports.BackgroundService = BackgroundService;
    exports.Tree = Tree;
    exports.TreeService = TreeService;
    exports.TreeNode = TreeNode;
    exports.TreeNodeService = TreeNodeService;
    exports.TERRITORIAL_APP_NAME = TERRITORIAL_APP_NAME;
    exports.Application = Application;
    exports.ApplicationService = ApplicationService;
    exports.ApplicationBackground = ApplicationBackground;
    exports.ApplicationBackgroundService = ApplicationBackgroundService;
    exports.ApplicationParameter = ApplicationParameter;
    exports.ApplicationParameterService = ApplicationParameterService;
    exports.CodeList = CodeList;
    exports.CodeListService = CodeListService;
    exports.Layer = Layer;
    exports.OptionalParameter = OptionalParameter;
    exports.LayerConfiguration = LayerConfiguration;
    exports.LayerGroup = LayerGroup;
    exports.MapOptionsConfiguration = MapOptionsConfiguration;
    exports.MapComponentStatus = MapComponentStatus;
    exports.MapConfigurationManagerService = MapConfigurationManagerService;
    exports.createTranslateLoader = createTranslateLoader;
    exports.SitmunFrontendCoreModule = SitmunFrontendCoreModule;
    exports.ExternalService = ExternalService;
    exports.RestService = RestService;
    exports.Resource = Resource;
    exports.ResourceArray = ResourceArray;
    exports.ResourceService = ResourceService;
    exports.ResourceHelper = ResourceHelper;
    exports.AngularHalModule = AngularHalModule;
    exports.ɵb = HasAnyAuthorityOnTerritoryDirective;
    exports.ɵa = HasAnyAuthorityDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWNvcmUudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlLWFycmF5LnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZS1oZWxwZXIudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdXNlci91c2VyLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9leHRlcm5hbC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9hY2NvdW50L2FjY291bnQuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2F1dGgvYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9hdXRoLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9wcmluY2lwYWwuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2F1dGgvYXV0aC1leHBpcmVkLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9sb2dpbi5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvZGFzaGJvYXJkL2Rhc2hib2FyZC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdXNlci91c2VyLnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS91c2VyL3VzZXItcG9zaXRpb24ubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS91c2VyL3VzZXItcG9zaXRpb24uc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3VzZXIvdXNlci1jb25maWd1cmF0aW9uLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdXNlci91c2VyLWNvbmZpZ3VyYXRpb24uc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3RlcnJpdG9yeS90ZXJyaXRvcnkubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90ZXJyaXRvcnkvdGVycml0b3J5LnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90ZXJyaXRvcnkvdGVycml0b3J5LXR5cGUubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90ZXJyaXRvcnkvdGVycml0b3J5LXR5cGUuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3RlcnJpdG9yeS90ZXJyaXRvcnktZ3JvdXAtdHlwZS5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3RlcnJpdG9yeS90ZXJyaXRvcnktZ3JvdXAtdHlwZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvcm9sZS9yb2xlLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvcm9sZS9yb2xlLnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXR5cGUubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2stdHlwZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLWdyb3VwLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLWdyb3VwLnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90YXNrL3Rhc2stcGFyYW1ldGVyLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLXBhcmFtZXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdGFzay90YXNrLWF2YWlsYWJpbGl0eS5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay1hdmFpbGFiaWxpdHkuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay11aS5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3Rhc2svdGFzay11aS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdHJhbnNsYXRpb24vdHJhbnNsYXRpb24ubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90cmFuc2xhdGlvbi90cmFuc2xhdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdHJhbnNsYXRpb24vbGFuZ3VhZ2UubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90cmFuc2xhdGlvbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvc2VydmljZS9zZXJ2aWNlLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvc2VydmljZS9zZXJ2aWNlLnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9zZXJ2aWNlL3NlcnZpY2UtcGFyYW1ldGVyLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvc2VydmljZS9zZXJ2aWNlLXBhcmFtZXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FwYWJpbGl0aWVzL2NhcGFiaWxpdGllLm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FwYWJpbGl0aWVzL2NhcGFiaWxpdGllcy5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvY2FydG9ncmFwaHkubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvY2FydG9ncmFwaHktZ3JvdXAubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1ncm91cC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvY2FydG9ncmFwaHktYXZhaWxhYmlsaXR5Lm1vZGVsLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvY2FydG9ncmFwaHktYXZhaWxhYmlsaXR5LnNlcnZpY2UudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1maWx0ZXIubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1maWx0ZXIuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LXBhcmFtZXRlci5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LXBhcmFtZXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY2FydG9ncmFwaHkvYmFja2dyb3VuZC5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2NhcnRvZ3JhcGh5L2JhY2tncm91bmQuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3RyZWUvdHJlZS5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL3RyZWUvdHJlZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvdHJlZS90cmVlLW5vZGUubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS90cmVlL3RyZWUtbm9kZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXBwbGljYXRpb24vYXBwbGljYXRpb24ubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXBwbGljYXRpb24vYXBwbGljYXRpb24tYmFja2dyb3VuZC5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLWJhY2tncm91bmQuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5tb2RlbC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvY29kZWxpc3QvY29kZWxpc3QubW9kZWwudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9jb2RlbGlzdC9jb2RlbGlzdC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvbWFwL21hcC1jb25maWd1cmF0aW9uLW1hbmFnZXIuc2VydmljZS50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlL2F1dGgvaGFzLWFueS1hdXRob3JpdHkuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYXV0aC9oYXMtYW55LWF1dGhvcml0eS1vbi10ZXJyaXRvcnkuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvc2l0bXVuLWZyb250ZW5kLWNvcmUubW9kdWxlLnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWNvcmUvYW5ndWxhci1oYWwvc3JjL2xpYi9hbmd1bGFyLWhhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59IiwiXHJcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge2NhdGNoRXJyb3IsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1NvcnR9IGZyb20gJy4vc29ydCc7XHJcbmltcG9ydCB7QXJyYXlJbnRlcmZhY2V9IGZyb20gJy4vYXJyYXktaW50ZXJmYWNlJztcclxuaW1wb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQge1Jlc291cmNlfSBmcm9tICcuL3Jlc291cmNlJztcclxuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogUkVTVCBhcnJheSBvZiByZXNvdXJjZSBpbXBsZW1lbnRhdGlvbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VBcnJheTxUIGV4dGVuZHMgUmVzb3VyY2U+IGltcGxlbWVudHMgQXJyYXlJbnRlcmZhY2U8VD4ge1xyXG4gICAgLyoqIHNvcnRpbmcgaW5mbyAqL1xyXG4gICAgcHVibGljIHNvcnRJbmZvOiBTb3J0W107XHJcbiAgICAvKiogcHJveHkgdXJsICovXHJcbiAgICBwdWJsaWMgcHJveHlVcmw6IHN0cmluZztcclxuICAgIC8qKiByb290IHVybCAqL1xyXG4gICAgcHVibGljIHJvb3RVcmw6IHN0cmluZztcclxuXHJcbiAgICAvKiogc2VsZiB1cmwgKi9cclxuICAgIHB1YmxpYyBzZWxmX3VyaTogc3RyaW5nO1xyXG4gICAgLyoqIG5leHQgcmVzb3VyY2UgdXJsICovXHJcbiAgICBwdWJsaWMgbmV4dF91cmk6IHN0cmluZztcclxuICAgIC8qKiBwcmV2aW91cyByZXNvdXJjZSB1cmwgKi9cclxuICAgIHB1YmxpYyBwcmV2X3VyaTogc3RyaW5nO1xyXG4gICAgLyoqIGZpcnN0IHJlc291cmNlIHVybCAqL1xyXG4gICAgcHVibGljIGZpcnN0X3VyaTogc3RyaW5nO1xyXG4gICAgLyoqIGxhc3QgcmVzb3VyY2UgdXJsICovXHJcbiAgICBwdWJsaWMgbGFzdF91cmk6IHN0cmluZztcclxuXHJcbiAgICAvKiogZW1iZWRkZWQgYXJyYXkgbGlzdCAqL1xyXG4gICAgcHVibGljIF9lbWJlZGRlZDtcclxuXHJcbiAgICAvKiogdG90YWwgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgYXJyYXkgKi9cclxuICAgIHB1YmxpYyB0b3RhbEVsZW1lbnRzID0gMDtcclxuICAgIC8qKiB0b3RhbCBudW1iZXIgb2YgcGFnZXMgaW4gdGhlIHJlc3BvbnNlICovXHJcbiAgICBwdWJsaWMgdG90YWxQYWdlcyA9IDE7XHJcbiAgICBcclxuICAgIC8qKiBwYWdlIG51bWJlciBpbiB0aGUgcmVzcG9uc2UgKi9cclxuICAgIHB1YmxpYyBwYWdlTnVtYmVyID0gMTtcclxuICAgIFxyXG4gICAgLyoqIHBhZ2Ugc2l6ZSAqL1xyXG4gICAgcHVibGljIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIGFycmF5IGNvbXBvbmVudHMgKi9cclxuICAgIHB1YmxpYyByZXN1bHQ6IFRbXSA9IFtdO1xyXG5cclxuICAgIC8qKiBwdXNoIGEgbmV3IHJlc291cmNlIHRvIHRoZSBhcnJheSAqL1xyXG4gICAgcHVzaCA9IChlbDogVCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzdWx0LnB1c2goZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogbGVuZ3RoIG9mIHRoZSBhcnJheSAqL1xyXG4gICAgbGVuZ3RoID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0Lmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIGxvYWQgYXJyYXkgZGF0YSBmcm9tIFJFU1QgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzcG9uc2U6IGFueSwgc29ydEluZm86IFNvcnRbXSk6IFJlc291cmNlQXJyYXk8VD4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KHRoaXMuX2VtYmVkZGVkKTtcclxuICAgICAgICByZXN1bHQuc29ydEluZm8gPSBzb3J0SW5mbztcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbih0eXBlLCByZXNwb25zZSwgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTG9hZCBuZXh0IHBhZ2UgKi9cclxuICAgIG5leHQgPSAodHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dF91cmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5uZXh0X3VyaSksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHRoaXMuc29ydEluZm8pKSxcclxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIG5leHQgZGVmaW5lZCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTG9hZCBwcmV2aW91cyBwYWdlICovXHJcbiAgICBwcmV2ID0gKHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZfdXJpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMucHJldl91cmkpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gdGhpcy5pbml0KHR5cGUsIHJlc3BvbnNlLCB0aGlzLnNvcnRJbmZvKSksXHJcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyBwcmV2IGRlZmluZWQnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIExvYWQgZmlyc3QgcGFnZSAqL1xyXG4gICAgZmlyc3QgPSAodHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RfdXJpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMuZmlyc3RfdXJpKSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHRoaXMuaW5pdCh0eXBlLCByZXNwb25zZSwgdGhpcy5zb3J0SW5mbykpLFxyXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gZmlyc3QgZGVmaW5lZCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTG9hZCBsYXN0IHBhZ2UgKi9cclxuICAgIGxhc3QgPSAodHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdF91cmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5sYXN0X3VyaSksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHRoaXMuc29ydEluZm8pKSxcclxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIGxhc3QgZGVmaW5lZCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTG9hZCBwYWdlIHdpdGggZ2l2ZW4gcGFnZU51bWJlciovXHJcbiAgICBwYWdlID0gKHR5cGU6IHsgbmV3KCk6IFQgfSwgcGFnZU51bWJlcjogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWxmX3VyaSA9IHRoaXMuc2VsZl91cmkucmVwbGFjZSgnez9wYWdlLHNpemUsc29ydH0nLCAnJyk7XHJcbiAgICAgICAgdGhpcy5zZWxmX3VyaSA9IHRoaXMuc2VsZl91cmkucmVwbGFjZSgneyZzb3J0fScsICcnKTtcclxuICAgICAgICBsZXQgdXJsUGFyc2VkID0gdXJsLnBhcnNlKFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMuc2VsZl91cmkpKTtcclxuICAgICAgICBsZXQgcXVlcnk6IHN0cmluZyA9IFJlc291cmNlQXJyYXkucmVwbGFjZU9yQWRkKHVybFBhcnNlZC5xdWVyeSwgJ3NpemUnLCB0aGlzLnBhZ2VTaXplLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHF1ZXJ5ID0gUmVzb3VyY2VBcnJheS5yZXBsYWNlT3JBZGQocXVlcnksICdwYWdlJywgcGFnZU51bWJlci50b1N0cmluZygpKTtcclxuXHJcblxyXG4gICAgICAgIGxldCB1cmkgPSB1cmxQYXJzZWQucXVlcnkgP1xyXG4gICAgICAgICAgICBSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLnNlbGZfdXJpKS5yZXBsYWNlKHVybFBhcnNlZC5xdWVyeSwgcXVlcnkpIDogUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5zZWxmX3VyaSkuY29uY2F0KHF1ZXJ5KTtcclxuICAgICAgICB1cmkgPSB0aGlzLmFkZFNvcnRJbmZvKHVyaSk7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHRoaXMuc29ydEluZm8pKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBTb3J0IGNvbGxlY3Rpb24gYmFzZWQgb24gZ2l2ZW4gc29ydCBhdHRyaWJ1dGUgKi9cclxuICAgIHNvcnRFbGVtZW50cyA9ICh0eXBlOiB7IG5ldygpOiBUIH0sIC4uLnNvcnQ6IFNvcnRbXSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4gPT4ge1xyXG4gICAgICAgIHRoaXMuc2VsZl91cmkgPSB0aGlzLnNlbGZfdXJpLnJlcGxhY2UoJ3s/cGFnZSxzaXplLHNvcnR9JywgJycpO1xyXG4gICAgICAgIHRoaXMuc2VsZl91cmkgPSB0aGlzLnNlbGZfdXJpLnJlcGxhY2UoJ3smc29ydH0nLCAnJyk7XHJcbiAgICAgICAgbGV0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMuc2VsZl91cmkpLmNvbmNhdCgnPycsICdzaXplPScsIHRoaXMucGFnZVNpemUudG9TdHJpbmcoKSwgJyZwYWdlPScsIHRoaXMucGFnZU51bWJlci50b1N0cmluZygpKTtcclxuICAgICAgICB1cmkgPSB0aGlzLmFkZFNvcnRJbmZvKHVyaSk7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB0aGlzLmluaXQodHlwZSwgcmVzcG9uc2UsIHNvcnQpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBMb2FkIHBhZ2Ugd2l0aCBnaXZlbiBzaXplICovXHJcbiAgICBzaXplID0gKHR5cGU6IHsgbmV3KCk6IFQgfSwgc2l6ZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiA9PiB7XHJcbiAgICAgICAgbGV0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFByb3h5KHRoaXMuc2VsZl91cmkpLmNvbmNhdCgnPycsICdzaXplPScsIHNpemUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdXJpID0gdGhpcy5hZGRTb3J0SW5mbyh1cmkpO1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KS5waXBlKFxyXG4gICAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gdGhpcy5pbml0KHR5cGUsIHJlc3BvbnNlLCB0aGlzLnNvcnRJbmZvKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogQWRkIHNvcnQgaW5mbyB0byBnaXZlbiBVUkkgKi9cclxuICAgIHByaXZhdGUgYWRkU29ydEluZm8odXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5zb3J0SW5mbykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zb3J0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgdXJpID0gdXJpLmNvbmNhdCgnJnNvcnQ9JywgaXRlbS5wYXRoLCAnLCcsIGl0ZW0ub3JkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCByZXBsYWNlIG9yIGFkZCBwYXJhbSB2YWx1ZSB0byBxdWVyeSBzdHJpbmcgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlcGxhY2VPckFkZChxdWVyeTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gcXVlcnkuaW5kZXhPZihmaWVsZCk7XHJcbiAgICAgICAgICAgIGxldCBpZHhOZXh0QW1wOiBudW1iZXIgPSBxdWVyeS5pbmRleE9mKCcmJywgaWR4KSA9PSAtMSA/IHF1ZXJ5LmluZGV4T2YoJy8nLCBpZHgpIDogcXVlcnkuaW5kZXhPZignJicsIGlkeCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhY2hWYWx1ZSA9IHF1ZXJ5LnN1YnN0cmluZyhpZHgsIGlkeE5leHRBbXApO1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKHNlYWNoVmFsdWUsIGZpZWxkICsgJz0nICsgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS5jb25jYXQoXCImXCIgKyBmaWVsZCArICc9JyArIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5ID0gXCI/XCIgKyBmaWVsZCArICc9JyArIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1Jlc291cmNlfSBmcm9tICcuL3Jlc291cmNlJztcclxuaW1wb3J0IHtSZXNvdXJjZUFycmF5fSBmcm9tICcuL3Jlc291cmNlLWFycmF5JztcclxuaW1wb3J0IHtIYWxPcHRpb25zfSBmcm9tICcuL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7U3ViVHlwZUJ1aWxkZXJ9IGZyb20gJy4vc3VidHlwZS1idWlsZGVyJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZCwgaXNQcmltaXRpdmV9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcclxuXHJcbi8qKiBSRVNUIEFQSSBhY2Nlc3MgaGVscGVyICovXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUhlbHBlciB7XHJcblxyXG4gICAgLyoqIEh0dHBIZWFkZXJzICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAvKiogUHJveHkgVVJMICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm94eV91cmk6IHN0cmluZyA9IG51bGw7XHJcbiAgICAvKiogUm9vdCBVUkwgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJvb3RfdXJpOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgLyoqIEh0dHBDbGllbnQgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGh0dHA6IEh0dHBDbGllbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKiBnZXQgcmVxdWVzdCBoZWFkZXJzICovXHJcbiAgICAvKnB1YmxpYyBzdGF0aWMgZ2V0IGhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9oZWFkZXJzKSlcclxuICAgICAgICAgIFJlc291cmNlSGVscGVyLl9oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLl9oZWFkZXJzO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqIHNldCByZXF1ZXN0IGhlYWRlcnMgKi9cclxuICAgIC8qcHVibGljIHN0YXRpYyBzZXQgaGVhZGVycyhoZWFkZXJzOiBIdHRwSGVhZGVycykge1xyXG4gICAgICBSZXNvdXJjZUhlbHBlci5faGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKiogZ2V0IHJlcXVlc3Qgb3B0aW9uIHBhcmFtcyAqL1xyXG4gICAgc3RhdGljIG9wdGlvblBhcmFtcyhwYXJhbXM6IEh0dHBQYXJhbXMsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogSHR0cFBhcmFtcyB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBvcHRpb25zLnBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQocGFyYW0ua2V5LCBwYXJhbS52YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnc2l6ZScsIG9wdGlvbnMuc2l6ZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc29ydCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIG9wdGlvbnMuc29ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3J0U3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydFN0cmluZyA9IHMucGF0aCA/IHNvcnRTdHJpbmcuY29uY2F0KHMucGF0aCkgOiBzb3J0U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRTdHJpbmcgPSBzLm9yZGVyID8gc29ydFN0cmluZy5jb25jYXQoJywnKS5jb25jYXQocy5vcmRlcikgOiBzb3J0U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3NvcnQnLCBzb3J0U3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzb2x2ZSByZXNvdXJjZSByZWxhdGlvbnMgKi9cclxuICAgIHN0YXRpYyByZXNvbHZlUmVsYXRpb25zKHJlc291cmNlOiBSZXNvdXJjZSk6IE9iamVjdCB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHJlc291cmNlW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUmVzb3VyY2VIZWxwZXIuY2xhc3NOYW1lKHJlc291cmNlW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGNsYXNzTmFtZTogc3RyaW5nKSA9PiBjbGFzc05hbWUgPT0gJ1Jlc291cmNlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2Vba2V5XVsnX2xpbmtzJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gcmVzb3VyY2Vba2V5XVsnX2xpbmtzJ11bJ3NlbGYnXVsnaHJlZiddO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5OiBhbnlbXSA9IHJlc291cmNlW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHRoaXMucmVzb2x2ZVJlbGF0aW9ucyhlbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByZXNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQgYXMgT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGUgYW4gZW1wdHkgcmVzb3VyY2UgZnJvbSBlbWJlZGRlZCBkYXRhKi9cclxuICAgIHN0YXRpYyBjcmVhdGVFbXB0eVJlc3VsdDxUIGV4dGVuZHMgUmVzb3VyY2U+KF9lbWJlZGRlZDogc3RyaW5nKTogUmVzb3VyY2VBcnJheTxUPiB7XHJcbiAgICAgICAgbGV0IHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4gPSBuZXcgUmVzb3VyY2VBcnJheTxUPigpO1xyXG4gICAgICAgIHJlc291cmNlQXJyYXkuX2VtYmVkZGVkID0gX2VtYmVkZGVkO1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgY2xhc3MgbmFtZSovXHJcbiAgICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKG9iajogYW55KTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvbiAoLis/KVxcKC87XHJcbiAgICAgICAgdmFyIHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYyhvYmouY29uc3RydWN0b3IudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGNsYXNzIG5hbWUgZnJvbSBhIHByb3RvdHlwZSBvYmplY3QqL1xyXG4gICAgc3RhdGljIGNsYXNzTmFtZShvYmpQcm90bzogYW55KTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBjbGFzc05hbWVzID0gW107XHJcbiAgICAgICAgbGV0IG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmpQcm90byk7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICB3aGlsZSAoKGNsYXNzTmFtZSA9IFJlc291cmNlSGVscGVyLmdldENsYXNzTmFtZShvYmopKSAhPT0gJ09iamVjdCcpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGluc3RhbnRpYXRlIGEgUmVzb3VyY2VDb2xsZWN0aW9uIGZyb20gcmVzcG9uc2UgZW1iZWRkZWQgZGF0YSovXHJcbiAgICBzdGF0aWMgaW5zdGFudGlhdGVSZXNvdXJjZUNvbGxlY3Rpb248VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHBheWxvYWQ6IGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiwgYnVpbGRlcj86IFN1YlR5cGVCdWlsZGVyLGVtYmVkZGVkTmFtZT86U3RyaW5nKTogUmVzb3VyY2VBcnJheTxUPiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbWJlZGRlZENsYXNzTmFtZSBvZiBPYmplY3Qua2V5cyhwYXlsb2FkW3Jlc3VsdC5fZW1iZWRkZWRdKSkge1xyXG4gICAgICAgICAgICBpZighZW1iZWRkZWROYW1lIHx8IChlbWJlZGRlZE5hbWUgJiYgZW1iZWRkZWRDbGFzc05hbWU9PWVtYmVkZGVkTmFtZSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGVtYmVkZGVkOiBhbnkgPSBwYXlsb2FkW3Jlc3VsdC5fZW1iZWRkZWRdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBlbWJlZGRlZFtlbWJlZGRlZENsYXNzTmFtZV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluc3RhbmNlOiBUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuc2VhcmNoU3VidHlwZXMoYnVpbGRlciwgZW1iZWRkZWRDbGFzc05hbWUsIGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVJlc291cmNlKGluc3RhbmNlLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3VsdC50b3RhbEVsZW1lbnRzID0gcGF5bG9hZC5wYWdlID8gcGF5bG9hZC5wYWdlLnRvdGFsRWxlbWVudHMgOiByZXN1bHQubGVuZ3RoO1xyXG4gICAgICAgIHJlc3VsdC50b3RhbFBhZ2VzID0gcGF5bG9hZC5wYWdlID8gcGF5bG9hZC5wYWdlLnRvdGFsUGFnZXMgOiAxO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlTnVtYmVyID0gcGF5bG9hZC5wYWdlID8gcGF5bG9hZC5wYWdlLm51bWJlciA6IDE7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VTaXplID0gcGF5bG9hZC5wYWdlID8gcGF5bG9hZC5wYWdlLnNpemUgOiAyMDtcclxuXHJcbiAgICAgICAgcmVzdWx0LnNlbGZfdXJpID0gcGF5bG9hZC5fbGlua3MgJiYgcGF5bG9hZC5fbGlua3Muc2VsZiA/IHBheWxvYWQuX2xpbmtzLnNlbGYuaHJlZiA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXN1bHQubmV4dF91cmkgPSBwYXlsb2FkLl9saW5rcyAmJiBwYXlsb2FkLl9saW5rcy5uZXh0ID8gcGF5bG9hZC5fbGlua3MubmV4dC5ocmVmIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJlc3VsdC5wcmV2X3VyaSA9IHBheWxvYWQuX2xpbmtzICYmIHBheWxvYWQuX2xpbmtzLnByZXYgPyBwYXlsb2FkLl9saW5rcy5wcmV2LmhyZWYgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmVzdWx0LmZpcnN0X3VyaSA9IHBheWxvYWQuX2xpbmtzICYmIHBheWxvYWQuX2xpbmtzLmZpcnN0ID8gcGF5bG9hZC5fbGlua3MuZmlyc3QuaHJlZiA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXN1bHQubGFzdF91cmkgPSBwYXlsb2FkLl9saW5rcyAmJiBwYXlsb2FkLl9saW5rcy5sYXN0ID8gcGF5bG9hZC5fbGlua3MubGFzdC5ocmVmIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCBzdWJ0eXBlcyovXHJcbiAgICBzdGF0aWMgc2VhcmNoU3VidHlwZXM8VCBleHRlbmRzIFJlc291cmNlPihidWlsZGVyOiBTdWJUeXBlQnVpbGRlciwgZW1iZWRkZWRDbGFzc05hbWU6IHN0cmluZywgaW5zdGFuY2U6IFQpIHtcclxuICAgICAgICBpZiAoYnVpbGRlciAmJiBidWlsZGVyLnN1YnR5cGVzKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gYnVpbGRlci5zdWJ0eXBlcy5rZXlzKCk7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oa2V5cykuZm9yRWFjaCgoc3VidHlwZUtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW1iZWRkZWRDbGFzc05hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHN1YnR5cGVLZXkudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VidHlwZTogeyBuZXcoKTogYW55IH0gPSBidWlsZGVyLnN1YnR5cGVzLmdldChzdWJ0eXBlS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBzdWJ0eXBlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGluc3RhbnRpYXRlIGEgUmVzb3VyY2UgZnJvbSByZXNwb25zZSAqL1xyXG4gICAgc3RhdGljIGluc3RhbnRpYXRlUmVzb3VyY2U8VCBleHRlbmRzIFJlc291cmNlPihlbnRpdHk6IFQsIHBheWxvYWQ6IE9iamVjdCk6IFQge1xyXG4gICAgICAgIGZvciAoY29uc3QgcCBpbiBwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETyBhcnJheSBpbml0XHJcbiAgICAgICAgICAgIC8qIGlmKGVudGl0eVtwXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgJiYgaXNOdWxsT3JVbmRlZmluZWQocGF5bG9hZFtwXSkpXHJcbiAgICAgICAgICAgICAgICAgZW50aXR5W3BdID0gW107XHJcbiAgICAgICAgICAgICBlbHNlKi9cclxuICAgICAgICAgICAgZW50aXR5W3BdID0gcGF5bG9hZFtwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0IHByb3h5IFVSTCAqL1xyXG4gICAgc3RhdGljIHNldFByb3h5VXJpKHByb3h5X3VyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpID0gcHJveHlfdXJpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZXQgUm9vdCBVUkkgKi9cclxuICAgIHN0YXRpYyBzZXRSb290VXJpKHJvb3RfdXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5yb290X3VyaSA9IHJvb3RfdXJpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcHJveHkgVVJMICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVSTCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5wcm94eV91cmkgJiYgUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpICE9ICcnID9cclxuICAgICAgICAgICAgUmVzb3VyY2VIZWxwZXIuYWRkU2xhc2goUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpKSA6XHJcbiAgICAgICAgICAgIFJlc291cmNlSGVscGVyLmFkZFNsYXNoKFJlc291cmNlSGVscGVyLnJvb3RfdXJpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogYWRkIHNsYXNoIHRvIFVSSSAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkU2xhc2godXJpOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1cmlQYXJzZWQgPSB1cmwucGFyc2UodXJpKTtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQodXJpUGFyc2VkLnNlYXJjaCkgJiYgdXJpICYmIHVyaVt1cmkubGVuZ3RoIC0gMV0gIT0gJy8nKVxyXG4gICAgICAgICAgICByZXR1cm4gdXJpICsgJy8nO1xyXG4gICAgICAgIHJldHVybiB1cmk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBwcm94eSBmcm9tIFVSTCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcm94eSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFSZXNvdXJjZUhlbHBlci5wcm94eV91cmkgfHwgUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpID09ICcnKVxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5hZGRTbGFzaCh1cmwucmVwbGFjZShSZXNvdXJjZUhlbHBlci5yb290X3VyaSwgUmVzb3VyY2VIZWxwZXIucHJveHlfdXJpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBIdHRwQ2xpZW50Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0SHR0cChodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgUmVzb3VyY2VIZWxwZXIuaHR0cCA9IGh0dHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBIdHRwQ2xpZW50Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SHR0cCgpOiBIdHRwQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuaHR0cDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJvb3QgVVJJKi9cclxuICAgIHN0YXRpYyBnZXRSb290VXJpKCkge1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5yb290X3VyaTtcclxuICAgIH1cclxufVxyXG4iLCJcclxuaW1wb3J0IHt0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yLCBvZiBhcyBvYnNlcnZhYmxlT2Z9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcblxyXG5pbXBvcnQge0h0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQge1Jlc291cmNlQXJyYXl9IGZyb20gJy4vcmVzb3VyY2UtYXJyYXknO1xyXG5pbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICd1dGlsJztcclxuXHJcbmltcG9ydCB7SGFsT3B0aW9uc30gZnJvbSAnLi9yZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YlR5cGVCdWlsZGVyfSBmcm9tICcuL3N1YnR5cGUtYnVpbGRlcic7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogQWJzdHJhY3QgcmVzb3VyY2UgY2xhc3MqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZSB7XHJcblxyXG4gICAgLyoqIHByb3h5IFVSTCAqL1xyXG4gICAgcHVibGljIHByb3h5VXJsOiBzdHJpbmc7XHJcbiAgICAvKiogcm9vdCBVUkwgKi9cclxuICAgIHB1YmxpYyByb290VXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIGxpbmtzICovXHJcbiAgICBwdWJsaWMgX2xpbmtzOiBhbnk7XHJcbiAgICAvKiogc3VidHlwZXMgKi9cclxuICAgIHB1YmxpYyBfc3VidHlwZXM6IE1hcDxzdHJpbmcsIGFueT47XHJcblxyXG4gICAgXHJcbiAgICAvKiogZ2V0IHN1YnR5cGVzICovICAgIFxyXG4gICAgcHVibGljIGdldCBzdWJ0eXBlcygpOiBNYXA8c3RyaW5nLCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VidHlwZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBzdWJ0eXBlcyAqL1xyXG4gICAgcHVibGljIHNldCBzdWJ0eXBlcyhfc3VidHlwZXM6IE1hcDxzdHJpbmcsIGFueT4pIHtcclxuICAgICAgICB0aGlzLl9zdWJ0eXBlcyA9IF9zdWJ0eXBlcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCBjb2xsZWN0aW9uIG9mIHJlbGF0ZWQgcmVzb3VyY2VzICovXHJcbiAgICBwdWJsaWMgZ2V0UmVsYXRpb25BcnJheTxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVsYXRpb246IHN0cmluZywgX2VtYmVkZGVkPzogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucywgYnVpbGRlcj86IFN1YlR5cGVCdWlsZGVyKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KGlzTnVsbE9yVW5kZWZpbmVkKF9lbWJlZGRlZCkgPyBcIl9lbWJlZGRlZFwiIDogX2VtYmVkZGVkKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzKSAmJiAhaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3NbcmVsYXRpb25dKSkge1xyXG4gICAgICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uPFQ+KHR5cGUsIHJlc3BvbnNlLCByZXN1bHQsIGJ1aWxkZXIpKSxcclxuICAgICAgICAgICAgICAgIG1hcCgoYXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IGFycmF5LnJlc3VsdCksKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCByZWxhdGVkIHJlc291cmNlICovXHJcbiAgICBwdWJsaWMgZ2V0UmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlbGF0aW9uOiBzdHJpbmcsIGJ1aWxkZXI/OiBTdWJUeXBlQnVpbGRlcik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IFQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbWJlZGRlZENsYXNzTmFtZSBvZiBPYmplY3Qua2V5cyhkYXRhWydfbGlua3MnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVtYmVkZGVkQ2xhc3NOYW1lID09ICdzZWxmJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhyZWY6IHN0cmluZyA9IGRhdGEuX2xpbmtzW2VtYmVkZGVkQ2xhc3NOYW1lXS5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gaHJlZi5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWxDbGFzc05hbWUgPSBocmVmLnJlcGxhY2UoUmVzb3VyY2VIZWxwZXIuZ2V0Um9vdFVyaSgpLCBcIlwiKS5zdWJzdHJpbmcoMCwgaWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJlc291cmNlSGVscGVyLnNlYXJjaFN1YnR5cGVzKGJ1aWxkZXIsIHJlYWxDbGFzc05hbWUsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhlIGJvdW5kIGNvbGxlY3Rpb24gYnkgdGhlIHJlbGF0aW9uICovXHJcbiAgICBwdWJsaWMgYWRkUmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPihyZWxhdGlvbjogc3RyaW5nLCByZXNvdXJjZTogVCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rcykgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzW3JlbGF0aW9uXSkpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IFJlc291cmNlSGVscGVyLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAndGV4dC91cmktbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnBvc3QoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmLCB7aGVhZGVyczogaGVhZGVyfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyByZWxhdGlvbiBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQmluZCB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhpcyByZXNvdXJjZSBieSB0aGUgZ2l2ZW4gcmVsYXRpb24qL1xyXG4gICAgcHVibGljIHVwZGF0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ3RleHQvdXJpLWxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wYXRjaChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHJlc291cmNlLl9saW5rcy5zZWxmLmhyZWYsIHtoZWFkZXJzOiBoZWFkZXJ9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlbGF0aW9uIGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBCaW5kIHRoZSBnaXZlbiByZXNvdXJjZSB0byB0aGlzIHJlc291cmNlIGJ5IHRoZSBnaXZlbiByZWxhdGlvbiovXHJcbiAgICBwdWJsaWMgc3Vic3RpdHV0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rc1tyZWxhdGlvbl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ3RleHQvdXJpLWxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wdXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkodGhpcy5fbGlua3NbcmVsYXRpb25dLmhyZWYpLCByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmLCB7aGVhZGVyczogaGVhZGVyfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKCdubyByZWxhdGlvbiBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKiogQmluZCB0aGUgZ2l2ZW4gcmVzb3VyY2UgdG8gdGhpcyByZXNvdXJjZSBieSB0aGUgZ2l2ZW4gcmVsYXRpb24qL1xyXG4gICAgcHVibGljIHN1YnN0aXR1dGVBbGxSZWxhdGlvbjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlbGF0aW9uOiBzdHJpbmcsIHJlc291cmNlczogUmVzb3VyY2VbXSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9saW5rcykgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2xpbmtzW3JlbGF0aW9uXSkpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IFJlc291cmNlSGVscGVyLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAndGV4dC91cmktbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnB1dChSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiksIHJlc291cmNlcy5tYXAoKHJlc291cmNlKSA9PiByZXNvdXJjZS5fbGlua3Muc2VsZi5ocmVmKSwge2hlYWRlcnM6IGhlYWRlcn0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKiogVW5iaW5kIHRoZSByZXNvdXJjZSB3aXRoIHRoZSBnaXZlbiByZWxhdGlvbiBmcm9tIHRoaXMgcmVzb3VyY2UqL1xyXG4gICAgcHVibGljIGRlbGV0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVsYXRpb246IHN0cmluZywgcmVzb3VyY2U6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbGlua3MpICYmICFpc051bGxPclVuZGVmaW5lZChyZXNvdXJjZS5fbGlua3MpKSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5rOiBzdHJpbmcgPSByZXNvdXJjZS5fbGlua3NbJ3NlbGYnXS5ocmVmO1xyXG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSBsaW5rLmxhc3RJbmRleE9mKCcvJykgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlkeCA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWxhdGlvbklkOiBzdHJpbmcgPSBsaW5rLnN1YnN0cmluZyhpZHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZShSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiArICcvJyArIHJlbGF0aW9uSWQpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVsYXRpb24gZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBVbmJpbmQgdGhlIHJlc291cmNlIHdpdGggdGhlIGdpdmVuIHJlbGF0aW9uIGZyb20gdGhpcyByZXNvdXJjZSovXHJcbiAgICBwdWJsaWMgZGVsZXRlQWxsUmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPihyZWxhdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZShSZXNvdXJjZUhlbHBlci5nZXRQcm94eSh0aGlzLl9saW5rc1tyZWxhdGlvbl0uaHJlZiApLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBVc2VyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vdXNlci1jb25maWd1cmF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlclBvc2l0aW9uIH0gZnJvbSAnLi91c2VyLXBvc2l0aW9uLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBVc2VyIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjsgIFxyXG4gIC8qKiB1c2VybmFtZSAqL1xyXG4gIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG4gIC8qKiBwYXNzd29yZCAqL1xyXG4gIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nO1xyXG4gIC8qKiBmaXJzdCBuYW1lICovXHJcbiAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gIC8qKiBsYXN0IG5hbWUgKi9cclxuICBwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcclxuICAvKiogd2hldGhlciB1c2VyIGlzIGJsb2NrZWQgKi9cclxuICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbjtcclxuICAvKiogd2hldGhlciB1c2VyIGlzIGFkbWluaXN0cmF0b3IgKi9cclxuICBwdWJsaWMgYWRtaW5pc3RyYXRvcjogYm9vbGVhbjtcclxuICAvKiogSXMgcGFzc3dvcmRTZXQgKi9cclxuICBwdWJsaWMgcGFzc3dvcmRTZXQ6IGJvb2xlYW47XHJcbiAgLyoqIHVzZXIgcG9zaXRpb25zICovXHJcbiAgcHVibGljIHBvc2l0aW9uczogVXNlclBvc2l0aW9uW107XHJcbiAgLyoqIHVzZXIgcGVybWlzc2lvbnMgKi9cclxuICBwdWJsaWMgcGVybWlzc2lvbnM6IFVzZXJDb25maWd1cmF0aW9uW107XHJcbn1cclxuIiwiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtSZXNvdXJjZUhlbHBlcn0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQge0V4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXJJbnRlcmZhY2V9IGZyb20gJy4vZXh0ZXJuYWwtY29uZmlndXJhdGlvbi5oYW5kbGVyJztcclxuaW1wb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb259IGZyb20gJy4vRXh0ZXJuYWxDb25maWd1cmF0aW9uJztcclxuXHJcblxyXG4vKiogRXh0ZXJuYWxTZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsU2VydmljZSB7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdFeHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlJykgcHJpdmF0ZSBleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlOiBFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlKSB7XHJcbiAgICAgICAgUmVzb3VyY2VIZWxwZXIuc2V0UHJveHlVcmkoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRQcm94eVVyaSgpKTtcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRSb290VXJpKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UuZ2V0Um9vdFVyaSgpKTtcclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRIdHRwKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UuZ2V0SHR0cCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdXBkYXRlIEV4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXIgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlKGV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2U6IEV4dGVybmFsQ29uZmlndXJhdGlvbkhhbmRsZXJJbnRlcmZhY2UpIHtcclxuXHR0aGlzLmV4dGVybmFsQ29uZmlndXJhdGlvblNlcnZpY2UgPSBleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlO1xyXG5cclxuICAgICAgICBSZXNvdXJjZUhlbHBlci5zZXRQcm94eVVyaShleHRlcm5hbENvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldFByb3h5VXJpKCkpO1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLnNldFJvb3RVcmkoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRSb290VXJpKCkpO1xyXG4gICAgICAgIFJlc291cmNlSGVscGVyLnNldEh0dHAoZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRIdHRwKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgRXh0ZXJuYWxDb25maWd1cmF0aW9uICovXHJcbiAgICBwdWJsaWMgZ2V0RXh0ZXJuYWxDb25maWd1cmF0aW9uKCk6IEV4dGVybmFsQ29uZmlndXJhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRFeHRlcm5hbENvbmZpZ3VyYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHByb3h5IFVSTCAqL1xyXG4gICAgcHVibGljIGdldFByb3h5VXJpKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRQcm94eVVyaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgUm9vdCBVUkkgKi9cclxuICAgIHB1YmxpYyBnZXRSb290VXJpKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZXJuYWxDb25maWd1cmF0aW9uU2VydmljZS5nZXRSb290VXJpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBVUkwgKi9cclxuICAgIHB1YmxpYyBnZXRVUkwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0VVJMKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBIdHRwQ2xpZW50ICovXHJcbiAgICBwdWJsaWMgZ2V0SHR0cCgpOiBIdHRwQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyB0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7IFJlc291cmNlSGVscGVyIH0gZnJvbSAnLi9yZXNvdXJjZS1oZWxwZXInO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vc29ydCc7XHJcbmltcG9ydCB7IFJlc291cmNlQXJyYXkgfSBmcm9tICcuL3Jlc291cmNlLWFycmF5JztcclxuaW1wb3J0IHsgRXh0ZXJuYWxTZXJ2aWNlIH0gZnJvbSAnLi9leHRlcm5hbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFsT3B0aW9ucyB9IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViVHlwZUJ1aWxkZXIgfSBmcm9tICcuL3N1YnR5cGUtYnVpbGRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKiBSZXNvdXJjZVNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIHtcclxuXHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsU2VydmljZTogRXh0ZXJuYWxTZXJ2aWNlKSB7IH1cclxuXHJcblxyXG4gICAgLyoqIGdldCBVUkwgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFVSTCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRVUkwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IGFsbCByZXNvdXJjZXMgZnJvbSBhIGJhc2UgVVJJIG9mIGEgZ2l2ZW4gdHlwZSAqL1xyXG4gICAgcHVibGljIGdldEFsbDxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzb3VyY2U6IHN0cmluZywgX2VtYmVkZGVkOiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zLCBzdWJUeXBlPzogU3ViVHlwZUJ1aWxkZXIsIGVtYmVkZGVkTmFtZT86U3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCc/cHJvamVjdGlvbj12aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KF9lbWJlZGRlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJscyhyZXN1bHQpO1xyXG4gICAgICAgIHJlc3VsdC5zb3J0SW5mbyA9IG9wdGlvbnMgPyBvcHRpb25zLnNvcnQgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwgeyBoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBwYXJhbXM6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChyZXNwb25zZSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbih0eXBlLCByZXNwb25zZSwgcmVzdWx0LCBzdWJUeXBlLGVtYmVkZGVkTmFtZSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgZnJvbSBhIGJhc2UgVVJJIGFuZCBhIGdpdmVuIGlkICovXHJcbiAgICBwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCByZXNvdXJjZTogc3RyaW5nLCBpZDogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvJywgaWQsICc/cHJvamVjdGlvbj12aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoZGF0YSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgZGF0YSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgZnJvbSBpdHMgc2VsZmxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVNlbGZMaW5rPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCByZXNvdXJjZUxpbms6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogVCA9IG5ldyB0eXBlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KFJlc291cmNlSGVscGVyLmdldFByb3h5KHJlc291cmNlTGluayksIHsgaGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycyB9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChkYXRhID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UocmVzdWx0LCBkYXRhKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIGJhc2UgcGF0aCwgcXVlcnkgYW5kIG9wdGlvbnMgKi9cclxuICAgIHB1YmxpYyBzZWFyY2g8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHF1ZXJ5OiBzdHJpbmcsIHJlc291cmNlOiBzdHJpbmcsIF9lbWJlZGRlZDogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucyk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2UpLmNvbmNhdCgnL3NlYXJjaC8nLCBxdWVyeSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KF9lbWJlZGRlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJscyhyZXN1bHQpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldCh1cmksIHsgaGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgcGFyYW1zOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzcG9uc2UgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZUNvbGxlY3Rpb24odHlwZSwgcmVzcG9uc2UsIHJlc3VsdCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggYSBzaW5nbGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGJhc2UgcGF0aCwgcXVlcnkgYW5kIG9wdGlvbnMgKi9cclxuICAgIHB1YmxpYyBzZWFyY2hTaW5nbGU8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHF1ZXJ5OiBzdHJpbmcsIHJlc291cmNlOiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvc2VhcmNoLycsIHF1ZXJ5KTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBSZXNvdXJjZUhlbHBlci5vcHRpb25QYXJhbXMobmV3IEh0dHBQYXJhbXMoKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIHBhcmFtczogcGFyYW1zIH0pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UocmVzdWx0LCByZXNwb25zZSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggcmVzb3VyY2VzIGZyb20gYSBnaXZlbiBiYXNlIHBhdGgsIGN1c3RvbSBxdWVyeSBhbmQgb3B0aW9ucyAqL1xyXG4gICAgcHVibGljIGN1c3RvbVF1ZXJ5PFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCBxdWVyeTogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nLCBfZW1iZWRkZWQ6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLmdldFJlc291cmNlVXJsKHJlc291cmNlICsgcXVlcnkpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFJlc291cmNlSGVscGVyLm9wdGlvblBhcmFtcyhuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIHBhcmFtczogcGFyYW1zIH0pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uKHR5cGUsIHJlc3BvbnNlLCByZXN1bHQpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGdpdmVuIGEgcmVsYXRpb24gbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5UmVsYXRpb248VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlc291cmNlTGluazogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogVCA9IG5ldyB0eXBlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKHJlc3VsdCk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHJlc291cmNlTGluaywgeyBoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzIH0pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKGRhdGEgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShyZXN1bHQsIGRhdGEpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IGdpdmVuIGEgcmVsYXRpb24gbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5UmVsYXRpb25BcnJheTxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzb3VyY2VMaW5rOiBzdHJpbmcsIF9lbWJlZGRlZDogc3RyaW5nLCBidWlsZGVyPzogU3ViVHlwZUJ1aWxkZXIpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQocmVzb3VyY2VMaW5rLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzcG9uc2UgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZUNvbGxlY3Rpb24odHlwZSwgcmVzcG9uc2UsIHJlc3VsdCwgYnVpbGRlcikpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjb3VudCByZXNvdXJjZXMgZ2l2ZW4gYSBwYXRoICovXHJcbiAgICBwdWJsaWMgY291bnQocmVzb3VyY2U6IHN0cmluZyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvc2VhcmNoL2NvdW50QWxsJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZ2V0KHVyaSwgeyBoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBvYnNlcnZlOiAnYm9keScgfSkucGlwZShcclxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IE51bWJlcihyZXNwb25zZS5ib2R5KSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZSByZXNvdXJjZSBmcm9tIHNlbGYgbGluayBhbmQgZW50aXR5IGRhdGEqL1xyXG4gICAgcHVibGljIGNyZWF0ZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHNlbGZSZXNvdXJjZTogc3RyaW5nLCBlbnRpdHk6IFQpIHtcclxuICAgICAgICBjb25zdCB1cmkgPSBSZXNvdXJjZUhlbHBlci5nZXRVUkwoKSArIHNlbGZSZXNvdXJjZTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gUmVzb3VyY2VIZWxwZXIucmVzb2x2ZVJlbGF0aW9ucyhlbnRpdHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHNSZXNvdXJjZShlbnRpdHkpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnBvc3QodXJpLCBwYXlsb2FkLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPD0gMjA3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UoZW50aXR5LCByZXNwb25zZS5ib2R5KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoYm9keS5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdXBkYXRlIHJlc291cmNlIGZyb20gYSBnaXZlbiBlbnRpdHkgZGF0YSovXHJcbiAgICBwdWJsaWMgdXBkYXRlPFQgZXh0ZW5kcyBSZXNvdXJjZT4oZW50aXR5OiBUKSB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkoZW50aXR5Ll9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBSZXNvdXJjZUhlbHBlci5yZXNvbHZlUmVsYXRpb25zKGVudGl0eSk7XHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UoZW50aXR5KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wdXQodXJpLCBwYXlsb2FkLCB7IGhlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPD0gMjA3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UoZW50aXR5LCByZXNwb25zZS5ib2R5KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoYm9keS5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdXBkYXRlIHJlc291cmNlIGZyb20gYSBnaXZlbiBlbnRpdHkgZGF0YSovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ29sbGVjdGlvbjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHJlc291cmNlTGluazogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkocmVzb3VyY2VMaW5rKTtcclxuICAgICAgICAvL2NvbnN0IHBheWxvYWQgPSBSZXNvdXJjZUhlbHBlci5yZXNvbHZlUmVsYXRpb25zKGVudGl0eSk7XHJcbiAgICAgICAgLy90aGlzLnNldFVybHNSZXNvdXJjZShlbnRpdHkpO1xyXG4gICAgICAgIHZhciBoZWFkZXJzUmVxID0gUmVzb3VyY2VIZWxwZXIuaGVhZGVycztcclxuICAgICAgICBoZWFkZXJzUmVxLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvdXJpLWxpc3RcIik7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkucHV0KHVyaSwgcmVzb3VyY2VBcnJheSwgeyBoZWFkZXJzOiBoZWFkZXJzUmVxLCBvYnNlcnZlOiAncmVzcG9uc2UnIH0pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDw9IDIwNylcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keTogYW55ID0gcmVzcG9uc2UuYm9keTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihib2R5LmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLCBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBwYXRjaCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gZW50aXR5IGRhdGEqL1xyXG4gICAgcHVibGljIHBhdGNoPFQgZXh0ZW5kcyBSZXNvdXJjZT4oZW50aXR5OiBUKSB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkoZW50aXR5Ll9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBSZXNvdXJjZUhlbHBlci5yZXNvbHZlUmVsYXRpb25zKGVudGl0eSk7XHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UoZW50aXR5KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wYXRjaCh1cmksIHBheWxvYWQsIHsgaGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8PSAyMDcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShlbnRpdHksIHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keTogYW55ID0gcmVzcG9uc2UuYm9keTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihib2R5LmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLCBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBkZWxldGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBkZWxldGU8VCBleHRlbmRzIFJlc291cmNlPihlbnRpdHk6IFQpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFByb3h5KGVudGl0eS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmRlbGV0ZSh1cmksIHsgaGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycyB9KS5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGhhc05leHQ8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkubmV4dF91cmkgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgaGFzUHJldjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5wcmV2X3VyaSAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNGaXJzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5maXJzdF91cmkgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIGxhc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNMYXN0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lmxhc3RfdXJpICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IG5leHQgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBuZXh0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPiwgdHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkubmV4dCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgcHJldjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnByZXYodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGZpcnN0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPiwgdHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuZmlyc3QodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBsYXN0IHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgbGFzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lmxhc3QodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBwYWdlIG9mIHJlc3VsdHMgZ2l2ZW4gYSBwYWdlIG51bWJlciovXHJcbiAgICBwdWJsaWMgcGFnZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgaWQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnBhZ2UodHlwZSwgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzb3J0IHJlc291cmNlIGFycmF5IHdpdGggYSBnaXZlbiBzb3J0aW5nIHBhcmFtcyAqL1xyXG4gICAgcHVibGljIHNvcnRFbGVtZW50czxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgLi4uc29ydDogU29ydFtdKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuc29ydEVsZW1lbnRzKHR5cGUsIC4uLnNvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgc2l6ZSovXHJcbiAgICBwdWJsaWMgc2l6ZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgc2l6ZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuc2l6ZSh0eXBlLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIFVSTCBmcm9tIGEgZ2l2ZW4gcGF0aCovXHJcbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2U/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1cmwgPSBSZXNvdXJjZVNlcnZpY2UuZ2V0VVJMKCk7XHJcbiAgICAgICAgaWYgKCF1cmwuZW5kc1dpdGgoJy8nKSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuY29uY2F0KCcvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXNvdXJjZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsLmNvbmNhdChyZXNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldCBwcm94eSBhbmQgcm9vdCB1cmxzIG9mIGdpdmVuIHJlc291cmNlIGFycmF5ICovXHJcbiAgICBwcml2YXRlIHNldFVybHM8VCBleHRlbmRzIFJlc291cmNlPihyZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4pIHtcclxuICAgICAgICByZXN1bHQucHJveHlVcmwgPSB0aGlzLmV4dGVybmFsU2VydmljZS5nZXRQcm94eVVyaSgpO1xyXG4gICAgICAgIHJlc3VsdC5yb290VXJsID0gdGhpcy5leHRlcm5hbFNlcnZpY2UuZ2V0Um9vdFVyaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZXQgcHJveHkgYW5kIHJvb3QgdXJscyBvZiBnaXZlbiByZXNvdXJjZSAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcmxzUmVzb3VyY2U8VCBleHRlbmRzIFJlc291cmNlPihyZXN1bHQ6IFQpIHtcclxuICAgICAgICByZXN1bHQucHJveHlVcmwgPSB0aGlzLmV4dGVybmFsU2VydmljZS5nZXRQcm94eVVyaSgpO1xyXG4gICAgICAgIHJlc3VsdC5yb290VXJsID0gdGhpcy5leHRlcm5hbFNlcnZpY2UuZ2V0Um9vdFVyaSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7b2YgYXMgb2JzZXJ2YWJsZU9mLCB0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHttYXAsIG1lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4vcmVzb3VyY2UnO1xyXG5pbXBvcnQge1Jlc291cmNlQXJyYXl9IGZyb20gJy4vcmVzb3VyY2UtYXJyYXknO1xyXG5pbXBvcnQge1NvcnR9IGZyb20gJy4vc29ydCc7XHJcbmltcG9ydCB7UmVzb3VyY2VTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YlR5cGVCdWlsZGVyfSBmcm9tICcuL3N1YnR5cGUtYnVpbGRlcic7XHJcbmltcG9ydCB7aXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0luamVjdG9yfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuLyoqIEhBTCBwYXJhbSBkYXRhIG1vZGVsICovXHJcbmV4cG9ydCB0eXBlIEhhbFBhcmFtID0geyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfTtcclxuLyoqIEhBTCBvcHRpb24gZGF0YSBtb2RlbCAqL1xyXG5leHBvcnQgdHlwZSBIYWxPcHRpb25zID0geyBub3RQYWdlZD86IGJvb2xlYW4sIHNpemU/OiBudW1iZXIsIHNvcnQ/OiBTb3J0W10sIHBhcmFtcz86IEhhbFBhcmFtW10gfTtcclxuXHJcbi8qKiBSRVNUIEFQSSBhY2Nlc3MgaW50ZXJmYWNlICovXHJcbmV4cG9ydCBjbGFzcyBSZXN0U2VydmljZTxUIGV4dGVuZHMgUmVzb3VyY2U+IHtcclxuICAgIC8qKiByZXNvdXJjZSB0eXBlICovXHJcbiAgICBwcml2YXRlIHR5cGU6IGFueTtcclxuICAgIC8qKiByZXNvdXJjZSBwYXRoICovXHJcbiAgICBwcml2YXRlIHJlc291cmNlOiBzdHJpbmc7XHJcbiAgICAvKiogcmVzb3VyY2UgYXJyYXkgKi9cclxuICAgIHB1YmxpYyByZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+O1xyXG4gICAgLyoqIHJlc291cmNlIHNlcnZpY2UgKi9cclxuICAgIHB1YmxpYyByZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZTtcclxuICAgIC8qKiBfZW1iZWRkZWQgZmllbGQgbmFtZSAqL1xyXG4gICAgcHJpdmF0ZSBfZW1iZWRkZWQ6IHN0cmluZyA9ICdfZW1iZWRkZWQnO1xyXG5cclxuICAgIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogeyBuZXcoKTogVCB9LFxyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2U6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICAgICAgICAgICAgX2VtYmVkZGVkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZVNlcnZpY2UgPSBpbmplY3Rvci5nZXQoUmVzb3VyY2VTZXJ2aWNlKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKF9lbWJlZGRlZCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2VtYmVkZGVkID0gX2VtYmVkZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBlcnJvciBoYW5kbGVyICovXHJcbiAgICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6T2JzZXJ2YWJsZTxuZXZlcj4ge1xyXG4gICAgICAgIHJldHVybiBSZXN0U2VydmljZS5oYW5kbGVFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGVycm9yIGhhbmRsZXIgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6T2JzZXJ2YWJsZTxuZXZlcj4ge1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBhbGwgcmVzb3VyY2VzIHdpdGggb3B0aW9uYWwgb3B0aW9ucyBhbiBzdWJUeXBlIHBhcmFtcyAqL1xyXG4gICAgcHVibGljIGdldEFsbChvcHRpb25zPzogSGFsT3B0aW9ucywgc3ViVHlwZT86IFN1YlR5cGVCdWlsZGVyLCBlbWJlZGRlZE5hbWU/OlN0cmluZyk6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldEFsbCh0aGlzLnR5cGUsIHRoaXMucmVzb3VyY2UsIHRoaXMuX2VtYmVkZGVkLCBvcHRpb25zLCBzdWJUeXBlLGVtYmVkZGVkTmFtZSkucGlwZShcclxuICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubm90UGFnZWQgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHJlc291cmNlQXJyYXkuZmlyc3RfdXJpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubm90UGFnZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpemUgPSByZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gaWQgKi9cclxuICAgIHB1YmxpYyBnZXQoaWQ6IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXQodGhpcy50eXBlLCB0aGlzLnJlc291cmNlLCBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIHNlbGYgbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5U2VsZkxpbmsoc2VsZkxpbms6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXRCeVNlbGZMaW5rKHRoaXMudHlwZSwgc2VsZkxpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggcmVzb3VyY2VzIGZyb20gYSBnaXZlbiBxdWVyeSBzdHJpbmcgYW5kIG9wdGlvbmFsIG9wdGlvbnMgcGFyYW1zICovXHJcbiAgICBwdWJsaWMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2Uuc2VhcmNoKHRoaXMudHlwZSwgcXVlcnksIHRoaXMucmVzb3VyY2UsIHRoaXMuX2VtYmVkZGVkLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBtZXJnZU1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub3RQYWdlZCAmJiAhaXNOdWxsT3JVbmRlZmluZWQocmVzb3VyY2VBcnJheS5maXJzdF91cmkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5ub3RQYWdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2l6ZSA9IHJlc291cmNlQXJyYXkudG90YWxFbGVtZW50cztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2gocXVlcnksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gcXVlcnkgc3RyaW5nIGFuZCBvcHRpb25hbCBvcHRpb25zIHBhcmFtcyAqL1xyXG4gICAgcHVibGljIHNlYXJjaFNpbmdsZShxdWVyeTogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5zZWFyY2hTaW5nbGUodGhpcy50eXBlLCBxdWVyeSwgdGhpcy5yZXNvdXJjZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIGN1c3RvbSBxdWVyeSBzdHJpbmcgYW5kIG9wdGlvbmFsIG9wdGlvbnMgcGFyYW1zICovXHJcbiAgICBwdWJsaWMgY3VzdG9tUXVlcnkocXVlcnk6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5jdXN0b21RdWVyeSh0aGlzLnR5cGUsIHF1ZXJ5LCB0aGlzLnJlc291cmNlLCB0aGlzLl9lbWJlZGRlZCwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubm90UGFnZWQgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKHJlc291cmNlQXJyYXkuZmlyc3RfdXJpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubm90UGFnZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpemUgPSByZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tUXVlcnkocXVlcnksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YocmVzb3VyY2VBcnJheS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgZ2l2ZW4gYSByZWxhdGlvbiBsaW5rICovXHJcbiAgICBwdWJsaWMgZ2V0QnlSZWxhdGlvbkFycmF5KHJlbGF0aW9uOiBzdHJpbmcsIGJ1aWxkZXI/OiBTdWJUeXBlQnVpbGRlcik6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldEJ5UmVsYXRpb25BcnJheSh0aGlzLnR5cGUsIHJlbGF0aW9uLCB0aGlzLl9lbWJlZGRlZCwgYnVpbGRlcikucGlwZShcclxuICAgICAgICAgICAgbWFwKChyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBnaXZlbiBhIHJlbGF0aW9uIGxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVJlbGF0aW9uKHJlbGF0aW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0QnlSZWxhdGlvbih0aGlzLnR5cGUsIHJlbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY291bnQgcmVzb3VyY2VzIGdpdmVuIGEgcGF0aCAqL1xyXG4gICAgcHVibGljIGNvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmNvdW50KHRoaXMucmVzb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGUgcmVzb3VyY2UgZnJvbSBzZWxmIGxpbmsgYW5kIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBjcmVhdGUoZW50aXR5OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmNyZWF0ZSh0aGlzLnJlc291cmNlLCBlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB1cGRhdGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoZW50aXR5OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLnVwZGF0ZShlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBwYXRjaCByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gZW50aXR5IGRhdGEqL1xyXG4gICAgcHVibGljIHBhdGNoKGVudGl0eTogVCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5wYXRjaChlbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBkZWxldGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBkZWxldGUoZW50aXR5OiBUKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuZGVsZXRlKGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCB0b3RhbCBudW1iZXIgb2YgZWxlbWVudHMgb2YgcmVzb3VyY2UgYXJyYXkgKi9cclxuICAgIHB1YmxpYyB0b3RhbEVsZW1lbnQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5ICYmIHRoaXMucmVzb3VyY2VBcnJheS50b3RhbEVsZW1lbnRzKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUFycmF5LnRvdGFsRWxlbWVudHM7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNGaXJzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UuaGFzRmlyc3QodGhpcy5yZXNvdXJjZUFycmF5KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGhhc05leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzb3VyY2VBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmhhc05leHQodGhpcy5yZXNvdXJjZUFycmF5KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgcHJldmlvdXMgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNQcmV2KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5oYXNQcmV2KHRoaXMucmVzb3VyY2VBcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIGxhc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNMYXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5oYXNMYXN0KHRoaXMucmVzb3VyY2VBcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIG5leHQoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UubmV4dCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VBcnJheSA9IHJlc291cmNlQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlc291cmNlQXJyYXkgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgcHJldigpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5wcmV2KHRoaXMucmVzb3VyY2VBcnJheSwgdGhpcy50eXBlKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKChyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUFycmF5ID0gcmVzb3VyY2VBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBmaXJzdCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5maXJzdCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSlcclxuICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgbGFzdCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGxhc3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UubGFzdCh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSlcclxuICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkgPSByZXNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcignbm8gcmVzb3VyY2VBcnJheSBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgcGFnZSBvZiByZXN1bHRzIGdpdmVuIGEgcGFnZSBudW1iZXIqL1xyXG4gICAgcHVibGljIHBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUFycmF5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVNlcnZpY2UucGFnZSh0aGlzLnJlc291cmNlQXJyYXksIHRoaXMudHlwZSwgcGFnZU51bWJlcikucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VBcnJheSA9IHJlc291cmNlQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoJ25vIHJlc291cmNlQXJyYXkgZm91bmQnKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlci91c2VyLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG5cclxuLyoqIEFjY291bnQgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFjY291bnRTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VXNlcj4ge1xyXG4gIFxyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQUNDT1VOVF9BUEkgPSAnYWNjb3VudCc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFVzZXIsIFwiYWNjb3VudFwiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKiogZ2V0IGxvZ2dlZCBpbiB1c2VyIGFjY291bnQqL1xyXG4gIGdldCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgcmVzdWx0ID0gdGhpcy5odHRwLmdldCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkFDQ09VTlRfQVBJKSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBhY2NvdW50Ki9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkFDQ09VTlRfQVBJKSAsIGl0ZW0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKiogY2hhbmdlIGxvZ2dlZCBpbiB1c2VyIGFjY291bnQqLyAgXHJcbiAgY2hhbmdlUGFzc3dvcmQoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQUNDT1VOVF9BUEkrXCIvY2hhbmdlLXBhc3N3b3JkXCIpICwgaXRlbSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGV9IGZyb20gJ3J4anMtY29tcGF0JztcclxuaW1wb3J0IHtSZXNvdXJjZVNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2Uuc2VydmljZSc7XHJcbi8vaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG4vKiogQXV0aGVudGljYXRpb24gc2VydmljZSovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIFxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBVVRIX0FQSSA9ICdhdXRoZW50aWNhdGUnO1xyXG5cclxuICAgIC8qKiBjb25zdHJ1Y3RvciovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZVxyXG4gICAgKSB7fVxyXG4gICAgXHJcbiAgICAvKiogZ2V0IGN1cnJlbnQgdXNlciBqd3QgdG9rZW4gZnJvbSBzZXNzaW9uIHN0b3JhZ2UqL1xyXG4gICAgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhdXRoZW50aWNhdGlvblRva2VuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGxvZ2luIG9wZXJhdGlvbiAqL1xyXG4gICAgbG9naW4oY3JlZGVudGlhbHMpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogY3JlZGVudGlhbHMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQVVUSF9BUEkpLCBkYXRhLCB7b2JzZXJ2ZSA6ICdyZXNwb25zZSd9KS5tYXAoYXV0aGVudGljYXRlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXV0aGVudGljYXRlU3VjY2VzcyhyZXNwKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqd3QgPSByZXNwLmJvZHkuaWRfdG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlQXV0aGVudGljYXRpb25Ub2tlbihqd3QpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zdCBleHBpcmVzQXQgPSBtb21lbnQoKS5hZGQoIHJlc3AuaGVhZGVycy5nZXQoJ1Rva2VuLVZhbGlkaXR5JyksJ21pbGlzZWNvbmQnKTtcclxuICAgICAgICAgICAgICAgIC8vc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZXhwaXJlc19hdCcsIEpTT04uc3RyaW5naWZ5KGV4cGlyZXNBdC52YWx1ZU9mKCkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqd3Q7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIGxvZ2luIG9wZXJhdGlvbiB3aXRoIGp3dCB0b2tlbiAqL1xyXG4gICAgbG9naW5XaXRoVG9rZW4oand0KSB7XHJcbiAgICAgICAgaWYgKGp3dCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlQXV0aGVudGljYXRpb25Ub2tlbihqd3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGp3dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdhdXRoLWp3dC1zZXJ2aWNlIFByb21pc2UgcmVqZWN0Jyk7IC8vIFB1dCBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlIGhlcmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHN0b3JlIGp3dCB0b2tlbiBpbiBzZXNzaW9uIHN0b3JhZ2UqL1xyXG4gICAgc3RvcmVBdXRoZW50aWNhdGlvblRva2VuKGp3dCkge1xyXG4gICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnYXV0aGVudGljYXRpb25Ub2tlbicsIGp3dCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBpcyBsb2dnZWQgaW4qL1xyXG4gICAgcHVibGljIGlzTG9nZ2VkSW4oKSB7XHJcbiAgICAgICAgLy9yZXR1cm4gbW9tZW50KCkuaXNCZWZvcmUodGhpcy5nZXRFeHBpcmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBpcyBsb2dnZWQgb3V0Ki9cclxuICAgIGlzTG9nZ2VkT3V0KCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc0xvZ2dlZEluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGxvZ291dCBvcGVyYXRpb24gKi9cclxuICAgIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGhlbnRpY2F0aW9uVG9rZW4nKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnYXV0aGVudGljYXRpb25Ub2tlbicpO1xyXG4gICAgICAgICAgICAvL3Nlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2V4cGlyZXNfYXQnKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqIEludGVyY2VwdG9yIGZvciBhdXRoZW50aWNhdGlvbiB0b2tlbiBpbiBBUEkgcmVxdWVzdHMgKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiByZXF1ZXN0IGhhbmRsZXIgKi9cclxuICAgIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgIXJlcXVlc3QudXJsIHx8ICEocmVxdWVzdC51cmwuaW5jbHVkZXMoXCIvYXBpL1wiKSkgKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJylcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2F1dGhlbnRpY2F0aW9uVG9rZW4nKTtcclxuICAgICAgICBpZiAoISF0b2tlbikge1xyXG4gICAgICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XHJcbiAgICAgICAgICAgICAgICBzZXRIZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgdG9rZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xyXG5cclxuLyoqIFByaW5jaXBhbCBzZXJ2aWNlKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJpbmNpcGFsIHtcclxuICAgIHByaXZhdGUgdXNlcklkZW50aXR5OiBhbnk7XHJcbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYXV0aGVudGljYXRpb25TdGF0ZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgYWNjb3VudDogQWNjb3VudFNlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgICAvKiogYXV0aGVudGljYXRlIHdpdGggZ2l2ZW4gaWRlbnRpdHkqL1xyXG4gICAgYXV0aGVudGljYXRlKGlkZW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBpZGVudGl0eTtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBpZGVudGl0eSAhPT0gbnVsbDtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU3RhdGUubmV4dCh0aGlzLnVzZXJJZGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzICovXHJcbiAgICBoYXNBbnlBdXRob3JpdHkoYXV0aG9yaXRpZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmhhc0FueUF1dGhvcml0eURpcmVjdChhdXRob3JpdGllcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBoYXMgYW55IG9mIHRoZSBnaXZlbiBhdXRob3JpdGllcyBvbiB0aGUgZ2l2ZW4gdGVycml0b3J5ICovXHJcbiAgICBoYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeShhdXRob3JpdGllczogc3RyaW5nW10sdGVycml0b3J5OiBzdHJpbmcgKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmhhc0FueUF1dGhvcml0eURpcmVjdE9uVGVycml0b3J5KGF1dGhvcml0aWVzLHRlcnJpdG9yeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdXNlciBoYXMgYW55IG9mIHRoZSBnaXZlbiBhdXRob3JpdGllcyB3aXRob3V0IHJlc29sdmluZyBwcm9taXNlcyovXHJcbiAgICBoYXNBbnlBdXRob3JpdHlEaXJlY3QoYXV0aG9yaXRpZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0ZWQgfHwgIXRoaXMudXNlcklkZW50aXR5IHx8ICF0aGlzLnVzZXJJZGVudGl0eS5hdXRob3JpdGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF1dGhvcml0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJZGVudGl0eS5hdXRob3JpdGllcy5pbmNsdWRlcyhhdXRob3JpdGllc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzIG9uIHRoZSBnaXZlbiB0ZXJyaXRvcnkgd2l0aG91dCByZXNvbHZpbmcgcHJvbWlzZXMgKi9cclxuICAgIGhhc0FueUF1dGhvcml0eURpcmVjdE9uVGVycml0b3J5KGF1dGhvcml0aWVzOiBzdHJpbmdbXSx0ZXJyaXRvcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGVkIHx8ICF0aGlzLnVzZXJJZGVudGl0eSB8fCAhdGhpcy51c2VySWRlbnRpdHkuYXV0aG9yaXRpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXRob3JpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlcklkZW50aXR5LmF1dGhvcml0aWVzUGVyVGVycml0b3J5W3RlcnJpdG9yeV0gJiYgdGhpcy51c2VySWRlbnRpdHkuYXV0aG9yaXRpZXNQZXJUZXJyaXRvcnlbdGVycml0b3J5XS5pbmNsdWRlcyhhdXRob3JpdGllc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyB0aGUgZ2l2ZW4gYXV0aG9yaXR5ICovXHJcbiAgICBoYXNBdXRob3JpdHkoYXV0aG9yaXR5OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS50aGVuKChpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkLmF1dGhvcml0aWVzICYmIGlkLmF1dGhvcml0aWVzLmluY2x1ZGVzKGF1dGhvcml0eSkpO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyB0aGUgZ2l2ZW4gYXV0aG9yaXR5IG9uIHRoZSBnaXZlbiB0ZXJyaXRvcnkqL1xyXG4gICAgaGFzQXV0aG9yaXR5T25UZXJyaXRvcnkoYXV0aG9yaXR5OiBzdHJpbmcsdGVycml0b3J5OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS50aGVuKChpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkLmF1dGhvcml0aWVzUGVyVGVycml0b3J5ICYmIGlkLmF1dGhvcml0aWVzUGVyVGVycml0b3J5W3RlcnJpdG9yeV0gJiYgaWQuYXV0aG9yaXRpZXNQZXJUZXJyaXRvcnlbdGVycml0b3J5XS5pbmNsdWRlcyhhdXRob3JpdHkpKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjaGVjayB1c2VyIGlkZW50aXR5Ki9cclxuICAgIGlkZW50aXR5KGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkZW50aXR5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2sgYW5kIHNlZSBpZiB3ZSBoYXZlIHJldHJpZXZlZCB0aGUgdXNlcklkZW50aXR5IGRhdGEgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vIGlmIHdlIGhhdmUsIHJldXNlIGl0IGJ5IGltbWVkaWF0ZWx5IHJlc29sdmluZ1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJZGVudGl0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMudXNlcklkZW50aXR5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB1c2VySWRlbnRpdHkgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIsIHVwZGF0ZSB0aGUgaWRlbnRpdHkgb2JqZWN0LCBhbmQgdGhlbiByZXNvbHZlLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFjY291bnQuZ2V0KCkudG9Qcm9taXNlKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWNjb3VudCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICBpZiAoYWNjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcklkZW50aXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TdGF0ZS5uZXh0KHRoaXMudXNlcklkZW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcklkZW50aXR5O1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51c2VySWRlbnRpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblN0YXRlLm5leHQodGhpcy51c2VySWRlbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2hlY2sgd2hldGhlciBjdXJyZW50IHVzZXIgaXMgYXV0aGVudGljYXRlZCAqL1xyXG4gICAgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNoZWNrIHdoZXRoZXIgY3VycmVudCB1c2VyIGlkZW50aXR5IGlzIHJlc29sdmVkICovXHJcbiAgICBpc0lkZW50aXR5UmVzb2x2ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcklkZW50aXR5ICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCBjdXJyZW50IHVzZXIgYXV0aGVudGljYXRpb24gc3RhdGUgKi9cclxuICAgIGdldEF1dGhlbnRpY2F0aW9uU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGlvblN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0b3IsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuXHJcbi8qKiBJbnRlcmNlcHRvciBmb3IgYXV0aGVudGljYXRpb24gZXhwaXJlZCByZXNwb25zZSBpbiBBUEkgcmVxdWVzdHMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aEV4cGlyZWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIFxyXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWxcclxuICAgICkge31cclxuXHJcbiAgICAvKiogcmVxdWVzdCBoYW5kbGVyICovXHJcbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLmRvKChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHt9LCAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJjZXB0OiBib29sZWFuID0gcmVxdWVzdC51cmwuaW5kZXhPZihcIi9hcGkvXCIpICE9IC0xO1xyXG4gICAgICAgICAgICAvL3RyYWN0ZW0gcmVxdWVzdFxyXG4gICAgICAgICAgICBpZiAoaW50ZXJjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmluY2lwYWwuYXV0aGVudGljYXRlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi9wcmluY2lwYWwuc2VydmljZSc7XHJcblxyXG4vKiogTG9naW4gc2VydmljZSovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XHJcbiAgICBcclxuICAgIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmVyUHJvdmlkZXI6IEF1dGhTZXJ2aWNlLCBcclxuICAgICAgICBwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsXHJcbiAgICApIHt9XHJcblxyXG4gICAgLyoqTG9naW4gb3BlcmF0aW9uKi9cclxuICAgIGxvZ2luKGNyZWRlbnRpYWxzLCBjYWxsYmFjaz8pIHtcclxuICAgICAgICBjb25zdCBjYiA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZlclByb3ZpZGVyLmxvZ2luKGNyZWRlbnRpYWxzKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KHRydWUpLnRoZW4oKGFjY291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciB0aGUgbG9naW4gdGhlIGxhbmd1YWdlIHdpbGwgYmUgY2hhbmdlZCB0b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsYW5ndWFnZSBzZWxlY3RlZCBieSB0aGUgdXNlciBkdXJpbmcgaGlzIHJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoKTtcclxuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dvdXQoKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqbG9naW4gd2l0aCBqd3QgdG9rZW4gKi9cclxuICAgIGxvZ2luV2l0aFRva2VuKGp3dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2ZXJQcm92aWRlci5sb2dpbldpdGhUb2tlbihqd3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBsb2dvdXQgb3BlcmF0aW9uICovXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICB0aGlzLmF1dGhTZXJ2ZXJQcm92aWRlci5sb2dvdXQoKS5zdWJzY3JpYmUoKTtcclxuICAgICAgIHRoaXMucHJpbmNpcGFsLmF1dGhlbnRpY2F0ZShudWxsKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzb3VyY2VTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkU2VydmljZXtcclxuXHJcbiAgICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICAgIHB1YmxpYyBEQVNIQk9BUkRfQVBJID0gJ2Rhc2hib2FyZC9pbmZvJztcclxuICAgIHB1YmxpYyBEQVNIQk9BUkRfRU1CRURERUQ9ICdkYXNoYm9hcmQnO1xyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvciggICAgICAgXHJcbiAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgcHJpdmF0ZSByZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSkge1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqIGdldCBhbGwga3BpICovXHJcbiAgICBnZXRBbGwoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5EQVNIQk9BUkRfQVBJKSkubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlW3RoaXMuREFTSEJPQVJEX0VNQkVEREVEXSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqIFVzZXIgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VXNlcj4ge1xyXG4gIFxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBVU0VSX0FQSSA9J3VzZXJzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlciwgXCJ1c2Vyc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdXNlciovXHJcbiAgcmVtb3ZlKGl0ZW06IFVzZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB1c2VyKi9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5VU0VSX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gICAgXHJcbiAgLyoqIGNoYW5nZSBwYXNzd29yZCBvIGdpdmVuIHVzZXIgaWQgKi9cclxuICBjaGFuZ2VQYXNzd29yZChpZCxpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5VU0VSX0FQSStcIi9cIitpZCtcIi9jaGFuZ2UtcGFzc3dvcmRcIikgLCBpdGVtKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuLi90ZXJyaXRvcnkvdGVycml0b3J5Lm1vZGVsJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5tb2RlbCc7XHJcbi8qKlxyXG4gKiBVc2VyIHBvc2l0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXNlclBvc2l0aW9uIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogZW1haWwgKi9cclxuICBwdWJsaWMgZW1haWw6IHN0cmluZztcclxuICAvKiogb3JnYW5pemF0aW9uIG5hbWUqL1xyXG4gIHB1YmxpYyBvcmdhbml6YXRpb246IHN0cmluZztcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlOiBhbnk7XHJcbiAgLyoqIHN5c3RlbSBkYXRlZCBkYXRlKi9cclxuICBwdWJsaWMgZGF0ZWREYXRlOiBhbnk7XHJcbiAgLyoqIHBvc2l0aW9uIHRlcnJpdG9yeSovXHJcbiAgcHVibGljIHRlcnJpdG9yeTogVGVycml0b3J5O1xyXG4gIC8qKiB1c2VyKi9cclxuICBwdWJsaWMgdXNlcjogVXNlcjtcclxufVxyXG4iLCJpbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJQb3NpdGlvbiB9IGZyb20gJy4vdXNlci1wb3NpdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKiBVc2VyIHBvc2l0aW9uIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyUG9zaXRpb25TZXJ2aWNlICBleHRlbmRzIFJlc3RTZXJ2aWNlPFVzZXJQb3NpdGlvbj4ge1xyXG4gIFxyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVVNFUl9QT1NJVElPTl9BUEkgPSAndXNlci1wb3NpdGlvbnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihVc2VyUG9zaXRpb24sIFwidXNlci1wb3NpdGlvbnNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHVzZXIgcG9zaXRpb24qL1xyXG4gIHJlbW92ZShpdGVtOiBVc2VyUG9zaXRpb24pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB1c2VyIHBvc2l0aW9uKi9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS51c2VyICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndXNlcicsaXRlbS51c2VyKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS50ZXJyaXRvcnkgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0ZXJyaXRvcnknLGl0ZW0udGVycml0b3J5KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS50ZXJyaXRvcnkgPSBpdGVtLnRlcnJpdG9yeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLnVzZXIgPSBpdGVtLnVzZXIuX2xpbmtzLnNlbGYuaHJlZjtcclxuICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5VU0VSX1BPU0lUSU9OX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHsgVGVycml0b3J5IH0gZnJvbSAnLi4vdGVycml0b3J5L3RlcnJpdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXIubW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIFVzZXIgcGVybWlzc2lvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVzZXJDb25maWd1cmF0aW9uIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiByb2xlICovICBcclxuICBwdWJsaWMgcm9sZTogUm9sZTtcclxuXHJcbiAgLyoqIHJvbGUgQ2hpbGRyZW4gKi8gIFxyXG4gIHB1YmxpYyByb2xlQ2hpbGRyZW46IFJvbGU7XHJcbiAgXHJcbiAgLyoqIHRlcnJpdG9yeSAqLyBcclxuICBwdWJsaWMgdGVycml0b3J5OiBUZXJyaXRvcnk7XHJcbiAgLyoqIHVzZXIgKi9cclxuICBwdWJsaWMgdXNlcjogVXNlcjtcclxufVxyXG4iLCJpbXBvcnQgeyBSZXN0U2VydmljZSB9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL3VzZXItY29uZmlndXJhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKiBVc2VyIGNvbmZpZ3VyYXRpb24gbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJDb25maWd1cmF0aW9uU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFVzZXJDb25maWd1cmF0aW9uPiB7XHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBVU0VSX0NPTkZJR1VSQVRJT05fQVBJID0gJ3VzZXItY29uZmlndXJhdGlvbnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVXNlckNvbmZpZ3VyYXRpb24sIFwidXNlci1jb25maWd1cmF0aW9uc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKiogcmVtb3ZlIHVzZXIgY29uZmlndXJhdGlvbiovXHJcbiAgcmVtb3ZlKGl0ZW06IFVzZXJDb25maWd1cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKiBzYXZlIHVzZXIgY29uZmlndXJhdGlvbiovXHJcbiAgc2F2ZShpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzICE9IG51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS51c2VyICE9IG51bGwpIHtcclxuICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndXNlcicsIGl0ZW0udXNlcikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS50ZXJyaXRvcnkgIT0gbnVsbCkge1xyXG4gICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0ZXJyaXRvcnknLCBpdGVtLnRlcnJpdG9yeSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS5yb2xlICE9IG51bGwpIHtcclxuICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigncm9sZScsIGl0ZW0ucm9sZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS5yb2xlQ2hpbGRyZW4gIT0gbnVsbCkge1xyXG4gICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdyb2xlQ2hpbGRyZW4nLCBpdGVtLnJvbGVDaGlsZHJlbikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS50ZXJyaXRvcnkgPSBpdGVtLnRlcnJpdG9yeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLnJvbGUgPSBpdGVtLnJvbGUhPW51bGw/aXRlbS5yb2xlLl9saW5rcy5zZWxmLmhyZWY6bnVsbDtcclxuICAgICAgaXRlbS51c2VyID0gaXRlbS51c2VyLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIGl0ZW0ucm9sZUNoaWxkcmVuID0gaXRlbS5yb2xlQ2hpbGRyZW4hPW51bGw/aXRlbS5yb2xlQ2hpbGRyZW4uX2xpbmtzLnNlbGYuaHJlZjpudWxsO1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLlVTRVJfQ09ORklHVVJBVElPTl9BUEkpLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHsgVGVycml0b3J5R3JvdXBUeXBlIH0gZnJvbSAnLi90ZXJyaXRvcnktZ3JvdXAtdHlwZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRlcnJpdG9yeVR5cGUgfSBmcm9tICcuL3RlcnJpdG9yeS10eXBlLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBUZXJyaXRvcnkgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXJyaXRvcnkgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICAvKiogY29kZSAqL1xyXG4gIHB1YmxpYyBjb2RlOiBzdHJpbmc7XHJcbiAgLyoqIG5hbWUgKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIC8qKiBhZGRyZXNzKi9cclxuICBwdWJsaWMgdGVycml0b3JpYWxBdXRob3JpdHlBZGRyZXNzOiBzdHJpbmc7XHJcbiAgLyoqIGFkbWluICovXHJcbiAgcHVibGljIHRlcnJpdG9yaWFsQXV0aG9yaXR5TmFtZTogc3RyaW5nO1xyXG4gIC8qKiB3aGV0aGVyIHRlcnJpdG9yeSBpcyBibG9ja2VkKi9cclxuICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbjtcclxuICAvKiogY29tbWVudHMqL1xyXG4gIHB1YmxpYyBub3RlOiBzdHJpbmc7XHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG4gIC8qKiBjb250YWN0IGVtYWlsICovICBcclxuICBwdWJsaWMgdGVycml0b3JpYWxBdXRob3JpdHlFbWFpbDogc3RyaW5nO1xyXG4gIC8qKiBleHRlbnNpb24gKi9cclxuICBwdWJsaWMgZXh0ZW50OiBzdHJpbmc7XHJcbiAgLyoqIGxvZ28gaW1hZ2UgVVJMICovXHJcbiAgcHVibGljIHRlcnJpdG9yaWFsQXV0aG9yaXR5TG9nbzogc3RyaW5nO1xyXG4gIC8qKiBjb250YWN0IG9yZ2FuaXphdGlvbiBuYW1lICovXHJcbiAgLy8gcHVibGljIG9yZ2FuaXphdGlvbk5hbWU6IHN0cmluZztcclxuICAvKiogc2NvcGUqL1xyXG4gIHB1YmxpYyBzY29wZTogc3RyaW5nO1xyXG4gIC8qKiB0eXBlICovICBcclxuICBwdWJsaWMgdHlwZTogVGVycml0b3J5VHlwZTtcclxuICAvKiogZ3JvdXAgdHlwZSAqL1xyXG4gIHB1YmxpYyBncm91cFR5cGU6IFRlcnJpdG9yeUdyb3VwVHlwZTtcclxuICAvKiogdGVycml0b3J5IG1lbWJlcnMqL1xyXG4gIHB1YmxpYyBtZW1iZXJzOiBUZXJyaXRvcnlbXTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVGVycml0b3J5IH0gZnJvbSAnLi90ZXJyaXRvcnkubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFJlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRlcnJpdG9yeSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVycml0b3J5U2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRlcnJpdG9yeT4ge1xyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVEVSUklUT1JZX0FQSSA9ICd0ZXJyaXRvcmllcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUZXJyaXRvcnksIFwidGVycml0b3JpZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqIHJlbW92ZSB0ZXJyaXRvcnkqL1xyXG4gIHJlbW92ZShpdGVtOiBUZXJyaXRvcnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqIHNhdmUgdGVycml0b3J5Ki9cclxuICBzYXZlKGl0ZW06IFRlcnJpdG9yeSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcblxyXG4gICAgbGV0IHRlcnJpdG9yeUdyb3VwVHlwZTphbnkgPSB7fVxyXG4gICAgdGVycml0b3J5R3JvdXBUeXBlLl9saW5rcyA9IHt9O1xyXG4gICAgdGVycml0b3J5R3JvdXBUeXBlLl9saW5rcy5zZWxmID0ge307XHJcbiAgICB0ZXJyaXRvcnlHcm91cFR5cGUuX2xpbmtzLnNlbGYuaHJlZiA9IFwiXCI7XHJcblxyXG4gICAgaWYgKGl0ZW0uZ3JvdXBUeXBlICE9IG51bGwpIHtcclxuICAgICAgdGVycml0b3J5R3JvdXBUeXBlID0gaXRlbS5ncm91cFR5cGU7XHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbS5ncm91cFR5cGUuX2xpbmtzICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaXRlbS5ncm91cFR5cGUgPSBpdGVtLmdyb3VwVHlwZS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpdGVtLl9saW5rcyAhPSBudWxsKSB7XHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5ncm91cFR5cGU7XHJcblxyXG4gICAgICBpZiAodGVycml0b3J5R3JvdXBUeXBlLl9saW5rcy5zZWxmLmhyZWYgPT0gJycpIHtcclxuICAgICAgICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdncm91cFR5cGUnLCB0ZXJyaXRvcnlHcm91cFR5cGUpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2dyb3VwVHlwZScsIHRlcnJpdG9yeUdyb3VwVHlwZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlbS50eXBlICE9IG51bGwpXHJcbiAgICAgICAgaXRlbS50eXBlID0gaXRlbS50eXBlLl9saW5rcy5zZWxmLmhyZWY7XHJcblxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLlRFUlJJVE9SWV9BUEkpLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuXHJcbi8qKlxyXG4gKiBUZXJyaXRvcnkgdHlwZSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRlcnJpdG9yeVR5cGUgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgIC8qKiBpZCAqL1xyXG4gICBwdWJsaWMgaWQ6IG51bWJlcjsgIFxyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuL3RlcnJpdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnlUeXBlIH0gZnJvbSAnLi90ZXJyaXRvcnktdHlwZS5tb2RlbCc7XHJcblxyXG4vKiogVGVycml0b3J5VHlwZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVycml0b3J5VHlwZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUZXJyaXRvcnlUeXBlPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBURVJSSVRPUllUWVBFX0FQSSA9ICd0ZXJyaXRvcnktdHlwZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUZXJyaXRvcnlUeXBlLCBcInRlcnJpdG9yeS10eXBlc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGVycml0b3J5IHR5cGUqL1xyXG4gIHJlbW92ZShpdGVtOiBUZXJyaXRvcnlUeXBlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdGVycml0b3J5IHR5cGUqL1xyXG4gIHNhdmUoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLlRFUlJJVE9SWVRZUEVfQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcblxyXG4vKipcclxuICogVGVycml0b3J5IHR5cGUgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXJyaXRvcnlHcm91cFR5cGUgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgVGVycml0b3J5R3JvdXBUeXBlIH0gZnJvbSAnLi90ZXJyaXRvcnktZ3JvdXAtdHlwZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUZXJyaXRvcnlHcm91cFR5cGVTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGVycml0b3J5R3JvdXBUeXBlPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFRFUlJJVE9SWUdST1VQVFlQRV9BUEkgPSAndGVycml0b3J5LWdyb3VwLXR5cGVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGVycml0b3J5R3JvdXBUeXBlLCBcInRlcnJpdG9yeS1ncm91cC10eXBlc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGVycml0b3J5Ki9cclxuICByZW1vdmUoaXRlbTogVGVycml0b3J5R3JvdXBUeXBlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdGVycml0b3J5Ki9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5URVJSSVRPUllHUk9VUFRZUEVfQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn0iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuXHJcbi8qKlxyXG4gKiBSb2xlIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUm9sZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogY29tbWVudHMqL1xyXG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBSb2xlIH0gZnJvbSAnLi9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogUm9sZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUm9sZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxSb2xlPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFJPTEVfQVBJID0gJ3JvbGVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoUm9sZSwgXCJyb2xlc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgcm9sZSovXHJcbiAgcmVtb3ZlKGl0ZW06IFJvbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSByb2xlKi9cclxuICBzYXZlKGl0ZW06IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5ST0xFX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG4vKipcclxuICogQ29ubmVjdGlvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24gZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgLyoqIHVzZXIqL1xyXG4gIHB1YmxpYyB1c2VyOiBzdHJpbmc7XHJcbiAgLyoqIHBhc3N3b3JkKi9cclxuICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcclxuICAvKiogY29ubmVjdGlvbiBzdHJpbmcqL1xyXG4gIHB1YmxpYyBjb25uZWN0aW9uU3RyaW5nOiBzdHJpbmc7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICcuL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBDb25uZWN0aW9uIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPENvbm5lY3Rpb24+IHtcclxuICBcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENPTk5FQ1RJT05fQVBJID0gJ2Nvbm5lY3Rpb25zJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQ29ubmVjdGlvbiwgXCJjb25uZWN0aW9uc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgY29ubmVjdGlvbiovXHJcbiAgcmVtb3ZlKGl0ZW06IENvbm5lY3Rpb24pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBjb25uZWN0aW9uKi9cclxuICBzYXZlKGl0ZW06IENvbm5lY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNPTk5FQ1RJT05fQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHRlc3RDb25uZWN0aW9uKGl0ZW06YW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIHJlc3VsdD10aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNPTk5FQ1RJT05fQVBJKStcIi90ZXN0XCIgLCBpdGVtKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tICcuLi9yb2xlL3JvbGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUYXNrVHlwZSB9IGZyb20gJy4vdGFzay10eXBlLm1vZGVsJztcclxuaW1wb3J0IHsgVGFza0dyb3VwIH0gZnJvbSAnLi90YXNrLWdyb3VwLm1vZGVsJztcclxuaW1wb3J0IHsgVGFza0F2YWlsYWJpbGl0eSB9IGZyb20gJy4vdGFzay1hdmFpbGFiaWxpdHkubW9kZWwnO1xyXG5pbXBvcnQgeyBUYXNrUGFyYW1ldGVyIH0gZnJvbSAnLi90YXNrLXBhcmFtZXRlci5tb2RlbCc7XHJcblxyXG4vL0ZJWE1FIGVuc3VyZSB0YXNrIGNyZWF0aW9uIGluIGFkbWluIGFwcCB1cG9uIGluaXRpYWxpemF0aW9uIChhcyBpdCBpcyBkb25lIHdpdGggUm9sZXMgYW5kIGRlZmF1bHQgVXNlcnMpXHJcbi8qKiBHRU9BRE1JTl90YXNrIGlkICovXHJcbmV4cG9ydCBjb25zdCBHRU9BRE1JTl9UUkVFX1RBU0tfSUQ6c3RyaW5nICA9IFwiZ2VvYWRtaW5cIjtcclxuXHJcbmltcG9ydCB7IFRhc2tVSSB9IGZyb20gJy4vdGFzay11aS5tb2RlbCc7XHJcbmltcG9ydCB7IENhcnRvZ3JhcGh5IH0gZnJvbSAnLi4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHkubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9zZXJ2aWNlLm1vZGVsJztcclxuLyoqIFRhc2sgbW9kZWwgKi9cclxuZXhwb3J0IGNsYXNzIFRhc2sgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkPzogbnVtYmVyO1xyXG4gIC8qKiBuYW1lICovICBcclxuICBwdWJsaWMgbmFtZT86IHN0cmluZztcclxuICAvKiogb3JkZXIqL1xyXG4gIHB1YmxpYyBvcmRlcj86IE51bWJlcjtcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlPzogYW55O1xyXG4gIC8qKiB0YXNrIGdyb3VwKi9cclxuICBwdWJsaWMgZ3JvdXA/OiBUYXNrR3JvdXA7XHJcbiAgLyoqIHRhc2sgdHlwZSovXHJcbiAgcHVibGljIHR5cGU/OiBUYXNrVHlwZTtcclxuICAvKiogdGFzayBVSSovXHJcbiAgcHVibGljIHVpPzogVGFza1VJO1xyXG4gIC8qKiBwYXJhbWV0ZXJzKi9cclxuICBwdWJsaWMgcGFyYW1ldGVycz86IFRhc2tQYXJhbWV0ZXJbXTtcclxuICAvKiogY29ubmVjdGlvbiovXHJcbiAgcHVibGljIGNvbm5lY3Rpb24/OiBDb25uZWN0aW9uO1xyXG4gIC8qKiByb2xlcyovXHJcbiAgcHVibGljIHJvbGVzPzogUm9sZVtdO1xyXG4gIC8qKiBhdmFpbGFiaWxpdGllcyovXHJcbiAgcHVibGljIGF2YWlsYWJpbGl0aWVzPzogVGFza0F2YWlsYWJpbGl0eVtdO1xyXG5cclxuICBwdWJsaWMgY2FydG9ncmFwaHk/OiBDYXJ0b2dyYXBoeTtcclxuXHJcbiAgcHVibGljIHNlcnZpY2U/OiBTZXJ2aWNlO1xyXG5cclxuICBwdWJsaWMgcHJvcGVydGllcz87XHJcbn1cclxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRhc2sgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRhc2tTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGFzaz4ge1xyXG5cclxuICAgIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gICAgcHVibGljIENPTk5FQ1RJT05fQVBJID0gJ3Rhc2tzJztcclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgc3VwZXIoVGFzaywgXCJ0YXNrc1wiLCBpbmplY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlbW92ZSB0YXNrKi9cclxuICAgIHJlbW92ZShpdGVtOiBUYXNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIHNhdmUgdGFzayovXHJcbiAgICBzYXZlKGl0ZW06IFRhc2spOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0uX2xpbmtzICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXRlbS5zZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmljZTphbnkgPSB7fVxyXG4gICAgICAgICAgICAgICAgc2VydmljZS5fbGlua3MgPSB7fTtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdzZXJ2aWNlJywgc2VydmljZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZj1pdGVtLnNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZi5zcGxpdChcIntcIilbMF1cclxuICAgICAgICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdzZXJ2aWNlJywgaXRlbS5zZXJ2aWNlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VydmljZSA9IGl0ZW0uc2VydmljZS5fbGlua3Muc2VsZi5ocmVmXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmNhcnRvZ3JhcGh5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FydG9ncmFwaHk6YW55ID0ge31cclxuICAgICAgICAgICAgICAgIGNhcnRvZ3JhcGh5Ll9saW5rcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2FydG9ncmFwaHkuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmLmhyZWYgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZWxldGVSZWxhdGlvbignY2FydG9ncmFwaHknLCBjYXJ0b2dyYXBoeSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmLmhyZWY9aXRlbS5jYXJ0b2dyYXBoeS5fbGlua3Muc2VsZi5ocmVmLnNwbGl0KFwie1wiKVswXVxyXG4gICAgICAgICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2NhcnRvZ3JhcGh5JywgaXRlbS5jYXJ0b2dyYXBoeSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNhcnRvZ3JhcGh5ID0gaXRlbS5jYXJ0b2dyYXBoeS5fbGlua3Muc2VsZi5ocmVmXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXRlbS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvbjphbnkgPSB7fVxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fbGlua3MgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdjb25uZWN0aW9uJywgY29ubmVjdGlvbikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZj1pdGVtLmNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZi5zcGxpdChcIntcIilbMF1cclxuICAgICAgICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdjb25uZWN0aW9uJywgaXRlbS5jb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29ubmVjdGlvbiA9IGl0ZW0uY29ubmVjdGlvbi5fbGlua3Muc2VsZi5ocmVmXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXRlbS51aSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaXRlbS5kZWxldGVSZWxhdGlvbigndWknLCBpdGVtLnVpKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTsgXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udWkuX2xpbmtzLnNlbGYuaHJlZj1pdGVtLnVpLl9saW5rcy5zZWxmLmhyZWYuc3BsaXQoXCJ7XCIpWzBdXHJcbiAgICAgICAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndWknLCBpdGVtLnVpKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0udWkgPSBpdGVtLnVpLl9saW5rcy5zZWxmLmhyZWZcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdncm91cCcsIGl0ZW0uZ3JvdXApLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyBcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ncm91cC5fbGlua3Muc2VsZi5ocmVmPWl0ZW0uZ3JvdXAuX2xpbmtzLnNlbGYuaHJlZi5zcGxpdChcIntcIilbMF1cclxuICAgICAgICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdncm91cCcsIGl0ZW0uZ3JvdXApLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ncm91cCA9IGl0ZW0uZ3JvdXAuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaXRlbS5kZWxldGVSZWxhdGlvbigndHlwZScsIGl0ZW0udHlwZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUuX2xpbmtzLnNlbGYuaHJlZj1pdGVtLnR5cGUuX2xpbmtzLnNlbGYuaHJlZi5zcGxpdChcIntcIilbMF1cclxuICAgICAgICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0eXBlJywgaXRlbS50eXBlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IGl0ZW0udHlwZS5fbGlua3Muc2VsZi5ocmVmXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGl0ZW0ucm9sZXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvbGVzID0gWy4uLml0ZW0ucm9sZXNdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0ucm9sZXM7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVBbGxSZWxhdGlvbigncm9sZXMnLHJvbGVzKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uY2FydG9ncmFwaHkpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jYXJ0b2dyYXBoeSA9IGl0ZW0uY2FydG9ncmFwaHkuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uY29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbm5lY3Rpb24gPSBpdGVtLmNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlcnZpY2UgPSBpdGVtLnNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0ZW0udWkpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS51aSA9IGl0ZW0udWkuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uZ3JvdXApe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ncm91cCA9IGl0ZW0uZ3JvdXAuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0ZW0udHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSBpdGVtLnR5cGUuX2xpbmtzLnNlbGYuaHJlZlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQ09OTkVDVElPTl9BUEkpLCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbi8qKlxyXG4gKiBUYXNrIHR5cGUgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUYXNrVHlwZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSovICBcclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBUYXNrVHlwZSB9IGZyb20gJy4vdGFzay10eXBlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFza1R5cGUgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRhc2tUeXBlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRhc2tUeXBlPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBDT05ORUNUSU9OX0FQSSA9ICd0YXNrLXR5cGVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoVGFza1R5cGUsIFwidGFzay10eXBlc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGFzayB0eXBlKi9cclxuICByZW1vdmUoaXRlbTogVGFza1R5cGUpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0YXNrIHR5cGUqL1xyXG4gIHNhdmUoaXRlbTogVGFza1R5cGUpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNPTk5FQ1RJT05fQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbi8qKlxyXG4gKiBUYXNrIGdyb3VwIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFza0dyb3VwIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyOyAgXHJcbiAgLyoqIG5hbWUqLyAgXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVGFza0dyb3VwIH0gZnJvbSAnLi90YXNrLWdyb3VwLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFzayBncm91cCBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGFza0dyb3VwU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRhc2tHcm91cD4ge1xyXG4gIFxyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgQ09OTkVDVElPTl9BUEkgPSAndGFzay1ncm91cHMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUYXNrR3JvdXAsIFwidGFzay1ncm91cHNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRhc2sgZ3JvdXAqL1xyXG4gIHJlbW92ZShpdGVtOiBUYXNrR3JvdXApIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0YXNrIGdyb3VwKi9cclxuICBzYXZlKGl0ZW06IFRhc2tHcm91cCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQ09OTkVDVElPTl9BUEkpICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtUYXNrfSBmcm9tICcuL3Rhc2subW9kZWwnOyAgXHJcbi8qKlxyXG4gKiBUYXNrIHBhcmFtZXRlciBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhc2tQYXJhbWV0ZXIgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIG5hbWUqLyAgXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBcclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIFxyXG4gIC8qKiB2YWx1ZSovXHJcbiAgcHVibGljIHZhbHVlOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIG9yZGVyKi8gIFxyXG4gIHB1YmxpYyBvcmRlcjogTnVtYmVyO1xyXG4gIFxyXG4gIC8qKiB0YXNrKi8gIFxyXG4gIHB1YmxpYyB0YXNrOlRhc2s7XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRhc2tQYXJhbWV0ZXIgfSBmcm9tICcuL3Rhc2stcGFyYW1ldGVyLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogVGFzayBwYXJhbWV0ZXIgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBUYXNrUGFyYW1ldGVyU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRhc2tQYXJhbWV0ZXI+IHtcclxuICBcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFRBU0tfUEFSQU1FVEVSX0FQSSA9ICd0YXNrLXBhcmFtZXRlcnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUYXNrUGFyYW1ldGVyLCBcInRhc2stcGFyYW1ldGVyc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGFzayBwYXJhbWV0ZXIqL1xyXG4gIHJlbW92ZShpdGVtOiBUYXNrUGFyYW1ldGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdGFzayBwYXJhbWV0ZXIqL1xyXG4gIHNhdmUoaXRlbTogVGFza1BhcmFtZXRlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS50YXNrICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndGFzaycsaXRlbS50YXNrKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0udGFzayA9IGl0ZW0udGFzay5fbGlua3Muc2VsZi5ocmVmO1xyXG4gIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLlRBU0tfUEFSQU1FVEVSX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuLi90ZXJyaXRvcnkvdGVycml0b3J5Lm1vZGVsJztcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzay5tb2RlbCc7XHJcbi8qKlxyXG4gKiBUYXNrIGF2YWlsYWJpbGl0eSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhc2tBdmFpbGFiaWxpdHkgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIHRlcnJpdG9yeSovXHJcbiAgcHVibGljIHRlcnJpdG9yeTogVGVycml0b3J5O1xyXG4gIC8qKiB0YXNrKi9cclxuICBwdWJsaWMgdGFzazogVGFzaztcclxufVxyXG4iLCJpbXBvcnQgeyBUYXNrQXZhaWxhYmlsaXR5IH0gZnJvbSAnLi90YXNrLWF2YWlsYWJpbGl0eS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRhc2sgYXZhaWxhYmlsaXR5IG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpIFxyXG5leHBvcnQgY2xhc3MgVGFza0F2YWlsYWJpbGl0eVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUYXNrQXZhaWxhYmlsaXR5PiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBUQVNLX0FWQUlMQUJJTElUWV9BUEkgPSAndGFzay1hdmFpbGFiaWxpdGllcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRhc2tBdmFpbGFiaWxpdHksIFwidGFzay1hdmFpbGFiaWxpdGllc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGFzayBhdmFpbGFiaWxpdHkqL1xyXG4gIHJlbW92ZShpdGVtOiBUYXNrQXZhaWxhYmlsaXR5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdGFzayBhdmFpbGFiaWxpdHkqL1xyXG4gIHNhdmUoaXRlbTogVGFza0F2YWlsYWJpbGl0eSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbS50YXNrICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndGFzaycsaXRlbS50YXNrKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbS50ZXJyaXRvcnkgIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCd0ZXJyaXRvcnknLGl0ZW0udGVycml0b3J5KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS50ZXJyaXRvcnkgPSBpdGVtLnRlcnJpdG9yeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLnRhc2sgPSBpdGVtLnRhc2suX2xpbmtzLnNlbGYuaHJlZjtcclxuICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5UQVNLX0FWQUlMQUJJTElUWV9BUEkpICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuLyoqXHJcbiAqIFRhc2sgVUkgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUYXNrVUkgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHRvb2x0aXAqLyAgXHJcbiAgcHVibGljIHRvb2x0aXA6IHN0cmluZztcclxuICAgIFxyXG4gIC8qKiBvcmRlciovIFxyXG4gIHB1YmxpYyBvcmRlcjogbnVtYmVyO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBUYXNrVUkgfSBmcm9tICcuL3Rhc2stdWkubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBUYXNrIFVJIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUYXNrVUlTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8VGFza1VJPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBDT05ORUNUSU9OX0FQSSA9ICd0YXNrLXVpcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRhc2tVSSwgXCJ0YXNrLXVpc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdGFzayBVSSovXHJcbiAgcmVtb3ZlKGl0ZW06IFRhc2tVSSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRhc2sgVUkqL1xyXG4gIHNhdmUoaXRlbTogVGFza1VJKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkgeyAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNPTk5FQ1RJT05fQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSAnLi9sYW5ndWFnZS5tb2RlbCc7XHJcblxyXG5cclxuLyoqIFRhc2sgbW9kZWwgKi9cclxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBlbGVtZW50OiBudW1iZXI7XHJcbiAgLyoqIG5hbWUgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRpb246IHN0cmluZztcclxuICAvKiogY29sdW1uICovXHJcbiAgcHVibGljIGNvbHVtbjogc3RyaW5nO1xyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIGxhbmd1YWdlOiBMYW5ndWFnZTtcclxuXHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRpb24gfSBmcm9tICcuL3RyYW5zbGF0aW9uLm1vZGVsJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvblNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxUcmFuc2xhdGlvbj4ge1xyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVFJBTlNMQVRJT05fQVBJID0gJ3RyYW5zbGF0aW9ucyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRyYW5zbGF0aW9uLCBcInRyYW5zbGF0aW9uc1wiLCBpbmplY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiByZW1vdmUgdHJhbnNsYXRpb24qL1xyXG4gIHJlbW92ZShpdGVtOiBUcmFuc2xhdGlvbikge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRyYW5zbGF0aW9uKi9cclxuICBzYXZlKGl0ZW06IFRyYW5zbGF0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuXHJcbiAgICBsZXQgbGFuZ3VhZ2U6YW55ID0ge31cclxuICAgIGxhbmd1YWdlLl9saW5rcyA9IHt9O1xyXG4gICAgbGFuZ3VhZ2UuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgIGxhbmd1YWdlLl9saW5rcy5zZWxmLmhyZWYgPSBcIlwiO1xyXG5cclxuICAgIGlmIChpdGVtLmxhbmd1YWdlICE9IG51bGwpIHtcclxuICAgICAgbGFuZ3VhZ2UgPSBpdGVtLmxhbmd1YWdlO1xyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0ubGFuZ3VhZ2UuX2xpbmtzICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaXRlbS5sYW5ndWFnZSA9IGl0ZW0ubGFuZ3VhZ2UuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgZGVsZXRlIGl0ZW0ubGFuZ3VhZ2U7XHJcbiAgICAgIC8vIGlmIChsYW5ndWFnZS5fbGlua3Muc2VsZi5ocmVmID09ICcnKSB7XHJcbiAgICAgIC8vICAgaXRlbS5kZWxldGVSZWxhdGlvbignbGFuZ3VhZ2UnLCBsYW5ndWFnZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG5cclxuICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgLy8gICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignbGFuZ3VhZ2UnLCBsYW5ndWFnZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuVFJBTlNMQVRJT05fQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcblxyXG5cclxuLyoqIFRhc2sgbW9kZWwgKi9cclxuZXhwb3J0IGNsYXNzIExhbmd1YWdlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIHNob3J0bmFtZTogc3RyaW5nO1xyXG4gIC8qKiBuYW1lICovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL2xhbmd1YWdlLm1vZGVsJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxMYW5ndWFnZT4ge1xyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgTEFOR1VBR0VTX0FQSSA9ICdsYW5ndWFnZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihMYW5ndWFnZSwgXCJsYW5ndWFnZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRyYW5zbGF0aW9uKi9cclxuICByZW1vdmUoaXRlbTogTGFuZ3VhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSB0cmFuc2xhdGlvbiovXHJcbiAgc2F2ZShpdGVtOiBMYW5ndWFnZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5MQU5HVUFHRVNfQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7Q29ubmVjdGlvbn0gZnJvbSAnLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLm1vZGVsJztcclxuaW1wb3J0IHtTZXJ2aWNlUGFyYW1ldGVyfSBmcm9tICcuL3NlcnZpY2UtcGFyYW1ldGVyLm1vZGVsJztcclxuLyoqXHJcbiAqIFNlcnZpY2UgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiB1cmwqLyAgXHJcbiAgcHVibGljIHNlcnZpY2VVUkw6IHN0cmluZztcclxuXHJcbiAgLyoqIHByb2plY3Rpb25zKi8gIFxyXG4gIHB1YmxpYyBzdXBwb3J0ZWRTUlM6IHN0cmluZztcclxuICBcclxuICAvKiogbGVnZW5kKi9cclxuICBwdWJsaWMgbGVnZW5kOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpbmZvVXJsKi8gIFxyXG4gIHB1YmxpYyBpbmZvVXJsOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHN5c3RlbSBjcmVhdGVkIGRhdGUqL1xyXG4gIHB1YmxpYyBjcmVhdGVkRGF0ZTogYW55O1xyXG5cclxuICAvKiogY29ubmVjdGlvbiovXHJcbiAgcHVibGljIGNvbm5lY3Rpb246IENvbm5lY3Rpb247XHJcbiAgXHJcbiAgLyoqIHBhcmFtZXRlcnMqLyAgXHJcbiAgcHVibGljIHBhcmFtZXRlcnM6IFNlcnZpY2VQYXJhbWV0ZXJbXTtcclxuXHJcbiAgLyoqIHdoZXRoZXIgc2VydmljZSBpcyBibG9ja2VkKi9cclxuICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogU2VydmljZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VydmljZVNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxTZXJ2aWNlPiB7XHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBTRVJWSUNFX0FQSSA9ICdzZXJ2aWNlcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFNlcnZpY2UsIFwic2VydmljZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHNlcnZpY2UqL1xyXG4gIHJlbW92ZShpdGVtOiBTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgc2VydmljZSovXHJcbiAgc2F2ZShpdGVtOiBTZXJ2aWNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGxldCBzZXJ2aWNlQ29ubmVjdGlvbiA9IGl0ZW0uY29ubmVjdGlvbjtcclxuXHJcbiAgICBpZiAoaXRlbS5jb25uZWN0aW9uIT1udWxsKXtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0uY29ubmVjdGlvbi5fbGlua3MhPSAndW5kZWZpbmVkJykgeyBcclxuICAgICAgICAgICAgaXRlbS5jb25uZWN0aW9uID0gaXRlbS5jb25uZWN0aW9uLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VydmljZUNvbm5lY3Rpb24uX2xpbmtzPSB7fTtcclxuICAgICAgICAgICAgc2VydmljZUNvbm5lY3Rpb24uX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgICAgc2VydmljZUNvbm5lY3Rpb24uX2xpbmtzLnNlbGYuaHJlZj1cIlwiO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHsgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7ICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5TRVJWSUNFX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZS5tb2RlbCc7IFxyXG4vKipcclxuICogU2VydmljZSBwYXJhbWV0ZXIgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlUGFyYW1ldGVyIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgLyoqIHZhbHVlKi8gIFxyXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBzZXJ2aWNlKi9cclxuICBwdWJsaWMgc2VydmljZTogU2VydmljZTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmljZVBhcmFtZXRlciB9IGZyb20gJy4vc2VydmljZS1wYXJhbWV0ZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBTZXJ2aWNlIHBhcmFtZXRlciBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKSBcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VQYXJhbWV0ZXJTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8U2VydmljZVBhcmFtZXRlcj4ge1xyXG5cclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgU0VSVklDRV9QQVJBTUVURVJfQVBJID0gJ3NlcnZpY2UtcGFyYW1ldGVycyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFNlcnZpY2VQYXJhbWV0ZXIsIFwic2VydmljZS1wYXJhbWV0ZXJzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBzZXJ2aWNlIHBhcmFtZXRlciovXHJcbiAgcmVtb3ZlKGl0ZW06IFNlcnZpY2VQYXJhbWV0ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBzZXJ2aWNlIHBhcmFtZXRlciovXHJcbiAgc2F2ZShpdGVtOiBTZXJ2aWNlUGFyYW1ldGVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICBcclxuICAgICAgXHJcbiAgICAgIGlmIChpdGVtLnNlcnZpY2UgIT1udWxsKXtcclxuICAgICAgICAgIGxldCBzZXJ2aWNlID0gIGl0ZW0uc2VydmljZTtcclxuICAgICAgICAgIGRlbGV0ZSBpdGVtLnNlcnZpY2U7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignc2VydmljZScsc2VydmljZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS5zZXJ2aWNlID0gaXRlbS5zZXJ2aWNlLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuU0VSVklDRV9QQVJBTUVURVJfQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbi8qKlxyXG4gKiBDYXBhYmlsaXRpZSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcGFiaWxpdGllIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiB1cmwgKi9cclxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBDYXBhYmlsaXRpZSB9IGZyb20gJy4vY2FwYWJpbGl0aWUubW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhcGFiaWxpdGllc1NlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxDYXBhYmlsaXRpZT4gIHtcblxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cbiAgcHVibGljIENBUEFCSUxJVElFU19BUEkgPSAnaGVscGVycy9jYXBhYmlsaXRpZXM/dXJsPSc7XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcihDYXBhYmlsaXRpZSwgXCJoZWxwZXJzL2NhcGFiaWxpdGllcz91cmw9XCIsIGluamVjdG9yKTtcbiAgfVxuXG4gICAgLyoqIHNhdmUgc2VydmljZSovXG4gICAgZ2V0SW5mbyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XG4gICAgICBpZih1cmwpe1xuICAgICAgICBsZXQgZmluYWxVcmwgPSB0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNBUEFCSUxJVElFU19BUEkpO1xuICAgICAgICBmaW5hbFVybCA9IGZpbmFsVXJsLmNvbmNhdCh1cmwpO1xuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFVybCk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5nZXQoZmluYWxVcmwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiBcbiAgICB9XG4gIFxufVxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9zZXJ2aWNlLm1vZGVsJztcclxuaW1wb3J0IHtDb25uZWN0aW9ufSBmcm9tICcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5fSBmcm9tICcuL2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0eS5tb2RlbCc7XHJcbi8qKlxyXG4gKiBDYXJ0b2dyYXBoeVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5IGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBpZCAqL1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyOyAgXHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlIDogc3RyaW5nO1xyXG5cclxuICAvKiogc2VydmljZSovXHJcbiAgcHVibGljIHNlcnZpY2UgOiBTZXJ2aWNlO1xyXG5cclxuICAvKiogb3JkZXIqLyAgXHJcbiAgcHVibGljIG9yZGVyOiBOdW1iZXI7IFxyXG5cclxuICAvKiogZGVzY3JpcHRpb24qLyAgXHJcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBTdHJpbmc7XHJcblxyXG4gIC8qKiBzb3VyY2UqLyAgXHJcbiAgcHVibGljIHNvdXJjZTogU3RyaW5nO1xyXG5cclxuICAvKiogd2hldGhlciBjYXJ0b2dyYXBoeSBpcyBibG9ja2VkKi9cclxuICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbjsgIFxyXG5cclxuICAvKiogYXBwbHkgZmlsdGVyIHRvIGdldCBtYXAqL1xyXG4gIHB1YmxpYyBhcHBseUZpbHRlclRvR2V0TWFwOiBTdHJpbmc7ICBcclxuXHJcbiAgLyoqIGFwcGx5IGZpbHRlciB0byBnZXQgZmVhdHVyZSBpbmZvcm1hdGlvbiovXHJcbiAgcHVibGljIGFwcGx5RmlsdGVyVG9HZXRGZWF0dXJlSW5mbzogYm9vbGVhbjsgIFxyXG5cclxuICAvKiogYXBwbHkgZmlsdGVyIHRvIHNwYXRpYWwgc2VsZWN0aW9uKi9cclxuICBwdWJsaWMgYXBwbHlGaWx0ZXJUb1NwYXRpYWxTZWxlY3Rpb246IGJvb2xlYW47ICBcclxuXHJcbiAgLyoqIHNlbGVjdGFibGUgbGF5ZXJzKi9cclxuICBwdWJsaWMgc2VsZWN0YWJsZUxheWVyczogc3RyaW5nW107XHJcblxyXG4gIC8qKiB0cmFuc3BhcmVuY3kqLyBcclxuICBwdWJsaWMgdHJhbnNwYXJlbmN5OiBOdW1iZXI7XHJcblxyXG4gIC8qKiB3aGV0aGVyIGxheWVyIGlzIHF1ZXJ5YWJsZSovICBcclxuICBwdWJsaWMgcXVlcnlhYmxlOiBCb29sZWFuO1xyXG5cclxuICAvKiogd2hldGhlciBsYXllciBpcyBxdWVyeWFibGUqLyBcclxuICBwdWJsaWMgcXVlcnlBY3Q6IEJvb2xlYW47XHJcblxyXG4gIC8qKiBxdWVyeSBsYXllciovXHJcbiAgcHVibGljIHF1ZXJ5TGF5OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBzeXN0ZW0gY3JlYXRlZCBkYXRlKi9cclxuICBwdWJsaWMgY3JlYXRlZERhdGU6IGFueTtcclxuXHJcbiAgLyoqIG1pbmltdW0gc2NhbGUqL1xyXG4gIHB1YmxpYyBtaW5pbXVtU2NhbGU6IE51bWJlcjtcclxuXHJcbiAgLyoqIG1heGltdW0gc2NhbGUqL1xyXG4gIHB1YmxpYyBtYXhpbXVtU2NhbGU6IE51bWJlcjtcclxuXHJcbiAgLyoqIGxheWVycyovICBcclxuICBwdWJsaWMgbGF5ZXJzOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIGNvbm5lY3Rpb24qL1xyXG4gIHB1YmxpYyBjb25uZWN0aW9uOiBDb25uZWN0aW9uO1xyXG5cclxuICAvKiogcXVlcnlhYmxlRmVhdHVyZUVuYWJsZWQgKi9cclxuICBwdWJsaWMgcXVlcnlhYmxlRmVhdHVyZUVuYWJsZWQ6IEJvb2xlYW47XHJcblxyXG4gICAgLyoqIHF1ZXJ5YWJsZUxheWVycyAqL1xyXG4gIHB1YmxpYyBxdWVyeWFibGVGZWF0dXJlQXZhaWxhYmxlOiBCb29sZWFuO1xyXG5cclxuICAgIC8qKiBxdWVyeWFibGVMYXllcnMgKi9cclxuICBwdWJsaWMgcXVlcnlhYmxlTGF5ZXJzOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqIGF2YWlsYWJpbGl0aWVzKi9cclxuICBwdWJsaWMgYXZhaWxhYmlsaXRpZXMgOiBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eVtdO1xyXG5cclxuICAvKiogd2hldGhlciBsYXllciBpcyBxdWVyeWFibGUqLyBcclxuICBwdWJsaWMgc2VsZWN0YWJsZUZlYXR1cmVFbmFibGVkOiBCb29sZWFuO1xyXG5cclxuICAvKiogc2VsZWN0aW9uIGxheWVyKi9cclxuICBwdWJsaWMgc2VsZWN0aW9uTGF5ZXI6IHN0cmluZztcclxuXHJcbiAgLyoqIHNlbGVjdGlvbiBzZXJ2aWNlKi8gIFxyXG4gIHB1YmxpYyBzZWxlY3Rpb25TZXJ2aWNlOiBTZXJ2aWNlO1xyXG5cclxuICAvKiogbGVnZW5kIHRpcCovICBcclxuICBwdWJsaWMgbGVnZW5kVHlwZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBsZWdlbmQgdXJsKi9cclxuICBwdWJsaWMgbGVnZW5kVVJMOiBzdHJpbmc7XHJcblxyXG4gIC8qKiB3aGV0aGVyIGxheWVyIGlzIGVkaXRhYmxlKi9cclxuICBwdWJsaWMgZWRpdGFibGU6IEJvb2xlYW47XHJcblxyXG4gIC8qKiBtZXRhZGF0YSBVUkwqL1xyXG4gIHB1YmxpYyBtZXRhZGF0YVVSTDogc3RyaW5nO1xyXG5cclxuICAvKiogbWV0YWRhdGEgVVJMKi9cclxuICBwdWJsaWMgZGF0YXNldFVSTDogc3RyaW5nO1xyXG5cclxuICAvKiogd2hldGhlciBsYXllciBpcyB0aGVtYWJsZSovXHJcbiAgcHVibGljIHRoZW1hdGljOiBCb29sZWFuO1xyXG4gIFxyXG4gIC8qKiBnZW9tZXRyeSB0eXBlKi9cclxuICBwdWJsaWMgZ2VvbWV0cnlUeXBlOiBzdHJpbmc7XHJcbiAgXHJcblxyXG59XHJcbiIsImltcG9ydCB7IENhcnRvZ3JhcGh5IH0gZnJvbSAnLi9jYXJ0b2dyYXBoeS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVzdFNlcnZpY2UgfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9zZXJ2aWNlLm1vZGVsJztcclxuXHJcbi8qKiBDYXJ0b2dyYXBoeSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q2FydG9ncmFwaHk+IHtcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENBUlRPR1JBUEhZX0FQSSA9ICdjYXJ0b2dyYXBoaWVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5LCBcImNhcnRvZ3JhcGhpZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqIHJlbW92ZSBjYXJ0b2dyYXBoeSovXHJcbiAgcmVtb3ZlKGl0ZW06IENhcnRvZ3JhcGh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKiBzYXZlIGNhcnRvZ3JhcGh5Ki9cclxuICBzYXZlKGl0ZW06IENhcnRvZ3JhcGh5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuXHJcbiAgICBsZXQgY2FydG9ncmFwaHlDb25uZWN0aW9uOmFueT17fTtcclxuICAgIGNhcnRvZ3JhcGh5Q29ubmVjdGlvbi5fbGlua3MgPSB7fTtcclxuICAgIGNhcnRvZ3JhcGh5Q29ubmVjdGlvbi5fbGlua3Muc2VsZiA9IHt9O1xyXG4gICAgY2FydG9ncmFwaHlDb25uZWN0aW9uLl9saW5rcy5zZWxmLmhyZWYgPSBcIlwiO1xyXG4gICAgIFxyXG4gICAgbGV0IGNhcnRvZ3JhcGh5U2VydmljZTphbnk9e307XHJcbiAgICBjYXJ0b2dyYXBoeVNlcnZpY2UuX2xpbmtzID0ge307XHJcbiAgICBjYXJ0b2dyYXBoeVNlcnZpY2UuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgIGNhcnRvZ3JhcGh5U2VydmljZS5fbGlua3Muc2VsZi5ocmVmID0gXCJcIjtcclxuICAgIFxyXG4gICAgbGV0IGNhcnRvZ3JhcGh5U2VsZWN0aW9uU2VydmljZTphbnkgPSB7fTtcclxuICAgIGNhcnRvZ3JhcGh5U2VsZWN0aW9uU2VydmljZS5fbGlua3MgPSB7fTtcclxuICAgIGNhcnRvZ3JhcGh5U2VsZWN0aW9uU2VydmljZS5fbGlua3Muc2VsZiA9IHt9O1xyXG4gICAgY2FydG9ncmFwaHlTZWxlY3Rpb25TZXJ2aWNlLl9saW5rcy5zZWxmLmhyZWYgPSBcIlwiO1xyXG5cclxuICAgIGlmIChpdGVtLnNlcnZpY2UgIT0gbnVsbCkge1xyXG4gICAgICBjYXJ0b2dyYXBoeVNlcnZpY2U9ICBpdGVtLnNlcnZpY2U7XHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbS5zZXJ2aWNlLl9saW5rcyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGl0ZW0uc2VydmljZSA9IGl0ZW0uc2VydmljZS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uc2VsZWN0aW9uU2VydmljZSAhPSBudWxsKSB7XHJcbiAgICAgIGNhcnRvZ3JhcGh5U2VsZWN0aW9uU2VydmljZSA9IGl0ZW0uc2VsZWN0aW9uU2VydmljZVxyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0uc2VsZWN0aW9uU2VydmljZS5fbGlua3MgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpdGVtLnNlbGVjdGlvblNlcnZpY2UgPSBpdGVtLnNlbGVjdGlvblNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpdGVtLmNvbm5lY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICBjYXJ0b2dyYXBoeUNvbm5lY3Rpb249ICBpdGVtLmNvbm5lY3Rpb247XHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbS5jb25uZWN0aW9uLl9saW5rcyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGl0ZW0uY29ubmVjdGlvbiA9IGl0ZW0uY29ubmVjdGlvbi5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uX2xpbmtzICE9IG51bGwpIHtcclxuXHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5jb25uZWN0aW9uO1xyXG4gICAgICBkZWxldGUgaXRlbS5zZXJ2aWNlO1xyXG4gICAgICBkZWxldGUgaXRlbS5zZWxlY3Rpb25TZXJ2aWNlO1xyXG5cclxuICAgICAgLy8gaWYgKGNhcnRvZ3JhcGh5Q29ubmVjdGlvbi5fbGlua3Muc2VsZi5ocmVmID09ICcnICYmIGNhcnRvZ3JhcGh5Q29ubmVjdGlvbikge1xyXG4gICAgICAvLyAgIGl0ZW0uZGVsZXRlUmVsYXRpb24oJ3NwYXRpYWxTZWxlY3Rpb25Db25uZWN0aW9uJywgY2FydG9ncmFwaHlDb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIC8vICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3NwYXRpYWxTZWxlY3Rpb25Db25uZWN0aW9uJywgY2FydG9ncmFwaHlDb25uZWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgLy8gICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgIGlmIChjYXJ0b2dyYXBoeVNlcnZpY2UuX2xpbmtzLnNlbGYuaHJlZiA9PSAnJykge1xyXG4gICAgICAgIGl0ZW0uZGVsZXRlUmVsYXRpb24oJ3NlcnZpY2UnLCBjYXJ0b2dyYXBoeVNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignc2VydmljZScsIGNhcnRvZ3JhcGh5U2VydmljZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FydG9ncmFwaHlTZWxlY3Rpb25TZXJ2aWNlLl9saW5rcy5zZWxmLmhyZWYgPT0gJycgJiYgY2FydG9ncmFwaHlTZWxlY3Rpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgaXRlbS5kZWxldGVSZWxhdGlvbignc3BhdGlhbFNlbGVjdGlvblNlcnZpY2UnLCBjYXJ0b2dyYXBoeVNlbGVjdGlvblNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignc3BhdGlhbFNlbGVjdGlvblNlcnZpY2UnLCBjYXJ0b2dyYXBoeVNlbGVjdGlvblNlcnZpY2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQ0FSVE9HUkFQSFlfQVBJKSwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7Q2FydG9ncmFwaHl9IGZyb20gJy4vY2FydG9ncmFwaHkubW9kZWwnO1xyXG5pbXBvcnQge1JvbGV9IGZyb20gJy4uL3JvbGUvcm9sZS5tb2RlbCc7XHJcbi8qKlxyXG4gKiBDYXJ0b2dyYXBoeSBncm91cFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5R3JvdXAgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAvKiogbWVtYmVycyovXHJcbiAgcHVibGljIG1lbWJlcnM6IENhcnRvZ3JhcGh5W107XHJcbiAgLyoqIHJvbGVzKi9cclxuICBwdWJsaWMgcm9sZXM6IFJvbGVbXTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHlHcm91cCB9IGZyb20gJy4vY2FydG9ncmFwaHktZ3JvdXAubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBDYXJ0b2dyYXBoeUdyb3VwIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJ0b2dyYXBoeUdyb3VwU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPENhcnRvZ3JhcGh5R3JvdXA+IHtcclxuICBcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENBUlRPR1JBUEhZX0dST1VQX0FQSSA9J2NhcnRvZ3JhcGh5LWdyb3Vwcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5R3JvdXAsIFwiY2FydG9ncmFwaHktZ3JvdXBzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBjYXJ0b2dyYXBoeSBncm91cCovXHJcbiAgcmVtb3ZlKGl0ZW06IENhcnRvZ3JhcGh5R3JvdXApIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBjYXJ0b2dyYXBoeSBncm91cCovXHJcbiAgc2F2ZShpdGVtOiBDYXJ0b2dyYXBoeUdyb3VwKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNBUlRPR1JBUEhZX0dST1VQX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnkgfSBmcm9tICcuLi90ZXJyaXRvcnkvdGVycml0b3J5Lm1vZGVsJztcclxuaW1wb3J0IHsgQ2FydG9ncmFwaHkgfSBmcm9tICcuL2NhcnRvZ3JhcGh5Lm1vZGVsJztcclxuLyoqXHJcbiAqIENhcnRvZ3JhcGh5IGF2YWlsYWJpbGl0eSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5IGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiB0ZXJyaXRvcnkqL1xyXG4gIHB1YmxpYyB0ZXJyaXRvcnk6IFRlcnJpdG9yeTtcclxuICBcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlOiBhbnk7XHJcbiAgXHJcbiAgLyoqIGNhcnRvZ3JhcGh5Ki9cclxuICBwdWJsaWMgY2FydG9ncmFwaHk6IENhcnRvZ3JhcGh5O1xyXG59XHJcbiIsImltcG9ydCB7IENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5IH0gZnJvbSAnLi9jYXJ0b2dyYXBoeS1hdmFpbGFiaWxpdHkubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKSBcclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5U2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5PiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBDQVJUT0dSQVBIWV9BVkFJTEFCSUxJVFlfQVBJID0gJ2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0aWVzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHksIFwiY2FydG9ncmFwaHktYXZhaWxhYmlsaXRpZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGNhcnRvZ3JhcGh5IGF2YWlsYWJpbGl0eSovXHJcbiAgcmVtb3ZlKGl0ZW06IENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgY2FydG9ncmFwaHkgYXZhaWxhYmlsaXR5Ki9cclxuICBzYXZlKGl0ZW06IENhcnRvZ3JhcGh5QXZhaWxhYmlsaXR5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtLmNhcnRvZ3JhcGh5ICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignY2FydG9ncmFwaHknLGl0ZW0uY2FydG9ncmFwaHkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLnRlcnJpdG9yeSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3RlcnJpdG9yeScsaXRlbS50ZXJyaXRvcnkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnRlcnJpdG9yeSA9IGl0ZW0udGVycml0b3J5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIGl0ZW0uY2FydG9ncmFwaHkgPSBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQ0FSVE9HUkFQSFlfQVZBSUxBQklMSVRZX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBUZXJyaXRvcnlUeXBlIH0gZnJvbSAnLi4vdGVycml0b3J5L3RlcnJpdG9yeS10eXBlLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FydG9ncmFwaHkgfSBmcm9tICcuL2NhcnRvZ3JhcGh5Lm1vZGVsJztcclxuLyoqXHJcbiAqIENhcnRvZ3JhcGh5IGF2YWlsYWJpbGl0eSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcnRvZ3JhcGh5RmlsdGVyIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gXHJcbiAgLyoqIG5hbWUqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiByZXF1aXJlZCAqL1xyXG4gIHB1YmxpYyByZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqIHR5cGUqL1xyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUZXJyaXRvcmlhbCBsZXZlbC4gKi9cclxuICBwdWJsaWMgdGVycml0b3JpYWxMZXZlbDogVGVycml0b3J5VHlwZTtcclxuICBcclxuICAvKiogY29sdW1uICovXHJcbiAgcHVibGljIGNvbHVtbjogc3RyaW5nO1xyXG5cclxuICAvKiogdmFsdWVzKi8gIFxyXG4gIHB1YmxpYyB2YWx1ZXM6IHN0cmluZztcclxuXHJcbiAgLyoqIHZhbHVlKi8gIFxyXG4gIHB1YmxpYyB2YWx1ZVR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqIGNhcnRvZ3JhcGh5Ki9cclxuICBwdWJsaWMgY2FydG9ncmFwaHk6IENhcnRvZ3JhcGh5O1xyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHlGaWx0ZXIgfSBmcm9tICcuL2NhcnRvZ3JhcGh5LWZpbHRlci5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIENhcnRvZ3JhcGh5RmlsdGVyIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpIFxyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlGaWx0ZXJTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q2FydG9ncmFwaHlGaWx0ZXI+IHtcclxuICBcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENBUlRPR1JBUEhZX0ZJTFRFUl9BUEkgPSAnY2FydG9ncmFwaHktZmlsdGVycyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5RmlsdGVyLCBcImNhcnRvZ3JhcGh5LWZpbHRlcnNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGNhcnRvZ3JhcGh5IGZpbHRlciovXHJcbiAgcmVtb3ZlKGl0ZW06IENhcnRvZ3JhcGh5RmlsdGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgY2FydG9ncmFwaHkgYXZhaWxhYmlsaXR5Ki9cclxuICBzYXZlKGl0ZW06IENhcnRvZ3JhcGh5RmlsdGVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtLmNhcnRvZ3JhcGh5ICE9bnVsbCl7XHJcbiAgICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbignY2FydG9ncmFwaHknLGl0ZW0uY2FydG9ncmFwaHkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGl0ZW0udGVycml0b3JpYWxMZXZlbCAhPSBudWxsICYmIGl0ZW0udGVycml0b3JpYWxMZXZlbCAhPSB1bmRlZmluZWQgKXtcclxuICAgICAgICBpdGVtLnN1YnN0aXR1dGVSZWxhdGlvbigndGVycml0b3JpYWxMZXZlbCcsaXRlbS50ZXJyaXRvcmlhbExldmVsKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFxyXG4gICAgICBpdGVtLmNhcnRvZ3JhcGh5ID0gaXRlbS5jYXJ0b2dyYXBoeS5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLnRlcnJpdG9yaWFsTGV2ZWw9aXRlbS50ZXJyaXRvcmlhbExldmVsLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNBUlRPR1JBUEhZX0ZJTFRFUl9BUEkpICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS5tb2RlbCc7IFxyXG4vKipcclxuICogU2VydmljZSBwYXJhbWV0ZXIgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDYXJ0b2dyYXBoeVBhcmFtZXRlciBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBcclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIFxyXG4gIC8qKiB2YWx1ZSovICBcclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBcclxuICAvKiogb3JkZXIqLyAgXHJcbiAgcHVibGljIG9yZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBjYXJ0b2dyYXBoeSovXHJcbiAgcHVibGljIGNhcnRvZ3JhcGh5OiBDYXJ0b2dyYXBoeTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FydG9ncmFwaHlQYXJhbWV0ZXIgfSBmcm9tICcuL2NhcnRvZ3JhcGh5LXBhcmFtZXRlci5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFNlcnZpY2UgcGFyYW1ldGVyIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpIFxyXG5leHBvcnQgY2xhc3MgQ2FydG9ncmFwaHlQYXJhbWV0ZXJTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8Q2FydG9ncmFwaHlQYXJhbWV0ZXI+IHtcclxuXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENBUlRPR1JBUEhZX1BBUkFNRVRFUl9BUEkgPSAnY2FydG9ncmFwaHktcGFyYW1ldGVycyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKENhcnRvZ3JhcGh5UGFyYW1ldGVyLCBcImNhcnRvZ3JhcGh5LXBhcmFtZXRlcnNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHNlcnZpY2UgcGFyYW1ldGVyKi9cclxuICByZW1vdmUoaXRlbTogQ2FydG9ncmFwaHlQYXJhbWV0ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGl0ZW0uX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBzZXJ2aWNlIHBhcmFtZXRlciovXHJcbiAgc2F2ZShpdGVtOiBDYXJ0b2dyYXBoeVBhcmFtZXRlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAoaXRlbS5jYXJ0b2dyYXBoeSAhPW51bGwpe1xyXG4gICAgICAgICAgbGV0IGNhcnRvZ3JhcGh5ID0gIGl0ZW0uY2FydG9ncmFwaHk7XHJcbiAgICAgICAgICBkZWxldGUgaXRlbS5jYXJ0b2dyYXBoeTtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdjYXJ0b2dyYXBoeScsY2FydG9ncmFwaHkpLnN1YnNjcmliZShyZXN1bHQgPT4geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uY2FydG9ncmFwaHkgPSBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQ0FSVE9HUkFQSFlfUEFSQU1FVEVSX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXB9IGZyb20gJy4vY2FydG9ncmFwaHktZ3JvdXAubW9kZWwnO1xyXG4vKipcclxuICogQmFja2dyb3VuZCBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBSZXNvdXJjZSB7XHJcbiAgLyoqIGlkICovXHJcbiAgcHVibGljIGlkOiBudW1iZXI7ICBcclxuICBcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIGRlc2NyaXB0aW9uKi9cclxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgLyoqIGltYWdlICovXHJcbiAgcHVibGljIGltYWdlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiB3aGV0aGVyIGJhY2tncm91bmQgaXMgYWN0aXZlKi9cclxuICBwdWJsaWMgYWN0aXZlOiBCb29sZWFuO1xyXG4gIFxyXG4gIC8qKiBzeXN0ZW0gY3JlYXRlZCBkYXRlKi9cclxuICBwdWJsaWMgY3JlYXRlZERhdGU6IGFueTtcclxuXHJcbiAgLyoqIGNhcnRvZ3JhcGh5IGdyb3VwKi9cclxuICBwdWJsaWMgY2FydG9ncmFwaHlHcm91cDogQ2FydG9ncmFwaHlHcm91cDtcclxufVxyXG4iLCJpbXBvcnQgeyBCYWNrZ3JvdW5kIH0gZnJvbSAnLi9iYWNrZ3JvdW5kLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcblxyXG4vKiogQmFja2dyb3VuZCBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZFNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxCYWNrZ3JvdW5kPiB7XHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBCQUNLR1JPVU5EX0FQSSA9ICdiYWNrZ3JvdW5kcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKEJhY2tncm91bmQsIFwiYmFja2dyb3VuZHNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGJhY2tncm91bmQqL1xyXG4gIHJlbW92ZShpdGVtOiBCYWNrZ3JvdW5kKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpOyAgIFxyXG4gIH1cclxuICBcclxuICAvKiogc2F2ZSBiYWNrZ3JvdW5kKi9cclxuICBzYXZlKGl0ZW06IEJhY2tncm91bmQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgbGV0IGJhY2tncm91bmRDYXJ0b2dyYXBoeUdyb3VwOmFueSA9IHt9ICAgICAgICAgXHJcbiAgICBcclxuICAgIGJhY2tncm91bmRDYXJ0b2dyYXBoeUdyb3VwLl9saW5rcz0ge307XHJcbiAgICBiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cC5fbGlua3Muc2VsZiA9IHt9O1xyXG4gICAgYmFja2dyb3VuZENhcnRvZ3JhcGh5R3JvdXAuX2xpbmtzLnNlbGYuaHJlZj1cIlwiO1xyXG4gICAgaXRlbS5jYXJ0b2dyYXBoeUdyb3VwO1xyXG5cclxuICAgIGlmIChpdGVtLmNhcnRvZ3JhcGh5R3JvdXAhPW51bGwpe1xyXG4gICAgICBiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cCA9IGl0ZW0uY2FydG9ncmFwaHlHcm91cDtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0uY2FydG9ncmFwaHlHcm91cC5fbGlua3MhPSAndW5kZWZpbmVkJykgeyBcclxuICAgICAgICAgICAgaXRlbS5jYXJ0b2dyYXBoeUdyb3VwID0gaXRlbS5jYXJ0b2dyYXBoeUdyb3VwLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgICAgfSAgICBcclxuICAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5jYXJ0b2dyYXBoeUdyb3VwOyAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAoYmFja2dyb3VuZENhcnRvZ3JhcGh5R3JvdXAuX2xpbmtzLnNlbGYuaHJlZj09Jycpe1xyXG4gICAgICAgICBpdGVtLmRlbGV0ZVJlbGF0aW9uKCdjYXJ0b2dyYXBoeUdyb3VwJyxiYWNrZ3JvdW5kQ2FydG9ncmFwaHlHcm91cCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7ICAgICBcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2NhcnRvZ3JhcGh5R3JvdXAnLGJhY2tncm91bmRDYXJ0b2dyYXBoeUdyb3VwKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgXHJcblxyXG4gICAgICBcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpOyAgICAgICAgICAgXHJcbiAgICAgICB9IFxyXG4gICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5CQUNLR1JPVU5EX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7Um9sZX0gZnJvbSAnLi4vcm9sZS9yb2xlLm1vZGVsJzsgICAgXHJcbi8qKlxyXG4gKiBUcmVlIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIGRlc2NyaXB0aW9uICovXHJcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgLyoqIGltYWdlICovXHJcbiAgcHVibGljIGltYWdlOiBzdHJpbmc7XHJcbiAgLyoqIG5vZGVzICovXHJcbiAgcHVibGljIG5vZGVzOiBUcmVlTm9kZVtdO1xyXG4gIC8qKiBhdmFpbGFibGUgcm9sZXMgKi9cclxuICBwdWJsaWMgYXZhaWxhYmxlUm9sZXMgOiBSb2xlW107XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFRyZWUgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBUcmVlIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUcmVlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRyZWU+IHtcclxuICBcclxuICAvKiogQVBJIHJlc291cmNlIHBhdGggKi9cclxuICBwdWJsaWMgVFJFRV9BUEkgPSAndHJlZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihUcmVlLCBcInRyZWVzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSB0cmVlKi9cclxuICByZW1vdmUoaXRlbTogVHJlZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIHRyZWUqL1xyXG4gIHNhdmUoaXRlbTogVHJlZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgICBpZiAoaXRlbS5fbGlua3MhPW51bGwpIHtcclxuICAgICAgXHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuVFJFRV9BUEkpICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeX0gZnJvbSAnLi4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHkubW9kZWwnO1xyXG5pbXBvcnQge1RyZWV9IGZyb20gJy4vdHJlZS5tb2RlbCc7XHJcbi8qKlxyXG4gKiBUcmVlIG5vZGUgbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogbmFtZSAqL1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgLyoqIHRvb2x0aXAqL1xyXG4gIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XHJcbiAgLyoqIGRlc2NyaXB0aW9uKi9cclxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAvKiogZGF0YXNldFVSTCovXHJcbiAgcHVibGljIGRhdGFzZXRVUkw6IHN0cmluZztcclxuICAvKiogbWV0YWRhdGFVUkwqL1xyXG4gIHB1YmxpYyBtZXRhZGF0YVVSTDogc3RyaW5nO1xyXG4gIC8qKiBvcmRlciovXHJcbiAgcHVibGljIG9yZGVyIDogbnVtYmVyO1xyXG4gIC8qKiB3aGV0aGVyIHRyZWUgbm9kZSBpcyBhY3RpdmUqL1xyXG4gIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcbiAgLyoqIHBhcmVudCB0cmVlIG5vZGUgKi9cclxuICBwdWJsaWMgcmFkaW86IGJvb2xlYW47XHJcbiAgLyoqIHBhcmVudCB0cmVlIG5vZGUgKi9cclxuICBwdWJsaWMgcGFyZW50OiBUcmVlTm9kZTtcclxuICAvKiogZGlzcGxheWVkIGNhcnRvZ3JhcGh5ICovICBcclxuICBwdWJsaWMgY2FydG9ncmFwaHk6IENhcnRvZ3JhcGh5O1xyXG4gIC8qKiB0cmVlICovICBcclxuICBwdWJsaWMgdHJlZTogVHJlZTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIFRyZWUgbm9kZSBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKSBcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPFRyZWVOb2RlPiB7XHJcbiAgXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIFRSRUVfTk9ERV9BUEkgPSAndHJlZS1ub2Rlcyc7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcixwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKFRyZWVOb2RlLCBcInRyZWUtbm9kZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIHRyZWUgbm9kZSovXHJcbiAgcmVtb3ZlKGl0ZW06IFRyZWVOb2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgdHJlZSBub2RlKi9cclxuICBzYXZlKGl0ZW06IFRyZWVOb2RlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICAgIGlmIChpdGVtLl9saW5rcyE9bnVsbCkge1xyXG4gICAgICBjb25zdCBpdGVtVHJlZSA9IGl0ZW0udHJlZTtcclxuICAgICAgY29uc3QgaXRlbUNhcnRvZ3JhcGh5ID0gaXRlbS5jYXJ0b2dyYXBoeTtcclxuICAgICAgY29uc3QgaXRlbVBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgIFxyXG4gICAgICBkZWxldGUgaXRlbS50cmVlO1xyXG4gICAgICBkZWxldGUgaXRlbS5jYXJ0b2dyYXBoeTtcclxuICAgICAgZGVsZXRlIGl0ZW0ucGFyZW50O1xyXG4gICAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtVHJlZSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3RyZWUnLGl0ZW1UcmVlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgXHJcbiAgICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1DYXJ0b2dyYXBoeSAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2NhcnRvZ3JhcGh5JyxpdGVtQ2FydG9ncmFwaHkpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBcclxuICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbVBhcmVudCAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3BhcmVudCcsaXRlbVBhcmVudCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgICBsZXQgdHJlZU5vZGVQYXJlbnQ6YW55ID0ge307XHJcbiAgICAgICAgICB0cmVlTm9kZVBhcmVudC5fbGlua3M9IHt9O1xyXG4gICAgICAgICAgdHJlZU5vZGVQYXJlbnQuX2xpbmtzLnNlbGYgPSB7fTtcclxuICAgICAgICAgIHRyZWVOb2RlUGFyZW50Ll9saW5rcy5zZWxmLmhyZWY9XCJcIjtcclxuICAgICAgICAgIGl0ZW0uZGVsZXRlUmVsYXRpb24oJ3BhcmVudCcsIHRyZWVOb2RlUGFyZW50KS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXRlbS50cmVlICYmIGl0ZW0udHJlZS5fbGlua3MgJiYgaXRlbS50cmVlLl9saW5rcy5zZWxmKSB7XHJcbiAgICAgICAgaXRlbS50cmVlID0gaXRlbS50cmVlLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW0uY2FydG9ncmFwaHkgJiYgaXRlbS5jYXJ0b2dyYXBoeS5fbGlua3MgJiYgaXRlbS5jYXJ0b2dyYXBoeS5fbGlua3Muc2VsZikge1xyXG4gICAgICAgIGl0ZW0uY2FydG9ncmFwaHkgPSBpdGVtLmNhcnRvZ3JhcGh5Ll9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgIH0gICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5UUkVFX05PREVfQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXNvdXJjZSc7XHJcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi4vdHJlZS90cmVlLm1vZGVsJztcclxuaW1wb3J0IHtSb2xlfSBmcm9tICcuLi9yb2xlL3JvbGUubW9kZWwnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXB9IGZyb20gJy4uL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLm1vZGVsJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvblBhcmFtZXRlcn0gZnJvbSAnLi9hcHBsaWNhdGlvbi1wYXJhbWV0ZXIubW9kZWwnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uQmFja2dyb3VuZH0gZnJvbSAnLi9hcHBsaWNhdGlvbi1iYWNrZ3JvdW5kLm1vZGVsJztcclxuXHJcbi8vRklYTUUgZW5zdXJlIGFwcGxpY2F0aW9uIGNyZWF0aW9uIGluIGFkbWluIGFwcCB1cG9uIGluaXRpYWxpemF0aW9uIChhcyBpdCBpcyBkb25lIHdpdGggUm9sZXMgYW5kIGRlZmF1bHQgVXNlcnMpXHJcbi8qKiBUZXJyaXRvcmlhbCBhcHBsaWN0aW9uIG5hbWUgKi9cclxuZXhwb3J0IGNvbnN0IFRFUlJJVE9SSUFMX0FQUF9OQU1FOnN0cmluZyAgPSBcIkFwbGljYWNpw7NuIFRlcnJpdG9yaWFsXCI7XHJcblxyXG4vKipcclxuICogQXBwbGljYXRpb24gbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjsgIFxyXG4gIFxyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogdHlwZSovXHJcbiAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICBcclxuICAvKiogdGl0bGUqL1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0aGVtZSovXHJcbiAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcblxyXG4gICAgXHJcbiAgLyoqIHVybFRlbXBsYXRlKi9cclxuICBwdWJsaWMganNwVGVtcGxhdGU6IHN0cmluZztcclxuICBcclxuICBcclxuICAvKiogc3lzdGVtIGNyZWF0ZWQgZGF0ZSovXHJcbiAgcHVibGljIGNyZWF0ZWREYXRlOiBhbnk7XHJcbiAgXHJcbiAgLyoqIGF2YWlsYWJsZSByb2xlcyovXHJcbiAgcHVibGljIGF2YWlsYWJsZVJvbGVzIDogUm9sZVtdO1xyXG4gIFxyXG4gIC8qKiB0cmVlcyovXHJcbiAgcHVibGljIHRyZWVzIDogVHJlZVtdO1xyXG4gIFxyXG4gIC8qKiBzY2FsZXMgKGNvbW1hLXNlcGFyYXRlZCB2YWx1ZXMpKi9cclxuICBwdWJsaWMgc2NhbGVzOiBzdHJpbmdbXTtcclxuICBcclxuICAvKiogcHJvamVjdGlvbnMoY29tbWEtc2VwYXJhdGVkIEVQU0cgY29kZXMpKi9cclxuICBwdWJsaWMgc3JzOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIHdoZXRoZXIgYXBwbGljYXRpb24gdHJlZSB3aWxsIGF1dG8gcmVmcmVzaCovICBcclxuICBwdWJsaWMgdHJlZUF1dG9SZWZyZXNoOiBCb29sZWFuO1xyXG5cclxuICAvKiogYmFja2dyb3VuZHMqL1xyXG4gIHB1YmxpYyBiYWNrZ3JvdW5kczogQXBwbGljYXRpb25CYWNrZ3JvdW5kW107XHJcblxyXG4gIC8qKiBzaXR1YXRpb24gbWFwKi9cclxuICBwdWJsaWMgc2l0dWF0aW9uTWFwOiBDYXJ0b2dyYXBoeUdyb3VwOyAgICBcclxuICBcclxuICAvKiogcGFyYW1ldGVycyovXHJcbiAgcHVibGljIHBhcmFtZXRlcnM6IEFwcGxpY2F0aW9uUGFyYW1ldGVyW107XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuL2FwcGxpY2F0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IENhcnRvZ3JhcGh5R3JvdXAgfSBmcm9tICcuLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1ncm91cC5tb2RlbCc7XHJcblxyXG4vKiogQXBwbGljYXRpb24gbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPEFwcGxpY2F0aW9uPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUFBMSUNBVElPTl9BUEkgPSAnYXBwbGljYXRpb25zJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQXBwbGljYXRpb24sIFwiYXBwbGljYXRpb25zXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBhcHBsaWNhdGlvbiovXHJcbiAgcmVtb3ZlKGl0ZW06IEFwcGxpY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgYXBwbGljYXRpb24qL1xyXG4gIHNhdmUoaXRlbTogQXBwbGljYXRpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG5cclxuICAgIGxldCBhcHBsaWNhdGlvblNpdHVhdGlvbk1hcDphbnkgPSB7fTtcclxuICAgIGFwcGxpY2F0aW9uU2l0dWF0aW9uTWFwLl9saW5rcz0ge307XHJcbiAgICBhcHBsaWNhdGlvblNpdHVhdGlvbk1hcC5fbGlua3Muc2VsZiA9IHt9O1xyXG4gICAgYXBwbGljYXRpb25TaXR1YXRpb25NYXAuX2xpbmtzLnNlbGYuaHJlZj1cIlwiO1xyXG4gICAgIFxyXG4gICAgaWYgKGl0ZW0uc2l0dWF0aW9uTWFwIT1udWxsKXtcclxuICAgICAgICBhcHBsaWNhdGlvblNpdHVhdGlvbk1hcD1pdGVtLnNpdHVhdGlvbk1hcDtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0uc2l0dWF0aW9uTWFwLl9saW5rcyE9ICd1bmRlZmluZWQnKSB7IFxyXG4gICAgICAgICAgICBpdGVtLnNpdHVhdGlvbk1hcCA9IGl0ZW0uc2l0dWF0aW9uTWFwLl9saW5rcy5zZWxmLmhyZWY7XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIC8vdXBkYXRlIHJlbGF0aW9uc1xyXG4gICAgICBkZWxldGUgaXRlbS5zaXR1YXRpb25NYXA7ICAgICAgICBcclxuICAgICAgXHJcbiAgICAgIGlmIChhcHBsaWNhdGlvblNpdHVhdGlvbk1hcC5fbGlua3Muc2VsZi5ocmVmPT0nJyl7XHJcbiAgICAgICAgIGl0ZW0uZGVsZXRlUmVsYXRpb24oJ3NpdHVhdGlvbk1hcCcsYXBwbGljYXRpb25TaXR1YXRpb25NYXApLnN1YnNjcmliZShyZXN1bHQgPT4geyAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ3NpdHVhdGlvbk1hcCcsYXBwbGljYXRpb25TaXR1YXRpb25NYXApLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTsgICAgICAgICAgIFxyXG4gICAgICAgfSBcclxuICAgICAgIFxyXG4gICAgICAgICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnB1dChpdGVtLl9saW5rcy5zZWxmLmhyZWYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wb3N0KHRoaXMucmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlVXJsKHRoaXMuQVBQTElDQVRJT05fQVBJKSAsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgICBcclxuICAgIFxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0JhY2tncm91bmR9IGZyb20gJy4uL2NhcnRvZ3JhcGh5L2JhY2tncm91bmQubW9kZWwnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICcuL2FwcGxpY2F0aW9uLm1vZGVsJzsgXHJcblxyXG4vKipcclxuICogQXBwbGljYXRpb24gYmFja2dyb3VuZCBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uQmFja2dyb3VuZCBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogb3JkZXIqL1xyXG4gIHB1YmxpYyBvcmRlcjogTnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBiYWNrZ3JvdW5kKi9cclxuICBwdWJsaWMgYmFja2dyb3VuZDogQmFja2dyb3VuZDtcclxuICBcclxuICAvKiogYXBwbGljYXRpb24qL1xyXG4gIHB1YmxpYyBhcHBsaWNhdGlvbjogQXBwbGljYXRpb247XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uQmFja2dyb3VuZCB9IGZyb20gJy4vYXBwbGljYXRpb24tYmFja2dyb3VuZC5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIEFwcGxpY2F0aW9uIGJhY2tncm91bmQgbWFuYWdlciBzZXJ2aWNlICovXHJcbkBJbmplY3RhYmxlKCkgXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkJhY2tncm91bmRTZXJ2aWNlIGV4dGVuZHMgUmVzdFNlcnZpY2U8QXBwbGljYXRpb25CYWNrZ3JvdW5kPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUFBMSUNBVElPTl9CQUNLR1JPVU5EX0FQSSA9J2FwcGxpY2F0aW9uLWJhY2tncm91bmRzJztcclxuXHJcbiAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgc3VwZXIoQXBwbGljYXRpb25CYWNrZ3JvdW5kLCBcImFwcGxpY2F0aW9uLWJhY2tncm91bmRzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBhcHBsaWNhdGlvbiBiYWNrZ3JvdW5kKi9cclxuICByZW1vdmUoaXRlbTogQXBwbGljYXRpb25CYWNrZ3JvdW5kKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgYXBwbGljYXRpb24gYmFja2dyb3VuZCovXHJcbiAgc2F2ZShpdGVtOiBBcHBsaWNhdGlvbkJhY2tncm91bmQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgICAgaWYgKGl0ZW0uYXBwbGljYXRpb24gIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdhcHBsaWNhdGlvbicsaXRlbS5hcHBsaWNhdGlvbikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW0uYmFja2dyb3VuZCAhPW51bGwpe1xyXG4gICAgICAgICAgaXRlbS5zdWJzdGl0dXRlUmVsYXRpb24oJ2JhY2tncm91bmQnLGl0ZW0uYmFja2dyb3VuZCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLmFwcGxpY2F0aW9uID0gaXRlbS5hcHBsaWNhdGlvbi5fbGlua3Muc2VsZi5ocmVmO1xyXG4gICAgICBpdGVtLmJhY2tncm91bmQgPSBpdGVtLmJhY2tncm91bmQuX2xpbmtzLnNlbGYuaHJlZjtcclxuICBcclxuICAgICAgcmVzdWx0ID0gdGhpcy5odHRwLnBvc3QodGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VVcmwodGhpcy5BUFBMSUNBVElPTl9CQUNLR1JPVU5EX0FQSSkgLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzb3VyY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICcuL2FwcGxpY2F0aW9uLm1vZGVsJzsgXHJcblxyXG4vKipcclxuICogQXBwbGljYXRpb24gcGFyYW1ldGVyIG1vZGVsIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uUGFyYW1ldGVyIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gIC8qKiBuYW1lKi9cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiB2YWx1ZSovICAgIFxyXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBhcHBsaWNhdGlvbiovXHJcbiAgcHVibGljIGFwcGxpY2F0aW9uOiBBcHBsaWNhdGlvbjtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb25QYXJhbWV0ZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9uLXBhcmFtZXRlci5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSAnLi4vYW5ndWxhci1oYWwvc3JjL2xpYi9yZXN0LnNlcnZpY2UnO1xyXG5cclxuLyoqIEFwcGxpY2F0aW9uIHBhcmFtZXRlciBtYW5hZ2VyIHNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKSBcclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uUGFyYW1ldGVyU2VydmljZSBleHRlbmRzIFJlc3RTZXJ2aWNlPEFwcGxpY2F0aW9uUGFyYW1ldGVyPiB7XHJcbiAgXHJcblxyXG4gIC8qKiBBUEkgcmVzb3VyY2UgcGF0aCAqL1xyXG4gIHB1YmxpYyBBUFBMSUNBVElPTl9QQVJBTUVURVJfQVBJID0gJ2FwcGxpY2F0aW9uLXBhcmFtZXRlcnMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihBcHBsaWNhdGlvblBhcmFtZXRlciwgXCJhcHBsaWNhdGlvbi1wYXJhbWV0ZXJzXCIsIGluamVjdG9yKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqIHJlbW92ZSBhcHBsaWNhdGlvbiovXHJcbiAgcmVtb3ZlKGl0ZW06IEFwcGxpY2F0aW9uUGFyYW1ldGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShpdGVtLl9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLyoqIHNhdmUgYXBwbGljYXRpb24qL1xyXG4gIHNhdmUoaXRlbTogQXBwbGljYXRpb25QYXJhbWV0ZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuaHR0cC5wdXQoaXRlbS5fbGlua3Muc2VsZi5ocmVmLCBpdGVtKTtcclxuICAgICAgaWYgKGl0ZW0uYXBwbGljYXRpb24gIT1udWxsKXtcclxuICAgICAgICAgIGl0ZW0uc3Vic3RpdHV0ZVJlbGF0aW9uKCdhcHBsaWNhdGlvbicsaXRlbS5hcHBsaWNhdGlvbikuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLmFwcGxpY2F0aW9uID0gaXRlbS5hcHBsaWNhdGlvbi5fbGlua3Muc2VsZi5ocmVmO1xyXG4gIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkFQUExJQ0FUSU9OX1BBUkFNRVRFUl9BUEkpICwgaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBcclxufVxyXG4iLCJpbXBvcnQge1Jlc291cmNlfSBmcm9tICcuLi9hbmd1bGFyLWhhbC9zcmMvbGliL3Jlc291cmNlJztcclxuLyoqXHJcbiAqIENvbm5lY3Rpb24gbW9kZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2RlTGlzdCBleHRlbmRzIFJlc291cmNlIHtcclxuICAvKiogaWQgKi9cclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAvKiogbmFtZSovXHJcbiAgcHVibGljIGNvZGVMaXN0TmFtZTogc3RyaW5nO1xyXG4gIC8qKiB0eXBlKi9cclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICAvKiogdXNlciovXHJcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb2RlTGlzdCB9IGZyb20gJy4vY29kZWxpc3QubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4uL2FuZ3VsYXItaGFsL3NyYy9saWIvcmVzdC5zZXJ2aWNlJztcclxuXHJcbi8qKiBDb25uZWN0aW9uIG1hbmFnZXIgc2VydmljZSAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb2RlTGlzdFNlcnZpY2UgZXh0ZW5kcyBSZXN0U2VydmljZTxDb2RlTGlzdD4ge1xyXG4gIFxyXG4gXHJcbiAgLyoqIEFQSSByZXNvdXJjZSBwYXRoICovXHJcbiAgcHVibGljIENPREVMSVNUX0FQSSA9ICdjb2RlbGlzdC12YWx1ZXMnO1xyXG5cclxuICAvKiogY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICBzdXBlcihDb2RlTGlzdCwgXCJjb2RlbGlzdC12YWx1ZXNcIiwgaW5qZWN0b3IpO1xyXG4gIH1cclxuICBcclxuICAvKiogcmVtb3ZlIGNvbm5lY3Rpb24qL1xyXG4gIHJlbW92ZShpdGVtOiBDb2RlTGlzdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoaXRlbS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzYXZlIGNvbm5lY3Rpb24qL1xyXG4gIHNhdmUoaXRlbTogQ29kZUxpc3QpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gICAgaWYgKGl0ZW0uX2xpbmtzIT1udWxsKSB7XHJcbiAgICAgIFxyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucHV0KGl0ZW0uX2xpbmtzLnNlbGYuaHJlZiwgaXRlbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSB0aGlzLmh0dHAucG9zdCh0aGlzLnJlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZVVybCh0aGlzLkNPREVMSVNUX0FQSSApLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqIExheWVyIG1vZGVsOiBjb25maWd1cmUgTGF5ZXIgZGF0YSBhbmQgZGlzcGxheWluZyBjb25maWd1cmF0aW9uICovIFxyXG5leHBvcnQgY2xhc3MgTGF5ZXIge1xyXG4gIC8vIERpc3BsYXkgZGF0YVxyXG4gIC8qKiBsYXllciB2aXNpYmlsaXR5Ki8gIFxyXG4gIHZpc2liaWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKiogVHJhbnNwYXJlbmN5IChUcmFuc3BhcmVudCkgMC0xIChPcGFxdWUpKi9cclxuICBvcGFjaXR5OiBudW1iZXIgPSAxLjA7XHJcblxyXG4gIC8vIENvbmZpZ3VyYXRpb24gZGF0YVxyXG4gIC8qKiB0aXRsZSovXHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBcclxuICAvKiogSWQgdG8gaW5kZXgqL1xyXG4gIGlkOiBhbnk7XHJcbiAgXHJcbiAgLyoqIFNlcnZpY2UgTmFtZSovXHJcbiAgc2VydmVyTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogU2VydmljZSBhdHRyaWJ1dGlvbnMqL1xyXG4gIGF0dHJpYnV0aW9uczogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgLyoqIFJlcXVlc3QgZm9ybWF0IChpbWFnZS9qcGcsIC4uLikqL1xyXG4gIGZvcm1hdDogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBSZXF1ZXN0IHNlcnZpY2UgdmVyc2lvbiovXHJcbiAgdmVyc2lvbjpzdHJpbmc7XHJcblxyXG4gIC8qKiBTZXJ2aWNlIHVybCovXHJcbiAgdXJsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBJcyBiYXNlIGxheWVyPyovXHJcbiAgaXNCYXNlTGF5ZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBSZXF1ZXN0IGxheWVyIG5hbWUqL1xyXG4gIG5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIElzIHRpbGVkPyovXHJcbiAgdGlsZWQ6IGJvb2xlYW47XHJcbiAgXHJcbiAgLyoqIERlc2NyaXB0aW9uKi9cclxuICBkZXNjOiBzdHJpbmcgPSBcIlwiO1xyXG4gIFxyXG4gIC8qKiAgVHJhbnNwYXJlbnQgcmVxdWVzdCBwYXJhbWV0ZXI/Ki9cclxuICB1cmxfdHJhbnNwYXJlbnQ6IHN0cmluZyA9IFwidHJ1ZVwiO1xyXG4gIFxyXG4gIC8qKiBSZXF1ZXN0IEJhY2tncm91bmQgcGFyYW1ldGVyIGNvbG9yIChIZXhhKSovXHJcbiAgdXJsX2JnY29sb3I6IHN0cmluZyA9IFwiMHgwMDAwMDBcIjtcclxuICBcclxuICAvKiogUmVxdWVzdCBFeGNlcHRpb24gVVJMKi9cclxuICB1cmxfZXhjZXB0aW9uOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIEV4dGVudCBmb3IgdGlsZWQgc2VydmljZXMqL1xyXG4gIGV4dGVudDogYW55ID0gbnVsbDtcclxuXHJcbiAgLyoqIFRpbGUgaGVpZ2h0IChpZiBub3QgZGVmaW5lZCwgdGhlIGRlZmF1bHQgbWFwIGlzIHRha2VuKSovXHJcbiAgdGlsZUhlaWdodD86bnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBUaWxlIHdpZHRoIChpZiBub3QgZGVmaW5lZCwgdGhlIGRlZmF1bHQgbWFwIGlzIHRha2VuKSovXHJcbiAgdGlsZVdpZHRoPzpudW1iZXI7XHJcbiAgXHJcbiAgLyoqIEVuYWJsZWQgZm9yIEdldEZlYXR1cmVJbmZvIHJlcXVlc3RzIChlbmFibGVkIHRvIHVzZSB0aGUgdmlld2VyIGZlYXR1cmVzIGluZm9ybWF0aW9uIHRvb2wpKi9cclxuICBxdWVyeWFibGU/OmJvb2xlYW4gPSBmYWxzZTtcclxuICBcclxuICAvKiogTWluaW11bSBzY2FsZSovXHJcbiAgbWluaW11bVNjYWxlPzpudW1iZXI7XHJcbiAgXHJcbiAgLyoqIE1heGltdW0gc2NhbGUqL1xyXG4gIG1heGltdW1TY2FsZT86bnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBMaXN0IG9mIGF2YWlsYWJsZSBDUlMqL1xyXG4gIHByb2plY3Rpb25zPzpzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIEZlYXR1cmVzIGluZm9ybWF0aW9uIFVSTCovXHJcbiAgaW5mb1VybD86c3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBNZXRhZGF0YSBpbmZvcm1hdGlvbiBVUkwqL1xyXG4gIG1ldGFkYXRhVXJsPzpzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIExlZ2VuZCBVUkwqL1xyXG4gIGxlZ2VuZFVybD86c3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBBcnJheSBvZiBPcHRpb25hbFBhcmFtZXRlciBvYmplY3QgdGhhdCBkZWZpbmVzIG90aGVyIG9wdGlvbmFsIHBhcmFtZXRlci12YWx1ZSBwYWlycyBmb3IgdGhlIHJlcXVlc3QgKFRJTUUgLi4uKSovXHJcbiAgb3B0aW9uYWxQYXJhbWV0ZXJzPzpBcnJheTxPcHRpb25hbFBhcmFtZXRlcj47XHJcbn1cclxuXHJcbi8qKiBPcHRpb25hbCBwYXJhbWV0ZXIgbW9kZWw6IGNvbmZpZ3VyZSBwYXJhbWV0ZXItdmFsdWUgcGFpciB0byBhZGQgdG8gdGhlIHJlcXVlc3QgbGF5ZXIgVVJMICovXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25hbFBhcmFtZXRlciB7XHJcbiAgLyoqIGtleSova2V5OnN0cmluZztcclxuICAvKiogdmFsdWUqL3ZhbHVlOnN0cmluZztcclxufVxyXG5cclxuLyoqIExheWVyIGNvbmZpZ3VyYXRpb24gbW9kZWw6IG1vZGlmeSB0aGUgY29uZmlndXJhdGlvbiBvZiBhIGxheWVyIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgbWFwIChtYWtlIHZpc2libGUsIG1vdmUgdGhlIGxheWVyIC4uLikgKi9cclxuZXhwb3J0IGNsYXNzIExheWVyQ29uZmlndXJhdGlvbiB7XHJcbiAgLyoqIElkZW50aWZpZXIgdG8gaW5kZXgqL2lkOiBhbnk7XHJcbiAgLyoqIExheWVyIHZpc2liaWxpdHkqL3Zpc2liaWxpdHk6IGJvb2xlYW47XHJcbiAgLyoqIExheWVyIHRyYW5zcGFyZW5jeSAoVHJhbnNwYXJlbnQpIDAtMSAoT3BhcXVlKSovb3BhY2l0eTogbnVtYmVyO1xyXG4gIC8qKiBMYXllciBwb3NpdGlvbiovcG9zaXRpb246IG51bWJlcjtcclxufVxyXG5cclxuLyoqIExheWVyIGdyb3VwIG1vZGVsKi9cclxuZXhwb3J0IGNsYXNzIExheWVyR3JvdXAge1xyXG4gIC8qKiBpbml0aWFsbHkgYWN0aXZhdGVkIChhbGwgdmlzaWJsZSBsYXllcnMpKi9hY3RpdmU/OmJvb2xlYW47XHJcbiAgLyoqIGdyb3VwIG5hbWUqL25hbWU/OiBTdHJpbmc7XHJcbiAgLyoqIGdyb3VwIGlkKi9pZDogU3RyaW5nO1xyXG4gIC8qKiBhcnJheSBvZiBjaGlsZCBMYXllcnMqL2xheWVyczogQXJyYXk8TGF5ZXI+O1xyXG59XHJcblxyXG4vKiogTWFwIG9wdGlvbnMgY29uZmlndXJhdGlvbiBtb2RlbCovXHJcbmV4cG9ydCBjbGFzcyBNYXBPcHRpb25zQ29uZmlndXJhdGlvbiB7XHJcbiAgLyoqIHNjYWxlcyovc2NhbGVzPzogc3RyaW5nO1xyXG4gIC8qKiBwcm9qZWN0aW9ucyovcHJvamVjdGlvbnM/OiBzdHJpbmc7XHJcbiAgLyoqIG1pbmltdW0gc2NhbGUqL21pblNjYWxlPzpudW1iZXI7XHJcbiAgLyoqIG1heGltdW0gc2NhbGUqL21heFNjYWxlPzpudW1iZXI7XHJcbiAgLyoqIGV4dGVudCovZXh0ZW50Pzphbnk7XHJcbiAgLyoqIG1heGltdW0gZXh0ZW50Ki9tYXhFeHRlbnQ/OmFueTtcclxuICAvKiogdGlsZSB3aWR0aCovdGlsZVdpZHRoPzpudW1iZXI7XHJcbiAgLyoqIHRpbGUgaGVpZ2h0Ki90aWxlSGVpZ2h0PzpudW1iZXI7XHJcbiAgLyoqIHBhcmFtZXRlcnMqL3BhcmFtZXRlcnM/OiBBcnJheTxPcHRpb25hbFBhcmFtZXRlcj5cclxufVxyXG5cclxuLyoqIE1hcCBjb21wb25lbnQgc3RhdHVzIG1vZGVsKi9cclxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudFN0YXR1cyB7XHJcbiAgICAvKiogbG9hZGVkPyovbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuXHJcbi8qKiBNYXAgY29uZmlndXJhdGlvbiBtYW5hZ2VyIHNlcnZpY2UqL1xyXG5leHBvcnQgY2xhc3MgTWFwQ29uZmlndXJhdGlvbk1hbmFnZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIGxheWVyc1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICBwcml2YXRlIGxheWVyczogQXJyYXk8TGF5ZXI+ID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBiYXNlTGF5ZXJHcm91cHNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgcHJpdmF0ZSBiYXNlTGF5ZXJHcm91cHM6IEFycmF5PExheWVyR3JvdXA+ID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBsYXllckNvbmZpZ3VyYXRpb25TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIHByaXZhdGUgYWRkTGF5ZXJzU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBwcml2YXRlIHNpdHVhdGlvbk1hcENvbmZpZ3VyYXRpb25TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgcHJpdmF0ZSBtYXBPcHRpb25zQ29uZmlndXJhdGlvblN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgcHJpdmF0ZSBtYXBDb21wb25lbnRTdGF0dXNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIC8qKiBjb25zdHJ1Y3RvciovXHJcbiAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAvL1xyXG4gIH1cclxuICBcclxuICAvKiogbGF5ZXIgY291bnQgKi9cclxuICBjb3VudCA9IDA7XHJcblxyXG4gIC8qKiBjb25maWd1cmUgdGhlIG92ZXJsYXkgbGF5ZXJzIG9mIHRoZSBtYXAsIGJ5IHBhc3NpbmcgYXMgYSBwYXJhbWV0ZXIgYW4gYXJyYXkgb2Ygb2JqZWN0cyBvZiB0eXBlIExheWVyIG9iamVjdHMgZGVmaW5pbmcgdGhlIGxheWVycyB0byBsb2FkLiovXHJcbiAgbG9hZExheWVyc0NvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5jbGVhckxheWVycyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldExheWVycyhjb25maWd1cmF0aW9uKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqY29uZmlndXJlIHRoZSBiYXNlIGxheWVycyBvZiB0aGUgbWFwIGJ5IHBhc3NpbmcgYXMgYSBwYXJhbWV0ZXIgYW4gYXJyYXkgb2Ygb2JqZWN0cyBvZiB0eXBlIExheWVyR3JvdXAgZWFjaCBvZiB0aGVtIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgTGF5ZXIgb2JqZWN0cyBkZWZpbmluZyB0aGUgbGF5ZXJzIHRvIGxvYWQuKi9cclxuICBsb2FkQmFzZUxheWVyc0NvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbikge1xyXG4gICAgdGhpcy5zZXRCYXNlTGF5ZXJHcm91cHMoY29uZmlndXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKiogZ2V0IGJhc2UgbGF5ZXIgZ3JvdXBzKi9cclxuICBnZXRCYXNlTGF5ZXJHcm91cHMoKTogT2JzZXJ2YWJsZTxMYXllckdyb3VwW10+IHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VMYXllckdyb3Vwc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogc2V0IGJhc2UgbGF5ZXIgZ3JvdXBzKi9cclxuICBzZXRCYXNlTGF5ZXJHcm91cHMoZ3JvdXBzOkFycmF5PExheWVyR3JvdXA+KSB7XHJcbiAgICB0aGlzLmJhc2VMYXllckdyb3VwcyA9IGdyb3VwcztcclxuICAgIHRoaXMucmVmcmVzaEJhc2VMYXllckdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoQmFzZUxheWVyR3JvdXBzKCkge1xyXG4gICAgLy8gU2VuZCB0aGUgbmV3IHZhbHVlcyBzbyB0aGF0IGFsbCBzdWJzY3JpYmVycyBhcmUgdXBkYXRlZFxyXG4gICAgdGhpcy5iYXNlTGF5ZXJHcm91cHNTdWJqZWN0Lm5leHQodGhpcy5iYXNlTGF5ZXJHcm91cHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqIGdldCBsYXllcnMqL1xyXG4gIGdldExheWVycygpOiBPYnNlcnZhYmxlPExheWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogcmVtb3ZlIGFsbCBsYXllcnMgZnJvbSBtYXAqL1xyXG4gIGNsZWFyTGF5ZXJzKHJlZnJlc2g6Ym9vbGVhbikge1xyXG4gICAgd2hpbGUodGhpcy5sYXllcnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoTGF5ZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogc2V0IGxheWVycyovXHJcbiAgc2V0TGF5ZXJzKGxheWVyczpBcnJheTxMYXllcj4pIHtcclxuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgdGhpcy5yZWZyZXNoTGF5ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKiogYWRkIGdpdmVuIGxheWVyIHRvIG1hcCovXHJcbiAgYWRkTGF5ZXIobGF5ZXI6TGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG4gICAgdGhpcy5yZWZyZXNoQWRkTGF5ZXJzKGxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKiBhZGQgZ2l2ZW4gbGF5ZXIgdG8gbWFwIGF0IGdpdmVuIGluZGV4Ki9cclxuICBhZGRMYXllckF0KGxheWVyOkxheWVyLCBpbmRleDpudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzID0gW2xheWVyXS5jb25jYXQodGhpcy5sYXllcnMpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA+PSB0aGlzLmxheWVycy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxheWVycyA9IHRoaXMubGF5ZXJzLnNsaWNlKDAsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoW2xheWVyXSlcclxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLnNsaWNlKGluZGV4LCB0aGlzLmxheWVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaEFkZExheWVycyhsYXllcik7XHJcbiAgICB0aGlzLnJlZnJlc2hMYXllckNvbmZpZ3VyYXRpb24obGF5ZXIuaWQsIG51bGwsIG51bGwsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKiByZW1vdmUgZ2l2ZW4gbGF5ZXIgZnJvbSBtYXAqL1xyXG4gIHJlbW92ZUxheWVyKGxheWVyOkxheWVyKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmxheWVycy5pbmRleE9mKGxheWVyKTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJJbmRleChpbmRleCk7XHJcbiAgfVxyXG5cclxuICAvKiogcmVtb3ZlIGxheWVyIHdpdGggZ2l2ZW4gaWQgZnJvbSBtYXAgKi9cclxuICByZW1vdmVMYXllcklkKGlkKSB7XHJcbiAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gdGhpcy5sYXllcnMubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyc1tpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW1vdmVMYXllckluZGV4KGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKiByZW1vdmUgbGF5ZXIgYXQgZ2l2ZW4gaW5kZXggZnJvbSBtYXAgKi9cclxuICByZW1vdmVMYXllckluZGV4KGluZGV4Om51bWJlcikge1xyXG4gICAgdmFyIGxheWVyID0gdGhpcy5sYXllcnNbaW5kZXhdO1xyXG4gICAgdGhpcy5sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucmVmcmVzaFJlbW92ZUxheWVycyhsYXllcik7XHJcbiAgfVxyXG5cclxuICAvKiogcmVmcmVzaCBsYXllcnMgKi9cclxuICBwcml2YXRlIHJlZnJlc2hMYXllcnMoKSB7XHJcbiAgICAvLyBTZW5kIHRoZSBuZXcgdmFsdWVzIHNvIHRoYXQgYWxsIHN1YnNjcmliZXJzIGFyZSB1cGRhdGVkXHJcbiAgICB0aGlzLmxheWVyc1N1YmplY3QubmV4dCh0aGlzLmxheWVycyk7XHJcbiAgfVxyXG5cclxuICAvKiogT2JzZXJ2YWJsZSBmb3IgbGF5ZXJzIGFkZGVkICovXHJcbiAgZ2V0TGF5ZXJzQWRkZWQoKTogT2JzZXJ2YWJsZTxMYXllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRMYXllcnNTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoQWRkTGF5ZXJzKGxheWVyOkxheWVyKSB7XHJcbiAgICAvLyBTZW5kIHRoZSBuZXcgdmFsdWVzIHNvIHRoYXQgYWxsIHN1YnNjcmliZXJzIGFyZSB1cGRhdGVkXHJcbiAgICB0aGlzLmFkZExheWVyc1N1YmplY3QubmV4dChbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyc1JlbW92ZWQoKTogT2JzZXJ2YWJsZTxMYXllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMYXllcnNTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoUmVtb3ZlTGF5ZXJzKGxheWVyOkxheWVyKSB7XHJcbiAgICAvLyBTZW5kIHRoZSBuZXcgdmFsdWVzIHNvIHRoYXQgYWxsIHN1YnNjcmliZXJzIGFyZSB1cGRhdGVkXHJcbiAgICB0aGlzLnJlbW92ZUxheWVyc1N1YmplY3QubmV4dChbbGF5ZXJdKTtcclxuICB9XHJcblxyXG4gIGdldExheWVyQ29uZmlndXJhdGlvbkxpc3RlbmVyKCk6IE9ic2VydmFibGU8TGF5ZXJDb25maWd1cmF0aW9uW10+IHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyQ29uZmlndXJhdGlvblN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldExheWVySW5kZXhCeUlkKGlkOnN0cmluZyk6bnVtYmVye1xyXG4gICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSA8IGlMZW47IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5sYXllcnNbaV0uaWQgPT0gaWQpIHtcclxuICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcbiAgXHJcbiAgLyoqIG1vdmUgbGF5ZXIgd2l0aCBnaXZlbiBpZCB0byB0aGUgZ2l2ZW4gaW5kZXgqL1xyXG4gIG1vdmVMYXllcihpZCwgaW5kZXgpIHtcclxuICAgIHZhciBsYXllckluZGV4ID0gdGhpcy5nZXRMYXllckluZGV4QnlJZChpZCk7XHJcbiAgICBpZiAobGF5ZXJJbmRleCAhPSAtMSkge1xyXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVycy5zcGxpY2UobGF5ZXJJbmRleCwgMSk7XHJcbiAgICAgIHRoaXMubGF5ZXJzID0gXHJcbiAgICAgICAgdGhpcy5sYXllcnMuc2xpY2UoMCwgaW5kZXgpXHJcbiAgICAgICAgLmNvbmNhdChsYXllcilcclxuICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLnNsaWNlKGluZGV4LCB0aGlzLmxheWVycy5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaExheWVyQ29uZmlndXJhdGlvbihpZCwgbnVsbCwgbnVsbCwgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIGNoYW5nZSB2aXNpYmlsaXR5IG9mIGxheWVyIHdpdGggZ2l2ZW4gaWQgdG8gdGhlIGdpdmVuIHZhbHVlKi9cclxuICBjaGFuZ2VMYXllclZpc2liaWxpdHkoaWQsIHZpc2liaWxpdHkpIHtcclxuICAgIHRoaXMucmVmcmVzaExheWVyQ29uZmlndXJhdGlvbihpZCwgbnVsbCwgdmlzaWJpbGl0eSwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICAvKiogY2hhbmdlIG9wYWNpdHkgb2YgbGF5ZXIgd2l0aCBnaXZlbiBpZCB0byB0aGUgZ2l2ZW4gdmFsdWUqL1xyXG4gIGNoYW5nZUxheWVyT3BhY2l0eShpZCwgb3BhY2l0eSkge1xyXG4gICAgdGhpcy5yZWZyZXNoTGF5ZXJDb25maWd1cmF0aW9uKGlkLCBvcGFjaXR5LCBudWxsLCBudWxsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaExheWVyQ29uZmlndXJhdGlvbihpZCwgb3BhY2l0eSwgdmlzaWJpbGl0eSwgcG9zaXRpb24pIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHZhciBsYXllciA9IG5ldyBMYXllckNvbmZpZ3VyYXRpb24oKTtcclxuICAgIGxheWVyLmlkID0gaWQ7XHJcbiAgICBsYXllci5vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgIGxheWVyLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xyXG4gICAgbGF5ZXIucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHRoaXMubGF5ZXJDb25maWd1cmF0aW9uU3ViamVjdC5uZXh0KFtsYXllcl0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2l0dWF0aW9uTWFwQ29uZmlndXJhdGlvbkxpc3RlbmVyKCk6IE9ic2VydmFibGU8TGF5ZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l0dWF0aW9uTWFwQ29uZmlndXJhdGlvblN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogY29uZmlndXJlIHRoZSBzaXR1YXRpb24gbWFwIG9mIHRoZSBtYXAgY29tcG9uZW50IGJ5IHBhc3NpbmcgYXMgYSBwYXJhbWV0ZXIgYW4gYXJyYXkgb2Ygb2JqZWN0cyBvZiB0eXBlIExheWVyR3JvdXAsIGVhY2ggb2YgdGhlbSB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIExheWVyIG9iamVjdHMgZGVmaW5pbmcgdGhlIGxheWVycyB0byBsb2FkIGFzIHNpdHVhdGlvbiBtYXAuKi9cclxuICBsb2FkU2l0dWF0aW9uTWFwQ29uZmlndXJhdGlvbihsYXllcnM6QXJyYXk8TGF5ZXI+KSB7XHJcbiAgICAvLyBTZW5kIHRoZSBuZXcgdmFsdWVzIHNvIHRoYXQgYWxsIHN1YnNjcmliZXJzIGFyZSB1cGRhdGVkXHJcbiAgICB0aGlzLnNpdHVhdGlvbk1hcENvbmZpZ3VyYXRpb25TdWJqZWN0Lm5leHQobGF5ZXJzKTtcclxuICB9XHJcblxyXG4gIGdldE1hcE9wdGlvbnNDb25maWd1cmF0aW9uTGlzdGVuZXIoKTogT2JzZXJ2YWJsZTxNYXBPcHRpb25zQ29uZmlndXJhdGlvbltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBPcHRpb25zQ29uZmlndXJhdGlvblN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogbG9hZCBtYXAgb3B0aW9ucyBjb25maWd1cmF0aW9uICovXHJcbiAgbG9hZE1hcE9wdGlvbnNDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246TWFwT3B0aW9uc0NvbmZpZ3VyYXRpb24pIHtcclxuICAgIC8vIFNlbmQgdGhlIG5ldyB2YWx1ZXMgc28gdGhhdCBhbGwgc3Vic2NyaWJlcnMgYXJlIHVwZGF0ZWRcclxuICAgIHRoaXMubWFwT3B0aW9uc0NvbmZpZ3VyYXRpb25TdWJqZWN0Lm5leHQoW2NvbmZpZ3VyYXRpb25dKTtcclxuICB9XHJcblxyXG4gIGdldE1hcENvbXBvbmVudFN0YXR1c0xpc3RlbmVyKCk6IE9ic2VydmFibGU8TWFwQ29tcG9uZW50U3RhdHVzW10+IHtcclxuICAgIHJldHVybiB0aGlzLm1hcENvbXBvbmVudFN0YXR1c1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKiBzZXQgbWFwIGNvbXBvbmVudCBzdGF0dXMgKi9cclxuICBzZXRNYXBDb21wb25lbnRTdGF0dXMoc3RhdHVzOk1hcENvbXBvbmVudFN0YXR1cykge1xyXG4gICAgLy9Ob3RpZnkgdGhlIG1hcCBjb21wb25lbnQgc3RhdHVzXHJcbiAgICB0aGlzLm1hcENvbXBvbmVudFN0YXR1c1N1YmplY3QubmV4dChbc3RhdHVzXSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBAd2hhdEl0RG9lcyBDb25kaXRpb25hbGx5IGluY2x1ZGVzIGFuIEhUTUwgZWxlbWVudCBpZiBjdXJyZW50IHVzZXIgaGFzIGFueVxyXG4gKiBvZiB0aGUgYXV0aG9yaXRpZXMgcGFzc2VkIGFzIHRoZSBgZXhwcmVzc2lvbmAuXHJcbiAqXHJcbiAqIEBob3dUb1VzZVxyXG4gKiBgYGBcclxuICogICAgIDxzb21lLWVsZW1lbnQgKnNpdG11bkhhc0FueUF1dGhvcml0eT1cIidST0xFX0FETUlOJ1wiPi4uLjwvc29tZS1lbGVtZW50PlxyXG4gKlxyXG4gKiAgICAgPHNvbWUtZWxlbWVudCAqc2l0bXVuSGFzQW55QXV0aG9yaXR5PVwiWydST0xFX0FETUlOJywgJ1JPTEVfVVNFUiddXCI+Li4uPC9zb21lLWVsZW1lbnQ+XHJcbiAqIGBgYFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tzaXRtdW5IYXNBbnlBdXRob3JpdHldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGFzQW55QXV0aG9yaXR5RGlyZWN0aXZlIHtcclxuICAgIFxyXG4gICAgLyoqIGF1dGhvcml0aWVzIHRvIGNoZWNrICovXHJcbiAgICBwdWJsaWMgYXV0aG9yaXRpZXM6IHN0cmluZ1tdOyBcclxuICAgIFxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsLCBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIHRlcnJpdG9yeSB0byBjaGVjayBhdXRob3JpdGllcyovXHJcbiAgICBASW5wdXQoKSB0ZXJyaXRvcnk6IHN0cmluZztcclxuICAgIFxyXG4gICAgLyoqIFNldCB3aGV0aGVyIGN1cnJlbnQgdXNlciBoYXMgYW55IG9mIHRoZSBnaXZlbiBhdXRob3JpdGllcyAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBzaXRtdW5IYXNBbnlBdXRob3JpdHkodmFsdWU6IHN0cmluZ3xzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuYXV0aG9yaXRpZXMgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gWyA8c3RyaW5nPiB2YWx1ZSBdIDogPHN0cmluZ1tdPiB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICAvLyBHZXQgbm90aWZpZWQgZWFjaCB0aW1lIGF1dGhlbnRpY2F0aW9uIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAgICAgdGhpcy5wcmluY2lwYWwuZ2V0QXV0aGVudGljYXRpb25TdGF0ZSgpLnN1YnNjcmliZSgoaWRlbnRpdHkpID0+IHRoaXMudXBkYXRlVmlldygpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIHVwZGF0ZSB2aWV3ICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudGVycml0b3J5KXtcclxuICAgICAgICB0aGlzLnByaW5jaXBhbC5oYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeSh0aGlzLmF1dGhvcml0aWVzLHRoaXMudGVycml0b3J5KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnByaW5jaXBhbC5oYXNBbnlBdXRob3JpdHkodGhpcy5hdXRob3JpdGllcykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFByaW5jaXBhbCB9IGZyb20gJy4vcHJpbmNpcGFsLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEB3aGF0SXREb2VzIENvbmRpdGlvbmFsbHkgaW5jbHVkZXMgYW4gSFRNTCBlbGVtZW50IGlmIGN1cnJlbnQgdXNlciBoYXMgYW55XHJcbiAqIG9mIHRoZSBhdXRob3JpdGllcyBwYXNzZWQgYXMgdGhlIGBleHByZXNzaW9uYC5cclxuICpcclxuICogQGhvd1RvVXNlXHJcbiAqIGBgYFxyXG4gKiAgICAgPHNvbWUtZWxlbWVudCAqc2l0bXVuSGFzQW55QXV0aG9yaXR5PVwiJ1JPTEVfQURNSU4nXCI+Li4uPC9zb21lLWVsZW1lbnQ+XHJcbiAqXHJcbiAqICAgICA8c29tZS1lbGVtZW50ICpzaXRtdW5IYXNBbnlBdXRob3JpdHk9XCJbJ1JPTEVfQURNSU4nLCAnUk9MRV9VU0VSJ11cIj4uLi48L3NvbWUtZWxlbWVudD5cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3NpdG11bkhhc0FueUF1dGhvcml0eU9uVGVycml0b3J5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEhhc0FueUF1dGhvcml0eU9uVGVycml0b3J5RGlyZWN0aXZlIHtcclxuXHJcbiAgICAvKiogYXV0aG9yaXRpZXMgdG8gY2hlY2sgKi9cclxuICAgIHB1YmxpYyBhdXRob3JpdGllczogc3RyaW5nW107IFxyXG5cclxuICAgIC8qKiB0ZXJyaXRvcnkgdG8gY2hlY2sgYXV0aG9yaXRpZXMqL1xyXG4gICAgcHVibGljIHRlcnJpdG9yeTogc3RyaW5nOyBcclxuXHJcbiAgICAvKiogY29uc3RydWN0b3IgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogU2V0IHdoZXRoZXIgY3VycmVudCB1c2VyIGhhcyBhbnkgb2YgdGhlIGdpdmVuIGF1dGhvcml0aWVzIG9uIHRlcnJpdG9yeSAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBzaXRtdW5IYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeShvcHRzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRob3JpdGllcyA9IHR5cGVvZiBvcHRzLmF1dGhvcml0aWVzID09PSAnc3RyaW5nJyA/IFsgPHN0cmluZz4gb3B0cy5hdXRob3JpdGllcyBdIDogPHN0cmluZ1tdPiBvcHRzLmF1dGhvcml0aWVzO1xyXG4gICAgICAgIHRoaXMudGVycml0b3J5ID0gb3B0cy50ZXJyaXRvcnk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgLy8gR2V0IG5vdGlmaWVkIGVhY2ggdGltZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmdldEF1dGhlbnRpY2F0aW9uU3RhdGUoKS5zdWJzY3JpYmUoKGlkZW50aXR5KSA9PiB0aGlzLnVwZGF0ZVZpZXcoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiB1cGRhdGUgdmlldyAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVWaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRlcnJpdG9yeSl7XHJcbiAgICAgICAgdGhpcy5wcmluY2lwYWwuaGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnkodGhpcy5hdXRob3JpdGllcyx0aGlzLnRlcnJpdG9yeSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wcmluY2lwYWwuaGFzQW55QXV0aG9yaXR5KHRoaXMuYXV0aG9yaXRpZXMpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG4vL2ltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICcuLi8uLi9saWIvYW5ndWxhci1oYWwnO1xyXG5pbXBvcnQge0NvZGVMaXN0U2VydmljZX0gZnJvbSAnLi9jb2RlbGlzdC9jb2RlbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHtUZXJyaXRvcnlTZXJ2aWNlfSBmcm9tICcuL3RlcnJpdG9yeS90ZXJyaXRvcnkuc2VydmljZSc7XHJcbmltcG9ydCB7VGVycml0b3J5VHlwZVNlcnZpY2V9IGZyb20gJy4vdGVycml0b3J5L3RlcnJpdG9yeS10eXBlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1RlcnJpdG9yeUdyb3VwVHlwZVNlcnZpY2V9IGZyb20gJy4vdGVycml0b3J5L3RlcnJpdG9yeS1ncm91cC10eXBlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJQb3NpdGlvblNlcnZpY2V9IGZyb20gJy4vdXNlci91c2VyLXBvc2l0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJDb25maWd1cmF0aW9uU2VydmljZX0gZnJvbSAnLi91c2VyL3VzZXItY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtSb2xlU2VydmljZX0gZnJvbSAnLi9yb2xlL3JvbGUuc2VydmljZSc7XHJcbmltcG9ydCB7VXNlclNlcnZpY2V9IGZyb20gJy4vdXNlci91c2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0Nvbm5lY3Rpb25TZXJ2aWNlfSBmcm9tICcuL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrU2VydmljZX0gZnJvbSAnLi90YXNrL3Rhc2suc2VydmljZSc7XHJcbmltcG9ydCB7VGFza1R5cGVTZXJ2aWNlfSBmcm9tICcuL3Rhc2svdGFzay10eXBlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tHcm91cFNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tQYXJhbWV0ZXJTZXJ2aWNlfSBmcm9tICcuL3Rhc2svdGFzay1wYXJhbWV0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7VGFza0F2YWlsYWJpbGl0eVNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLWF2YWlsYWJpbGl0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrVUlTZXJ2aWNlfSBmcm9tICcuL3Rhc2svdGFzay11aS5zZXJ2aWNlJztcclxuaW1wb3J0IHtTZXJ2aWNlU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL3NlcnZpY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7U2VydmljZVBhcmFtZXRlclNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9zZXJ2aWNlLXBhcmFtZXRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeVNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHkuc2VydmljZSc7XHJcbmltcG9ydCB7Q2FydG9ncmFwaHlBdmFpbGFiaWxpdHlTZXJ2aWNlfSBmcm9tICcuL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWF2YWlsYWJpbGl0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeUZpbHRlclNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHktZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXBTZXJ2aWNlfSBmcm9tICcuL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5UGFyYW1ldGVyU2VydmljZX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1wYXJhbWV0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7QmFja2dyb3VuZFNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvYmFja2dyb3VuZC5zZXJ2aWNlJztcclxuaW1wb3J0IHtUcmVlU2VydmljZX0gZnJvbSAnLi90cmVlL3RyZWUuc2VydmljZSc7XHJcbmltcG9ydCB7VHJlZU5vZGVTZXJ2aWNlfSBmcm9tICcuL3RyZWUvdHJlZS1ub2RlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uU2VydmljZX0gZnJvbSAnLi9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvblBhcmFtZXRlclNlcnZpY2V9IGZyb20gJy4vYXBwbGljYXRpb24vYXBwbGljYXRpb24tcGFyYW1ldGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uQmFja2dyb3VuZFNlcnZpY2V9IGZyb20gJy4vYXBwbGljYXRpb24vYXBwbGljYXRpb24tYmFja2dyb3VuZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQ29uZmlndXJhdGlvbk1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXAvbWFwLWNvbmZpZ3VyYXRpb24tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi9hdXRoL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRoL2F1dGguaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBBdXRoRXhwaXJlZEludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRoL2F1dGgtZXhwaXJlZC5pbnRlcmNlcHRvcic7XHJcbmltcG9ydCB7IEhhc0FueUF1dGhvcml0eURpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC9oYXMtYW55LWF1dGhvcml0eS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBIYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeURpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC9oYXMtYW55LWF1dGhvcml0eS1vbi10ZXJyaXRvcnkuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9hdXRoL2xvZ2luLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZUh0dHBMb2FkZXJ9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyJztcclxuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4vdHJhbnNsYXRpb24vdHJhbnNsYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4vdHJhbnNsYXRpb24vbGFuZ3VhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuL2Rhc2hib2FyZC9kYXNoYm9hcmQuc2VydmljZSc7XHJcbmltcG9ydCB7IENhcGFiaWxpdGllc1NlcnZpY2UgfSBmcm9tICcuL2NhcGFiaWxpdGllcy9jYXBhYmlsaXRpZXMuc2VydmljZSc7XHJcbi8qKiBsb2FkIGkxOG4gYXNzZXRzKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuL2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xyXG59XHJcblxyXG5cclxuLyoqIFNJVE1VTiBmcm9udGVuZCBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIC8qUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsKi9cclxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgbG9hZGVyOiB7XHJcbiAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxyXG4gICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVUcmFuc2xhdGVMb2FkZXIpLFxyXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSGFzQW55QXV0aG9yaXR5RGlyZWN0aXZlLFxyXG4gICAgSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnlEaXJlY3RpdmUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIYXNBbnlBdXRob3JpdHlEaXJlY3RpdmUsXHJcbiAgICBIYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeURpcmVjdGl2ZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb2RlTGlzdFNlcnZpY2UsXHJcbiAgICAgICAgVGVycml0b3J5U2VydmljZSxcclxuICAgICAgICBUZXJyaXRvcnlUeXBlU2VydmljZSxcclxuICAgICAgICBUZXJyaXRvcnlHcm91cFR5cGVTZXJ2aWNlLFxyXG4gICAgICAgIFJvbGVTZXJ2aWNlLFxyXG4gICAgICAgIEFjY291bnRTZXJ2aWNlLFxyXG4gICAgICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIENvbm5lY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tTZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tUeXBlU2VydmljZSxcclxuICAgICAgICBUYXNrVUlTZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tHcm91cFNlcnZpY2UsXHJcbiAgICAgICAgVGFza1BhcmFtZXRlclNlcnZpY2UsXHJcbiAgICAgICAgVGFza0F2YWlsYWJpbGl0eVNlcnZpY2UsXHJcbiAgICAgICAgU2VydmljZVNlcnZpY2UsXHJcbiAgICAgICAgQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICAgICAgICBTZXJ2aWNlUGFyYW1ldGVyU2VydmljZSxcclxuICAgICAgICBDYXJ0b2dyYXBoeVNlcnZpY2UsXHJcbiAgICAgICAgQ2FydG9ncmFwaHlHcm91cFNlcnZpY2UsXHJcbiAgICAgICAgQ2FydG9ncmFwaHlBdmFpbGFiaWxpdHlTZXJ2aWNlLFxyXG4gICAgICAgIENhcnRvZ3JhcGh5UGFyYW1ldGVyU2VydmljZSxcclxuICAgICAgICBDYXJ0b2dyYXBoeUZpbHRlclNlcnZpY2UsXHJcbiAgICAgICAgQmFja2dyb3VuZFNlcnZpY2UsXHJcbiAgICAgICAgVHJlZVNlcnZpY2UsXHJcbiAgICAgICAgVHJlZU5vZGVTZXJ2aWNlLFxyXG4gICAgICAgIEFwcGxpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBBcHBsaWNhdGlvblBhcmFtZXRlclNlcnZpY2UsXHJcbiAgICAgICAgQXBwbGljYXRpb25CYWNrZ3JvdW5kU2VydmljZSxcclxuICAgICAgICBBdXRoSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgQXV0aEV4cGlyZWRJbnRlcmNlcHRvcixcclxuICAgICAgICBQcmluY2lwYWwsXHJcbiAgICAgICAgVXNlclBvc2l0aW9uU2VydmljZSxcclxuICAgICAgICBVc2VyQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgTG9naW5TZXJ2aWNlLFxyXG4gICAgICAgIFRyYW5zbGF0aW9uU2VydmljZSxcclxuICAgICAgICBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICAgICAgRGFzaGJvYXJkU2VydmljZSxcclxuICAgICAgICBNYXBDb25maWd1cmF0aW9uTWFuYWdlclNlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXHJcbiAgICAgICAgICB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLCB7XHJcbiAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcclxuICAgICAgICAgIHVzZUNsYXNzOiBBdXRoRXhwaXJlZEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7SGFsUGFyYW0sIFJlc3RTZXJ2aWNlfSBmcm9tICcuL3Jlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7RXh0ZXJuYWxTZXJ2aWNlfSBmcm9tICcuL2V4dGVybmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Jlc291cmNlU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlfSBmcm9tICcuL2V4dGVybmFsLWNvbmZpZ3VyYXRpb24uaGFuZGxlcic7XHJcblxyXG5pbXBvcnQgJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtTdWJUeXBlQnVpbGRlcn0gZnJvbSAnLi9zdWJ0eXBlLWJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IHtFeHRlcm5hbFNlcnZpY2V9IGZyb20gJy4vZXh0ZXJuYWwuc2VydmljZSc7XHJcbmV4cG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuZXhwb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9yZXNvdXJjZSc7XHJcbmV4cG9ydCB7UmVzb3VyY2VBcnJheX0gZnJvbSAnLi9yZXNvdXJjZS1hcnJheSc7XHJcbmV4cG9ydCB7UmVzb3VyY2VTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlLnNlcnZpY2UnO1xyXG5leHBvcnQge1NvcnR9IGZyb20gJy4vc29ydCc7XHJcbmV4cG9ydCB7UmVzb3VyY2VIZWxwZXJ9IGZyb20gJy4vcmVzb3VyY2UtaGVscGVyJztcclxuZXhwb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb259IGZyb20gJy4vRXh0ZXJuYWxDb25maWd1cmF0aW9uJztcclxuZXhwb3J0IHtFeHRlcm5hbENvbmZpZ3VyYXRpb25IYW5kbGVySW50ZXJmYWNlfSBmcm9tICcuL2V4dGVybmFsLWNvbmZpZ3VyYXRpb24uaGFuZGxlcic7XHJcbmV4cG9ydCB7SGFsT3B0aW9ucywgSGFsUGFyYW19IGZyb20gJy4vcmVzdC5zZXJ2aWNlJztcclxuZXhwb3J0IHtTdWJUeXBlQnVpbGRlcn0gZnJvbSAnLi9zdWJ0eXBlLWJ1aWxkZXInO1xyXG5cclxuXHJcbi8qKiBBbmd1bGFyIEhBTCBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW10sXHJcbiAgICBleHBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBFeHRlcm5hbFNlcnZpY2UsXHJcbiAgICAgICAgSHR0cENsaWVudCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IFJlc291cmNlU2VydmljZSxcclxuICAgICAgICAgICAgdXNlQ2xhc3M6IFJlc291cmNlU2VydmljZSxcclxuICAgICAgICAgICAgZGVwczogW0V4dGVybmFsU2VydmljZV1cclxuICAgICAgICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhckhhbE1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogQW5ndWxhckhhbE1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBFeHRlcm5hbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFJlc291cmNlU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VDbGFzczogUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtFeHRlcm5hbFNlcnZpY2VdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIm1hcCIsImNhdGNoRXJyb3IiLCJvYnNlcnZhYmxlVGhyb3dFcnJvciIsInVybC5wYXJzZSIsInRzbGliXzEuX192YWx1ZXMiLCJpc051bGxPclVuZGVmaW5lZCIsImlzUHJpbWl0aXZlIiwidXJsIiwiSHR0cEhlYWRlcnMiLCJIdHRwUGFyYW1zIiwib2JzZXJ2YWJsZU9mIiwiSW5qZWN0YWJsZSIsInRzbGliXzEuX19leHRlbmRzIiwiSW5qZWN0IiwibWVyZ2VNYXAiLCJJbmplY3RvciIsIkh0dHBDbGllbnQiLCJPYnNlcnZhYmxlIiwiU3ViamVjdCIsInJvdXRlciIsIkh0dHBFcnJvclJlc3BvbnNlIiwiUm91dGVyIiwiQmVoYXZpb3JTdWJqZWN0IiwiRGlyZWN0aXZlIiwiVGVtcGxhdGVSZWYiLCJWaWV3Q29udGFpbmVyUmVmIiwiSW5wdXQiLCJUcmFuc2xhdGVIdHRwTG9hZGVyIiwiSFRUUF9JTlRFUkNFUFRPUlMiLCJOZ01vZHVsZSIsIlRyYW5zbGF0ZU1vZHVsZSIsIlRyYW5zbGF0ZUxvYWRlciIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7U0FDcEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztZQUFF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