import { LevelThreshold } from '../levelThreshold';

export interface Layout {
  formate(level: LevelThreshold, loggerName: string, message: string): string;
}
