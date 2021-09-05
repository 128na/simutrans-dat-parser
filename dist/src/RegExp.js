define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regValueParam = exports.regKeyParam = exports.regKeyParamAll = exports.regParam = exports.regObjSplitter = exports.regSpecial = exports.regNewLine = void 0;
    exports.regNewLine = /\n+/mgi;
    exports.regSpecial = /\s+/gi;
    exports.regObjSplitter = /---+/gi;
    exports.regParam = /^([^=]*)(=> |=)?(.*)?$/i;
    exports.regKeyParamAll = /\[([\w\d-]*)\]/ig;
    exports.regKeyParam = /\[([\w\d-]*)\]/i;
    exports.regValueParam = /[\.,]([-\d]*)/ig;
});
