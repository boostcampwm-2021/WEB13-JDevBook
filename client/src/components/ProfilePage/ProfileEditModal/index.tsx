import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { profileState } from 'recoil/user';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler } from 'types/common';

import style from 'theme/style';
import fetchApi from 'api/fetch';
import useAlertModal from 'hooks/useAlertModal';

const EditModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const EditModalWrap = styled.div<{ modalState: boolean }>`
  position: relative;
  top: -44px;
  height: inherit;
  box-sizing: border-box;
  padding: ${style.padding.normal};
  margin-right: 12px;
  z-index: 5;

  background-color: ${(props) => props.theme.white};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  animation: ${EditModalAnimation} 0.1s;
`;

const BioTitle = styled.div`
  padding-left: ${style.padding.small};

  color: ${(props) => props.theme.darkgray};
`;

const BioArea = styled.textarea`
  box-sizing: border-box;
  padding: ${style.padding.small};

  border: none;
  outline: none;
  resize: none;
  background-color: ${(props) => props.theme.white};
  font-size: ${style.font.normal};
  color: ${(props) => props.theme.black};

  overscroll-behavior: none;
  word-break: keep-all;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  :-ms-input-placeholder {
    color: #bfbfbf;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledBtn = styled.div<{ saveBtn: boolean }>`
  width: 60px;
  height: 20px;
  padding: 8px ${style.padding.normal};
  margin: 0 ${style.margin.smallest};

  border-radius: 8px;
  background-color: ${(props) => (props.saveBtn ? props.theme.green : props.theme.gray)};
  color: ${(props) => (props.saveBtn ? props.theme.inColorBox : props.theme.black)};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
    font-size: 15px;
  }
`;

const ProfileEditModal = () => {
  const modalState = useRecoilValue(modalStateStore);
  const handleModal = useModalHandler();
  const [profileData, setProfileData] = useRecoilState(profileState);
  const [bio, setBio] = useState<string>('');
  const alertMessage = useAlertModal();

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const saveBtnHandler = async (e: React.MouseEvent) => {
    if (bio.length !== 0) {
      const result = await fetchApi.updateProfile({
        ...profileData,
        bio: bio.trim()
      });
      result !== undefined
        ? alertMessage('??????????????? ?????????????????????!')
        : alertMessage('??? ??? ?????? ????????? ????????? ?????????????????????.', true);
    } else {
      return alertMessage('????????? ???????????????.', true);
    }
    setProfileData({ ...profileData, bio: bio.trim() });
    handleModal(ModalHandler.CLOSE_ALL);
  };

  const cancelBtnHandler = (e: React.MouseEvent) => {
    handleModal(ModalHandler.CLOSE_ALL);
  };

  const bioLengthCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 100;

    if (bio.length > maxLength) {
      let contents = bio;
      alertMessage(`??????????????? ${maxLength}????????? ?????? ??? ????????????.`, true);
      while (contents.length > maxLength) {
        contents = contents.slice(0, -1);
      }
      setBio(contents);
    }
  };

  useEffect(() => {
    setBio(profileData.bio || '');
  }, [profileData.bio]);

  return (
    <EditModalWrap modalState={modalState.editProfile}>
      <BioTitle>????????????</BioTitle>
      <BioArea onChange={inputContents} onKeyUp={bioLengthCheck} value={bio} placeholder="??????????????? ???????????????." />
      <BtnWrap>
        <StyledBtn onClick={saveBtnHandler} saveBtn={true}>
          ??????
        </StyledBtn>
        <StyledBtn onClick={cancelBtnHandler} saveBtn={false}>
          ??????
        </StyledBtn>
      </BtnWrap>
    </EditModalWrap>
  );
};

export default ProfileEditModal;
