/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SentwayTestModule } from '../../../../test.module';
import { BlockUpdateComponent } from 'app/entities/follower/block/block-update.component';
import { BlockService } from 'app/entities/follower/block/block.service';
import { Block } from 'app/shared/model/follower/block.model';

describe('Component Tests', () => {
  describe('Block Management Update Component', () => {
    let comp: BlockUpdateComponent;
    let fixture: ComponentFixture<BlockUpdateComponent>;
    let service: BlockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [BlockUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BlockUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlockUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlockService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Block(123);
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
        const entity = new Block();
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
