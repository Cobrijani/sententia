/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SentwayTestModule } from '../../../../test.module';
import { FollowComponent } from 'app/entities/follower/follow/follow.component';
import { FollowService } from 'app/entities/follower/follow/follow.service';
import { Follow } from 'app/shared/model/follower/follow.model';

describe('Component Tests', () => {
  describe('Follow Management Component', () => {
    let comp: FollowComponent;
    let fixture: ComponentFixture<FollowComponent>;
    let service: FollowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SentwayTestModule],
        declarations: [FollowComponent],
        providers: []
      })
        .overrideTemplate(FollowComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FollowComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Follow(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.follows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
