import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROFILE_SETTINGS_BASE_URL } from 'src/app/core/constants';
import { ProfileSettings } from '../../models/profile-settings.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileSettingsService {

    constructor(private http: HttpClient) { }

    getProfileSettingsById(): Observable<ProfileSettings> {
        return this.http.get<ProfileSettings>(PROFILE_SETTINGS_BASE_URL);
    }

    patchProfileSettingsById(updateObject: {}): Observable<ProfileSettings> {
        return this.http.patch<ProfileSettings>(PROFILE_SETTINGS_BASE_URL, updateObject);
    }
}
