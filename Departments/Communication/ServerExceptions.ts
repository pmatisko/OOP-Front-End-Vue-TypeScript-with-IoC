/*
* Created by Peter Matisko
* www.cyberma.net
*
* Licence: MIT
*
* */

import {IAssocAny, IAssocString} from "../../Library/Types/Associative types";
import {IServerExceptions} from "./Contracts/IServerExceptions";


export class ServerExceptions implements IServerExceptions
{

    private _identifiers : IAssocString = {};
    private _exceptions : IAssocAny = {};
    private _message : string ='';
    private _code : string = '';
    private _httpCode : number | null = null;

    constructor ()
    {
        this.clear();
    }


    clear () : void
    {
        this._identifiers = {};
        this._exceptions = {};
        this._message = 'Something went wrong.';
        this._code = '8800';
    }


    setExceptions(errors: IAssocAny): void
    {
        if (errors)
            this._exceptions = errors;
    }

    addException(identifier: string, error: IAssocAny): void
    {
        if (error)
            this._exceptions[identifier] = error;
    }

    getException(identifier: string): IAssocAny | null
    {
        if (this._exceptions.hasOwnProperty(identifier)) {
            return this._exceptions[identifier];
        }
        else {
            return null;
        }
    }

    getExceptions(): IAssocAny
    {
        return this._exceptions;
    }

    getExceptionMessage(identifier: string | undefined = undefined)
    {

        if (identifier === undefined) {
            return '(e' + this._code + '): ' + this._message;
        }

        if (this._exceptions.hasOwnProperty(identifier)) {
            return this._exceptions[identifier];
        }
        else {
            return null;
        }
    }

    addIdentifier(key : string, identifier: string) : void
    {
        this._identifiers[key] = String(identifier);
    }

    checkIdentifier(key : string, identifier: string): boolean
    {
        if (this._identifiers.hasOwnProperty(key)) {
            if (this._identifiers[key] == String(identifier)) {
                return true;
            }
        }
        return false;
    }

    has(identifier: string): boolean
    {
        return this._exceptions.hasOwnProperty(identifier);
    }

    hasExceptions()
    {

        return !this._exceptions || !this._identifiers;
    }

    first(identifier: string)
    {
        if (this._exceptions.hasOwnProperty(identifier)) {
            return this._exceptions[identifier].constructor === Array ? this._exceptions[identifier][0] : this._exceptions[identifier];
        }
    }

    get httpCode(): number | null
    {
        return this._httpCode;
    }

    set httpCode(value: number | null)
    {
        this._httpCode = value;
    }

    get code(): string
    {
        return this._code;
    }

    set code(value: string)
    {
        this._code = value;
    }
    get message(): string
    {
        return this._message;
    }

    set message(value: string)
    {
        this._message = value;
    }
    get exceptions(): IAssocAny
    {
        return this._exceptions;
    }

    set exceptions(value: IAssocAny)
    {
        this._exceptions = value;
    }
}


