import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { JwModalService } from './jw-modal.service';
import { SpinnerService, SpinnerStatus } from '../spinner/spinner.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'jw-modal',
  template: `
    
  <div class="jw-modal">
    <div class="jw-modal-body" [ngClass]="{'no-margin': marginLess, 'full-screen': fullScreen}">
      
      <ng-content></ng-content>
      <app-spinner [hidden]="!spinnerEnabled" [modal]="true" [smallModal]="smallModal"></app-spinner>
    </div>
  </div>
  <div class="jw-modal-background"></div>`,
  styleUrls: ['./jw-modal.css']
})

export class JwModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() marginLess = false;
  @Input() fullScreen = false;
  @Input() smallModal = false;
  spinnerEnabled: boolean;
  spinnerStatusSubscription: Subscription;
  private element: any;

  constructor(private modalService: JwModalService,
              private el: ElementRef,
              private spinnerService: SpinnerService) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.close();
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'jw-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

    this. spinnerStatusSubscription = this.spinnerService.getSpinnerStatus.subscribe(
      (ss: SpinnerStatus) => this.spinnerEnabled = ss.enabled
    );
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
    this.spinnerStatusSubscription.unsubscribe();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
