import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MotherStatusEnum} from "../mother-status.enum";

@Component({
  selector: 'app-un-caged',
  templateUrl: './un-caged.component.html',
  styleUrls: ['./un-caged.component.css']
})
export class UnCagedComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MotherStatusEnum>();
  motherStatusEnum = MotherStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    this.modalService.close('mother-un-caged-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onMotherUnCagedEditButton() {
    this.modalService.open('mother-un-caged-edit')
  }

  onCloseMotherUnCagedEditButton() {
    this.modalService.close('mother-un-caged-edit')
  }

  onOpenWhenSeenMotherLayingEggsEditButton() {
    this.modalService.open('mother-laying-eggs-edit')
  }

  onOpenWhenMotherMarkedEditButton() {
    this.modalService.open('mother-marked-edit')
  }

  onOpenWhenMotherBirthdayEditButton() {
    this.modalService.open('mother-birthday-edit')
  }

}
