export class PlanElement {
  id: number;
  deadline: Date;
  withoutDeadline: boolean;
  text: string;
  dropDownElementId: number;
  dropDown: boolean;
  resolvedDate: Date;
  resolved: boolean;
  //helper Field
  daysToDeadline: number;
}
