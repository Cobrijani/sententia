/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SentwayTestModule } from '../../../../test.module';
import { MuteDeleteDialogComponent } from 'app/entities/follower/mute/mute-delete-dialog.component';
import { MuteService } from 'app/entities/follower/mute/mute.service';

describe('Component Tests', () => {
  describe('Mute Management Delete Component', () => {
    let comp: MuteDeleteDialogComponent;
    let fixture: ComponentFixture<MuteDeleteDialogComponent>;
    let service: MuteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [MuteDeleteDialogComponent]
      })
        .overrideTemplate(MuteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MuteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MuteService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
