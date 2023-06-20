import { Card } from "../template/card";
import { Player } from "../template/player";

export async function reselectWithErrorHandling<T extends Card>(
  player: Player<T>,
  operation: () => Promise<T>,
  errorMsg: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.log(`${error}`);
    console.log(`玩家${player.name} ${errorMsg}，請重新選擇。`);
    return reselectWithErrorHandling(player, operation, errorMsg);
  }
}