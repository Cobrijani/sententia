import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFollow, Follow } from 'app/shared/model/follower/follow.model';
import { FollowService } from './follow.service';
import { IPerson } from 'app/shared/model/follower/person.model';
import { PersonService } from 'app/entities/follower/person';

@Component({
  selector: 'jhi-follow-update',
  templateUrl: './follow-update.component.html'
})
export class FollowUpdateComponent implements OnInit {
  isSaving: boolean;

  followers: IPerson[];

  followees: IPerson[];

  people: IPerson[];

  editForm = this.fb.group({
    id: [],
    created: [],
    follower: [],
    followee: [],
    person: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected followService: FollowService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ follow }) => {
      this.updateForm(follow);
    });
    this.personService
      .query({ filter: 'follow-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('follower').value || !this.editForm.get('follower').value.id) {
            this.followers = res;
          } else {
            this.personService
              .find(this.editForm.get('follower').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.followers = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.personService
      .query({ filter: 'follow-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('followee').value || !this.editForm.get('followee').value.id) {
            this.followees = res;
          } else {
            this.personService
              .find(this.editForm.get('followee').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.followees = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.personService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe((res: IPerson[]) => (this.people = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(follow: IFollow) {
    this.editForm.patchValue({
      id: follow.id,
      created: follow.created != null ? follow.created.format(DATE_TIME_FORMAT) : null,
      follower: follow.follower,
      followee: follow.followee,
      person: follow.person
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const follow = this.createFromForm();
    if (follow.id !== undefined) {
      this.subscribeToSaveResponse(this.followService.update(follow));
    } else {
      this.subscribeToSaveResponse(this.followService.create(follow));
    }
  }

  private createFromForm(): IFollow {
    return {
      ...new Follow(),
      id: this.editForm.get(['id']).value,
      created: this.editForm.get(['created']).value != null ? moment(this.editForm.get(['created']).value, DATE_TIME_FORMAT) : undefined,
      follower: this.editForm.get(['follower']).value,
      followee: this.editForm.get(['followee']).value,
      person: this.editForm.get(['person']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollow>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPersonById(index: number, item: IPerson) {
    return item.id;
  }
}
