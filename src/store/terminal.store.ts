import { makeAutoObservable } from "mobx";
import { avableCommands, commands } from "../commands";

export class TerminalStore {
  info: string = "user@fesh:~$ ";
  cursorChar: string = "\u2582";
  history: string = "";
  cursor: string = "";
  cursorFlipper: NodeJS.Timer | undefined = undefined;
  command: string = "";
  executing: boolean = false;
  execOut: string = "";
  //@ts-ignore
  resolveExec: (value: unknown) => void | undefined = undefined;

  fs: any[] = [];
  // {name : "folder_name",type:"folder",children:[]}  -> folder , in children can be multiple folders and files
  // {name : "file_name",type:"file>type",content:""}  -> file , type can be any tyoe of file (txt,mp3, etc)
  emptyDir = { name: "", type: "folder", children: [] };
  emptyFile = { name: "", type: "file>none", content: "" };

  createFile = (name: string, type: string, content: string) => {
    this.fs.push({
      name,
      type,
      content,
    });
    this.sortFS();
  };
  createFolder = (name: string) => {
    this.fs.push({
      name,
      type: "folder",
      children: [],
    });
    this.sortFS();
  };

  sortFS = () => {
    this.fs.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  };

  write = (text: string) => {
    this.execOut += `\n${text}`;
  };
  end = (text: string) => {
    this.execOut += `${text}`;
    if (this.resolveExec) {
      this.resolveExec("Finished executing commands");
    } else {
      this.out.write(`Error: couldnt reolve exec promise`);
    }
  };

  out = {
    write: this.write,
    end: this.end,
    store: this,
  };

  constructor() {
    makeAutoObservable(this);
  }
  setExecPromiseResolver = (resolve: (value: unknown) => void) => {
    this.resolveExec = resolve;
  };

  execute = async (input: string) => {
    this.setExecuting(true);
    const inputArr = input.split(" ");
    const params = inputArr.slice(1);
    const command = inputArr[0];
    if (avableCommands.includes(inputArr[0])) {
      await new Promise((resolve) => {
        this.setExecPromiseResolver(resolve);
        //@ts-ignore
        commands[command](params, this.out);
      });
    } else {
      this.setExecOut(`\nCommand ${command} not found`);
    }
    this.addToHistory(`${this.execOut}`);
    this.setExecOut("");
    this.setExecuting(false);
  };

  setExecuting = (executing: boolean) => {
    this.executing = executing;
  };

  setExecOut = (out: string) => {
    this.execOut = out;
  };

  setHistory = (history: string) => {
    this.history = history;
  };

  addToHistory = (toSave: string) => {
    const lastCharIsNL = this.history.slice(-1) === "\n",
      isRespEmpty = toSave.length == 1,
      historyIsEmpty = this.history.length == 0;

    if (historyIsEmpty || isRespEmpty || lastCharIsNL) {
      this.history += toSave.replace("\n", "");
      return;
    }
    this.history += toSave;
  };

  setCursor = (cursor: string) => {
    this.cursor = cursor;
  };

  flipCursor = () => {
    if (this.cursor == "") {
      this.cursor = this.cursorChar;
    } else {
      this.cursor = "";
    }
  };

  initCursorFlipper = () => {
    if (!this.cursorFlipper)
      this.cursorFlipper = setInterval(this.flipCursor, 500);
  };

  reinitCursorFlipper = () => {
    if (this.cursorFlipper) {
      clearInterval(this.cursorFlipper);
      this.cursor = this.cursorChar;
      this.cursorFlipper = setInterval(this.flipCursor, 500);
    }
  };

  setCommand = (command: string) => {
    this.command = command;
  };

  addChar = async (char: string) => {
    if (this.executing) return;
    let charToAdd = char;

    switch (char) {
      case "Alt":
        charToAdd = "";
        break;
      case "Control":
        charToAdd = "";
        break;
      case "Shift":
        charToAdd = ""; //it seems like the browset takes the job of shifting up the chars so nothing to do here
        break;
      case "Tab":
        charToAdd = "\t";
        break;
      case "Enter":
        this.addToHistory(`\n${this.info}${this.command}`);
        const intCommand = this.command;
        this.setCommand("");
        await this.execute(intCommand);

        return;
      case "Backspace":
        this.setCommand(this.command.slice(0, -1));
        return;
    }

    this.reinitCursorFlipper();

    this.setCommand(this.command + charToAdd);
  };
}
