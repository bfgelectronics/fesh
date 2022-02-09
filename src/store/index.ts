import { TerminalStore } from "./terminal.store";

class RootStore {
  terminalStore;

  constructor() {
    this.terminalStore = new TerminalStore();
  }
}

export const store = new RootStore();
