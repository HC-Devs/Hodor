import {BaseModel} from "./BaseModel";

export class Module extends BaseModel {

    public name: string;
    public type: number;

    constructor(id: string, name: string, type: number) {
        super(id);

        this.name = name;
        this.type = type;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.name, String(this.type));
    }
}