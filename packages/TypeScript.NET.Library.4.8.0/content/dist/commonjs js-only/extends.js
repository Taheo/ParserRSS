"use strict";
function default_1(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    //noinspection CommaExpressionJS
    d.prototype = b === null
        ? Object.create(b)
        : (__.prototype = b.prototype, new __());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;