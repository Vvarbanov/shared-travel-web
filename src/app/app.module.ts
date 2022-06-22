import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material/material.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@matheo/datepicker/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { InternationalizedPaginator } from './core/internationalized-paginator/internationalized-paginator';
import { HeaderComponent } from './core/components/header/header.component';
import { ProfileCardComponent } from './core/components/header/profile-card/profile-card.component';
import { NotificationBellComponent } from './core/components/header/notification-bell/notification-bell.component';
import { JwtInterceptorService } from './core/services/interceptors/jwt-interceptor.service';
import { NotificationContainerComponent } from './core/components/notification-container/notification-container.component';
import { TravelDetailsDialogComponent } from './core/components/notification-container/travel-details-dialog/travel-details-dialog.component';
import { ProfileSmallComponent } from './core/components/profile-small/profile-small.component';
import { NotificationCardComponent } from './core/components/notification-container/notification-card/notification-card.component';
import { DatePipe } from '@angular/common';
import { BoldTextPipe } from './core/services/pipes/bold-text.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileCardComponent,
        NotificationBellComponent,
        NotificationContainerComponent,
        TravelDetailsDialogComponent,
        ProfileSmallComponent,
        NotificationCardComponent,
        BoldTextPipe,
    ],
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        MatNativeDateModule,
        ScrollingModule,
    ],
    providers: [
        DatePipe,
        { provide: MAT_DATE_LOCALE, useValue: 'en-UK' },
        { provide: MatPaginatorIntl, useClass: InternationalizedPaginator },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
