import { EnoughCoinsState } from './enoughCoinsState';
import { State } from './state';
import { TicketSystem } from './ticketSystem';

export class InStockState extends State {
  constructor(ticketSystem: TicketSystem, tickets: number) {
    super(ticketSystem);
    this.ticketSystem.setTickets(tickets);
  }

  public insertCoin(): void {
    this.ticketSystem.setTotal(this.ticketSystem.getTotal() + 1);
    if (this.ticketSystem.getTotal() === TicketSystem.PRICE) {
      this.ticketSystem.enterState(new EnoughCoinsState(this.ticketSystem));
      this.ticketSystem.turnLight(true);
    } else if (this.ticketSystem.getTotal() < TicketSystem.PRICE) {
      this.ticketSystem.updateCoinsDisplay();
    }
  }

  public pressBuyButton(): void {
    console.log('[ERROR] 不支援操作');
  }

  public enterState(): void {
    if (this.ticketSystem.getTotal() > TicketSystem.PRICE) {
      this.ticketSystem.spitCoins(
        this.ticketSystem.getTotal() - TicketSystem.PRICE
      );
    }
    if (this.ticketSystem.getTickets() <= 0) {
      console.log('[ERROR] 沒有票可以賣');
    }
  }
}
