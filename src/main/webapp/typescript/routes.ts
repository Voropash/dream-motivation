import {provideRouter, RouterConfig} from '@angular/router';
import {Home} from './home/home';

export const routes: RouterConfig = [
    {path: '', redirectTo: '/home', terminal: true},
    {path: '/home', component: Home}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
