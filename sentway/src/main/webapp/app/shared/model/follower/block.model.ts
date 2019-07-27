import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/follower/person.model';

export interface IBlock {
  id?: number;
  created?: Moment;
  blocker?: IPerson;
  blockee?: IPerson;
  person?: IPerson;
}

export class Block implements IBlock {
  constructor(public id?: number, public created?: Moment, public blocker?: IPerson, public blockee?: IPerson, public person?: IPerson) {}
}
