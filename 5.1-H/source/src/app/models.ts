import { Model } from './model';

export class Models {
  private static instance: Models;
  private static models: Map<string, Model>;

  private constructor() {
    Models.models = new Map();
  }

  public getModel(modelName: string) {
    return Models.models.get(modelName);
  }

  public async createModel(modelName: string, filePath?: string) {
    if (Models.models.has(modelName)) {
      return Models.models.get(modelName);
    }
    if (!filePath) {
      throw Error('請輸入模型的檔案位置');
    }
    const model = new Model(modelName);
    await model.initialize(filePath);
    Models.models.set(modelName, model);
    return model;
  }

  public static getInstance() {
    if (!Models.instance) {
      Models.instance = new Models();
    }
    return Models.instance;
  }
}
