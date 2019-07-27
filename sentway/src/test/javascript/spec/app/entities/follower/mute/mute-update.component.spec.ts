/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SentwayTestModule } from '../../../../test.module';
import { MuteUpdateComponent } from 'app/entities/follower/mute/mute-update.component';
import { MuteService } from 'app/entities/follower/mute/mute.service';
import { Mute } from 'app/shared/model/follower/mute.model';

describe('Component Tests', () => {
  describe('Mute Management Update Component', () => {
    let comp: MuteUpdateComponent;
    let fixture: ComponentFixture<MuteUpdateComponent>;
    let service: MuteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [MuteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MuteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MuteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MuteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mute(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mute();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
