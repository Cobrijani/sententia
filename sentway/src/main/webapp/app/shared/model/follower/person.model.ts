import { IFollow } from 'app/shared/model/follower/follow.model';
import { IMute } from 'app/shared/model/follower/mute.model';
import { IBlock } from 'app/shared/model/follower/block.model';

export interface IPerson {
  id?: number;
  userId?: string;
  followersAmount?: number;
  followedAmount?: number;
  follows?: IFollow[];
  mutes?: IMute[];
  blocks?: IBlock[];
  followId?: number;
  followId?: number;
  muteId?: number;
  muteId?: number;
  blockId?: number;
  blockId?: number;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public userId?: string,
    public followersAmount?: number,
    public followedAmount?: number,
    public follows?: IFollow[],
    public mutes?: IMute[],
    public blocks?: IBlock[],
    public followId?: number,
    public followId?: number,
    public muteId?: number,
    public muteId?: number,
    public blockId?: number,
    public blockId?: number
  ) {}
}
