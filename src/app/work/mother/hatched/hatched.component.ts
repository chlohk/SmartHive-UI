import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MotherStatusEnum} from "../mother-status.enum";

@Component({
  selector: 'app-hatched',
  templateUrl: './hatched.component.html',
  styleUrls: ['./hatched.component.css']
})
export class HatchedComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MotherStatusEnum>();
  motherStatusEnum = MotherStatusEnum;


  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onClose(id) {
    this.modalService.close(id)
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    this.modalService.close('mother-hatched-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenWhenMotherHatchedEditButton() {
    this.modalService.open('mother-hatched-edit')
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
