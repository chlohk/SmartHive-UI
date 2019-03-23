import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.component.html',
  styleUrls: ['./seen.component.css']
})
export class SeenComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MomStatusEnum>();
  momStatusEnum = MomStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-seen-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenSeenMotherEditButton() {
    this.modalService.open('mother-seen-edit')
  }

  onCloseSeenMotherEditButton() {
    this.modalService.close('mother-seen-edit')
  }

  onOpenWhenSeenMotherLayingEggsEditButton() {
    this.modalService.open('mother-laying-eggs-edit')
  }

  onCloseWhenSeenMotherLayingEggsEditButton() {
    this.modalService.close('mother-laying-eggs-edit')
  }

  onOpenWhenMotherMarkedEditButton() {
    this.modalService.open('mother-marked-edit')
  }

  onCloseWhenMotherMarkedEditButton() {
    this.modalService.close('mother-marked-edit')
  }

  onOpenWhenMotherBirthdayEditButton() {
    this.modalService.open('mother-birthday-edit')
  }

  onCloseWhenMotherBirthdayEditButton() {
    this.modalService.close('mother-birthday-edit')
  }

}
