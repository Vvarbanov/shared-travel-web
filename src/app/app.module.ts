import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatNativeDateModule } from '@matheo/datepicker/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NotificationBellComponent } from './core/components/header/notification-bell/notification-bell.component';
import { ProfileCardComponent } from './core/components/header/profile-card/profile-card.component';
import { NotificationCardComponent } from './core/components/notification-container/notification-card/notification-card.component';
import { NotificationContainerComponent } from './core/components/notification-container/notification-container.component';
import { ProfileSmallComponent } from './core/components/profile-small/profile-small.component';
import { RegisterDriverDialogComponent } from './core/components/register-driver-dialog/register-driver-dialog.component';
import { InternationalizedPaginator } from './core/internationalized-paginator/internationalized-paginator';
import { MaterialModule } from './core/material/material.module';
import { JwtInterceptorService } from './core/services/interceptors/jwt-interceptor.service';
import { BoldTextPipeModule } from './core/services/pipes/bold-text.pipe';
import { LocationTranslatePipeModule } from './core/services/pipes/location-translate.pipe';
import { TravelDetailsDialogComponent } from './home/travel-details-dialog/travel-details-dialog.component';
import { DirectiveModule } from './core/services/directives/directive.module';

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
        RegisterDriverDialogComponent,
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
        BoldTextPipeModule,
        LocationTranslatePipeModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
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
