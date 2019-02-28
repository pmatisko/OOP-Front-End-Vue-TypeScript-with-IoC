export interface IBindClass
{
    singleton: boolean;
    isClosure: boolean;
    classDefinition: object;
    dependencies: Array<string>;
    closure : any;
}