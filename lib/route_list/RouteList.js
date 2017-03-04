'use strict';

class RouteList {

    constructor(app, formatter) {
        if (!app || !this._isExpressApp(app)) {
            throw new Error('Pass express app first argument')
        }
        this.app = app;
        this.formatter = formatter;
        this.routes = this.getRoutes(this.app._router);
    }

    getRoutes(router) {
        return router.stack.map(handler => {
            let isRouter = false;
            const res = {
                name: handler.name
            };
            if (handler.route) {
                res.path = handler.route.path;
                res.method = this._getMethods(handler.route.methods);
                isRouter = true;
            } else {
                res.path = this._getPath(handler.regexp.toString());
                res.method = handler.method || 'ALL';
            }
            if (isRouter) {
                res.routes = this.getRoutes(handler.route);
            }
            return res;
        });
    }

    report() {
        this.formatter.report(this.routes);
    }

    _getMethods(methods) {
        return Object.keys(methods)
            .filter(method => methods[method])
            .map(method => method.toUpperCase())
            .join(', ');
    }

    _getPath(path) {
        let res = '';
        switch (path) {
            case RouteList.ALL_PATHS:
                res = '*';
                break;
            case RouteList.ROOT_PATH:
                res = '/';
                break;
        }
        return res;
    }

    _isExpressApp(app) {
        return typeof app == 'function' && app._router;   
    }
}

RouteList.ALL_PATHS = '/^\\/?(?=\\/|$)/i';
RouteList.ROOT_PATH = '/^\\/?$/i';

module.exports = RouteList;
