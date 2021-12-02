import styled from 'styled-components';

import { iconSubmit, iconSubmitActive } from 'images/icons';

const SubmitBtnWrapper = styled.button`
  border: none;
  background-color: ${(props) => props.theme.white};
  transform: translateY(2px);
  margin-left: 16px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-bottom: 8px;
  }
`;

const SubmitBtn = () => {
  return (
    <SubmitBtnWrapper id="group-chat-submit-btn">
      <img
        src={iconSubmit}
        onMouseOver={(e) => (e.currentTarget.src = `${iconSubmitActive}`)}
        onMouseOut={(e) => (e.currentTarget.src = `${iconSubmit}`)}
        alt="submit-btn"
      />
    </SubmitBtnWrapper>
  );
};

export default SubmitBtn;
