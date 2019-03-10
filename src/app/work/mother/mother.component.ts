import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MotherStatusEnum} from "./mother-status.enum";
import {JwModalService} from "../../util/jw-modal/jw-modal.service";

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnInit {
  loadedMotherStatus: MotherStatusEnum = MotherStatusEnum.SEEN;
  motherStatusEnum = MotherStatusEnum;
  opened = false;

  constructor(private modalService: JwModalService) { }

  ngOnInit() {
  }

  openMotherStatusChangePanel() {
    this.modalService.open('mother-status');
  }



}
