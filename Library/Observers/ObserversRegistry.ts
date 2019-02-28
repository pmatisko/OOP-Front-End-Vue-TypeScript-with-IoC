import {IObserver} from "./Contracts/IObserver";
declare var console : any;


export class ObserversRegistry
{

    private _observers : Array<IObserver>;

    constructor ()
    {

        this._observers = [];
    }

    public attachObserver(observer : IObserver) : void
    {
        if(this._observers.indexOf(observer) === -1) {
            this._observers.push(observer);
        }
    }

    public detachObserver(observer : IObserver) : void
    {
        //to be implemented
    }

    public notify(eventName : string, value : any)
    {
        this._observers.forEach(observer => { observer.update(eventName, value) })
    }

}