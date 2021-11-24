import { IProblem } from 'types/problem';

export interface SolvedRates {
  prevRate: number;
  solvedRate: number;
  totalProblemsCount: number;
}

export interface IProfile {
  idx: number;
  nickname: string;
  cover: string | null;
  bio: string | null;
}

export interface IUserWithSolved {
  BTMUserProblemuseridx: IProblem[];
}

export interface IUserGroup {
  idx: number;
  useridx: number;
  groupidx: number;
}
