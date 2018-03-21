System.register(["../Types", "./Dictionaries/getIdentifier", "./HashSet", "../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getId(obj) {
        return getIdentifier_1.getIdentifier(obj, typeof obj != Types_1.Type.BOOLEAN);
    }
    var Types_1, getIdentifier_1, HashSet_1, extends_1, __extends, Set;
    return {
        setters: [
            function (Types_1_1) {
                Types_1 = Types_1_1;
            },
            function (getIdentifier_1_1) {
                getIdentifier_1 = getIdentifier_1_1;
            },
            function (HashSet_1_1) {
                HashSet_1 = HashSet_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            Set = (function (_super) {
                __extends(Set, _super);
                function Set(source) {
                    return _super.call(this, source, getId) || this;
                }
                return Set;
            }(HashSet_1.HashSet));
            exports_1("Set", Set);
            exports_1("default", Set);
        }
    };
});
//# sourceMappingURL=Set.js.map