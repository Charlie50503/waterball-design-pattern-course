import { TicketSystem } from "./app/ticketSystem";

function main(){
  const ticketSystem = new TicketSystem(2);
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  // ticketSystem.insertCoin();

  ticketSystem.pressRefundButton();

  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();

  ticketSystem.pressBuyButton();

  ticketSystem.pressRefundButton();

  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.pressBuyButton();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.insertCoin();
  ticketSystem.fillTickets(3);
  ticketSystem.pressBuyButton();
}

main();