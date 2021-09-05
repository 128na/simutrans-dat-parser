import Param from "./Param";
export default class Obj {
    _line: number;
    _params: Param[];
    constructor(original: string, line?: number);
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
