/*
*  Generic abstract class 
*  Give base methods/attributs common to all model
*  All model must override this class
*/
export abstract class BaseModel {
    public id: string;

    protected constructor(id: string) {
        this.id = id;
    }

    /*
    * Generate array of model data
    * Used for debug purpose
    */
    public abstract getArray(): Array<string>;
}