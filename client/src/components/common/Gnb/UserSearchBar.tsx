import { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import fetchApi from 'api/fetch';
import { SearchedUser } from 'types/GNB';
import { IconSearch } from 'images/icons';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler } from 'types/common';

const ExtendSearchBarAnimation = keyframes`
  0% {
    width: 240px;
  }

  100% {
    width: 100%;
  }
`;

const UserSearchBarContainer = styled.div<{ isFake: boolean }>`
  width: 240px;
  height: 40px;
  background: ${(props) => props.theme.lightgray};
  border-radius: 24px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  position: relative;

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${(props) => props.theme.black};
    }
  }

  input {
    flex: 1;
    min-width: 0;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;
    height: 100%;
    padding: 0px;
    color: ${(props) => props.theme.black};
  }

  ${({ isFake }) =>
    !isFake &&
    css`
      margin-left: 8px;
      width: 100%;
      animation: ${ExtendSearchBarAnimation} 0.5s ease-in-out;
    `}
`;

const UserSearchBar = ({
  isFake = true,
  setSearchResults
}: {
  isFake?: boolean;
  setSearchResults?: React.Dispatch<
    React.SetStateAction<{
      isProgress: boolean;
      users: SearchedUser[];
    }>
  >;
}) => {
  const [input, setInput] = useState('');
  const handleModal = useModalHandler();
  const inputBox = useRef<HTMLInputElement>(null);

  const onChangeInput = (e: any) => {
    if (!isFake && setSearchResults) {
      setInput(e.target.value);
      setSearchResults({ isProgress: true, users: [] });
    }
  };

  useEffect(() => {
    inputBox.current?.focus();
  }, []);

  // 여기도 AbortController 도입해서 끊어버릴까
  useEffect(() => {
    if (!isFake && setSearchResults) {
      const fetchJob = setTimeout(async () => {
        const users = await fetchApi.searchUsers(input);
        setSearchResults({ isProgress: false, users });
      }, 750);

      return () => clearTimeout(fetchJob);
    }
  }, [input]);

  return (
    <UserSearchBarContainer isFake={isFake} onClick={() => handleModal(ModalHandler.OPEN_USER_SEARCH)}>
      {isFake && <IconSearch />}
      {isFake ? (
        <input type="text" placeholder="사용자 검색" readOnly />
      ) : (
        <input type="text" placeholder="사용자 검색" value={input} onChange={onChangeInput} ref={inputBox} />
      )}
    </UserSearchBarContainer>
  );
};

export default UserSearchBar;
