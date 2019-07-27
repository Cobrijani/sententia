import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMute } from 'app/shared/model/follower/mute.model';
import { MuteService } from './mute.service';

@Component({
  selector: 'jhi-mute-delete-dialog',
  templateUrl: './mute-delete-dialog.component.html'
})
export class MuteDeleteDialogComponent {
  mute: IMute;

  constructor(protected muteService: MuteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.muteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'muteListModification',
        content: 'Deleted an mute'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mute-delete-popup',
  template: ''
})
export class MuteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mute }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MuteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mute = mute;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mute', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mute', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
