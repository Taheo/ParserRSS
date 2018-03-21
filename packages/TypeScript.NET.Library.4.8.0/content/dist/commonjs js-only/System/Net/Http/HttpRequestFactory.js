"use strict";
var ArgumentNullException_1 = require("../../Exceptions/ArgumentNullException");
var DisposableBase_1 = require("../../Disposable/DisposableBase");
var HttpMethod_1 = require("./HttpMethod");
var Uri_1 = require("../../Uri/Uri");
var extends_1 = require("../../../extends");
// noinspection JSUnusedLocalSymbols
var __extends = extends_1.default;
var NAME = 'HttpRequestFactory';
/**
 * This class exposes a factory for making requests to prepared uri and params.
 */
var HttpRequestFactory = (function (_super) {
    __extends(HttpRequestFactory, _super);
    function HttpRequestFactory(_http, uriDefaults) {
        _super.call(this);
        this._http = _http;
        this._disposableObjectName = NAME;
        if (!_http)
            throw new ArgumentNullException_1.ArgumentNullException('_http');
        this._uriDefaults = Uri_1.Uri.from(uriDefaults);
    }
    HttpRequestFactory.prototype._onDispose = function () {
        // super._onDispose(); // Not required for first level inheritance.
        this._http = null;
        this._uriDefaults = null;
    };
    HttpRequestFactory.prototype.uri = function (uri) {
        var _ = this;
        _.throwIfDisposed();
        var d = _._uriDefaults, u = Uri_1.Uri.from(uri, d);
        return d && u.equals(d)
            ? _
            : new HttpRequestFactory(_._http, u);
    };
    HttpRequestFactory.prototype.params = function (params) {
        var _ = this;
        _.throwIfDisposed();
        return _.uri(_._uriDefaults.updateQuery(params));
    };
    HttpRequestFactory.prototype.request = function (method, data) {
        var _ = this;
        _.throwIfDisposed();
        return _._http.request({
            method: method,
            uri: _._uriDefaults,
            data: data
        });
    };
    HttpRequestFactory.prototype.get = function () {
        return this.request(HttpMethod_1.GET);
    };
    HttpRequestFactory.prototype.put = function () {
        return this.request(HttpMethod_1.PUT);
    };
    HttpRequestFactory.prototype.post = function (data) {
        return this.request(HttpMethod_1.POST, data);
    };
    HttpRequestFactory.prototype['delete'] = function () {
        return this.request(HttpMethod_1.DELETE);
    };
    return HttpRequestFactory;
}(DisposableBase_1.DisposableBase));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpRequestFactory;