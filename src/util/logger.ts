/* eslint-disable no-console */
import fs from 'fs';
import util from 'util';

const appendFile = util.promisify(fs.appendFile);

class Logger {
  private _logFilePath = '/../../bot.log';
  private _fontColors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  };

  constructor() {}

  private _padTime(x: number) {
    return x.toString().padStart(2, '0');
  }

  private _getPrefix(level: string) {
    const date = new Date();
    const time = '[' +
      this._padTime(date.getDay()) + '.' +
      this._padTime(date.getMonth() + 1) + '.' +
      this._padTime(date.getFullYear()) + ' ' +
      this._padTime(date.getHours()) + ':' +
      this._padTime(date.getMinutes()) + ':' +
      this._padTime(date.getSeconds()) + ':' +
      this._padTime(date.getMilliseconds()) +
    ']';

    return `${time} ${level}: `;
  }

  private _colorize(str: string, color: string) {
    return color + str + this._fontColors.white;
  }

  private _writeLog(log: string) {
    appendFile(__dirname + this._logFilePath, log + '\n')
      .catch(e => console.error(e.code, e.message));
  }

  log(...args: unknown[]) {
    const prefix = this._getPrefix('LOG');

    console.log(this._colorize(prefix, this._fontColors.green), ...args);
  }

  info(...args: unknown[]) {
    const prefix = this._getPrefix('INFO');

    console.log(this._colorize(prefix, this._fontColors.cyan), ...args);
    this._writeLog(prefix + args.join(' '));
  }

  warn(...args: unknown[]) {
    const prefix = this._getPrefix('WARN');

    console.warn(this._colorize(prefix, this._fontColors.yellow), ...args);
    this._writeLog(prefix + args.join(' '));
  }

  error(...args: unknown[]) {
    const prefix = this._getPrefix('ERROR');

    console.error(this._colorize(prefix, this._fontColors.red), ...args);
    this._writeLog(prefix + args.join(' '));
  }
}

export default new Logger();