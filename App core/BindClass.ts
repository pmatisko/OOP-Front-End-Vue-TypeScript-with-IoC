import { IBindClass } from './Contracts/IBindClass';

export class BindClass implements IBindClass
{

    constructor (public classDefinition: object,
                 public dependencies: Array<string>,
                 public singleton: boolean,
                 public isClosure: boolean,
                 public closure :  any)
    {

    }
}