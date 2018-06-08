import {BaseModel} from "./BaseModel";

export class UserModule extends BaseModel {

    userId: string;
    moduleId: number;
    level: number;

    constructor(id: number, userId: string, moduleId: number, level : number) {
        super(id.toString());

        this.userId = userId;
        this.moduleId = moduleId;
        this.level = level;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.userId.toString(), this.moduleId.toString(), this.level.toString());
    }
}