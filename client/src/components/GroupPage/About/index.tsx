import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { GroupNavState, groupState } from 'recoil/store';
import style from 'theme/style';

const AboutContainer = styled.div<{ navState: boolean }>`
  width: 680px;
  box-sizing: border-box;
  margin: ${style.margin.large};
  padding: 28px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;

  display: ${(props) => (props.navState ? 'flex' : 'none')};
  flex-direction: column;
`;

const AboutTitle = styled.div`
  height: 40px;
  padding-left: 16px;

  font-size: ${style.font.large};
  color: ${(props) => props.theme.black};

  display: flex;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0;

  background-color: ${(props) => props.theme.gray};
`;

const AboutDescription = styled.div`
  height: 40px;
  padding-left: 16px;

  font-size: ${style.font.normal};
  color: ${(props) => props.theme.black};

  display: flex;
  align-items: center;
`;

const About = () => {
  const groupNavState = useRecoilValue(GroupNavState);
  const groupData = useRecoilValue(groupState);

  return (
    <AboutContainer navState={groupNavState.about}>
      <AboutTitle>소개</AboutTitle>
      <Line />
      <AboutDescription>{groupData.description}</AboutDescription>
    </AboutContainer>
  );
};

export default About;
