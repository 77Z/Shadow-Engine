"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoize = require("memoizee");
const url_1 = require("url");
const extractURLDomain = (urlString) => {
    const url = url_1.parse(urlString);
    if (url.protocol == 'https:' || url.protocol == 'http:') {
        return url.hostname;
    }
    return '';
};
// memoize it for performance
exports.default = memoize(extractURLDomain, { max: 100 });
//# sourceMappingURL=extractURLDomain.js.map