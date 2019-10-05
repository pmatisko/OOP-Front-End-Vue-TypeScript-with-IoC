/*
* Created by Peter Matisko
* www.cyberma.net
*
* Licence: MIT
*
* */


import   { AxiosInstance }  from 'axios';
import {ObserversRegistry} from "../../Library/Observers/ObserversRegistry";
import {IAPICommunicator} from "./Contracts/IAPICommunicator";
import {IAssocString} from "../../Library/Types/Associative types";
import {ExceptionHandler} from "../ExceptionHandling/ExceptionHandler";

declare var console : any;

export class APICommunicator implements IAPICommunicator {


    public _apiLink : string;
    private _axios : AxiosInstance;
    private _observers : ObserversRegistry;
    private _exceptionHandler : ExceptionHandler;

    constructor (axios : AxiosInstance, apiLink : string, observerRegistry : ObserversRegistry, exceptionHandler : ExceptionHandler)
    {
        this._apiLink = apiLink;
        this._axios = axios;
        this._observers = observerRegistry;
        this._exceptionHandler = exceptionHandler;
    }


    public getData (command : string, params = {}) : Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.get(this._apiLink + command + paramsString)
            .then (response => {

                this._observers.notify('loading', false);
                return response.data;
            })
            .catch(error => {
                this._observers.notify('loading', false);
                this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
                this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
            });
    }


    public postData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.post(this._apiLink + command + paramsString, data, {
            headers : {
                contentType: "application/json",
                ...headers
            }
        })
            .then (response => {
                this._observers.notify('loading', false);
                return response.data;
            })
            .catch(error => {
                this._observers.notify('loading', false);
                this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
                this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
            });
    }


    public putData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.put(this._apiLink + command + paramsString, data,  {
            headers : {
                contentType: "application/json",
                ...headers
            },
        })
            .then (response => {
                this._observers.notify('loading', false);
                return response.data;
            })
            .catch(error => {
                this._observers.notify('loading', false);
                this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
                this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
            });

    }


    public patchData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.patch(this._apiLink + command + paramsString, data, {
            headers : {
                contentType: "application/json",
                ...headers
            }
        })
        .then (response => {
            this._observers.notify('loading', false);
            return response.data;
        })
        .catch(error => {
            this._observers.notify('loading', false);
            this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
            this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
        });
    }


    public deleteData (command : string, params = {}): Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return  this._axios.delete(this._apiLink + command + paramsString)
        .then (response => {
            this._observers.notify('loading', false);
            return response.data;
        })
        .catch(error => {
            this._observers.notify('loading', false);
            this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
            this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
        });
    }


    private getResponseData(response : any) : object
    {

        return {
            status : response.status,
            statusText : response.statusText,
        }
    }


    private prepareUrlParameters (params : any) : string
    {
        let paramsString ='';

        if (typeof params === 'object') {
            paramsString = "?";

            for(let pn in params) {
                paramsString += pn + "=" + params[pn] + "&";
            }
            paramsString = paramsString.substring(0, paramsString.length - 1);  //remove tail &
        }

        return paramsString;
    }


    public getExternalData (link : string, params :IAssocString = {}) : Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.get(link + paramsString)
            .then (response => {

                this._observers.notify('loading', false);
                return response;
            })
            .catch(error => {
                this._observers.notify('loading', false);
                this._observers.notify('exception', error);
                this._exceptionHandler.throwServerException(error, {status: 400, statusText : 'Error'});
            });
    }


}




