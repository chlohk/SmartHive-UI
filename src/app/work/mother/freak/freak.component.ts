import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";
import {MomStatusEnum} from "../mom-status.enum";

@Component({
  selector: 'app-freak',
  templateUrl: './freak.component.html',
  styleUrls: ['./freak.component.css']
})
export class FreakComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<MomStatusEnum>();
  motherStatusEnum = MomStatusEnum;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick(newMotherStatus?: MomStatusEnum) {
    this.modalService.close('mother-freak-edit');
    this.onChangeMotherStatus.emit(newMotherStatus);
  }

  onOpenFreakMotherEditButton() {
    this.modalService.open('mother-freak-edit')
  }

  onCloseFreakMotherEditButton() {
    this.modalService.close('mother-freak-edit')
  }

  onOpenFreakMotherLogEditButton() {
    this.modalService.open('mother-freak-log-edit')
  }

  onCloseFreakMotherLogEditButton() {
    this.modalService.close('mother-freak-log-edit')
  }

}
