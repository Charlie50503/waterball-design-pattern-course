import { Individual } from "../individual";

export abstract class MatchTypeStrategy {
  abstract matching(i:Individual,other:Individual[]):void
}