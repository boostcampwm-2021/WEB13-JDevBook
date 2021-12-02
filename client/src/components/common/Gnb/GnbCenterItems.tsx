import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentPageStates } from 'recoil/common';

import { Page } from 'types/common';
import { GnbHome, GnbGroup, GnbHomeActive, GnbGroupActive } from 'images/icons';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 852px) {
    margin-left: 20px;
  }
`;

const NavButton = styled(Link)<{ $current: boolean }>`
  width: 112px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color border-radius 0.1s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 8px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  & + & {
    margin-left: 8px;
  }

  svg path {
    ${({ $current }) =>
      $current
        ? css`
            fill: ${(props) => props.theme.green};
          `
        : css`
            fill: ${(props) => props.theme.darkgray};
          `}
  }

  @media screen and (max-width: 920px) {
    width: 60px;
    height: 48px;
  }
`;

const GnbCenterItems = () => {
  const currentPage = useRecoilValue(currentPageStates);

  return (
    <ItemContainer>
      <NavButton to="/home" $current={currentPage === Page.HOME}>
        {currentPage === Page.HOME ? <GnbHomeActive /> : <GnbHome />}
      </NavButton>
      <NavButton to="/groupselect" $current={currentPage === Page.GROUP_SELECT}>
        {currentPage === Page.GROUP_SELECT ? <GnbGroupActive /> : <GnbGroup />}
      </NavButton>
    </ItemContainer>
  );
};

export default GnbCenterItems;
