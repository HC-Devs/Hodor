import {BaseModel} from "./BaseModel";

export class UserWsRole extends BaseModel {

    public userWsId: number;
    public roleName: string;

    constructor(id: number, userWsId: number, roleName: string) {
        super(id.toString());

        this.userWsId = userWsId;
        this.roleName = roleName;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.userWsId.toString(), this.roleName.toString());
    }
}