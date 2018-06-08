import { UserModule } from "../model/UserModule";
import { Module } from "../model/Module";

const type_of_module : Map<Number, string> = new Map([[1,"Minage"],[2,"Bouclier"],[3,"Arme"],[4,"Transport"],[5,"Support"]]);

export class UserModuleViewModel extends UserModule {
    public moduleName : string;
    public moduleType : string;
    constructor(userModule: UserModule, allModules : Array<Module>) {
        super(Number(userModule.id), userModule.userId, userModule.moduleId, userModule.level);

        let m = allModules.find (f => Number(f.id) === userModule.moduleId);
        this.moduleName = m.name;
        this.moduleType = type_of_module.get(m.type);
    }
}