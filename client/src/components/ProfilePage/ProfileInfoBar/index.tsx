import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { profileSolvedRate } from 'recoil/user';

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
  color: ${(props) => props.theme.inColorBox};
  font-size: small;
  font-weight: 600;
  animation: ${(props) => GraphAnimation(props.solvedRate)} 1.5s 1;
`;

const ProfileInfoBar = () => {
  const solvedRate = useRecoilValue(profileSolvedRate);

  return (
    <ProfileBarContainer className="no-drag">
      <SolvedTitle>문제 정답률</SolvedTitle>
      {solvedRate === -1 && <NoGroup />}
      {solvedRate >= 0 && (
        <SolvedBarGraph>
          <InnerBarGraph solvedRate={solvedRate || 0}>{solvedRate}%</InnerBarGraph>
        </SolvedBarGraph>
      )}
    </ProfileBarContainer>
  );
};

export default ProfileInfoBar;
