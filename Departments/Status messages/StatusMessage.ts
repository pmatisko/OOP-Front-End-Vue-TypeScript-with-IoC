

export class StatusMessage
{

    constructor (
        public text : string,
        public type : string = 'info',
        public displayTime : number = 8   //time in seconds
    )
    {
    }

}