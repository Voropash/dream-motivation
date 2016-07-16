webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(3);
	var http_1 = __webpack_require__(329);
	var app_1 = __webpack_require__(350);
	var routes_1 = __webpack_require__(424);
	var core_1 = __webpack_require__(6);
	var forms_1 = __webpack_require__(428);
	var angular2_jwt_1 = __webpack_require__(465);
	platform_browser_dynamic_1.bootstrap(app_1.App, [
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms(),
	    routes_1.APP_ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
	    core_1.provide(angular2_jwt_1.AuthHttp, {
	        useFactory: function (http) {
	            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
	                tokenName: 'jwt'
	            }), http);
	        },
	        deps: [http_1.Http]
	    }),
	    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' })
	]).catch(function (err) { return console.error(err); });


/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var timeService_1 = __webpack_require__(351);
	var service_1 = __webpack_require__(365);
	var core_1 = __webpack_require__(6);
	var router_1 = __webpack_require__(369);
	var template = __webpack_require__(423);
	var App = (function () {
	    function App(router) {
	        this.router = router;
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'cloud-catalog',
	            template: template,
	            directives: [router_1.ROUTER_DIRECTIVES],
	            providers: [service_1.myService, timeService_1.TimeService]
	        }), 
	        __metadata('design:paramtypes', [router_1.Router])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(6);
	var Observable_1 = __webpack_require__(39);
	__webpack_require__(352);
	__webpack_require__(361);
	var TimeService = (function () {
	    function TimeService() {
	        this.time = Observable_1.Observable.interval(10).map(function (x) { return new Date(); }).share();
	    }
	    TimeService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], TimeService);
	    return TimeService;
	}());
	exports.TimeService = TimeService;


/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var baseBackendContext_1 = __webpack_require__(366);
	var core_1 = __webpack_require__(6);
	var http_1 = __webpack_require__(329);
	var headers_1 = __webpack_require__(367);
	__webpack_require__(368);
	var myService = (function () {
	    function myService(h) {
	        this.h = h;
	        this.dataUrl = baseBackendContext_1.baseBackendContext + 'data';
	    }
	    myService.prototype.getData = function () {
	        return this.getAndExtractData('/db.json');
	    };
	    myService.prototype.extractData = function (res) {
	        var body = res.json();
	        return body || {};
	    };
	    myService.prototype.handleError = function (error) {
	        console.error('An error occurred', error);
	        return Promise.reject(error.message || error);
	    };
	    myService.prototype.log = function (body, methodName) {
	        console.log(methodName + '() | Request: ' + body);
	    };
	    myService.prototype.post = function (url, body) {
	        return this.h.post(url, body, { headers: headers_1.contentHeaders })
	            .toPromise()
	            .catch(this.handleError);
	    };
	    myService.prototype.getR = function (url) {
	        return this.h.get(url, { headers: headers_1.contentHeaders })
	            .toPromise()
	            .catch(this.handleError);
	    };
	    myService.prototype.postAndExtractData = function (url, body) {
	        return this.post(url, body).then(this.extractData);
	    };
	    myService.prototype.getAndExtractData = function (url) {
	        return this.getR(url).then(this.extractData);
	    };
	    myService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], myService);
	    return myService;
	}());
	exports.myService = myService;


/***/ },

/***/ 366:
/***/ function(module, exports) {

	"use strict";
	exports.baseBackendContext = 'http://localhost:3000/';


/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var http_1 = __webpack_require__(329);
	exports.contentHeaders = new http_1.Headers();
	exports.contentHeaders.append('Accept', 'application/json');
	exports.contentHeaders.append('Content-Type', 'application/json');
	exports.contentHeaders.append('Access-Control-Allow-Credentials', 'true');
	exports.contentHeaders.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	exports.contentHeaders.append('Access-Control-Allow-Origin', '*');
	exports.contentHeaders.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type,' +
	    ' Access-Control-Request-Method, Access-Control-Request-Headers');


/***/ },

/***/ 423:
/***/ function(module, exports) {

	module.exports = "<router-outlet></router-outlet>\r\n"

/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(369);
	var home_1 = __webpack_require__(425);
	exports.routes = [
	    { path: '', redirectTo: '/home', terminal: true },
	    { path: '/home', component: home_1.Home }
	];
	exports.APP_ROUTER_PROVIDERS = [
	    router_1.provideRouter(exports.routes)
	];


/***/ },

/***/ 425:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var timeService_1 = __webpack_require__(351);
	var service_1 = __webpack_require__(365);
	var core_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(369);
	var styles = __webpack_require__(426);
	var template = __webpack_require__(427);
	var Home = (function () {
	    function Home(router, service, timeService) {
	        this.router = router;
	        this.service = service;
	        this.timeService = timeService;
	        this.month = 2592000000;
	        this.getDate();
	    }
	    Home.prototype.ngOnInit = function () {
	        var _this = this;
	        this.service.getData().then(function (response) {
	            _this.data = response;
	        });
	    };
	    Home.prototype.updateCurrentState = function () {
	        if (this.data) {
	            var currentState = (this.data.state + (this.date.getTime() - this.data.timestamp) / this.month * this.data.add[0]);
	            this.currentState = Math.round(currentState * 10000) / 10000;
	            var currentPercent = 100 * this.currentState / this.data.target;
	            this.currentPercent = Math.round(currentPercent * 1000000) / 1000000;
	            var currentDays = (this.data.target - this.currentState) / this.data.add[0] * 30;
	            this.currentDays = Math.round(currentDays * 1) / 1;
	        }
	    };
	    Home.prototype.getDate = function () {
	        var _this = this;
	        this.timeService.time.subscribe(function (t) {
	            _this.date = t;
	            _this.updateCurrentState();
	        });
	    };
	    Home = __decorate([
	        core_1.Component({
	            selector: 'home',
	            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
	            template: template,
	            styles: [styles]
	        }), 
	        __metadata('design:paramtypes', [router_1.Router, service_1.myService, timeService_1.TimeService])
	    ], Home);
	    return Home;
	}());
	exports.Home = Home;


/***/ },

/***/ 426:
/***/ function(module, exports) {

	module.exports = ".num {\r\n  font-size: 44px;\r\n}\r\n\r\n.parent {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    overflow: auto;\r\n}\r\n\r\n.block {\r\n    width: 250px;\r\n    height: 250px;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    margin: -125px 0 0 -125px;\r\n\r\n    img {\r\n        max-width: 100%;\r\n        height: auto;\r\n        display: block;\r\n        margin: 0 auto;\r\n        border: none;\r\n    }\r\n}\r\n"

/***/ },

/***/ 427:
/***/ function(module, exports) {

	module.exports = "<div class=\"parent\">\n    <div class=\"block\">\n      <div style=\"font-family: 'Open Sans', sans-serif\">\n        <span class=\"num\">{{currentState}}</span>\n        <br />\n        <span class=\"num\">{{currentPercent}}</span>\n        <br />\n        <span class=\"num\">{{currentDays}} </span>\n      </div>\n    </div>\n</div>\n"

/***/ }

});
//# sourceMappingURL=app.js.map