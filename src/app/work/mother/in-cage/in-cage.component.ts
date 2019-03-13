import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MotherStatusEnum} from "../mother-status.enum";

@Component({
  selector: 'app-in-cage',
  templateUrl: './in-cage.component.html',
  styleUrls: ['./in-cage.component.css']
})
export class InCageComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MotherStatusEnum>();
  motherStatusEnum = MotherStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    this.modalService.close('mother-in-cage-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenMotherInCageEditButton() {
    this.modalService.open('mother-in-cage-edit')
  }

  onCloseMotherInCageEditButton() {
    this.modalService.close('mother-in-cage-edit')
  }

  onOpenWhenMotherMarkedEditButton() {
    this.modalService.open('mother-marked-edit')
  }

  onOpenWhenMotherBirthdayEditButton() {
    this.modalService.open('mother-birthday-edit')
  }

}
