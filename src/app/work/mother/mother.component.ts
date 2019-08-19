import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MomStatusEnum} from "./mom-status.enum";
import {JwModalService} from "../../util/jw-modal/jw-modal.service";
import {Hive} from "../../settings/shared/hive.model";
import {MomAttributesService} from "./mom-attributes.service";

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnChanges {
  @Input() currentlyChosenHive: Hive;
  momStatusEnum = MomStatusEnum;
  //opened = false;


  constructor(private modalService: JwModalService,
              private momAttributesService: MomAttributesService) { }

  ngOnChanges() {
    //for debugging...
    //console.log(this.currentlySelectedHive);
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
    this.momAttributesService.onUpdateMomStatus(this.currentlyChosenHive, newMotherStatus)
    this.modalService.close('mom-status')
  }



}
