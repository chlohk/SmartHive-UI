import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MotherStatusEnum} from "./mother-status.enum";
import {JwModalService} from "../../util/jw-modal/jw-modal.service";

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnInit {
  loadedMotherStatus: MotherStatusEnum = MotherStatusEnum.SEEN;
  motherStatusEnum = MotherStatusEnum;
  opened = false;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onCloseMother() {
    this.modalService.close('mother-status')
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    if(newMotherStatus) {
      this.changeMotherStatus(newMotherStatus);
    } else {
      this.modalService.open('mother-status');
    }
  }

  changeMotherStatus(newMotherStatus: MotherStatusEnum) {
    this.loadedMotherStatus = newMotherStatus;
    this.modalService.close('mother-status')
  }



}
