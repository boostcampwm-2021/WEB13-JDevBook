import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/common';

import { SearchedUser } from 'types/GNB';
import useResetProfile from 'hooks/useResetProfile';

import { ProfilePhoto } from 'components/common';

const CardWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;

  p {
    margin-left: 16px;
    font-size: 0.95rem;
    color: ${(props) => props.theme.black};
    text-decoration: none;
  }

  &:hover {
    background: ${(props) => props.theme.lightgray};
    border-radius: 8px;
  }
`;

const NavLink = styled(Link)`
  display: block;
  margin-top: 4px;
`;

const UserCard = ({ user }: { user: SearchedUser }) => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const resetProfile = useResetProfile();

  const handleCardClick = () => {
    resetProfile(user.nickname);
    setModalState({ ...modalState, searchUser: false });
  };

  return (
    <NavLink to={`/profile/${user.nickname}`} onClick={handleCardClick}>
      <CardWrap>
        <ProfilePhoto userName={user.nickname} size="36px" />
        <p>{user.nickname}</p>
      </CardWrap>
    </NavLink>
  );
};

export default UserCard;
