import { atom, selector } from 'recoil';

import fetchApi from 'api/fetch';
import { IProblem, ISolvedProblem } from 'types/problem';
import { IProfile, IUserGroup, IUserWithSolved, SolvedRates } from 'types/user';

export const userDataStates = atom({
  key: 'userData',
  default: {
    idx: -1,
    name: '',
    profile: '' as string,
    cover: '' as string,
    bio: '' as string,
    login: false
  }
});

export const profileState = atom<IProfile>({
  key: 'profileState',
  default: {
    idx: 0,
    nickname: '',
    cover: null,
    bio: null
  }
});

export const myJoinedGroupState = atom<number[] | null>({
  key: 'myJoinedGroup',
  default: null
});

export const solvedProblemState = atom<ISolvedProblem[]>({
  key: 'solvedProblem',
  default: []
});

export const rateState = atom<SolvedRates>({
  key: 'rateState',
  default: {
    prevRate: 0,
    solvedRate: 0,
    totalProblemsCount: 0
  }
});

export const profileSolvedRate = selector({
  key: 'profileSolvedRate',
  get: async ({ get }) => {
    const { idx, nickname } = get(profileState);
    const [rawJoinedGroups, rawSolvedProblems, rawTotalProblems]: [IUserGroup[], IUserWithSolved[], IProblem[]] =
      await Promise.all([
        fetchApi.getJoinedGroups(idx),
        fetchApi.getSolvedProblems(nickname),
        fetchApi.getJoinedProblems(idx)
      ]);

    const joinedGroups = rawJoinedGroups.map((cur) => cur.groupidx);
    const solvedProblems =
      rawSolvedProblems.length > 0
        ? rawSolvedProblems[0].BTMUserProblemuseridx.map((cur) => ({
            idx: cur.idx,
            groupIdx: cur.groupidx
          }))
        : [];
    const totalProblemsCount = rawTotalProblems.length || 0;

    const solvedLength = solvedProblems.filter((item) => joinedGroups.includes(item.groupIdx)).length;

    return joinedGroups.length === 0
      ? -1
      : totalProblemsCount === 0
      ? 0
      : Number(((solvedLength / totalProblemsCount) * 100).toFixed(1));
  }
});
