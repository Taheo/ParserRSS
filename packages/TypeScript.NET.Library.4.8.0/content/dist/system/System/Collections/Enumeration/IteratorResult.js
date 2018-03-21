System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var VOID0, IteratorResult;
    return {
        setters: [],
        execute: function () {
            VOID0 = void 0;
            IteratorResult = (function () {
                function IteratorResult(value, index, done) {
                    if (done === void 0) { done = false; }
                    this.value = value;
                    if (typeof index == 'boolean')
                        this.done = index;
                    else {
                        this.index = index;
                        this.done = done;
                    }
                    Object.freeze(this);
                }
                return IteratorResult;
            }());
            exports_1("IteratorResult", IteratorResult);
            (function (IteratorResult) {
                IteratorResult.Done = new IteratorResult(VOID0, VOID0, true);
                function GetDone() { return IteratorResult.Done; }
                IteratorResult.GetDone = GetDone;
            })(IteratorResult || (IteratorResult = {}));
            exports_1("IteratorResult", IteratorResult);
            Object.freeze(IteratorResult);
            exports_1("default", IteratorResult);
        }
    };
});
//# sourceMappingURL=IteratorResult.js.map