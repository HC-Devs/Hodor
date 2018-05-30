"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class User extends BaseModel_1.BaseModel {
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
//# sourceMappingURL=User.js.map