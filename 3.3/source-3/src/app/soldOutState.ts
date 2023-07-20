import { InStockState } from './inStockState';
import { State } from './state';
import { TicketSystem } from './ticketSystem';

export class SoldOutState extends State {
  constructor(ticketSystem: TicketSystem) {
    super(ticketSystem);
  }

  public insertCoin(): void {
    this.ticketSystem.setTotal(this.ticketSystem.getTotal() + 1);
    this.ticketSystem.spitCoins(this.ticketSystem.getTotal());
  }

  public pressBuyButton(): void {
    console.log('[ERROR] 沒有票可以賣');
  }

  public fillTickets(tickets: number): void {
    this.ticketSystem.enterState(
      new InStockState(
        this.ticketSystem,
        this.ticketSystem.getTickets() + tickets
      )
    );
  }

  public enterState(on: boolean): void {
    if(this.ticketSystem.getTickets() !== 0){
      this.ticketSystem.spitCoins(this.ticketSystem.getTotal());
    }
    this.ticketSystem.setTickets(0);
  }

  public getName(): string {
      return "Sold Out";
  }
}
