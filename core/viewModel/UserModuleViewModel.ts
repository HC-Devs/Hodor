import { UserModule } from "../model/UserModule";
import { Module } from "../model/Module";
import { ModuleType } from "../model/ModuleType";

//const type_of_module : Map<Number, string> = new Map([[1,"Minage"],[2,"Bouclier"],[3,"Arme"],[4,"Transport"],[5,"Support"]]);

export class UserModuleViewModel extends UserModule {
    public moduleName : string;
    public moduleType : string;
    public moduleTypeId: number;
    constructor(userModule: UserModule, allModules : Array<Module>) {
        super(Number(userModule.id), userModule.userId, userModule.moduleId, userModule.level);

        let m = allModules.find (f => Number(f.id) === userModule.moduleId);
        this.moduleName = m.name;
        this.moduleType = ModuleType.TYPE_OF_MODULE.get(m.type);
        this.moduleTypeId = m.type;
    }
}