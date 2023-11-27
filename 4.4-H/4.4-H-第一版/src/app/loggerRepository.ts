import { Logger } from './logger';
const loggerMap: Map<string, Logger> = new Map();

export function declareLoggers(...loggers: Logger[]): void {
  for (const logger of loggers) {
    loggerMap.set(logger.name, logger);
  }
}

export function getLogger(name: string) {
  return loggerMap.get(name);
}
