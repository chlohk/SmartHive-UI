import { Component, Input } from '@angular/core';
import { Colony } from '../../settings/shared/colony.model';
import { UtilService } from '../../util/util.service';
import { ColoniesService } from '../../settings/shared/colonies.service';

@Component({
  selector: 'app-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.css']
})
export class WorkHeaderComponent {

  @Input() colonies: Colony[];
  @Input() currentlySelectedColony: Colony;
  @Input() isCountingDownToUpdateData: boolean;
  @Input() currentlySelectedColonyId: string;
  @Input() currentlySelectedHiveId: string;


  constructor(private utilService: UtilService,
              private coloniesService: ColoniesService) {
  }

}
