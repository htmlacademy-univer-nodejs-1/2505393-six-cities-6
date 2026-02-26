type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArg: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const arg of cliArg) {
      if(arg.startsWith('--')) {
        parsedCommand[arg] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        parsedCommand[currentCommand].push(arg);
      }
    }

    return parsedCommand;
  }
}
