import fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider{


     static getDataFromJsonFile(path : string) : any
     {
           const Data:any = JSON.parse(fs.readFileSync(path , "utf-8"));
           return Data;
     }


     static getDataFromCSVFile(path : string) : any
     {
           const Data : any= parse(fs.readFileSync(path) , {columns:true,skip_empty_lines:true});
           return Data;
     }

}