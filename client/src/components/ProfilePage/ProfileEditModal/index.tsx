import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { profileState } from 'recoil/user';

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
  const [profileData, setProfileData] = useRecoilState(profileState);
  const [modalState, setModalState] = useRecoilState(modalStateStore);
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
        ? alertMessage('성공적으로 수정되었습니다!')
        : alertMessage('알 수 없는 이유로 수정에 실패하였습니다.', true);
    } else {
      return alertMessage('내용을 입력하세요.', true);
    }
    setProfileData({ ...profileData, bio: bio.trim() });
    setModalState({ ...modalState, editProfile: false });
  };

  const cancelBtnHandler = (e: React.MouseEvent) => {
    setModalState({ ...modalState, editProfile: false });
  };

  const bioLengthCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 100;

    if (bio.length > maxLength) {
      let contents = bio;
      alertMessage(`자기소개는 ${maxLength}글자를 넘을 수 없습니다.`, true);
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
      <BioTitle>자기소개</BioTitle>
      <BioArea onChange={inputContents} onKeyUp={bioLengthCheck} value={bio} placeholder="자기소개를 적어주세요." />
      <BtnWrap>
        <StyledBtn onClick={saveBtnHandler} saveBtn={true}>
          저장
        </StyledBtn>
        <StyledBtn onClick={cancelBtnHandler} saveBtn={false}>
          취소
        </StyledBtn>
      </BtnWrap>
    </EditModalWrap>
  );
};

export default ProfileEditModal;
