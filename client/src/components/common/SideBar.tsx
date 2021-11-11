import React from 'react';
import styled from 'styled-components';

import { SideBarProps } from 'utils/types';

const SideBarContainer = styled.div<SideBarProps>`
  width: 340px;
  height: calc(100vh - 56px);
  top: 56px;
  ${(props) => (props.isLeft ? `left: 0` : `right: 0`)};
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const SideBar = ({ isLeft, children }: SideBarProps) => {
  return <SideBarContainer isLeft={isLeft}>{children}</SideBarContainer>;
};

export default SideBar;
