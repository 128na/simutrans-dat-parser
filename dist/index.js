var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./src/Dat", "./src/Obj", "./src/Param", "./src/Key", "./src/Value"], function (require, exports, Dat_1, Obj_1, Param_1, Key_1, Value_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Dat_1 = __importDefault(Dat_1);
    Obj_1 = __importDefault(Obj_1);
    Param_1 = __importDefault(Param_1);
    Key_1 = __importDefault(Key_1);
    Value_1 = __importDefault(Value_1);
    exports.default = {
        Dat: Dat_1.default,
        Obj: Obj_1.default,
        Param: Param_1.default,
        Key: Key_1.default,
        Value: Value_1.default,
    };
});
