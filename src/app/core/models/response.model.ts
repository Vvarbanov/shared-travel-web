/**
 * Type to handle api response.
 *
 * @example
 * const data: Response<{ users: User[] }> = { users: [], statusCode: 200, statusMessage: 'OK' };
 */
export type Response<T> = { [K in keyof T]: T[K] } & {
    statusCode: number;
    statusMessage: string;
};
