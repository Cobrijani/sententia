import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArticle, Article } from 'app/shared/model/article/article.model';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(42)]],
    type: [],
    category: [null, [Validators.required]],
    authorId: [null, [Validators.required]],
    authorName: [null, [Validators.required]],
    created: [],
    modified: [],
    published: [],
    content: [null, [Validators.required]],
    releasedContent: [],
    contentHash: [null, [Validators.required]],
    releasedContentHash: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);
    });
  }

  updateForm(article: IArticle) {
    this.editForm.patchValue({
      id: article.id,
      title: article.title,
      type: article.type,
      category: article.category,
      authorId: article.authorId,
      authorName: article.authorName,
      created: article.created != null ? article.created.format(DATE_TIME_FORMAT) : null,
      modified: article.modified != null ? article.modified.format(DATE_TIME_FORMAT) : null,
      published: article.published != null ? article.published.format(DATE_TIME_FORMAT) : null,
      content: article.content,
      releasedContent: article.releasedContent,
      contentHash: article.contentHash,
      releasedContentHash: article.releasedContentHash
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      type: this.editForm.get(['type']).value,
      category: this.editForm.get(['category']).value,
      authorId: this.editForm.get(['authorId']).value,
      authorName: this.editForm.get(['authorName']).value,
      created: this.editForm.get(['created']).value != null ? moment(this.editForm.get(['created']).value, DATE_TIME_FORMAT) : undefined,
      modified: this.editForm.get(['modified']).value != null ? moment(this.editForm.get(['modified']).value, DATE_TIME_FORMAT) : undefined,
      published:
        this.editForm.get(['published']).value != null ? moment(this.editForm.get(['published']).value, DATE_TIME_FORMAT) : undefined,
      content: this.editForm.get(['content']).value,
      releasedContent: this.editForm.get(['releasedContent']).value,
      contentHash: this.editForm.get(['contentHash']).value,
      releasedContentHash: this.editForm.get(['releasedContentHash']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
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
}
