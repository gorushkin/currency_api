import { getCurrentDateTime } from './dates';

type Line = {
  type: string;
  date: string;
  message: string;
};

class Logger {
  private lines: Line[] = [];

  log(type: string) {
    return (message: string) => {
      const date = getCurrentDateTime();
      const line: Line = { type, date, message };
      console.log(`${date} [${type}] ${message}`);
      this.lines.push(line);
    };
  }

  print() {
    console.log(this.lines.join('\n'));
  }

  clear() {
    this.lines = [];
  }
}

export const logger = new Logger();
