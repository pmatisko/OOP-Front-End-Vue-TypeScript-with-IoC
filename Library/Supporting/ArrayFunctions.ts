import {IAssocAny} from "../Types/Associative types";

export class ArrayFunctions
{

    /*
    *  nullAsEmpty - whether null value should be considered as missing in the array
    */
    public compareAssocArrays(array1 : IAssocAny, array2 : IAssocAny, properties : Array<string>, nullAsEmpty : boolean = false) : boolean
    {

        array1 = JSON.parse(JSON.stringify(array1));   //vue type of objects converted to regular JS objects
        array2 = JSON.parse(JSON.stringify(array2));

        for(let prop of properties) {

            if(array1.hasOwnProperty(prop) && array2.hasOwnProperty(prop)) {
                if(array1[prop] !== array2[prop]) {
                    return false;
                }
            }

            if(array1.hasOwnProperty(prop) && !array2.hasOwnProperty(prop)) {
                if(nullAsEmpty && array1[prop] !== null)
                    return false;
                else if(!nullAsEmpty)
                    return false;

            }

            if(!array1.hasOwnProperty(prop) && array2.hasOwnProperty(prop)) {
                if(nullAsEmpty && array2[prop] !== null)
                    return false;
                else if(!nullAsEmpty)
                    return false;
            }

        }
        return true;
    }


}