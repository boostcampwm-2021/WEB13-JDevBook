import React, { useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  solvedProblemState,
  userDataStates,
  rateState,
  myJoinedGroupState
} from 'recoil/store';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';
import useResetProfile from 'hooks/useResetProfile';

import { ProfilePhoto } from 'components/common';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background: ${palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 3px 3px 3px;
`;

const ProfileWrap = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 35px 50px 0 50px;
  text-decoration: none;
  color: ${palette.black};

  p {
    font-size: large;
    font-weight: bold;
    margin: 20px 20px;
  }
`;

const SolvedTitle = styled.div`
  font-weight: bold;
  margin: 10px 50px;
`;

const NoGroup = styled.div`
  margin: 0 50px;
  color: ${palette.darkgray};

  &:after {
    content: '가입된 그룹이 없습니다';
  }
`;

const SolvedBarGraph = styled.div`
  height: 25px;
  background: ${palette.gray};
  border-radius: 40px;
  margin: 0 50px;
`;

const GraphAnimation = (prevRate: number, solvedRate: number) => keyframes`
  0% {
    width: ${prevRate}%;
  }
  100% {
    width: ${solvedRate}%;
  }
`;

const InnerBarGraph = styled.span<{ prevRate: number; solvedRate: number }>`
  display: block;
  width: ${(props) => props.solvedRate}%;
  height: 25px;
  line-height: 25px;
  text-align: right;
  background: ${palette.green};
  border-radius: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  color: ${palette.white};
  font-size: small;
  font-weight: 600;
  animation: ${(props) => GraphAnimation(props.prevRate, props.solvedRate)} 1.5s
    1;
`;

const InfoSideBar = () => {
  const userdata = useRecoilValue(userDataStates);
  const joinedGroups = useRecoilValue(myJoinedGroupState);
  const solvedProblem = useRecoilValue(solvedProblemState);
  const [rate, setRate] = useRecoilState(rateState);
  const resetProfile = useResetProfile();

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(userdata.name);
  };

  const prevRateUpdate = (e: React.AnimationEvent) => {
    setRate((prev) => ({ ...prev, prevRate: rate.solvedRate }));
  };

  const getSolvedRate = useCallback(() => {
    const solvedLength = solvedProblem.filter((item) =>
      joinedGroups?.includes(item.groupIdx)
    ).length;
    return rate.totalProblemsCount === 0
      ? 0
      : Number(((solvedLength / rate.totalProblemsCount) * 100).toFixed(1));
  }, [solvedProblem, rate.totalProblemsCount, joinedGroups]);

  useEffect(() => {
    const solvedRate = getSolvedRate();
    setRate((prev) => ({ ...prev, solvedRate }));
  }, [solvedProblem, rate.totalProblemsCount]);

  useEffect(() => {
    const initProblemCount = async () => {
      const totalProblemsCount = (await fetchApi.getProblems()).length;
      setRate((prev) => ({ ...prev, totalProblemsCount }));
    };
    if (joinedGroups) {
      initProblemCount();
    }
  }, [joinedGroups]);

  return (
    <InfoSideBarContainer className="no-drag">
      <ProfileWrap to={`/profile/${userdata.name}`} onClick={photoClickHandler}>
        <ProfilePhoto userName={userdata.name} />
        <p>{userdata.name}</p>
      </ProfileWrap>
      <SolvedTitle>문제 정답률</SolvedTitle>
      {joinedGroups && joinedGroups.length === 0 && <NoGroup />}
      {joinedGroups && joinedGroups.length > 0 && (
        <SolvedBarGraph>
          <InnerBarGraph
            prevRate={rate.prevRate}
            solvedRate={rate.solvedRate}
            onAnimationEnd={prevRateUpdate}
          >
            {rate.totalProblemsCount !== 0 && `${rate.solvedRate}%`}
          </InnerBarGraph>
        </SolvedBarGraph>
      )}
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
