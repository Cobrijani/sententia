import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBlock, Block } from 'app/shared/model/follower/block.model';
import { BlockService } from './block.service';
import { IPerson } from 'app/shared/model/follower/person.model';
import { PersonService } from 'app/entities/follower/person';

@Component({
  selector: 'jhi-block-update',
  templateUrl: './block-update.component.html'
})
export class BlockUpdateComponent implements OnInit {
  isSaving: boolean;

  blockers: IPerson[];

  blockees: IPerson[];

  people: IPerson[];

  editForm = this.fb.group({
    id: [],
    created: [],
    blocker: [],
    blockee: [],
    person: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected blockService: BlockService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ block }) => {
      this.updateForm(block);
    });
    this.personService
      .query({ filter: 'block-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('blocker').value || !this.editForm.get('blocker').value.id) {
            this.blockers = res;
          } else {
            this.personService
              .find(this.editForm.get('blocker').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.blockers = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.personService
      .query({ filter: 'block-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPerson[]>) => response.body)
      )
      .subscribe(
        (res: IPerson[]) => {
          if (!this.editForm.get('blockee').value || !this.editForm.get('blockee').value.id) {
            this.blockees = res;
          } else {
            this.personService
              .find(this.editForm.get('blockee').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPerson) => (this.blockees = [subRes].concat(res)),
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

  updateForm(block: IBlock) {
    this.editForm.patchValue({
      id: block.id,
      created: block.created != null ? block.created.format(DATE_TIME_FORMAT) : null,
      blocker: block.blocker,
      blockee: block.blockee,
      person: block.person
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const block = this.createFromForm();
    if (block.id !== undefined) {
      this.subscribeToSaveResponse(this.blockService.update(block));
    } else {
      this.subscribeToSaveResponse(this.blockService.create(block));
    }
  }

  private createFromForm(): IBlock {
    return {
      ...new Block(),
      id: this.editForm.get(['id']).value,
      created: this.editForm.get(['created']).value != null ? moment(this.editForm.get(['created']).value, DATE_TIME_FORMAT) : undefined,
      blocker: this.editForm.get(['blocker']).value,
      blockee: this.editForm.get(['blockee']).value,
      person: this.editForm.get(['person']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlock>>) {
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
