/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SentwayTestModule } from '../../../../test.module';
import { MuteDetailComponent } from 'app/entities/follower/mute/mute-detail.component';
import { Mute } from 'app/shared/model/follower/mute.model';

describe('Component Tests', () => {
  describe('Mute Management Detail Component', () => {
    let comp: MuteDetailComponent;
    let fixture: ComponentFixture<MuteDetailComponent>;
    const route = ({ data: of({ mute: new Mute(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [MuteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MuteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MuteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
