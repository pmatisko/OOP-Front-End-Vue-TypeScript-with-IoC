import {IAssocAny, IAssocString} from "../Types/Associative types";
import {IModel} from "./contracts/IModel";


export class Model implements IModel
{

    // NOTE: Do not use two class members with the names that just differ in using _.  public var; private _var;  <-- don't use this

    public id : number|null = null;

    protected readonly _unique = 'id';   //which of the attributes is unique for each model

    /* empty value means, use the key - this prevents repeating key-value if they are identical */
    protected readonly _setableAttributes : IAssocString = {};

    protected readonly _toApiArrayMaps : IAssocAny = {
        /*  example:

        'setName' : {
            'attrName1' : 'apiName1',
            'attrName2' : 'apiName2',
            'attrName3' : ''    //to avoid repeating same attr name
        }
         */
    };

    constructor ()
    {

    }


    /**
     * If any of the attributes implement setAttributes function, it can be called, instead simple assigning input data to the variable
     * @param attributes
     * @param ignoreEmpty
     * @param recursiveSet
     */
    public setAttributes(attributes : IAssocAny, ignoreEmpty : boolean = false, recursiveSet : boolean = false ) : void
    {

        let trueAttrName : string;

        for(let attr in attributes) {

            trueAttrName = attr;

            if(!this.hasOwnProperty(attr)) {             //property of the selected name does not exist
                if(!this.hasOwnProperty('_' + attr))     //try the same name with _, e.g.  data or _data
                    continue;
                trueAttrName = '_' + attr;
            }

            if(this._setableAttributes.hasOwnProperty(attr)) {

                if(recursiveSet && this[trueAttrName] && typeof this[trueAttrName].setAttributes === 'function') {
                    this[trueAttrName].setAttributes(attributes[attr]);
                }
                else if(this._setableAttributes[attr] === '') {
                    if(!ignoreEmpty || (ignoreEmpty && attributes[attr] !== null && attributes[attr] !== undefined)) {
                        this[trueAttrName] = attributes[attr];
                    }

                }
                else {
                    if(!ignoreEmpty || (ignoreEmpty && attributes[attr] !== null && attributes[attr] !== undefined)) {
                        this[this._setableAttributes[attr]] = attributes[attr];
                    }
                }
            }
        }
    }


    public toApiArray (attrSetName : string = 'setable') : IAssocAny
    {
        let outAttributes : IAssocAny = {};

        let selectedAttrs = attrSetName === 'setable'
            ?  this._setableAttributes
            :  this._toApiArrayMaps[attrSetName];

        let trueAttrName;

        for(let attr in selectedAttrs) {

            trueAttrName = attr;

            if(!this.hasOwnProperty(attr)) {           //property of the selected name does not exist
                if(!this.hasOwnProperty('_' + attr))     //try the same name with _, e.g.  data or _data
                    continue;
                trueAttrName = '_' + attr;
            }

            if(selectedAttrs[attr] === '') {
                outAttributes[attr] = this[trueAttrName];
            }
            else {
                outAttributes[selectedAttrs[attr]] = this[selectedAttrs[attr]];
            }
        }

        return outAttributes;
    }


    public toArray(selectedAttrs : Array<string>) : IAssocAny
    {
        let outAttributes : IAssocAny = {};

        let trueAttrName;

        for(let attr of selectedAttrs) {

            trueAttrName = attr;

            if(!this.hasOwnProperty(attr)) {           //property of the selected name does not exist
                if(!this.hasOwnProperty('_' + attr))     //try the same name with _, e.g.  data or _data
                    continue;
                trueAttrName = '_' + attr;
            }

            outAttributes[attr] = this[trueAttrName];
        }

        return outAttributes;
    }


    public toApiMapContainsAttribute(attrSetName : string, attribute : string) : boolean
    {
        let selectedAttrs = attrSetName === 'setable'
            ?  this._setableAttributes
            :  this._toApiArrayMaps[attrSetName];

        return selectedAttrs.hasOwnProperty(attribute);
    }


    public get(attribute : string) : any   // ToDo add existance checking and throw exception if missing
    {
        return this[attribute];
    }


    public getUnique() : string
    {
        return this._unique;
    }

    public getUniqueValue() : any
    {
        return (this.hasOwnProperty(this._unique))
            ? this[this._unique]
            : undefined;
    }

}