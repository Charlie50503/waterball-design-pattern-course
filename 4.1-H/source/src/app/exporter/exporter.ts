import fs from 'fs';

export abstract class Exporter<T> {
  export(data: T, exportFolderPath: string): void {
    // 確保資料夾存在
    if (!fs.existsSync(exportFolderPath)) {
      fs.mkdirSync(exportFolderPath);
    }

    // 生成文件名（以當前時間為基礎）

    const filePath = this.generateFilePath(exportFolderPath);
    // 將資料轉換為 JSON 格式
    const exportData = this.formatterData(data);

    // 寫入文件
    fs.writeFileSync(filePath, exportData);

    console.log(`資料已經成功導出到 ${filePath}`);
  }

  protected generateYYYYMMDDDate(): string {
    const today = new Date()
    return `${today.getFullYear()}${today.getMonth() +1}${today.getDate()}`;
  }

  protected abstract generateFilePath(exportFolderPath: string): string;

  protected abstract formatterData(data: T): string;
}
