import styled from 'styled-components';
import style from 'theme/style';

const CurrentUserTitleWrapper = styled.div`
  text-align: center;
  font-size: ${style.font.small};
  color: ${(props) => props.theme.darkgray};

  margin-top: ${style.margin.small};
`;

const CurrentUserTitle = () => {
  return <CurrentUserTitleWrapper>이 그룹에 가입한 유저</CurrentUserTitleWrapper>;
};

export default CurrentUserTitle;
