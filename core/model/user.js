"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basemodel_1 = require("../model/basemodel");
class User extends basemodel_1.BaseModel {
    constructor(id, name, corpo) {
        super(id);
        this.name = name;
        this.corpo = corpo;
    }
    getArray() {
        return Array(this.id, this.name, this.corpo);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map