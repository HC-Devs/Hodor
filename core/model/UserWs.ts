import {BaseModel} from "./BaseModel";

export class UserWs extends BaseModel {

 
    public wsId: number;
    public userId: string;

    constructor(id: number, userId: string, wsId: number) {
        super(id.toString());

        this.userId = userId;
        this.wsId = wsId;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.userId.toString(), this.wsId.toString());
    }
}