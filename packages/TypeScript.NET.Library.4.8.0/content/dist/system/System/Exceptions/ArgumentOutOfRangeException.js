System.register(["./ArgumentException", "../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArgumentException_1, extends_1, __extends, NAME, ArgumentOutOfRangeException;
    return {
        setters: [
            function (ArgumentException_1_1) {
                ArgumentException_1 = ArgumentException_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            NAME = 'ArgumentOutOfRangeException';
            ArgumentOutOfRangeException = (function (_super) {
                __extends(ArgumentOutOfRangeException, _super);
                function ArgumentOutOfRangeException(paramName, actualValue, message, innerException) {
                    if (message === void 0) { message = ' '; }
                    return _super.call(this, paramName, "(" + actualValue + ") " + message, innerException, function (_) {
                        _.actualValue = actualValue;
                    }) || this;
                }
                ArgumentOutOfRangeException.prototype.getName = function () {
                    return NAME;
                };
                return ArgumentOutOfRangeException;
            }(ArgumentException_1.ArgumentException));
            exports_1("ArgumentOutOfRangeException", ArgumentOutOfRangeException);
            exports_1("default", ArgumentOutOfRangeException);
        }
    };
});
//# sourceMappingURL=ArgumentOutOfRangeException.js.map