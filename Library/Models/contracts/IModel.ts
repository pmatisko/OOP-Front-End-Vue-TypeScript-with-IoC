import {IAssocAny, IAssocString} from "../../Types/Associative types";

export interface IModel
{

    id : number|null;

    setAttributes(attributes : IAssocAny, ignoreEmpty : boolean, recursiveSet : boolean) : void;

    toApiArray (attrSetName : string) : IAssocAny;

    getUnique() : string;

    getUniqueValue() : any;
}