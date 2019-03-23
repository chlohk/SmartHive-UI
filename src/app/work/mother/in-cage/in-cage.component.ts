import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";

@Component({
  selector: 'app-in-cage',
  templateUrl: './in-cage.component.html',
  styleUrls: ['./in-cage.component.css']
})
export class InCageComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MomStatusEnum>();
  motherStatusEnum = MomStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-in-cage-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenMotherInCageEditButton() {
    this.modalService.open('mother-in-cage-edit')
  }

  onClose(id) {
    this.modalService.close(id)
  }

  onOpenWhenMotherMarkedEditButton() {
    this.modalService.open('mother-marked-edit')
  }

  onOpenWhenMotherBirthdayEditButton() {
    this.modalService.open('mother-birthday-edit')
  }

}
