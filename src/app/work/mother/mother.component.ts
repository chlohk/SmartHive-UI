import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MomStatusEnum} from "./mom-status.enum";
import {JwModalService} from "../../util/jw-modal/jw-modal.service";
import {MomAttributes} from "../../settings/shared/mom-attributes.model";

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnChanges {
  @Input() loadedMomAttributes: MomAttributes;
  loadedMomStatus: MomStatusEnum = MomStatusEnum.SEEN;
  momStatusEnum = MomStatusEnum;
  //opened = false;


  constructor(private modalService: JwModalService) { }

  ngOnChanges() {
    console.log(this.loadedMomAttributes);
  }

  onCloseMomStatusPanel() {
    this.modalService.close('mom-status')
  }

  onChangeMomStatusButtonClick(newMomStatus?: MomStatusEnum) {
    if(newMomStatus) {
      this.changeMomStatus(newMomStatus);
    } else {
      this.modalService.open('mom-status');
    }
  }

  changeMomStatus(newMotherStatus: MomStatusEnum) {
    this.loadedMomStatus = newMotherStatus;
    this.modalService.close('mom-status')
  }



}
