import {Vue} from "vue/types/vue";
import {StatusMessage} from "./StatusMessage";
import {StatusMessageFactory} from "./StatusMessageFactory";


export class StatusMessageQueue
{
    private _eventBus : Vue;
    private _messageQueue : Array<StatusMessage>;
    private _statusMessageFactory : StatusMessageFactory|undefined;

    constructor (eventBus : Vue, statusMessageFactory? : StatusMessageFactory)
    {
        this._eventBus = eventBus;
        this._messageQueue = [];
        this._statusMessageFactory = statusMessageFactory;
    }


    public createMessage (text : string, type : string = 'info', displayTime : number = 8) : void
    {
        if (this._statusMessageFactory === undefined) {
            throw {message : 'StatusMessageFactory has not been added to StatusMessageQueue', code : '8803' };
        }

        let message = this._statusMessageFactory.create(text, type, displayTime);
        this.addMessage(message);
    }


    public addMessage (message : StatusMessage ) : void
    {
        this._messageQueue.push (message);
        this._eventBus.$emit('newStatusMessage', this);
    }


    public getMessage () : StatusMessage | null
    {
        return this.messageAvailable()
            ? <StatusMessage>this._messageQueue.shift()
            : null
    }


    public messageAvailable() : boolean
    {
        return this._messageQueue.length > 0;
    }

}