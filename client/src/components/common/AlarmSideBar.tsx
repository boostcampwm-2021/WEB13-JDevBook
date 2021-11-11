import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates, userData } from 'recoil/store';

const AlarmSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);
`;

const AlarmSideBar = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  if (rightModalState.rightModalFlag && rightModalState.alarmFlag) {
    return <AlarmSideBarContainer>This is AlarmSideBar</AlarmSideBarContainer>;
  } else return null;
};

export default AlarmSideBar;
