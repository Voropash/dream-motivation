import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {App} from './app/app';
import {APP_ROUTER_PROVIDERS} from './routes';
import {provide, enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

bootstrap(
    App,
    [
        disableDeprecatedForms(),
        provideForms(),
        APP_ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig({
                    tokenName: 'jwt'
                }), http);
            },
            deps: [Http]
        }),
        provide(APP_BASE_HREF, {useValue: '/'})
    ]
).catch(err => console.error(err));
