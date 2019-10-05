/*
* Created by Peter Matisko
* www.cyberma.net
*
* Licence: MIT
*
* */

export default class Exception
{

    public code : string;
    public message : string;
    public httpCode : number;
    public data : any;
    public httpData : any;

    constructor (data : any = {}, httpData : any = {statusCode : 400})
    {

        this.code = '8801';
        this.message = 'Something went wrong.';
        this.httpCode = httpData.statusCode;
        this.data = {};
        this.httpData = httpData;

        if (data.hasOwnProperty('code')) {
            this.code = data.code;
        }

        if (data.hasOwnProperty('message')) {
            this.message = data.message;
        }

        if (data.hasOwnProperty('data')) {
            this.data = data.data;
        }
    }
}
