
import XRegExp from 'xregexp';

export default class XRegExpFactory
{

    public createRegExp(rule : string)
    {
        return new XRegExp(rule);
    }


}