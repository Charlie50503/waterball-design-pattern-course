import { EnoughCoinsState } from "./app/enoughCoinsState";
import { InStockState } from "./app/inStockState";
import { SoldOutState } from "./app/soldOutState";
import { TicketSystem } from "./app/ticketSystem";

function main() {
  const ticketSystem = new TicketSystem(2);

  // // Enough coins
  // ticketSystem.enterState(new EnoughCoinsState(ticketSystem));
  // ticketSystem.insertCoin();

  // // 吐出三枚硬幣
  // ticketSystem.pressRefundButton();
  // // 購買
  // ticketSystem.enterState(new EnoughCoinsState(ticketSystem));
  // ticketSystem.pressBuyButton();
  // // 0 枚硬幣 Buy 硬幣不足
  // ticketSystem.enterState(new InStockState(ticketSystem));
  // ticketSystem.pressBuyButton();
  // //  Refund 吐 0 枚
  // ticketSystem.pressRefundButton();

  // // sold out
  // ticketSystem.enterState(new SoldOutState(ticketSystem));
  // ticketSystem.insertCoin();

  // ticketSystem.fillTickets(3);
  // ticketSystem.enterState(new EnoughCoinsState(ticketSystem));
  // ticketSystem.pressBuyButton();

  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressRefundButton();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.pressBuyButton();
  ticketSystem.pressBuyButton();
  ticketSystem.pressRefundButton();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.fillTickets(5);
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.insertCoin();
}

main();