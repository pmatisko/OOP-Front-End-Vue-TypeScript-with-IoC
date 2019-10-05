import { BindClass } from './BindClass';
import {IBindClass} from "./Contracts/IBindClass";
import { Application} from './Application';


declare var console: any;


export class Container
{

    private _classes : Map<string, IBindClass>;
    private _singletons : Map<string, object>;
    private static _container : Container;
    private _app : Application | null;

    private constructor()
    {
         this._classes = new Map<string, IBindClass>();
         this._singletons = new Map<string, object>();    //singletons stored here for resolving
         this._app = null;

     }

    public static getInstance() : Container
    {
        return this._container || (this._container = new Container());
    }


    public setAppPointer (app : Application)
    {
        this._app = app;
    }

    public register(className : string, classDefinition : object, dependecies : Array<string> = [], singleton : boolean = false) : void
    {
           this._classes.set(className, new BindClass(classDefinition, dependecies, singleton, false, function () {}));
    }


    public registerWithClosure(className : string, closure : any, singleton = false) : void
    {
            this._classes.set(className, new BindClass({}, [], singleton, true, closure));
    }


    public resolve(className : string) : any
    {

        const cls = this._classes.get(className);

        if(!cls){
            throw 'Class ~' + className + '~ has not been registered.';
        }

        if(cls.isClosure === true) {
            return cls.singleton === true
                ? this.getSingletonWithClosure(className, cls)
                : this.getClassWithClosure(className, cls);
        }

        return cls.singleton === true
            ? this.getSingleton(className, cls)
            : this.createClass(cls);
    }


    public getClassWithClosure(className : string, cls : IBindClass)
    {
        return  cls.closure(this._app);
    }

    public getSingletonWithClosure(className : string , cls : IBindClass)
    {

        const instance = this._singletons.get(className);

        if(instance) {  //exists
            return instance;
        }
        else {
            const newSingleton = cls.closure(this._app);
            this._singletons.set(className, newSingleton);
            return newSingleton;
        }
    }

    public getSingleton(className : string, cls : IBindClass)
    {

        const instance = this._singletons.get(className);

        if(instance) {  //exists
           return instance;
        }
        else {
            const newSingleton = this.createClass(cls);
            this._singletons.set(className, newSingleton);
            return newSingleton;
        }
    }


    private createClass(cls : any) : object
    {

        let dependencies :Array<any> = this.resolveDependencies(cls.dependencies);
        return dependencies.length === 0 ? new cls.classDefinition () : new cls.classDefinition (...dependencies);
    }


    private resolveDependencies (dependencies : Array<string>) : Array<any>
    {
        let classDependencies : Array<any> = [];

        for(let dep of dependencies) {
            classDependencies.push (this.resolve(dep));
        }

        return classDependencies;
    }



    public bind(className : string, classDefinition : object, dependecies : Array<string> = []) : void
    {
        this.register(className, classDefinition, dependecies, false);
    }


    public singleton(className : string, classDefinition : object, dependecies : Array<string> = []) : void
    {
        this.register(className, classDefinition, dependecies, true);
    }


    public bindClosure(className : string, closure : (app : Application) => object) : void
    {
        this.registerWithClosure(className, closure, false);
    }


    public singletonClosure(className : string, closure : (app : Application) => object) : void
    {
        this.registerWithClosure(className, closure, true);
    }


}