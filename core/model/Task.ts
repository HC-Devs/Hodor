import {BaseModel} from "./BaseModel";

export class Task extends BaseModel {

    public userId : string;
    public authorId: string;
    public content : string;
    public deadline: Date;
    public  ack: number;
    public type: number;


    constructor(id: number, userId: string, authorId: string, content: string, deadline: Date, ack: number, type: number) {
        super(id.toString());

        this.ack = ack;
        this.authorId = authorId;
        this.content = content;
        this.deadline = deadline;
        this.type = type;
        this.userId = userId;
    }

    getArray(): Array<string> {
        return Array<string>(this.id, this.userId.toString(), this.authorId.toString(), this.content.toString(), this.deadline.toString(), this.ack.toString(), this.type.toString());
    }
}