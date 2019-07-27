import { Moment } from 'moment';

export const enum Markup {
  PLAIN = 'PLAIN',
  HTML = 'HTML',
  MARKDOWN = 'MARKDOWN'
}

export interface IArticle {
  id?: number;
  title?: string;
  type?: Markup;
  category?: string;
  authorId?: string;
  authorName?: string;
  created?: Moment;
  modified?: Moment;
  published?: Moment;
  content?: any;
  releasedContent?: any;
  contentHash?: string;
  releasedContentHash?: string;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public title?: string,
    public type?: Markup,
    public category?: string,
    public authorId?: string,
    public authorName?: string,
    public created?: Moment,
    public modified?: Moment,
    public published?: Moment,
    public content?: any,
    public releasedContent?: any,
    public contentHash?: string,
    public releasedContentHash?: string
  ) {}
}
