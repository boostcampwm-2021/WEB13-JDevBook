import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { commonState } from 'recoil/common';

import GroupSideBar from 'components/common/LeftSideBar/GroupSideBar';
import InfoSideBar from 'components/common/LeftSideBar/InfoSideBar';

const SideBarContainer = styled.div<{ commonState: boolean }>`
  position: fixed;
  top: 56px;
  left: 0;
  width: 340px;
  height: calc(100vh - 56px);
  z-index: 1;

  display: ${(props) => (props.commonState ? 'flex' : 'none')};
  flex-direction: column;

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const LeftSideBar = () => {
  const commonDisplay = useRecoilValue(commonState);

  return (
    <SideBarContainer commonState={commonDisplay}>
      <InfoSideBar />
      <GroupSideBar />
    </SideBarContainer>
  );
};

export default LeftSideBar;
