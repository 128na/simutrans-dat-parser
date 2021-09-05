declare module "src/RegExp" {
    export const regNewLine: RegExp;
    export const regSpecial: RegExp;
    export const regObjSplitter: RegExp;
    export const regParam: RegExp;
    export const regKeyParamAll: RegExp;
    export const regKeyParam: RegExp;
    export const regValueParam: RegExp;
}
declare module "src/Key" {
    export default class Key {
        _original: string;
        _val: string;
        _params: string[];
        constructor(original: string);
    }
}
declare module "src/Value" {
    export default class Value {
        _original: string;
        _val: string;
        _params: number[];
        constructor(original: string);
    }
}
declare module "src/Param" {
    import Key from "src/Key";
    import Value from "src/Value";
    /**
     * dat記述の1行
     * foo=bar
     */
    export default class Param {
        _key: Key;
        _operator: string;
        _value: Value;
        constructor(original: string);
        get key(): string;
        set key(key: string);
        get value(): string;
        set value(value: string);
        get keyVal(): string;
        get keyParams(): string[];
        get keyParam(): string;
        get valueVal(): string;
        get valueParams(): number[];
        get valueParam(): string;
        get isEmpty(): boolean;
        get isComment(): boolean;
        get isSplit(): boolean;
        toString(): string;
    }
}
declare module "src/Sort" {
    import Param from "src/Param";
    export const sortForParam: (a: Param, b: Param) => number;
}
declare module "src/Obj" {
    import Param from "src/Param";
    export default class Obj {
        _line: number;
        _params: Param[];
        constructor(original: string, line: number);
        get firstLine(): number;
        get lastLine(): number;
        get obj(): string | undefined;
        get name(): string | undefined;
        get comments(): Param[];
        updateFromString(original: string): void;
        updateOrCreate(key: string, value: string, operator?: string): void;
        deleteByKeyVal(keyVal: string, ...keyParams: [[string]]): void;
        /**
         * 指定キー値を含むParamを探す
         */
        findParamsByKeyVal(keyVal: string): Param[];
        /**
         * 指定キーに一致するParamを探す
         */
        findParam(key: string): Param | undefined;
        /**
         * 指定キーっぽいやつを探す
         * hoge[0][1][2] -> hoge[0][1][2][0][0][0], hoge[0][1][2][0][0], hoge[0][1][2][0], hoge[0][1][2], hoge[1][2], hoge[2]
         */
        findParamLike(key: string): Param | undefined;
        findMaxParamKeyVal(keyVals: string[], index: number, defaultValue?: number): number;
        toString(): string;
    }
}
declare module "src/Dat" {
    import Obj from "src/Obj";
    export class Dat {
        _objs: Obj[];
        constructor(original: string);
        get objs(): Obj[];
        findObjs(key: string, value: string): Obj[];
        toString(): string;
    }
}
