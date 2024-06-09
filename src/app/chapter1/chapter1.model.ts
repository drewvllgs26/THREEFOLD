export class ChapOne{
    id: string;
    info1: string;
    info2: string;
    info3: string;
    info4: string;
    info5: string;
    info6: string;

    constructor(id: string = '', info1: string = '', info2: string = '', info3: string = '', info4: string = '', info5: string = '', info6: string = '') {
      this.id = id;
      this.info1 = info1;
      this.info2 = info2;
      this.info3 = info3;
      this.info4 = info4;
      this.info5 = info5;
      this.info6 = info6;
    }
}

export interface iChapOne{
    id: string;
    info1: string;
    info2: string;
    info3: string;
    info4: string;
    info5: string;
    info6: string;
}