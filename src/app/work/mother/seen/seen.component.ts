import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwModalService} from "../../../util/jw-modal/jw-modal.service";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.component.html',
  styleUrls: ['./seen.component.css']
})
export class SeenComponent implements OnInit {
  @Output() onChangeMotherStatus = new EventEmitter<null>();


  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  onChangeMotherStatusButtonClick() {
    this.modalService.close('mother-seen-edit')
    this.onChangeMotherStatus.emit();
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
