import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileEditableFieldComponent } from './profile-editable-field/profile-editable-field.component';

@NgModule({
    declarations: [
        MyProfileComponent,
        UserProfileComponent,
        ProfileEditableFieldComponent,
    ],
    imports: [
        ProfileRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
    ]
})
export class ProfileModule { }
