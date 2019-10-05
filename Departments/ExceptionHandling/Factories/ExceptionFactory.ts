import {ServerExceptions} from "../../Communication/ServerExceptions";

export class ExceptionFactory
{

    public createServerException(data : any = {}, httpData : any = {})
    {
        let newException = new ServerExceptions();

        if(data.hasOwnProperty('code'))
            newException.code = data.code;
        if(data.hasOwnProperty('message'))
            newException.message = data.message;
        if(httpData.hasOwnProperty('status'))
            newException.httpCode = httpData.status;
        if(!data.hasOwnProperty('data'))
            data.data = [];

        for (let excpIdentifier in data.data) {
            newException.addException(excpIdentifier, data.data[excpIdentifier]);
        }

        return newException;
    }

}