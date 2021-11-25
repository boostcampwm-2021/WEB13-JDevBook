export interface IProblem {
  idx: number;
  groupidx: number;
  question: string;
  answer: boolean;
  explanation: string | null;
  BTGroupgroupidx: {
    title: string;
  };
}

export interface ISolvedProblem {
  idx: number;
  groupIdx: number;
}
