
export class ModuleType {
    
    public static readonly FS: Number = 1;
    public static readonly B: Number = 2;
    public static readonly A: Number = 3;
    public static readonly TS: Number = 4;
    public static readonly SS: Number = 5;
    public static readonly BS: Number[] = [ModuleType.B,ModuleType.A];

    static TYPE_OF_MODULE : Map<Number, string> = new Map([[ModuleType.FS,"Minage"],[ModuleType.B,"Bouclier"],[ModuleType.A,"Arme"],[ModuleType.TS,"Transport"],[ModuleType.SS,"Support"]]);

    public filter(typemodule: string) {
        
    }
}

