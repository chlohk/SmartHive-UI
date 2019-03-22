import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MotherStatusEnum} from "../mother-status.enum";

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.css']
})
export class MissingComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MotherStatusEnum>();
  motherStatusEnum = MotherStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MotherStatusEnum) {
    this.modalService.close('mother-missing-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenMotherMissingEditButton() {
    this.modalService.open('mother-missing-edit')
  }

  onClose(id) {
    this.modalService.close(id)
  }

  onCloseMotherMissingEditButton() {
    this.modalService.close('mother-missing-edit')
  }

  onOpenControlframeEditButton() {
    this.modalService.open('mother-controlframe-edit')
  }

  onOpenCocoonEditButton() {
    this.modalService.open('mother-cocoon-edit')
  }

}
