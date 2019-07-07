import {MomAttributes} from "../../work/mother/mom-attributes.model";
import {PlanElement} from "../../work/planning/plan-element/plan-element.model";

export class Hive {
  id: number;
  number: number;
  description: string;
  momAttributes: MomAttributes;
  unresolvedPlanElements: PlanElement[];
  resolvedPlanElements: PlanElement[];
}
