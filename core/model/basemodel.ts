﻿export abstract class BaseModel {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
    public abstract getArray(): Array<string>;
  
}