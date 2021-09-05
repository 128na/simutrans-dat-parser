import Obj from "./Obj";
export default class Dat {
    _objs: Obj[];
    constructor(original: string);
    get objs(): Obj[];
    findObjs(key: string, value: string): Obj[];
    toString(): string;
}
