import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/profile/models/profile.model';
import { PROFILES_BASE_URL, PROFILES_ME_URL } from 'src/app/core/constants';

@Injectable({
    providedIn: 'root'
})
export class ProfileHttpService {

    constructor(private http: HttpClient) { }

    getCurrentProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${ PROFILES_ME_URL }`);
    }

    getProfileById(id: number): Observable<Profile> {
        return this.http.get<Profile>(`${ PROFILES_BASE_URL }/${ id }`);
    }

    patchProfile(updateObject: {}): Observable<Profile> {
        return this.http.patch<Profile>(`${ PROFILES_BASE_URL }`, updateObject);
    }
}
