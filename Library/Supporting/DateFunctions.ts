import {IAssocNumber} from "../Types/Associative types";

export class DateFunctions
{

    public static yearMonthToCode(year : number, month : number) : number
    {
        return year * 100 + month;
    }


    public static codeToYearMonth(monthCode : number) : IAssocNumber
    {
        let year = Math.round(monthCode/100);
        let month = Math.round((monthCode / 100 - year) * 100);

        return {year : year, month : month};
    }

}


