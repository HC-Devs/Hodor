import {BaseModel} from "./BaseModel";

export class Ship extends BaseModel {

    public name: string;
    public type: number;
    public fkUserId: string;

    constructor(id: string, name: string, type: number, fkUserId: string) {
        super(id);

        this.name = name;
        this.type = type;
        this.fkUserId = fkUserId;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.name, String(this.type), this.fkUserId);
    }
}