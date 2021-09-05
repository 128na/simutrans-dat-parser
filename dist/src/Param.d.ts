import Key from "./Key";
import Value from "./Value";
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
