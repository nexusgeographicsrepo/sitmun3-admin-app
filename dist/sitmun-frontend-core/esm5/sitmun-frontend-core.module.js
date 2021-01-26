/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CodeListService } from './codelist/codelist.service';
import { TerritoryService } from './territory/territory.service';
import { TerritoryTypeService } from './territory/territory-type.service';
import { TerritoryGroupTypeService } from './territory/territory-group-type.service';
import { UserPositionService } from './user/user-position.service';
import { UserConfigurationService } from './user/user-configuration.service';
import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { ConnectionService } from './connection/connection.service';
import { TaskService } from './task/task.service';
import { TaskTypeService } from './task/task-type.service';
import { TaskGroupService } from './task/task-group.service';
import { TaskParameterService } from './task/task-parameter.service';
import { TaskAvailabilityService } from './task/task-availability.service';
import { TaskUIService } from './task/task-ui.service';
import { ServiceService } from './service/service.service';
import { ServiceParameterService } from './service/service-parameter.service';
import { CartographyService } from './cartography/cartography.service';
import { CartographyAvailabilityService } from './cartography/cartography-availability.service';
import { CartographyGroupService } from './cartography/cartography-group.service';
import { CartographyParameterService } from './cartography/cartography-parameter.service';
import { BackgroundService } from './cartography/background.service';
import { TreeService } from './tree/tree.service';
import { TreeNodeService } from './tree/tree-node.service';
import { ApplicationService } from './application/application.service';
import { ApplicationParameterService } from './application/application-parameter.service';
import { ApplicationBackgroundService } from './application/application-background.service';
import { MapConfigurationManagerService } from './map/map-configuration-manager.service';
import { AuthService } from './auth/auth.service';
import { Principal } from './auth/principal.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthExpiredInterceptor } from './auth/auth-expired.interceptor';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { HasAnyAuthorityOnTerritoryDirective } from './auth/has-any-authority-on-territory.directive';
import { LoginService } from './auth/login.service';
import { AccountService } from './account/account.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
/**
 * load i18n assets
 * @param {?} http
 * @return {?}
 */
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
var ɵ0 = (createTranslateLoader);
/**
 * SITMUN frontend core module
 */
