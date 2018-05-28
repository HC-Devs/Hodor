import {BaseModel} from '../model/basemodel';

export class User extends BaseModel {
  // id: string;
    name: string;
    corpo: string;

    constructor(id: string, name: string, corpo: string) {
        super(id);
      
        this.name = name;
        this.corpo = corpo;
    }

    public getArray(): Array<string>{
        return Array<string>(this.id, this.name, this.corpo );
    }

}