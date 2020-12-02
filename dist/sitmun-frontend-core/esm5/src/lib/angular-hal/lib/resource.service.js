/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceHelper } from './resource-helper';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ExternalService } from './external.service';
/**
 * ResourceService
 */
var ResourceService = /** @class */ (function () {
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
     * @return {?}
     */
    function (type, resource, _embedded, options, subType) {
        /** @type {?} */
        var uri = this.getResourceUrl(resource);
        /** @type {?} */
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        /** @type {?} */
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, subType); }), catchError(function (error) { return observableThrowError(error); }));
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
        var uri = this.getResourceUrl(resource).concat('/', id);
        /** @type {?} */
        var result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
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
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        /** @type {?} */
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
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
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        var result = new type();
        this.setUrlsResource(result);
        /** @type {?} */
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResource(result, response); }), catchError(function (error) { return observableThrowError(error); }));
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
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        /** @type {?} */
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        /** @type {?} */
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, builder); }), catchError(function (error) { return observableThrowError(error); }));
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
        return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, observe: 'body' }).pipe(map(function (response) { return Number(response.body); }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
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
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                /** @type {?} */
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
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
        return ResourceHelper.getHttp().delete(uri, { headers: ResourceHelper.headers }).pipe(catchError(function (error) { return observableThrowError(error); }));
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
        return resourceArray.sortElements.apply(resourceArray, tslib_1.__spread([type], sort));
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
        var url = ResourceService.getURL();
        if (!url.endsWith('/')) {
            url = url.concat('/');
        }
        if (resource) {
            return url.concat(resource);
        }
        return url;
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ResourceService.ctorParameters = function () { return [
        { type: ExternalService }
    ]; };
    return ResourceService;
}());
export { ResourceService };
if (false) {
    /** @type {?} */
    ResourceService.prototype.externalService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtY29yZS9zcmMvbGliL2FuZ3VsYXItaGFsLyIsInNvdXJjZXMiOlsibGliL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUMsVUFBVSxJQUFJLG9CQUFvQixFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXhELE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7SUFVL0Msa0JBQWtCO0lBQ2xCLHlCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7S0FBSTs7Ozs7SUFJekMsc0JBQU07Ozs7O1FBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztJQUk1QixnQ0FBTTs7Ozs7Ozs7OztjQUFxQixJQUFrQixFQUFFLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxPQUFvQixFQUFFLE9BQXdCOztRQUNySSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUMxQyxJQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksVUFBVSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7O1FBQ3RFLElBQU0sTUFBTSxHQUFxQixjQUFjLENBQUMsaUJBQWlCLENBQUksU0FBUyxDQUFDLENBQUM7UUFFaEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztR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RSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0lBSVAsaUNBQU87Ozs7OztjQUFxQixNQUF3QjtRQUN4RCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7OztJQUkvQyx5Q0FBZTs7Ozs7O2NBQXFCLE1BQVM7UUFDakQsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7O2dCQW5QMUQsVUFBVTs7OztnQkFOSCxlQUFlOzswQkFWdkI7O1NBaUJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHt0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4vcmVzb3VyY2UnO1xyXG5pbXBvcnQge1Jlc291cmNlSGVscGVyfSBmcm9tICcuL3Jlc291cmNlLWhlbHBlcic7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7U29ydH0gZnJvbSAnLi9zb3J0JztcclxuaW1wb3J0IHtSZXNvdXJjZUFycmF5fSBmcm9tICcuL3Jlc291cmNlLWFycmF5JztcclxuaW1wb3J0IHtFeHRlcm5hbFNlcnZpY2V9IGZyb20gJy4vZXh0ZXJuYWwuc2VydmljZSc7XHJcbmltcG9ydCB7SGFsT3B0aW9uc30gZnJvbSAnLi9yZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YlR5cGVCdWlsZGVyfSBmcm9tICcuL3N1YnR5cGUtYnVpbGRlcic7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcclxuXHJcbi8qKiBSZXNvdXJjZVNlcnZpY2UgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIHtcclxuXHJcblxyXG4gICAgLyoqIGNvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsU2VydmljZTogRXh0ZXJuYWxTZXJ2aWNlKSB7fVxyXG5cclxuXHJcbiAgICAvKiogZ2V0IFVSTCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VVJMKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldFVSTCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgYWxsIHJlc291cmNlcyBmcm9tIGEgYmFzZSBVUkkgb2YgYSBnaXZlbiB0eXBlICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCByZXNvdXJjZTogc3RyaW5nLCBfZW1iZWRkZWQ6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMsIHN1YlR5cGU/OiBTdWJUeXBlQnVpbGRlcik6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFJlc291cmNlSGVscGVyLm9wdGlvblBhcmFtcyhuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICByZXN1bHQuc29ydEluZm8gPSBvcHRpb25zID8gb3B0aW9ucy5zb3J0IDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldCh1cmksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBwYXJhbXM6IHBhcmFtc30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uKHR5cGUsIHJlc3BvbnNlLCByZXN1bHQsIHN1YlR5cGUpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIGEgYmFzZSBVUkkgYW5kIGEgZ2l2ZW4gaWQgKi9cclxuICAgIHB1YmxpYyBnZXQ8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlc291cmNlOiBzdHJpbmcsIGlkOiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLmdldFJlc291cmNlVXJsKHJlc291cmNlKS5jb25jYXQoJy8nLCBpZCk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKGRhdGEgPT4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShyZXN1bHQsIGRhdGEpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBmcm9tIGl0cyBzZWxmbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5U2VsZkxpbms8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHJlc291cmNlTGluazogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQoUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkocmVzb3VyY2VMaW5rKSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChkYXRhID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UocmVzdWx0LCBkYXRhKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggcmVzb3VyY2VzIGZyb20gYSBnaXZlbiBiYXNlIHBhdGgsIHF1ZXJ5IGFuZCBvcHRpb25zICovXHJcbiAgICBwdWJsaWMgc2VhcmNoPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCBxdWVyeTogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nLCBfZW1iZWRkZWQ6IHN0cmluZywgb3B0aW9ucz86IEhhbE9wdGlvbnMpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLmdldFJlc291cmNlVXJsKHJlc291cmNlKS5jb25jYXQoJy9zZWFyY2gvJywgcXVlcnkpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFJlc291cmNlSGVscGVyLm9wdGlvblBhcmFtcyhuZXcgSHR0cFBhcmFtcygpLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgcGFyYW1zOiBwYXJhbXN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChyZXNwb25zZSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlQ29sbGVjdGlvbih0eXBlLCByZXNwb25zZSwgcmVzdWx0KSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZWFyY2ggYSBzaW5nbGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGJhc2UgcGF0aCwgcXVlcnkgYW5kIG9wdGlvbnMgKi9cclxuICAgIHB1YmxpYyBzZWFyY2hTaW5nbGU8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHF1ZXJ5OiBzdHJpbmcsIHJlc291cmNlOiBzdHJpbmcsIG9wdGlvbnM/OiBIYWxPcHRpb25zKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy5nZXRSZXNvdXJjZVVybChyZXNvdXJjZSkuY29uY2F0KCcvc2VhcmNoLycsIHF1ZXJ5KTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBSZXNvdXJjZUhlbHBlci5vcHRpb25QYXJhbXMobmV3IEh0dHBQYXJhbXMoKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBUID0gbmV3IHR5cGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgcGFyYW1zOiBwYXJhbXN9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcChyZXNwb25zZSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgcmVzcG9uc2UpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlYXJjaCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIGJhc2UgcGF0aCwgY3VzdG9tIHF1ZXJ5IGFuZCBvcHRpb25zICovXHJcbiAgICBwdWJsaWMgY3VzdG9tUXVlcnk8VCBleHRlbmRzIFJlc291cmNlPih0eXBlOiB7IG5ldygpOiBUIH0sIHF1ZXJ5OiBzdHJpbmcsIHJlc291cmNlOiBzdHJpbmcsIF9lbWJlZGRlZDogc3RyaW5nLCBvcHRpb25zPzogSGFsT3B0aW9ucyk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwocmVzb3VyY2UgKyBxdWVyeSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gUmVzb3VyY2VIZWxwZXIub3B0aW9uUGFyYW1zKG5ldyBIdHRwUGFyYW1zKCksIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzb3VyY2VBcnJheTxUPiA9IFJlc291cmNlSGVscGVyLmNyZWF0ZUVtcHR5UmVzdWx0PFQ+KF9lbWJlZGRlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXJscyhyZXN1bHQpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldCh1cmksIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBwYXJhbXM6IHBhcmFtc30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uKHR5cGUsIHJlc3BvbnNlLCByZXN1bHQpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBnaXZlbiBhIHJlbGF0aW9uIGxpbmsgKi9cclxuICAgIHB1YmxpYyBnZXRCeVJlbGF0aW9uPFQgZXh0ZW5kcyBSZXNvdXJjZT4odHlwZTogeyBuZXcoKTogVCB9LCByZXNvdXJjZUxpbms6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IFQgPSBuZXcgdHlwZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHNSZXNvdXJjZShyZXN1bHQpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLmdldChyZXNvdXJjZUxpbmssIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoZGF0YSA9PiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKHJlc3VsdCwgZGF0YSkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IGdpdmVuIGEgcmVsYXRpb24gbGluayAqL1xyXG4gICAgcHVibGljIGdldEJ5UmVsYXRpb25BcnJheTxUIGV4dGVuZHMgUmVzb3VyY2U+KHR5cGU6IHsgbmV3KCk6IFQgfSwgcmVzb3VyY2VMaW5rOiBzdHJpbmcsIF9lbWJlZGRlZDogc3RyaW5nLCBidWlsZGVyPzogU3ViVHlwZUJ1aWxkZXIpOiBPYnNlcnZhYmxlPFJlc291cmNlQXJyYXk8VD4+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc291cmNlQXJyYXk8VD4gPSBSZXNvdXJjZUhlbHBlci5jcmVhdGVFbXB0eVJlc3VsdDxUPihfZW1iZWRkZWQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFVybHMocmVzdWx0KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQocmVzb3VyY2VMaW5rLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVyc30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHJlc3BvbnNlID0+IFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2VDb2xsZWN0aW9uKHR5cGUsIHJlc3BvbnNlLCByZXN1bHQsIGJ1aWxkZXIpKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNvdW50IHJlc291cmNlcyBnaXZlbiBhIHBhdGggKi9cclxuICAgIHB1YmxpYyBjb3VudChyZXNvdXJjZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLmdldFJlc291cmNlVXJsKHJlc291cmNlKS5jb25jYXQoJy9zZWFyY2gvY291bnRBbGwnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5nZXQodXJpLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgb2JzZXJ2ZTogJ2JvZHknfSkucGlwZShcclxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IE51bWJlcihyZXNwb25zZS5ib2R5KSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGUgcmVzb3VyY2UgZnJvbSBzZWxmIGxpbmsgYW5kIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBjcmVhdGU8VCBleHRlbmRzIFJlc291cmNlPihzZWxmUmVzb3VyY2U6IHN0cmluZywgZW50aXR5OiBUKSB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0VVJMKCkgKyBzZWxmUmVzb3VyY2U7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFJlc291cmNlSGVscGVyLnJlc29sdmVSZWxhdGlvbnMoZW50aXR5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcmxzUmVzb3VyY2UoZW50aXR5KTtcclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IFJlc291cmNlSGVscGVyLmdldEh0dHAoKS5wb3N0KHVyaSwgcGF5bG9hZCwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8PSAyMDcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzb3VyY2VIZWxwZXIuaW5zdGFudGlhdGVSZXNvdXJjZShlbnRpdHksIHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keTogYW55ID0gcmVzcG9uc2UuYm9keTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihib2R5LmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB1cGRhdGUgcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyB1cGRhdGU8VCBleHRlbmRzIFJlc291cmNlPihlbnRpdHk6IFQpIHtcclxuICAgICAgICBjb25zdCB1cmkgPSBSZXNvdXJjZUhlbHBlci5nZXRQcm94eShlbnRpdHkuX2xpbmtzLnNlbGYuaHJlZik7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFJlc291cmNlSGVscGVyLnJlc29sdmVSZWxhdGlvbnMoZW50aXR5KTtcclxuICAgICAgICB0aGlzLnNldFVybHNSZXNvdXJjZShlbnRpdHkpO1xyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gUmVzb3VyY2VIZWxwZXIuZ2V0SHR0cCgpLnB1dCh1cmksIHBheWxvYWQsIHtoZWFkZXJzOiBSZXNvdXJjZUhlbHBlci5oZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPD0gMjA3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlSGVscGVyLmluc3RhbnRpYXRlUmVzb3VyY2UoZW50aXR5LCByZXNwb25zZS5ib2R5KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoYm9keS5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxjYXRjaEVycm9yKGVycm9yID0+IG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKSksKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcGF0Y2ggcmVzb3VyY2UgZnJvbSBhIGdpdmVuIGVudGl0eSBkYXRhKi9cclxuICAgIHB1YmxpYyBwYXRjaDxUIGV4dGVuZHMgUmVzb3VyY2U+KGVudGl0eTogVCkge1xyXG4gICAgICAgIGNvbnN0IHVyaSA9IFJlc291cmNlSGVscGVyLmdldFByb3h5KGVudGl0eS5fbGlua3Muc2VsZi5ocmVmKTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gUmVzb3VyY2VIZWxwZXIucmVzb2x2ZVJlbGF0aW9ucyhlbnRpdHkpO1xyXG4gICAgICAgIHRoaXMuc2V0VXJsc1Jlc291cmNlKGVudGl0eSk7XHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkucGF0Y2godXJpLCBwYXlsb2FkLCB7aGVhZGVyczogUmVzb3VyY2VIZWxwZXIuaGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDw9IDIwNylcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5pbnN0YW50aWF0ZVJlc291cmNlKGVudGl0eSwgcmVzcG9uc2UuYm9keSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA1MDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBib2R5OiBhbnkgPSByZXNwb25zZS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGJvZHkuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksY2F0Y2hFcnJvcihlcnJvciA9PiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJvcikpLCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGRlbGV0ZSByZXNvdXJjZSBmcm9tIGEgZ2l2ZW4gZW50aXR5IGRhdGEqL1xyXG4gICAgcHVibGljIGRlbGV0ZTxUIGV4dGVuZHMgUmVzb3VyY2U+KGVudGl0eTogVCk6IE9ic2VydmFibGU8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3QgdXJpID0gUmVzb3VyY2VIZWxwZXIuZ2V0UHJveHkoZW50aXR5Ll9saW5rcy5zZWxmLmhyZWYpO1xyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUhlbHBlci5nZXRIdHRwKCkuZGVsZXRlKHVyaSwge2hlYWRlcnM6IFJlc291cmNlSGVscGVyLmhlYWRlcnN9KS5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyb3IpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgbmV4dCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGhhc05leHQ8VCBleHRlbmRzIFJlc291cmNlPihyZXNvdXJjZUFycmF5OiBSZXNvdXJjZUFycmF5PFQ+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkubmV4dF91cmkgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgaGFzUHJldjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5wcmV2X3VyaSAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHdoZXRoZXIgYSByZXNvdXJjZSBhcnJheSBoYXMgZmlyc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNGaXJzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VBcnJheS5maXJzdF91cmkgIT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB3aGV0aGVyIGEgcmVzb3VyY2UgYXJyYXkgaGFzIGxhc3QgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBoYXNMYXN0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lmxhc3RfdXJpICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IG5leHQgcGFnZSBvZiByZXN1bHRzKi9cclxuICAgIHB1YmxpYyBuZXh0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPiwgdHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkubmV4dCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIGFycmF5IHByZXZpb3VzIHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgcHJldjxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnByZXYodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMqL1xyXG4gICAgcHVibGljIGZpcnN0PFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzb3VyY2VBcnJheTogUmVzb3VyY2VBcnJheTxUPiwgdHlwZTogeyBuZXcoKTogVCB9KTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuZmlyc3QodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBsYXN0IHBhZ2Ugb2YgcmVzdWx0cyovXHJcbiAgICBwdWJsaWMgbGFzdDxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5Lmxhc3QodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGdldCByZXNvdXJjZSBhcnJheSBwYWdlIG9mIHJlc3VsdHMgZ2l2ZW4gYSBwYWdlIG51bWJlciovXHJcbiAgICBwdWJsaWMgcGFnZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgaWQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVzb3VyY2VBcnJheTxUPj4ge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUFycmF5LnBhZ2UodHlwZSwgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzb3J0IHJlc291cmNlIGFycmF5IHdpdGggYSBnaXZlbiBzb3J0aW5nIHBhcmFtcyAqL1xyXG4gICAgcHVibGljIHNvcnRFbGVtZW50czxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgLi4uc29ydDogU29ydFtdKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuc29ydEVsZW1lbnRzKHR5cGUsIC4uLnNvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBnZXQgcmVzb3VyY2UgYXJyYXkgc2l6ZSovXHJcbiAgICBwdWJsaWMgc2l6ZTxUIGV4dGVuZHMgUmVzb3VyY2U+KHJlc291cmNlQXJyYXk6IFJlc291cmNlQXJyYXk8VD4sIHR5cGU6IHsgbmV3KCk6IFQgfSwgc2l6ZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZXNvdXJjZUFycmF5PFQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQXJyYXkuc2l6ZSh0eXBlLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZ2V0IHJlc291cmNlIFVSTCBmcm9tIGEgZ2l2ZW4gcGF0aCovXHJcbiAgICBwcml2YXRlIGdldFJlc291cmNlVXJsKHJlc291cmNlPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdXJsID0gUmVzb3VyY2VTZXJ2aWNlLmdldFVSTCgpO1xyXG4gICAgICAgIGlmICghdXJsLmVuZHNXaXRoKCcvJykpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLmNvbmNhdCgnLycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzb3VyY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybC5jb25jYXQocmVzb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzZXQgcHJveHkgYW5kIHJvb3QgdXJscyBvZiBnaXZlbiByZXNvdXJjZSBhcnJheSAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcmxzPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzdWx0OiBSZXNvdXJjZUFycmF5PFQ+KSB7XHJcbiAgICAgICAgcmVzdWx0LnByb3h5VXJsID0gdGhpcy5leHRlcm5hbFNlcnZpY2UuZ2V0UHJveHlVcmkoKTtcclxuICAgICAgICByZXN1bHQucm9vdFVybCA9IHRoaXMuZXh0ZXJuYWxTZXJ2aWNlLmdldFJvb3RVcmkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2V0IHByb3h5IGFuZCByb290IHVybHMgb2YgZ2l2ZW4gcmVzb3VyY2UgKi9cclxuICAgIHByaXZhdGUgc2V0VXJsc1Jlc291cmNlPFQgZXh0ZW5kcyBSZXNvdXJjZT4ocmVzdWx0OiBUKSB7XHJcbiAgICAgICAgcmVzdWx0LnByb3h5VXJsID0gdGhpcy5leHRlcm5hbFNlcnZpY2UuZ2V0UHJveHlVcmkoKTtcclxuICAgICAgICByZXN1bHQucm9vdFVybCA9IHRoaXMuZXh0ZXJuYWxTZXJ2aWNlLmdldFJvb3RVcmkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=