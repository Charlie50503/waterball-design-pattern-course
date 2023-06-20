import rl from "../utils/readline";

export class CommandLineAction {
  static async inputPlayerName(index: number):Promise<string>{
    return new Promise((resolve,reject)=>{
      rl.question(`請輸入第${index}位玩家名稱：`,(name)=>{
        resolve(name);
      })
    })
  }
}