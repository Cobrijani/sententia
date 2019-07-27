import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMute, Mute } from 'app/shared/model/follower/mute.model';
import { MuteService } from './mute.service';
import { IPerson } from 'app/shared/model/follower/person.model';
import { PersonService } from 'app/entities/follower/person';

@Component({
  selector: 'jhi-mute-update',
  templateUrl: './mute-update.component.html'
})
export class MuteUpdateComponent implements OnInit {
  isSaving: boolean;

  muters: IPerson[];

  mutees: IPerson[];

  people: IPerson[];

  editForm = this.fb.group({
    id: [],
    created: [],
    muter: [],
    mutee: [],
    person: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected muteService: MuteService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mute }) => {
      this.updateForm(mute);
    });
    this.personService
      .query({ filter: 'mute-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('muter').value || !this.editForm.get('muter').value.id) {
            this.muters = res;
          } else {
            this.personService
              .find(this.editForm.get('muter').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.muters = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.personService
      .query({ filter: 'mute-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('mutee').value || !this.editForm.get('mutee').value.id) {
            this.mutees = res;
          } else {
            this.personService
              .find(this.editForm.get('mutee').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.mutees = [subRes].concat(res)),
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

  updateForm(mute: IMute) {
    this.editForm.patchValue({
      id: mute.id,
      created: mute.created != null ? mute.created.format(DATE_TIME_FORMAT) : null,
      muter: mute.muter,
      mutee: mute.mutee,
      person: mute.person
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mute = this.createFromForm();
    if (mute.id !== undefined) {
      this.subscribeToSaveResponse(this.muteService.update(mute));
    } else {
      this.subscribeToSaveResponse(this.muteService.create(mute));
    }
  }

  private createFromForm(): IMute {
    return {
      ...new Mute(),
      id: this.editForm.get(['id']).value,
      created: this.editForm.get(['created']).value != null ? moment(this.editForm.get(['created']).value, DATE_TIME_FORMAT) : undefined,
      muter: this.editForm.get(['muter']).value,
      mutee: this.editForm.get(['mutee']).value,
      person: this.editForm.get(['person']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMute>>) {
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
