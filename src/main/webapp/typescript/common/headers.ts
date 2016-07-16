import {Headers} from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('Access-Control-Allow-Credentials', 'true');
contentHeaders.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
contentHeaders.append('Access-Control-Allow-Origin', '*');
contentHeaders.append('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type,' +
    ' Access-Control-Request-Method, Access-Control-Request-Headers');
