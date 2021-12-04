import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';

import { SearchedUser } from 'types/GNB';
import { ModalHandler } from 'types/common';
import useModalHandler from 'hooks/useModalHandler';

import { UserCard } from 'components/common';
import UserSearchBar from 'components/common/Gnb/UserSearchBar';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const ModalHeader = styled(FlexBox)`
  display: flex;
  justify-content: space-between;

  svg {
    color: ${(props) => props.theme.darkgray};
  }
  margin-right: 8px;
`;

const UserSearchModalContainer = styled.div`
  width: 320px;
  max-height: 600px;
  box-shadow: ${(props) => props.theme.shadow.searchUser};
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px 8px 0px 8px;
  box-sizing: border-box;

  svg {
    font-size: 22px;
  }
`;

const HoverRound = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightgray};
    border-radius: 100%;
  }
`;

const SearchModalBody = styled.div`
  width: 100%;
  margin-top: 8px;
  padding-bottom: 8px;
  max-height: calc(600px - 56px);
  box-sizing: border-box;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > p {
    text-align: center;
    color: ${(props) => props.theme.darkgray};
  }
`;

const UserSearchModal = () => {
  const handleModal = useModalHandler();
  const [searchResults, setSearchResults] = useState<{
    isProgress: boolean;
    users: SearchedUser[];
  }>({ isProgress: false, users: [] });

  const modal = React.useRef<HTMLDivElement>(null);

  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    handleModal(ModalHandler.CLOSE_ALL);
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <UserSearchModalContainer className="no-drag" ref={modal}>
      <ModalHeader>
        <HoverRound
          onClick={(e) => {
            e.stopPropagation();
            closeModal(e, true);
          }}
        >
          <MdArrowBack />
        </HoverRound>
        <UserSearchBar isFake={false} setSearchResults={setSearchResults} />
      </ModalHeader>
      <SearchModalBody>
        {searchResults.isProgress ? (
          <p>검색 중...</p>
        ) : searchResults.users.length === 0 ? (
          <p>결과 없음</p>
        ) : (
          searchResults.users.map((result) => <UserCard key={result.idx} user={result} />)
        )}
      </SearchModalBody>
    </UserSearchModalContainer>
  );
};

export default UserSearchModal;
