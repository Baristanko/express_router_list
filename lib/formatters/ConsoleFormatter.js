'use strict';

class ConsoleFormatter {

    constructor() {
        this.indent = '\t';
    }

    report(routes) {
        const indent = '';
        routes.forEach(route => this.report_(route, indent));
    }

    report_(route, indent) {
        console.log(`${indent}${route.method} ${route.path} ${route.name}`);
        if (route.routes) {
            route.routes.forEach(route => {
                this.report_(route, indent + this.indent);
            });
        }
    }
}

module.exports = ConsoleFormatter;