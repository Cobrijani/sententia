import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPerson, Person } from 'app/shared/model/follower/person.model';
import { PersonService } from './person.service';
import { IFollow } from 'app/shared/model/follower/follow.model';
import { FollowService } from 'app/entities/follower/follow';
import { IMute } from 'app/shared/model/follower/mute.model';
import { MuteService } from 'app/entities/follower/mute';
import { IBlock } from 'app/shared/model/follower/block.model';
import { BlockService } from 'app/entities/follower/block';

@Component({
  selector: 'jhi-person-update',
  templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {
  isSaving: boolean;

  follows: IFollow[];

  mutes: IMute[];

  blocks: IBlock[];

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    followersAmount: [null, [Validators.required]],
    followedAmount: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected personService: PersonService,
    protected followService: FollowService,
    protected muteService: MuteService,
    protected blockService: BlockService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ person }) => {
      this.updateForm(person);
    });
    this.followService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFollow[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFollow[]>) => response.body)
      )
      .subscribe((res: IFollow[]) => (this.follows = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.muteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMute[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMute[]>) => response.body)
      )
      .subscribe((res: IMute[]) => (this.mutes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.blockService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBlock[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBlock[]>) => response.body)
      )
      .subscribe((res: IBlock[]) => (this.blocks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(person: IPerson) {
    this.editForm.patchValue({
      id: person.id,
      userId: person.userId,
      followersAmount: person.followersAmount,
      followedAmount: person.followedAmount
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const person = this.createFromForm();
    if (person.id !== undefined) {
      this.subscribeToSaveResponse(this.personService.update(person));
    } else {
      this.subscribeToSaveResponse(this.personService.create(person));
    }
  }

  private createFromForm(): IPerson {
    return {
      ...new Person(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      followersAmount: this.editForm.get(['followersAmount']).value,
      followedAmount: this.editForm.get(['followedAmount']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>) {
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

  trackFollowById(index: number, item: IFollow) {
    return item.id;
  }

  trackMuteById(index: number, item: IMute) {
    return item.id;
  }

  trackBlockById(index: number, item: IBlock) {
    return item.id;
  }
}
