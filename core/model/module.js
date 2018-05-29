"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basemodel_1 = require("./basemodel");
class Module extends basemodel_1.BaseModel {
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
//# sourceMappingURL=module.js.map