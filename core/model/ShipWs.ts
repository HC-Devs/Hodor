import {BaseModel} from "./BaseModel";

export class ShipWs extends BaseModel {


    wsId: number;
    shipId: number;
    destructDate: Date;

    constructor(id: string, wsId: number, shipId: number, destructTime: Date) {
        super(id);

        this.wsId = wsId;
        this.shipId = shipId;
        this.destructDate = destructTime;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.wsId.toString(), this.shipId.toString(), this.destructDate.toISOString());
    }
}