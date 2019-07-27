import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: './blog/blog/blog.module#BlogBlogModule'
      },
      {
        path: 'article',
        loadChildren: './article/article/article.module#ArticleArticleModule'
      },
      {
        path: 'person',
        loadChildren: './follower/person/person.module#FollowerPersonModule'
      },
      {
        path: 'follow',
        loadChildren: './follower/follow/follow.module#FollowerFollowModule'
      },
      {
        path: 'mute',
        loadChildren: './follower/mute/mute.module#FollowerMuteModule'
      },
      {
        path: 'block',
        loadChildren: './follower/block/block.module#FollowerBlockModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SentwayEntityModule {}
