import React from 'react';
import styled from 'styled-components';

import { SideBarProps } from 'types/common';

const SideBarContainer = styled.div<SideBarProps>`
  position: fixed;
  width: 340px;
  height: calc(100vh - 56px);
  top: 56px;
  ${(props) => (props.isLeft ? `left: 0` : `right: 0`)};

  display: flex;
  flex-direction: column;
`;

const SideBar = ({ isLeft, children }: SideBarProps) => {
  return <SideBarContainer isLeft={isLeft}>{children}</SideBarContainer>;
};

export default SideBar;
