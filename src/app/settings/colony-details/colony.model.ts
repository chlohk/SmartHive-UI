import {Hive} from "./hive.model";

export class Colony {
  id: number;
  name: string;
  hives: Hive[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
