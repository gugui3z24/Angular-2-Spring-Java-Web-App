import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal-config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public activeModal: NgbModalRef;
  private readonly defaultModalOptions = {
    keyboard: false,
    centered: true
  };

  constructor(private ngbModal: NgbModal) { }

  public openModal(context: any, config?: ModalConfig): void {
    if (!config) {
      config = <ModalConfig>{};
      config.options = this.defaultModalOptions;
    } else if (!config.options) {
      config.options = this.defaultModalOptions;
    }
    this.activeModal = this.ngbModal.open(context, config.options);
  }

  public closeModal(): void {
    this.activeModal.close();
    this.activeModal = null;
  }

  public dismissModal(): void {
    this.activeModal.dismiss();
    this.activeModal = null;
  }
}
