import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article/article.model';
import { ArticleService } from './article.service';

@Component({
  selector: 'jhi-article-delete-dialog',
  templateUrl: './article-delete-dialog.component.html'
})
export class ArticleDeleteDialogComponent {
  article: IArticle;

  constructor(protected articleService: ArticleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.articleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'articleListModification',
        content: 'Deleted an article'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-article-delete-popup',
  template: ''
})
export class ArticleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ article }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArticleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.article = article;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/article', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/article', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
