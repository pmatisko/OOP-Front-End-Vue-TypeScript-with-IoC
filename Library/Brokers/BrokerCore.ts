import {IAPICommunicator} from "../../Communication/Contracts/IAPICommunicator";
import {IServerExceptions} from "../../Communication/Contracts/IServerExceptions";
import {IAssocString} from "../Types/Associative types";

import {ServerExceptions} from "../../Communication/ServerExceptions";

export class BrokerCore
{

    private _api : IAPICommunicator;
    private _serverExceptions : IServerExceptions;
    private _apiUrls : IAssocString;

    constructor (apiCommunicator : IAPICommunicator, serverExceptions : IServerExceptions)
    {
        this._api = apiCommunicator;
        this._serverExceptions = serverExceptions;
        this._apiUrls = {};
    }


    processExceptions (exception : any, identifierKey : string | null = null, identifier : string|null = null)   //creates ServerException from general http Exception object
    {

        if (exception instanceof ServerExceptions)    //exception filled by APICommunicator
            return exception;

        this._serverExceptions.clear();
        this._serverExceptions.message = exception.message.length > 0 ? exception.message : 'Something went wrong.';
        this._serverExceptions.code = exception.code  ? exception.code : '8800';
        this._serverExceptions.setExceptions(exception.data);

        if(identifier !== null && identifierKey !== null) {
            this._serverExceptions.addIdentifier(identifierKey, identifier);
        }


        return this._serverExceptions;
    }

    clearServerExceptions () : void
    {
        this._serverExceptions.clear();
    }


    prepareDataForApi ( data : any, head : IAssocString = {} )
    {
        return {
            "header" : {
                ...head
            },
            "body" : data
        }
    }


    async apiGet(link, params = {})
    {
        return await this._api.getData(link, params)
    }


    async getExternalData(link : string, params : IAssocString = {})
    {
        return await this._api.getExternalData(link, params);
    }


    async apiPost(link : string, data, params:IAssocString  = {}, head : IAssocString = {})
    {
        return await this._api.postData(link, this.prepareDataForApi(data, head), params);
    }

    async apiPut(link: string, data, params :IAssocString = {}, head : IAssocString = {})
    {
        return await this._api.putData(link, this.prepareDataForApi(data, head), params);
    }

    async apiPatch(link: string, data, params : IAssocString = {}, head : IAssocString = {})
    {
        return await this._api.patchData(link, this.prepareDataForApi(data, head), params);
    }


    async apiDelete(link, params = {})
    {
        return await this._api.deleteData(link, params);
    }


    get serverExceptions(): IServerExceptions
    {
        return this._serverExceptions;
    }

    set serverExceptions(value: IServerExceptions)
    {
        this._serverExceptions = value;
    }

    get api(): IAPICommunicator
    {
        return this._api;
    }

    set api(value: IAPICommunicator)
    {
        this._api = value;
    }


    //  saved for Brokers as example
    // getApiUrls (urlName)
    // {
    //
    //     return  this.apiUrls.hasOwnProperty(urlName)
    //         ? app.getAppLink() + '/api/' + this.apiUrls[urlName] + '?lang=' + this._languageProvider.getDataLanguage()
    //         : null;
    // }

}

