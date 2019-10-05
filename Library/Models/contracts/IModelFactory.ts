import {IAssocAny} from "../../Types/Associative types";
import {IModel} from "./IModel";


export interface IModelFactory<M extends IModel>
{
    createModel (attributes : IAssocAny, ignoreEmpty? : boolean, recursiveSet? : boolean) : M
}