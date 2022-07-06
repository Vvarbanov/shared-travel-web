import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PROFILE_MODULE_URL, SETTINGS_MODULE_URL, BASE_ROUTER_URL, DRIVER_DASHBOARD_MODULE_URL, LOGIN_URL } from './core/constants';
import { AuthGuard } from './authentication/guard/auth.guard';
import { LoginGuard } from './authentication/guard/login.guard';
import { DriverGuard } from './authentication/guard/driver.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: PROFILE_MODULE_URL,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: SETTINGS_MODULE_URL,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
    },
    {
        path: DRIVER_DASHBOARD_MODULE_URL,
        loadChildren: () => import('./driver-dashboard/driver-dashboard.module').then(m => m.DriverDashboardModule),
        canActivate: [AuthGuard, DriverGuard]
    },
    {
        path: LOGIN_URL,
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
        canActivate: [LoginGuard]
    },
    { path: '**', redirectTo: BASE_ROUTER_URL }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
