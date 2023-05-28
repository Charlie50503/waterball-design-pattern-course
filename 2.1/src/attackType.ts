import { Hero } from "./hero";

export abstract class AttackType {
  abstract attack(attacker:Hero,attacked:Hero): void
}