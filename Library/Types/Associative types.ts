import {AsyncComponent} from "vue";


export interface IAssocString
{
    [key : string] : string;
}


export interface IAssocBoolean
{
    [key : string] : boolean;
}


export interface IAssocObject
{
    [key : string] : object;
}


export interface IAssocAny
{
    [key : string] : any;
}


export interface IAssocNumber
{
    [key : string] : number;
}


export interface IAssocAsyncComponent
{
    [key : string] : AsyncComponent;
}


export interface IAssocType<T>
{
    [key : string] : T;
}