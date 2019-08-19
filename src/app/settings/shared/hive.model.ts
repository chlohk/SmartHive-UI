import {MomAttributes} from "../../work/mother/mom-attributes.model";
import {PlanElement} from "../../work/planning/plan-element/plan-element.model";
import {Note} from "../../work/notes/note-element/note.model";
import { Size } from '../../work/size/size.model';

export class Hive {
  id: number;
  number: number;
  description: string;
  momAttributes: MomAttributes;
  unresolvedPlanElements: PlanElement[];
  resolvedPlanElements: PlanElement[];
  threeSizeLogs: Size[];
  activeShortTermNotes: Note[];
  activeShortTermNotesCount: number;
  allActiveNotes: Note[];
  activeLongTermNotesCount: number;
  deletedNotes: Note[];

}
