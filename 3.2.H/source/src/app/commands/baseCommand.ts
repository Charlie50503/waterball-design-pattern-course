export abstract class Command {

  abstract getName(): string
  abstract execute(): void;
  abstract undo(): void;
}
