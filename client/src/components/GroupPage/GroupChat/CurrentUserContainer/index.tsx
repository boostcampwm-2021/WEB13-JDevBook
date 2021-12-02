import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { loginState } from 'recoil/common';

import style from 'theme/style';

import { ClickableProfilePhoto } from 'components/common';

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 210px;

  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;

    margin-left: ${style.margin.small};
    margin-right: ${style.margin.small};
  }
`;

const CurrentUserBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 10px;
`;

const LoginState = styled.div<{ user: string; loginStateArray: any }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: ${style.margin.small};
  ${(props) =>
    `background-color: ${props.loginStateArray?.includes(props.user) ? props.theme.green : props.theme.darkgray};`}
`;

const CurrentUserContainer = ({ allUsers }: { allUsers: string[] }) => {
  const loginStateArray = useRecoilValue(loginState);

  const UserList = allUsers.map((user: string, idx: number) => (
    <CurrentUserBox key={idx} className="User">
      <ClickableProfilePhoto userName={user} size={'30px'} />
      <LoginState user={user} loginStateArray={loginStateArray} />
      {user}
    </CurrentUserBox>
  ));
  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

export default CurrentUserContainer;