var SitmunFrontendCoreModule = /** @class */ (function () {
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
                ServiceParameterService,
                CartographyService,
                CartographyGroupService,
                CartographyAvailabilityService,
                CartographyParameterService,
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
    };
    SitmunFrontendCoreModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    return SitmunFrontendCoreModule;
}());
export { SitmunFrontendCoreModule };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNpdG11bi9mcm9udGVuZC1jb3JlLyIsInNvdXJjZXMiOlsic2l0bXVuLWZyb250ZW5kLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUc5RCxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3JGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFD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aUJBQWlCO29CQUMxQixRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztLQUNIOztnQkEzRUYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTs7Ozs7d0JBS1AsZUFBZSxDQUFDLE9BQU8sQ0FBQzs0QkFDdEIsTUFBTSxFQUFFO2dDQUNOLE9BQU8sRUFBRSxlQUFlO2dDQUN4QixVQUFVLElBQXlCO2dDQUNuQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7NkJBQ25CO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsbUNBQW1DO3FCQUNwQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4QixtQ0FBbUM7d0JBQ25DLGVBQWU7cUJBQ2hCO2lCQUNGOzttQ0EzRUQ7O1NBNEVhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbi8vaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJy4uLy4uL2xpYi9hbmd1bGFyLWhhbCc7XHJcbmltcG9ydCB7Q29kZUxpc3RTZXJ2aWNlfSBmcm9tICcuL2NvZGVsaXN0L2NvZGVsaXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1RlcnJpdG9yeVNlcnZpY2V9IGZyb20gJy4vdGVycml0b3J5L3RlcnJpdG9yeS5zZXJ2aWNlJztcclxuaW1wb3J0IHtUZXJyaXRvcnlUeXBlU2VydmljZX0gZnJvbSAnLi90ZXJyaXRvcnkvdGVycml0b3J5LXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VGVycml0b3J5R3JvdXBUeXBlU2VydmljZX0gZnJvbSAnLi90ZXJyaXRvcnkvdGVycml0b3J5LWdyb3VwLXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VXNlclBvc2l0aW9uU2VydmljZX0gZnJvbSAnLi91c2VyL3VzZXItcG9zaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7VXNlckNvbmZpZ3VyYXRpb25TZXJ2aWNlfSBmcm9tICcuL3VzZXIvdXNlci1jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1JvbGVTZXJ2aWNlfSBmcm9tICcuL3JvbGUvcm9sZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtVc2VyU2VydmljZX0gZnJvbSAnLi91c2VyL3VzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7Q29ubmVjdGlvblNlcnZpY2V9IGZyb20gJy4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tTZXJ2aWNlfSBmcm9tICcuL3Rhc2svdGFzay5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrVHlwZVNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXR5cGUuc2VydmljZSc7XHJcbmltcG9ydCB7VGFza0dyb3VwU2VydmljZX0gZnJvbSAnLi90YXNrL3Rhc2stZ3JvdXAuc2VydmljZSc7XHJcbmltcG9ydCB7VGFza1BhcmFtZXRlclNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXBhcmFtZXRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtUYXNrQXZhaWxhYmlsaXR5U2VydmljZX0gZnJvbSAnLi90YXNrL3Rhc2stYXZhaWxhYmlsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQge1Rhc2tVSVNlcnZpY2V9IGZyb20gJy4vdGFzay90YXNrLXVpLnNlcnZpY2UnO1xyXG5pbXBvcnQge1NlcnZpY2VTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2Uvc2VydmljZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtTZXJ2aWNlUGFyYW1ldGVyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL3NlcnZpY2UtcGFyYW1ldGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5U2VydmljZX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eVNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvY2FydG9ncmFwaHktYXZhaWxhYmlsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5R3JvdXBTZXJ2aWNlfSBmcm9tICcuL2NhcnRvZ3JhcGh5L2NhcnRvZ3JhcGh5LWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NhcnRvZ3JhcGh5UGFyYW1ldGVyU2VydmljZX0gZnJvbSAnLi9jYXJ0b2dyYXBoeS9jYXJ0b2dyYXBoeS1wYXJhbWV0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7QmFja2dyb3VuZFNlcnZpY2V9IGZyb20gJy4vY2FydG9ncmFwaHkvYmFja2dyb3VuZC5zZXJ2aWNlJztcclxuaW1wb3J0IHtUcmVlU2VydmljZX0gZnJvbSAnLi90cmVlL3RyZWUuc2VydmljZSc7XHJcbmltcG9ydCB7VHJlZU5vZGVTZXJ2aWNlfSBmcm9tICcuL3RyZWUvdHJlZS1ub2RlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uU2VydmljZX0gZnJvbSAnLi9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvblBhcmFtZXRlclNlcnZpY2V9IGZyb20gJy4vYXBwbGljYXRpb24vYXBwbGljYXRpb24tcGFyYW1ldGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uQmFja2dyb3VuZFNlcnZpY2V9IGZyb20gJy4vYXBwbGljYXRpb24vYXBwbGljYXRpb24tYmFja2dyb3VuZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQ29uZmlndXJhdGlvbk1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXAvbWFwLWNvbmZpZ3VyYXRpb24tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi9hdXRoL3ByaW5jaXBhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRoL2F1dGguaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBBdXRoRXhwaXJlZEludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRoL2F1dGgtZXhwaXJlZC5pbnRlcmNlcHRvcic7XHJcbmltcG9ydCB7IEhhc0FueUF1dGhvcml0eURpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC9oYXMtYW55LWF1dGhvcml0eS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBIYXNBbnlBdXRob3JpdHlPblRlcnJpdG9yeURpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC9oYXMtYW55LWF1dGhvcml0eS1vbi10ZXJyaXRvcnkuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9hdXRoL2xvZ2luLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4vYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZUh0dHBMb2FkZXJ9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyJztcclxuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG4vKiogbG9hZCBpMThuIGFzc2V0cyovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2xhdGVMb2FkZXIoaHR0cDogSHR0cENsaWVudCkge1xyXG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwLCAnLi9hc3NldHMvaTE4bi8nLCAnLmpzb24nKTtcclxufVxyXG5cclxuXHJcbi8qKiBTSVRNVU4gZnJvbnRlbmQgY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICAvKlJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLCovXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgIGxvYWRlcjoge1xyXG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcclxuICAgICAgICB1c2VGYWN0b3J5OiAoY3JlYXRlVHJhbnNsYXRlTG9hZGVyKSxcclxuICAgICAgICBkZXBzOiBbSHR0cENsaWVudF1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEhhc0FueUF1dGhvcml0eURpcmVjdGl2ZSxcclxuICAgIEhhc0FueUF1dGhvcml0eU9uVGVycml0b3J5RGlyZWN0aXZlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSGFzQW55QXV0aG9yaXR5RGlyZWN0aXZlLFxyXG4gICAgSGFzQW55QXV0aG9yaXR5T25UZXJyaXRvcnlEaXJlY3RpdmUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ29kZUxpc3RTZXJ2aWNlLFxyXG4gICAgICAgIFRlcnJpdG9yeVNlcnZpY2UsXHJcbiAgICAgICAgVGVycml0b3J5VHlwZVNlcnZpY2UsXHJcbiAgICAgICAgVGVycml0b3J5R3JvdXBUeXBlU2VydmljZSxcclxuICAgICAgICBSb2xlU2VydmljZSxcclxuICAgICAgICBBY2NvdW50U2VydmljZSxcclxuICAgICAgICBBdXRoU2VydmljZSxcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBDb25uZWN0aW9uU2VydmljZSxcclxuICAgICAgICBUYXNrU2VydmljZSxcclxuICAgICAgICBUYXNrVHlwZVNlcnZpY2UsXHJcbiAgICAgICAgVGFza1VJU2VydmljZSxcclxuICAgICAgICBUYXNrR3JvdXBTZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tQYXJhbWV0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIFRhc2tBdmFpbGFiaWxpdHlTZXJ2aWNlLFxyXG4gICAgICAgIFNlcnZpY2VTZXJ2aWNlLFxyXG4gICAgICAgIFNlcnZpY2VQYXJhbWV0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIENhcnRvZ3JhcGh5U2VydmljZSxcclxuICAgICAgICBDYXJ0b2dyYXBoeUdyb3VwU2VydmljZSxcclxuICAgICAgICBDYXJ0b2dyYXBoeUF2YWlsYWJpbGl0eVNlcnZpY2UsXHJcbiAgICAgICAgQ2FydG9ncmFwaHlQYXJhbWV0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIEJhY2tncm91bmRTZXJ2aWNlLFxyXG4gICAgICAgIFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgIFRyZWVOb2RlU2VydmljZSxcclxuICAgICAgICBBcHBsaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgQXBwbGljYXRpb25QYXJhbWV0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIEFwcGxpY2F0aW9uQmFja2dyb3VuZFNlcnZpY2UsXHJcbiAgICAgICAgQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgIEF1dGhFeHBpcmVkSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgUHJpbmNpcGFsLFxyXG4gICAgICAgIFVzZXJQb3NpdGlvblNlcnZpY2UsXHJcbiAgICAgICAgVXNlckNvbmZpZ3VyYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIExvZ2luU2VydmljZSxcclxuICAgICAgICBNYXBDb25maWd1cmF0aW9uTWFuYWdlclNlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXHJcbiAgICAgICAgICB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLCB7XHJcbiAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcclxuICAgICAgICAgIHVzZUNsYXNzOiBBdXRoRXhwaXJlZEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=