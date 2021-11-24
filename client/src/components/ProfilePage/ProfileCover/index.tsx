import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { profileState, userDataStates } from 'recoil/store';
import { defaultGroup } from 'images/groupimg';
import fetchApi from 'api/fetch';
import palette from 'theme/palette';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';

const ProfileCoverWrap = styled.div<{ imgsrc: string }>`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  height: 320px;
  background-image: url(${({ imgsrc }) => imgsrc});
  background-size: cover; // 100% 320px;

  display: flex;
  //flex-direction: column;
  justify-content: flex-end;

  /* img {
    width: 100%;
    min-width: 720px;
    max-width: 908px;
    height: 320px;
    object-fit: cover;
  } */
`;

const CoverImageEditBtn = styled.div<{ mine: boolean }>`
  /* position: absolute;
  top: 45vh;
  left: 70vw; */
  /* position: fixed;
  right: 10%; */
  position: relative;
  top: 80%;
  right: 8px;
  width: 120px;
  height: 20px;
  margin-right: 40px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${palette.blue};
  color: ${palette.white};

  display: ${({ mine }) => (mine ? 'flex' : 'none')};
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

const ProfileCover = () => {
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [userData, setUserData] = useRecoilState(userDataStates);
  const [profileData, setProfileData] = useRecoilState(profileState);
  const [imgEdit, setImgEdit] = useState<boolean>(false);
  const alertMessage = useAlertModal();

  const openFileModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userData.name !== profileData.nickname)
      return alertMessage('프로필 소유자가 아닙니다.', palette.alert);
    if (imgEdit) return alertMessage('이미지 업로드 중입니다.', palette.alert);
    inputfile.current.click();
  };

  const uploadOneFile = () => {
    if (imgEdit) return alertMessage('이미지 업로드 중입니다.', palette.alert);
    setImgEdit(true);
    getFile();
  };

  const getFile = async () => {
    const filelist: FileList | null = inputfile.current.files;
    if (!filelist || filelist.length === 0) {
      setImgEdit(false);
      return alertMessage('파일을 가져오지 못했습니다.', palette.alert);
    }

    if (filelist[0].type.match(/image\/*/) === null) {
      setImgEdit(false);
      return alertMessage('이미지 파일이 아닙니다.', palette.alert);
    }

    const imglist: FileList = filelist; //inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) {
      setImgEdit(false);
      if (s3fileRes.file)
        return alertMessage('이미지 업로드 실패', palette.alert);
      else return alertMessage('1MB 이하만 가능합니다.', palette.alert);
    }

    const { check }: { check: boolean } = await fetchApi.updateProfile({
      idx: userData.idx,
      nickname: userData.name,
      // profile은 github링크로 사용
      bio: userData.bio,
      cover: s3fileRes.file.location
    });

    setImgEdit(false);
    if (check) {
      setUserData({
        ...userData,
        cover: s3fileRes.file.location
      });
      setProfileData({ ...profileData, cover: s3fileRes.file.location });
    } else {
      return alertMessage('프로필 업데이트를 하지 못했습니다.', palette.alert);
    }
  };

  return (
    <ProfileCoverWrap
      imgsrc={profileData.cover || defaultGroup}
      className="no-drag"
    >
      <CoverImageEditBtn
        mine={userData.name === profileData.nickname}
        onClick={openFileModal}
      >
        이미지 편집
      </CoverImageEditBtn>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        onChange={uploadOneFile}
        style={{ display: 'none' }}
      />
    </ProfileCoverWrap>
  );
};

export default ProfileCover;
