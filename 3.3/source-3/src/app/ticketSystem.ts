import { InStockState } from './inStockState';
import { SoldOutState } from './soldOutState';
import { State } from './state';
export enum IState {
  IN_STOCK,
  SOLD_OUT,
  ENOUGH_COINS,
}

export class TicketSystem {
  private _state!: State;
  private _total: number = 0;
  public static readonly PRICE: number = 3;
  private _lightOn: boolean = false;
  private _tickets: number;

  constructor(tickets: number) {
    this._tickets = tickets;
    if(this._tickets > 0){
      this._state = new InStockState(this);
      // this.enterState(IState.IN_STOCK);
    }
  }

  public insertCoin(coin: number = 1): void {
    console.log('[ACTION] 投入硬幣', coin, "枚");
    this._state.insertCoin();
  }

  public turnLight(on: boolean): void {
    if (this._lightOn !== on) {
      console.log("[INFO] ", on ? '開' : '關', '燈');
    }
    this._lightOn = on;
  }


  public updateCoinsDisplay(): void {
    console.log('[DISPLAY] 目前硬幣數量', this._total, '枚');
  }


  public issueOneTicket(): void {
   
    console.log('[ACTION] 發出一張票');
  }


  public spitCoins(coins: number) {
    this._total -= coins;
    console.log('[ACTION] 吐出硬幣', coins, '枚');
  }

  public fillTickets(tickets: number): void {
    console.log('[ACTION] 填入', tickets, '張票');
    this._state.fillTickets(tickets);
  }

  public pressBuyButton() {
    console.log("[ACTION] 按下購買按鈕");
    this._state.pressBuyButton();
  }
  public pressRefundButton() {
    console.log('[ACTION] 按下退幣按鈕');
    this._state.pressRefundButton();
  }

  // 為了讓Client能夠直接改變狀態, 所以針對各個狀態所產生的值的變化也要一起寫在裡面
  public enterState(state:State){
    this._state.exitState();
    this._state = state;
    console.log("[INFO] 狀態改變為", state.getName());
    this._state.enterState(true);
  }

  getTickets(): number {
    return this._tickets;
  }

  setTickets(tickets: number){
    this._tickets = tickets;
  }

  getTotal(): number {
    return this._total;
  }

  setTotal(total: number){
    this._total = total;
  }
}