import {BaseModel} from "./BaseModel";

export class Ws extends BaseModel {

 
    startDate: Date;
    status: string;

    constructor(id: number, startDate: Date, status: string) {
        super(id.toString());

        this.startDate = startDate;
        this.status = status;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.startDate.toString(), this.status.toString());
    }
}