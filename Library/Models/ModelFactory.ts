import {IAssocAny} from "../Types/Associative types";
import {IModelFactory} from "./contracts/IModelFactory";
import {IModel} from "./contracts/IModel";


export class ModelFactory<M extends IModel> implements IModelFactory<M>
{

    protected _modelType : new () => M;

    constructor (modelType)
    {
        this._modelType = modelType;
    }

    public createModel (attributes : IAssocAny = {}, ignoreEmpty : boolean = false, recursiveSet : boolean = false) : M
    {
        let model = new this._modelType();
        model.setAttributes(attributes, ignoreEmpty, recursiveSet);

        return model;
    }

}
