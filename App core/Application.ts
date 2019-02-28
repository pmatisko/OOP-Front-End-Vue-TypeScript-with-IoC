import {Container} from "./Container";
import {IApp} from "./Contracts/IApp";
import {IAssocAny} from "../Library/Types/Associative types";

declare var window : any;

export class Application implements IApp
{

    public static app : Application;
    private _csrf : string;
    private _link : string;
    private _locale : string;

    readonly container : Container;



    private constructor(container : Container)
    {
        this.container = container;
        this._csrf = window.csrf;
        this._link = window.link;   //web url
        this._locale = window.locale;

    }


    public static getInstance(container : Container | null)
    {
        if(container === null) {
            return this.app;
        }

        this.app = new Application(container);

        return this.app;
    }

    public getCsrf(): string
    {
        return this._csrf;
    }


    public getLocale(): string
    {
        return this._locale;
    }

    public getLink(): string
    {
        return this._link;
    }

    public resolve(className: string): any
    {
        return this.container.resolve(className)
    }

}


export function appInstance() { return Application.app}