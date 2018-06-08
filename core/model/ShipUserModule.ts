import {BaseModel} from "./BaseModel";

export class ShipUserModule extends BaseModel {

    shipId: number;
    userModuleId: number;
    lastActivationDate: Date;

    constructor(id: number, shipId: number, userModuleId: number, lastActivationDate : Date) {
        super(id.toString());

        this.shipId = shipId;
        this.userModuleId = userModuleId;
        this.lastActivationDate = lastActivationDate;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.shipId.toString(), this.userModuleId.toString(), this.lastActivationDate.toISOString());
    }
}