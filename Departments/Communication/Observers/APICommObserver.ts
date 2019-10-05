import {IObserver} from "../../../Library/Observers/Contracts/IObserver";
import {Vue} from "vue/types/vue";
import {ServerExceptions} from "../ServerExceptions";

declare var console : any;

export class APICommObserver implements IObserver
{

    constructor (public eventBus : Vue)
    {

    }

    public update (key : string, value : any) : void
    {
        switch(key) {

            case 'loading' :
                this.eventBus.$emit('loading', <boolean>value) ;
                break;
            case 'error' :
                this.eventBus.$emit('loading', <ServerExceptions>value);
        }
    }

}