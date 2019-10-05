import {IApp} from "../App core/Contracts/IApp";
import {ObserversRegistry} from "../Library/Observers/ObserversRegistry";
import {ExceptionHandler} from "../Departments/ExceptionHandling/ExceptionHandler";
import {APICommunicator} from "../Departments/Communication/APICommunicator";
import { ServerExceptions } from "../Departments/Communication/ServerExceptions";
import  Vue  from 'vue';
import Axios  from 'axios';

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
        this.registerCommunication();
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


    private registerCommunication() : void
    {

        this._app.container.singletonClosure('APICommunicator', function(app)  {

            Axios.defaults.headers.common = {
                'X-CSRF-TOKEN': window.csrf,
                'X-Requested-With': 'XMLHttpRequest'
            };

            let observersRegistry = <ObserversRegistry>app.container.resolve('ObserversRegistry');
            observersRegistry.attachObserver(app.container.resolve('APICommObserver'));

            let exceptionHandler = <ExceptionHandler>app.container.resolve('ExceptionHandler');

            return new APICommunicator(Axios, app.getLink() + '/api/', observersRegistry, exceptionHandler);
        });

        this._app.container.bind('ServerExceptions', ServerExceptions);
    }

}
