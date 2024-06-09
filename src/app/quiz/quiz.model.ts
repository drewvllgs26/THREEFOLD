export class Introduction{
    id: string;
    computer: string;
    keyboard: string;
    monitor: string;

    constructor(id: string = '', computer: string = '', keyboard: string = '', monitor: string = '') {
      this.id = id;
      this.computer = computer;
      this.keyboard = keyboard;
      this.monitor = monitor;
    }
}

export interface iIntroduction{
    id: string;
    computer: string;
    keyboard: string;
    monitor: string;
}