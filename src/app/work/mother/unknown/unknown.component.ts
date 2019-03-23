import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.css']
})
export class UnknownComponent implements OnInit {
  @Output() onChangeMomStatus = new EventEmitter<MomStatusEnum>();
  motherStatusEnum = MomStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-unknown-edit');
    this.onChangeMomStatus.emit(newMotherStatus);
  }

  onOpenMotherUnknownEditButton() {
    this.modalService.open('mother-unknown-edit')
  }

  onClose(id) {
    this.modalService.close(id)
  }

  onCloseMotherUnknownEditButton() {
    this.modalService.close('mother-unknown-edit')
  }

  onOpenControlframeEggsEditButton() {
    this.modalService.open('mother-controlframe-edit')
  }

  onOpenCocoonEditButton() {
    this.modalService.open('mother-cocoon-edit')
  }

}
