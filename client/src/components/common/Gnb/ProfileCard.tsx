import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useResetProfile from 'hooks/useResetProfile';

import { ProfilePhoto } from 'components/common';

const ProfileWrap = styled(Link)`
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 12px;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 24px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  p {
    color: ${(props) => props.theme.black};
    margin-left: 8px;
    font-size: 1rem;
    font-weight: bold;
  }

  @media screen and (max-width: 920px) {
    padding: 0px;
    p {
      display: none;
      margin-left: 0px;
    }
    img {
      width: 36px;
      height: 36px;

      &:hover {
        filter: brightness(90%);
      }

      &:active {
        filter: brightness(80%);
      }
    }
  }
`;

const ProfileCard = ({ name }: { name: string }) => {
  const resetProfile = useResetProfile();

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(name);
  };

  return (
    <ProfileWrap to={`/profile/${name}`} onClick={photoClickHandler}>
      <ProfilePhoto userName={name} size="28px" />
      <p>{name}</p>
    </ProfileWrap>
  );
};

export default ProfileCard;
