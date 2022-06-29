/* eslint-disable no-console */
import fs from 'fs';
import util from 'util';

const appendFile = util.promisify(fs.appendFile);

const fontColors = {
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

class Logger {
  private _logFilePath = '/../../.log';

  private _padTime(x: number) {
    return x.toString().padStart(2, '0');
  }

  private _getNiceDateTime() {
    const date = new Date();

    return '[' +
      this._padTime(date.getDay()) + '.' +
      this._padTime(date.getMonth() + 1) + '.' +
      this._padTime(date.getFullYear()) + ' ' +
      this._padTime(date.getHours()) + ':' +
      this._padTime(date.getMinutes()) + ':' +
      this._padTime(date.getSeconds()) + ':' +
      this._padTime(date.getMilliseconds()) +
    ']';
  }

  private _colorize(str: string, color: keyof typeof fontColors) {
    return fontColors[color] + str + fontColors.white;
  }

  private _getPrefix(level: string) {
    return `${this._getNiceDateTime()} ${level}: `;
  }

  private _writeLog(prefix: string, ...args: unknown[]) {
    const log = args
      .map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg)
      .join(' ');

    appendFile(__dirname + this._logFilePath, prefix + log + '\n')
      .catch(e => console.error(e.code, e.message));
  }

  log(...args: unknown[]) {
    const prefix = this._getPrefix('LOG');

    console.log(this._colorize(prefix, 'green'), ...args);
  }

  info(...args: unknown[]) {
    const prefix = this._getPrefix('INFO');

    console.log(this._colorize(prefix, 'cyan'), ...args);
    this._writeLog(prefix, ...args);
  }

  warn(...args: unknown[]) {
    const prefix = this._getPrefix('WARN');

    console.warn(this._colorize(prefix, 'yellow'), ...args);
    this._writeLog(prefix, ...args);
  }

  error(...args: unknown[]) {
    const prefix = this._getPrefix('ERROR');

    console.error(this._colorize(prefix, 'red'), ...args);
    this._writeLog(prefix, ...args);
  }

  write(...args: unknown[]) {
    const prefix = this._getPrefix('WRITE');

    this._writeLog(prefix, ...args);
  }
}

export default new Logger();