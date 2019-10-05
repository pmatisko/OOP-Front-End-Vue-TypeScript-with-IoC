import {StatusMessage} from "./StatusMessage";

export class StatusMessageFactory
{

    constructor ()
    {
    }


    public create (text : string, type? : string, displayTime? : number) : StatusMessage
    {
        return new StatusMessage(text, type, displayTime);
    }

}