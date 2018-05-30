"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class Module extends BaseModel_1.BaseModel {
    constructor(id, name, type) {
        super(id);
        this.name = name;
        this.type = type;
    }
    getArray() {
        return Array(this.id, this.name, String(this.type));
    }
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map