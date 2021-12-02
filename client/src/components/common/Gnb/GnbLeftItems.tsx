import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { modalStateStore } from 'recoil/common';

import { mainLogo } from 'images';

import UserSearchBar from 'components/common/Gnb/UserSearchBar';
import UserSearchModal from 'components/common/Gnb/UserSearchModal';

const MainLogo = styled(Link)`
  width: 40px;
  height: 40px;
  display: block;
  background-image: url(${mainLogo});
  background-size: 40px 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 8px;
  }
`;

const GnbLeftItems = () => {
  const modalState = useRecoilValue(modalStateStore);
  return (
    <ItemContainer>
      <MainLogo to="/home" />
      <UserSearchBar />
      {modalState.searchUser && <UserSearchModal />}
    </ItemContainer>
  );
};

export default GnbLeftItems;
