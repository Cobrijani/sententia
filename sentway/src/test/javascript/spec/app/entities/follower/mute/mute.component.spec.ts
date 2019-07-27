/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SentwayTestModule } from '../../../../test.module';
import { MuteComponent } from 'app/entities/follower/mute/mute.component';
import { MuteService } from 'app/entities/follower/mute/mute.service';
import { Mute } from 'app/shared/model/follower/mute.model';

describe('Component Tests', () => {
  describe('Mute Management Component', () => {
    let comp: MuteComponent;
    let fixture: ComponentFixture<MuteComponent>;
    let service: MuteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [MuteComponent],
        providers: []
      })
        .overrideTemplate(MuteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MuteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MuteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Mute(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mutes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
