import {Container} from "../Container";

export interface IApp
{
    getCsrf(): string;

    getLocale(): string;

    getLink(): string;

    resolve(className: string): object;

    readonly container : Container;
}