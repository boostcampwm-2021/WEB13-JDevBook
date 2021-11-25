import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { profileState } from 'recoil/store';
import { ISolvedProblem, IProblem } from 'types/problem';
import { IUserWithSolved, IUserGroup } from 'types/user';
import fetchApi from 'api/fetch';

const ProfileBarContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 24px;
  box-sizing: border-box;
  padding: 16px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  background-color: ${(props) => props.theme.white};
`;

const SolvedTitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
  color: ${(props) => props.theme.black};
`;

const NoGroup = styled.div`
  color: ${(props) => props.theme.darkgray};

  &:after {
    content: '가입된 그룹이 없습니다';
  }
`;

const SolvedBarGraph = styled.div`
  height: 25px;
  background: ${(props) => props.theme.gray};
  border-radius: 40px;
`;

const GraphAnimation = (solvedRate: number) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${solvedRate}%;
  }
`;

const InnerBarGraph = styled.span<{ solvedRate: number }>`
  display: block;
  width: ${(props) => props.solvedRate}%;
  height: 25px;
  line-height: 25px;
  text-align: right;
  background: ${(props) => props.theme.green};
  border-radius: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  color: ${(props) => props.theme.white};
  font-size: small;
  font-weight: 600;
  animation: ${(props) => GraphAnimation(props.solvedRate)} 1.5s 1;
`;

const ProfileInfoBar = () => {
  const profileData = useRecoilValue(profileState);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [joinedGroups, setJoinedGroups] = useState<number[] | null>(null);
  const [solvedProblem, setSolvedProblem] = useState<ISolvedProblem[]>([]);
  const [totalProblemsCount, setTotalProblemsCount] = useState<number>(0);
  const [solvedRate, setSolvedRate] = useState<number | null>(null);

  const getSolvedProblem = async () => {
    const result: IUserWithSolved[] = await fetchApi.getSolvedProblems(
      profileData.nickname
    );
    if (result.length > 0) {
      setSolvedProblem(
        result[0].BTMUserProblemuseridx.map((cur) => ({
          idx: cur.idx,
          groupIdx: cur.groupidx
        }))
      );
    } else {
      setSolvedProblem([]);
    }
  };

  const getTotalProblemsCount = async () => {
    const result: IProblem[] = await fetchApi.getJoinedProblems(
      profileData.idx
    );
    if (result.length > 0) {
      setTotalProblemsCount(result.length);
    } else {
      setTotalProblemsCount(0);
    }
  };

  const getJoinedGroup = async () => {
    const result: IUserGroup[] = await fetchApi.getJoinedGroups(
      profileData.idx
    );
    if (result.length > 0) {
      setJoinedGroups(result.map((cur) => cur.groupidx));
    } else {
      setJoinedGroups([]);
    }
  };

  const getSolvedRate = () => {
    const solvedLength = solvedProblem.filter((item) =>
      joinedGroups?.includes(item.groupIdx)
    ).length;
    return totalProblemsCount === 0
      ? 0
      : Number(((solvedLength / totalProblemsCount) * 100).toFixed(1));
  };

  const getData = async () => {
    await getSolvedProblem();
    await getTotalProblemsCount();
    await getJoinedGroup();
  };

  const resetData = () => {
    setSolvedProblem([]);
    setTotalProblemsCount(0);
    setJoinedGroups(null);
    setSolvedRate(null);
  };

  useEffect(() => {
    if (!isFetching) {
      setIsFetching(true);
      resetData();
    }
  }, [profileData.idx !== 0]);

  useEffect(() => {
    getData();
  }, [joinedGroups === null && profileData.nickname !== '']);

  useEffect(() => {
    const fetchSolvedRate = getSolvedRate();
    setSolvedRate(fetchSolvedRate);
    setIsFetching(false);
  }, [joinedGroups]);

  return (
    <ProfileBarContainer className="no-drag">
      <SolvedTitle>문제 정답률</SolvedTitle>
      {joinedGroups && !isFetching && joinedGroups.length === 0 && <NoGroup />}
      {joinedGroups && joinedGroups.length > 0 && (
        <SolvedBarGraph>
          <InnerBarGraph solvedRate={solvedRate || 0}>
            {solvedRate}%
          </InnerBarGraph>
        </SolvedBarGraph>
      )}
    </ProfileBarContainer>
  );
};

export default ProfileInfoBar;
