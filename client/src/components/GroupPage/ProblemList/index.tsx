import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import fetchApi from 'api/fetch';

import { Problem } from '..';
import { IProblem } from 'types/problem';
import { Skeleton } from 'components/common';
import { GroupNavState, myJoinedGroupState } from 'recoil/store';

const ProblemListContainer = styled.div<{ navState: boolean }>`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
  display: ${(props) => (props.navState ? 'block' : 'none')};
`;

const BoxStyle = styled.div`
  width: 680px;
  min-width: 680px;
  height: 180px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 16px;
  background-color: ${(props) => props.theme.white};
`;

const NoJoinedGroupDatabase = styled(BoxStyle)`
  &::after {
    content: '그룹 정보를 조회하지 못했습니다';
  }
`;

const NoAuthority = styled(BoxStyle)`
  &::after {
    content: '그룹 가입 후 이용해주세요';
  }
`;

const ProblemList = ({ groupIdx }: { groupIdx: number }) => {
  const groupNavState = useRecoilValue(GroupNavState);
  const [problemList, setProblemList] = useState<IProblem[]>([]);
  const myJoinedGroups = useRecoilValue(myJoinedGroupState);
  const [isFetching, setFetching] = useState<boolean>(true);

  const fetchProblems = async (groupIdx: number) => {
    setFetching(true);
    const result = await fetchApi.getProblems(groupIdx);
    setProblemList(result);
    setFetching(false);
  };

  const getSkeletons = useCallback((count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <Skeleton key={`s${i}`} type="problem" />;
      });
  }, []);

  useEffect(() => {
    fetchProblems(groupIdx);
    return setProblemList([]);
  }, [groupIdx]);

  return (
    <ProblemListContainer navState={groupNavState.problem}>
      {!myJoinedGroups ? (
        <NoJoinedGroupDatabase />
      ) : !myJoinedGroups.includes(groupIdx) ? (
        <NoAuthority />
      ) : (
        <>
          {problemList.map((problem) => (
            <Problem key={problem.idx} problem={problem} />
          ))}
          {isFetching && getSkeletons(3)}
        </>
      )}
    </ProblemListContainer>
  );
};

export default ProblemList;
