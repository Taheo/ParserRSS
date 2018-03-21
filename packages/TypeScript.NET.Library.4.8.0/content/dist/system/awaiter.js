System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function awaiter(thisArg, _arguments, P, generator) {
        if (!P)
            throw "Must provide Promise constructor.  Try injecting Promise using awaiter.factory(PromiseConstructorLike).";
        return new P(function (resolve, reject) {
            var g = generator = generator.apply(thisArg, _arguments);
            step(g.next());
            function fulfilled(value) {
                try {
                    step(g.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(g["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected);
            }
        });
    }
    exports_1("awaiter", awaiter);
    return {
        setters: [],
        execute: function () {
            exports_1("default", awaiter);
        }
    };
});
//# sourceMappingURL=awaiter.js.map