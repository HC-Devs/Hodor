import {BaseModel} from "./BaseModel";

export class Ws extends BaseModel {

 
    public startDate: Date;
    public status: Number;

    constructor(id: number, startDate: Date, status: Number) {
        super(id.toString());

        this.startDate = startDate;
        this.status = status;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.startDate.toString(), this.status.toString());
    }
}