import React from 'react';
import styled, { css } from 'styled-components';

import { SideBarProps } from 'types/common';

const SideBarContainer = styled.div<SideBarProps>`
  position: sticky;
  top: 0;
  width: 340px;
  height: calc(100vh - 56px);
  top: 56px;
  ${(props) => (props.isLeft ? `left: 0` : `right: 0`)};

  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isLeft
      ? css`
          @media screen and (max-width: 1040px) {
            display: none;
          }
        `
      : ``};
`;

const SideBar = ({ isLeft, children }: SideBarProps) => {
  return <SideBarContainer isLeft={isLeft}>{children}</SideBarContainer>;
};

export default SideBar;
