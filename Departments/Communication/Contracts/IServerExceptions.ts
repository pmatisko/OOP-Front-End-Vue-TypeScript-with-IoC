/*
* Created by Peter Matisko
* www.cyberma.net
*
* Licence: MIT
*
* */

import {
    IAssocAny,
    IAssocString
} from "../../../Library/Types/Associative types";

export interface IServerExceptions
{

    exceptions : IAssocAny;
    message : string;
    code : string;

    clear () : void;

    setExceptions(errors: IAssocAny): void;

    addException(identifier: string, error: IAssocAny): void

    getException(identifier: string): IAssocAny | null;

    getExceptions(): IAssocAny;

    getExceptionMessage(identifier: string): any;

    addIdentifier(key : string, identifier: string) : void

    checkIdentifier(key : string, identifier: string): boolean;

    has(identifier: string): boolean;

    hasExceptions(): boolean;

    first(identifier: string): any;
}