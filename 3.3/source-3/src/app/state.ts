import { TicketSystem } from './ticketSystem';
export abstract class State {
  
  ticketSystem: TicketSystem;

  constructor(ticketSystem: TicketSystem) {
    this.ticketSystem = ticketSystem;
  }
  public abstract insertCoin(): void;
  public abstract pressBuyButton(): void;

  public enterState(on: boolean) {
    /* 掛勾 */
  }
  public exitState() {
    /* 掛勾 */
  }

  public pressRefundButton() {
    this.ticketSystem.spitCoins(this.ticketSystem.getTotal());
  }
  public fillTickets(tickets: number): void {
    console.log('[ACTION] 填入', tickets, '張票');
    this.ticketSystem.setTickets(this.ticketSystem.getTickets() + tickets);
  }

  public abstract getName(): string
}
