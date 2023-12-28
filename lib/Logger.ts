export default class Logger{
    /** 
     * @loggingSystem 
     */
    public static log(...logData:any[]){
        if(true)console.log(logData)
    }

    public static error(...errData:any){
        console.error(errData)
    }
}