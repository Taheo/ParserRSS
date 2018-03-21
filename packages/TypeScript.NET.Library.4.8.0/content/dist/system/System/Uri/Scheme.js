System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Scheme;
    return {
        setters: [],
        execute: function () {
            (function (Scheme) {
                /**
                 * The resource is a file on the local computer.
                 */
                Scheme.File = "file";
                /**
                 * The resource is accessed through FTP.
                 */
                Scheme.FTP = "ftp";
                /**
                 * The resource is accessed through the Gopher protocol.
                 */
                Scheme.GOPHER = "gopher";
                /**
                 * The resource is accessed through HTTP.
                 */
                Scheme.HTTP = "http";
                /**
                 * The resource is accessed through SSL-encrypted HTTP.
                 */
                Scheme.HTTPS = "https";
                /**
                 * The resource is accessed through the LDAP protocol.
                 */
                Scheme.LDAP = "ldap";
                /**
                 * The resource is an e-mail address and accessed through the SMTP protocol.
                 */
                Scheme.MAILTO = "mailto";
                /**
                 * The resource is accessed through a named pipe.
                 */
                Scheme.PIPE = "net.pipe";
                /**
                 * The resource is accessed from TCP endpoint.
                 */
                Scheme.TCP = "net.tcp";
                /**
                 * The resource is accessed through the NNTP protocol.
                 */
                Scheme.NEWS = "news";
                /**
                 * The resource is accessed through the NNTP protocol.
                 */
                Scheme.NNTP = "nntp";
                /**
                 * The resource is accessed through the TELNET protocol.
                 */
                Scheme.TELNET = "telnet";
                /**
                 * The resource is accessed through a unique UUID endpoint name for communicating with a service.
                 */
                Scheme.UUID = "uuid";
                /**
                 * An index of possible values to validate against.
                 * @type {Array}
                 */
                Scheme.All = Object.freeze([
                    Scheme.File, Scheme.FTP, Scheme.GOPHER, Scheme.HTTP, Scheme.HTTPS, Scheme.LDAP, Scheme.MAILTO, Scheme.PIPE, Scheme.TCP, Scheme.NEWS, Scheme.NNTP, Scheme.TELNET, Scheme.UUID
                ]);
                function isValid(scheme) {
                    return Scheme.All.indexOf(scheme) != -1;
                }
                Scheme.isValid = isValid;
            })(Scheme || (Scheme = {}));
            exports_1("Scheme", Scheme);
            Object.freeze(Scheme);
            exports_1("default", Scheme);
        }
    };
});
//# sourceMappingURL=Scheme.js.map