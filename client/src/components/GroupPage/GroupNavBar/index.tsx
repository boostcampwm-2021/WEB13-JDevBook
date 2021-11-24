import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

import GroupNavTitle from 'components/GroupPage/GroupNavBar/GroupNavTitle';
import GroupNavMiddle from 'components/GroupPage/GroupNavBar/GroupNavMiddle';
import GroupNavigation from 'components/GroupPage/GroupNavBar/GroupNavigation';

const GroupNavContainer = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  box-sizing: border-box;
  padding: 28px 28px 0 28px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  background-color: ${palette.white};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0 0 0;

  background-color: ${palette.gray};
`;

const GroupNavBar = () => {
  return (
    <GroupNavContainer>
      <GroupNavTitle />
      <GroupNavMiddle />
      <Line />
      <GroupNavigation />
    </GroupNavContainer>
  );
};

export default GroupNavBar;
