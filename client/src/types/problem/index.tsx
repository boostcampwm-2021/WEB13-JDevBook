export interface IProblem {
  idx: number;
  groupidx: number;
  question: string;
  answer: boolean;
  BTGroupgroupidx: {
    title: string;
  };
}

export interface ISolvedProblem {
  idx: number;
  groupIdx: number;
}
