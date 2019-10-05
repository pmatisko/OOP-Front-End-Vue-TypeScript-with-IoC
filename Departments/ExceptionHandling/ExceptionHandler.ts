'use strict';

import { ServerExceptions } from "../Communication/ServerExceptions";
import  Vue  from 'vue';
import {ExceptionFactory} from "./Factories/ExceptionFactory";
import {StatusMessageQueue} from "../Status messages/StatusMessageQueue";

export class ExceptionHandler
{

    private _eventBus : any;
    private _exceptionNotificationName : string;
    private _exceptionFactory : ExceptionFactory;
    private _statusMessageQueue : StatusMessageQueue | undefined;

    constructor (eventBus : Vue, exceptionFactory : ExceptionFactory, statusMessageQueue? : StatusMessageQueue, exceptionNotificationName : string = 'thrownException')
    {
        this._eventBus = eventBus;
        this._exceptionNotificationName = exceptionNotificationName;
        this._exceptionFactory = exceptionFactory;
        this._statusMessageQueue = statusMessageQueue;
    }


    handleException (exception : any, displayStatusMessage : boolean = true, statusMessageType : string = 'error', notificationName : string = '')
    {

        if(exception instanceof ServerExceptions) {
            this._eventBus.$emit(notificationName === '' ? this._exceptionNotificationName : notificationName, exception);

            if(displayStatusMessage && this._statusMessageQueue !== undefined) {
                this._statusMessageQueue.createMessage(exception.getExceptionMessage(), statusMessageType);
            }

            return exception;
        }
        else {
            console.log('ExceptionHandler says:');
            throw exception;
        }
    }


    throwServerException (data : any, httpData : any) : void
    {
        console.log('handler:');
        console.log(this._exceptionFactory.createServerException(data, httpData));

        throw this._exceptionFactory.createServerException(data, httpData);
    }


}


