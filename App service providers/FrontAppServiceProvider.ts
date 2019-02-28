import {IApp} from "../App core/Contracts/IApp";
import {ObserversRegistry} from "../Library/Observers/ObserversRegistry";
import  Vue  from 'vue';

declare var window : any;


export class FrontAppServiceProvider
{

    private _app: IApp;

    constructor(app: IApp)
    {
        this._app = app;
    }


    register()
    {
        this.registerEventBuses();
        this.registerObservers();
    }


    private registerEventBuses(): void
    {
        this._app.container.singletonClosure('EventBus', function (app)
        {
            return new Vue();
        });
    }

    private registerObservers(): void
    {
        this._app.container.bind('ObserversRegistry', ObserversRegistry);
    }
}
