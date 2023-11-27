import { LevelThreshold } from '../levelThreshold';
import { Layout } from './layout';
export class StandardLayout implements Layout {
  formate(level: LevelThreshold, loggerName: string, message: string): string {
    // 獲取目前的日期和時間
    const now = new Date();
    // 轉換為您想要的格式
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;

    // 輸出格式"時間 |-訊息分級 日誌器名稱 - 訊息內容"
    return `${formattedDate} |-${this.getLevelThresholdName(level)} ${loggerName} - ${message}`;
  }

  getLevelThresholdName(level:LevelThreshold): string {
    switch(level){
      case LevelThreshold.TRACE:
        return 'TRACE';
      case LevelThreshold.INFO:
        return 'INFO';
      case LevelThreshold.DEBUG:
        return 'DEBUG';
      case LevelThreshold.WARN:
        return 'WARN';
      case LevelThreshold.ERROR:
        return 'ERROR';
      default:
        return 'UNKNOWN';
    }
  }
}
