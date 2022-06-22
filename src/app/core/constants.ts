import { environment } from '../../environments/environment';
// File used to store global constants

// API Url constants
export const BACKEND_URL = environment.apiUrl;

// Common Operations
export const CANCEL_URL = "/cancel";

// Travels
export const TRAVELS_CONTROLLER_URL = '/travels';
export const PASSENGERS_URL = '/passengers';
export const TRAVELS_BASE_URL = `${ BACKEND_URL }${ TRAVELS_CONTROLLER_URL }`;
export const TRAVELS_JOIN_REQUEST_URL = `/join`;
export const TRAVELS_KICK_URL = `/kick`;
export const TRAVELS_LEAVE_URL = `/leave`;
export const TRAVELS_MY_URL = `${ TRAVELS_BASE_URL }/my`;

// Profiles
export const PROFILES_CONTROLLER_URL = '/profiles';
export const PROFILES_BASE_URL = `${ BACKEND_URL }${ PROFILES_CONTROLLER_URL }`;
export const PROFILES_ME_URL = `${ PROFILES_BASE_URL }/me`;

// Profile Settings
export const PROFILE_SETTINGS_CONTROLLER_URL = '/profiles/me/settings';
export const PROFILE_SETTINGS_BASE_URL = `${ BACKEND_URL }${ PROFILE_SETTINGS_CONTROLLER_URL }`;

// User
export const USERS_BASE_URL = '/users';
export const LOGIN_CONTROLLER_URL = '/login';
export const REGISTER_CONTROLLER_URL = '/register';
export const CHANGE_PASSWORD_CONTROLLER_URL = '/me/password';
export const LOGIN_REQUEST_URL = `${ BACKEND_URL }${ USERS_BASE_URL }${ LOGIN_CONTROLLER_URL }`;
export const REGISTER_REQUEST_URL = `${ BACKEND_URL }${ USERS_BASE_URL }${ REGISTER_CONTROLLER_URL }`;
export const CHANGE_PASSWORD_REQUEST_URL = `${ BACKEND_URL }${ USERS_BASE_URL }${ CHANGE_PASSWORD_CONTROLLER_URL }`;

// Notifications
export const NOTIFICATIONS_CONTROLLER_URL = '/notifications';
export const NOTIFICATIONS_JOIN_REQUEST_CONTROLLER_URL = `${ NOTIFICATIONS_CONTROLLER_URL }/requests/join`;
export const NOTIFICATIONS_BASE_URL = `${ BACKEND_URL }${ NOTIFICATIONS_CONTROLLER_URL }`;
export const NOTIFICATIONS_JOIN_REQUEST_URL = `${ BACKEND_URL }${ NOTIFICATIONS_JOIN_REQUEST_CONTROLLER_URL }`;
export const PENDING_NOTIFICATIONS_JOIN_REQUEST_TRAVELS_URL = `${ BACKEND_URL }${ NOTIFICATIONS_JOIN_REQUEST_CONTROLLER_URL }/pending/travel`;
export const NOTIFICATIONS_COUNT_URL = `${ NOTIFICATIONS_BASE_URL }/count`;

// Locales
export const LOCALE_EN_US = 'en-US';

// Date format
export const LOCAL_DATE_TIME_FORMAT = 'yyyy-MM-ddTHH:mm:ss.SSS';

// Autocomprete
export const AUTOCOMPLETE_MAX_FIELDS = 10;

// Pagination options
export const PAGINATION_OPTIONS = [10, 20, 50, 100];

// Modules router URLS
export const TRAVELS_LIST_MODULE_URL = 'list';
export const PROFILE_MODULE_URL = 'profile';
export const SETTINGS_MODULE_URL = 'settings';
export const DRIVER_DASHBOARD_MODULE_URL = 'driver-dashboard';
export const LOGIN_URL = 'login';

// Component router URLS
export const BASE_ROUTER_URL = '/';
export const CREATE_TRAVEL_UTL = 'create';

// Router URLs
export const TRAVELS_LIST_ROUTER_URL = `${ BASE_ROUTER_URL }${ TRAVELS_LIST_MODULE_URL }`;
export const MY_PROFILE_ROUTER_URL = `${ BASE_ROUTER_URL }${ PROFILE_MODULE_URL }`;
export const SETTINGS_ROUTER_URL = `${ BASE_ROUTER_URL }${ SETTINGS_MODULE_URL }`;
export const LOGIN_ROUTER_URL = `${ BASE_ROUTER_URL }${ LOGIN_URL }`;
export const DRIVER_DASHBOARD_ROUTER_URL = `${ BASE_ROUTER_URL }${ DRIVER_DASHBOARD_MODULE_URL }`;
export const CREATE_TRAVEL_ROUTER_URL = `${ DRIVER_DASHBOARD_ROUTER_URL }/${ CREATE_TRAVEL_UTL }`;

// Local storage keys
export const AUTH_TOKEN_KEY = 'AuthToken';
export const PROFILE_TOKEN_KEY = 'Profile';

// Authentication
export const AUTHORIZATION_HEADER = 'Authorization';
export const BEARER_PREFIX = 'Bearer ';
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
