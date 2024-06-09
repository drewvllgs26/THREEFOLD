export class User{
    id: string;
    emailAdd: string;
    name: string;
    username: string;
    password: string;
    progress: string; 

    constructor(id: string = '', emailAdd: string = '', name: string = '', username: string = '', password: string = '', progress: string = '') {
      this.id = id;
      this.emailAdd = emailAdd;
      this.name = name;
      this.username = username;
      this.password = password;
      this.progress = progress; 
    }
}

export interface iUser{
    id: string;
    emailAdd: string;
    name: string;
    username: string;
    password: string;
    progress: string; 
}