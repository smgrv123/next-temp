export default class Logger {
  /**
   * @loggingSystem
   */
  public static log(...logData: any[]) {
    // ! add env variable handling
    if (true) console.log(logData);
  }

  public static error(...errData: any) {
    console.error(errData);
  }
}
