import {IAssocAny, IAssocType} from "../Types/Associative types";
import {IModelFactory} from "../Models/contracts/IModelFactory";
import {IModel} from "../Models/contracts/IModel";



export class ApiMapper<M extends IModel, MF extends IModelFactory<M>>
{

    protected _modelFactory: IModelFactory<M>;

    constructor(modelFactory : IModelFactory<M>)
    {
        this._modelFactory = modelFactory;
    }


    public mapApiDataToSingleModel (apiData : IAssocAny, ignoreEmpty : boolean = true, recursiveSet : boolean = false) : M
    {
        return this._modelFactory.createModel(apiData, ignoreEmpty, recursiveSet);
    }


    public mapApiDataToModelsArray (apiModels : Array<any>, ignoreEmpty : boolean = true, recursiveSet : boolean = false) : Array<M>
    {

        if(typeof apiModels === 'object') {  //in case apiModels is an associative array
            apiModels = Object.keys(apiModels).map(key => apiModels[key]);
        }

        let modelsSimpleArray : Array<M> = [];
        let model : M;

        for(const apiModel of apiModels) {
            model = this.mapApiDataToSingleModel(apiModel, ignoreEmpty, recursiveSet);
            modelsSimpleArray.push(model);
        }

        return modelsSimpleArray;
    }


    public mapApiDataToModelsAssocArray (apiModels : Array<any>, ignoreEmpty : boolean = true, recursiveSet : boolean = false) : IAssocType<M>
    {
        if(typeof apiModels === 'object') {  //in case apiModels is an associative array
            apiModels = Object.keys(apiModels).map(key => apiModels[key]);
        }

        let modelsArray : IAssocType<M> = {};
        let model : M;

        for(const apiModel of apiModels) {

            model = this.mapApiDataToSingleModel(apiModel, ignoreEmpty, recursiveSet);

            if(model.id !== null)
                modelsArray[model.id] = model;
        }

        return modelsArray;
    }


}