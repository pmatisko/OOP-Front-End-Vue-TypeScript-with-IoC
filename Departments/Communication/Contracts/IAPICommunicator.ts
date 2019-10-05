/*
* Created by Peter Matisko
* www.cyberma.net
*
* Licence: MIT
*
* */

import {IAssocString} from "../../../Library/Types/Associative types";

export interface IAPICommunicator
{
    getData(command: string, params : object): Promise<any>;

    postData(command: string, data: object, params : IAssocString, headers? : IAssocString): any;

    putData(command: string, data: object, params : IAssocString, headers? : IAssocString): Promise<object | void>;

    patchData(command: string, data: object, params : IAssocString, headers? : IAssocString): Promise<object | void>;

    deleteData(command: string, params : object): any;

    getExternalData (link : string, params :IAssocString) : Promise<any>
}