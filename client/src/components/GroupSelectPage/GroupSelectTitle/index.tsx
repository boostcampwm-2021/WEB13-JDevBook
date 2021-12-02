import styled from 'styled-components';

import style from 'theme/style';

const GroupSelectTitleWrap = styled.div`
  width: 100%;
  margin-left: 16px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: ${style.font.title};
  color: ${(props) => props.theme.black};
`;
const Description = styled.div`
  margin: ${style.margin.normal} 0;
  font-size: ${style.font.normal};
  color: ${(props) => props.theme.black};
`;

const GroupSelectTitle = () => {
  return (
    <GroupSelectTitleWrap className="no-drag">
      <Title>그룹 찾기</Title>
      <Description>원하는 그룹을 선택하고 다양한 문제풀이와 토론을 해 보세요!</Description>
    </GroupSelectTitleWrap>
  );
};

export default GroupSelectTitle;
