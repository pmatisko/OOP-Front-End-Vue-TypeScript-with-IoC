

export class NumberFunctions
{

    public static round(value : number, decimals : number = 2) : number
    {
        return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
    }

    public static parseMinutes(minutes : number) : number
    {
        minutes = Math.round(minutes);

        if(minutes > 59) {
            minutes = 59;
        }
        else if(minutes < 0) {
            minutes = 0;
        }

        return minutes;
    }

}
