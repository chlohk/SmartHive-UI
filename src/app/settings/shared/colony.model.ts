import {Hive} from "./hive.model";

export class Colony {
  id: number;
  name: string;
  hives: Hive[];

  constructor(id: number, name: string, hives: Hive[]) {
    this.id = id;
    this.name = name;
  }
}
