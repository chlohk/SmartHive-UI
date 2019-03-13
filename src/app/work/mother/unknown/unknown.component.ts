import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MotherStatusEnum} from "../mother-status.enum";

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.css']
})
export class UnknownComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MotherStatusEnum>();
  motherStatusEnum = MotherStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    this.modalService.close('mother-unknown-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenWhenSeenMotherEditButton() {
    this.modalService.open('mother-seen-edit')
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
