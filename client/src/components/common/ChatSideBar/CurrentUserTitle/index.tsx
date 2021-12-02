import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { rightModalStates } from 'recoil/common';
import { usersNumState } from 'recoil/group';

import style from 'theme/style';

const CurrentUserTitleContainer = styled.div<{
  rightModalFlag: boolean;
  messageFlag: boolean;
}>`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

  margin-top: ${style.margin.small};
`;

const CurrentUserTitle = () => {
  const rightModalState = useRecoilValue(rightModalStates);
  const usersNum = useRecoilValue(usersNumState);

  return (
    <CurrentUserTitleContainer
      rightModalFlag={rightModalState.rightModalFlag}
      messageFlag={rightModalState.messageFlag}
    >
      전체 유저 {usersNum}명
    </CurrentUserTitleContainer>
  );
};

export default CurrentUserTitle;
