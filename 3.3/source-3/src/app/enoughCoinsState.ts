import { InStockState } from "./inStockState";
import { SoldOutState } from "./soldOutState";
import { State } from "./state";
import { TicketSystem } from "./ticketSystem";

export class EnoughCoinsState extends State {
  public insertCoin(): void {
    console.log('[ERROR] 硬幣已經足夠不用再投入');
    console.log('[ACTION] 吐出硬幣', 1, '枚');
  }

  public pressBuyButton(): void {
    this.ticketSystem.issueOneTicket();

    this.ticketSystem.setTotal(this.ticketSystem.getTotal() - TicketSystem.PRICE);
    this.ticketSystem.setTickets(this.ticketSystem.getTickets()-1);
    this.ticketSystem.updateCoinsDisplay();
    if(this.ticketSystem.getTickets()===0){
      this.ticketSystem.enterState(new SoldOutState(this.ticketSystem));
    }else{
      this.ticketSystem.enterState(new InStockState(this.ticketSystem));
    }
  }

  public pressRefundButton(): void {
    this.ticketSystem.spitCoins(this.ticketSystem.getTotal());
    this.ticketSystem.enterState(new InStockState(this.ticketSystem, this.ticketSystem.getTickets()));
  }

  public enterState(): void {
    if (this.ticketSystem.getTickets() <= 0) {
      console.log('[ERROR] 沒有票可以賣');
      return
    }
    this.ticketSystem.setTotal(TicketSystem.PRICE);
    this.ticketSystem.turnLight(true);

  }

  public exitState(): void {
    this.ticketSystem.turnLight(false);
  }

  
  public getName(): string {
    return "Enough Coins";
}
}