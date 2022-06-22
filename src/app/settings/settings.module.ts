import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SettingBooleanRowComponent } from './setting-boolean-row/setting-boolean-row.component';

@NgModule({
    imports: [
        SettingsRoutingModule,
        MaterialModule
    ],
    declarations: [
        SettingsComponent,
        ProfileSettingsComponent,
        SettingBooleanRowComponent,
    ]
})
export class SettingsModule { }
