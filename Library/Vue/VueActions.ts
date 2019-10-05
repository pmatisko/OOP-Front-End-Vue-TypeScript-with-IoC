import {Vue} from "vue/types/vue";
import {IAssocAny} from "../Types/Associative types";


export class VueActions
{

    public actions : Vue;

    constructor(vue : Vue)
    {
        this.actions = vue;
    }


    public doAction (eventName : string, params : IAssocAny ) : void
    {
        this.actions.$emit(eventName, params);
    }


    public $on(event: string | string[], callback: Function) : Vue
    {
        return this.actions.$on(event, callback);
    }

}