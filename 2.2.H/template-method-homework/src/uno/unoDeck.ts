import { AbstractCard } from "../template/abstractCard";
import { AbstractDeck } from "../template/abstractDeck";
import { UnoCard } from "./unoCard";

export class UnoDeck extends AbstractDeck {
  constructor() {
    super(40);
  }
}