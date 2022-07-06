import { AuthorityEnum } from "./authority.enum";

export interface Principal {
    exp: number,
    iss: string,
    sub: string,
    authorities: AuthorityEnum[]
}
