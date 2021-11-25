import styled, { keyframes } from 'styled-components';

const EnterAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const ExplanationWrap = styled.div`
  width: 100%;
  background: ${(props) => props.theme.white};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 16px 24px;
  animation: ${EnterAnimation} 0.5s;

  p {
    color: ${(props) => props.theme.black};
  }
  p:nth-child(2) {
    margin-top: 8px;
    font-size: 14px;
    color: ${(props) => props.theme.darkgray};
    line-height: 1.5;
  }
`;

const Explanation = ({ explanation }: { explanation: string }) => {
  return (
    <ExplanationWrap>
      <p>해설</p>
      <p>{explanation}</p>
    </ExplanationWrap>
  );
};

export default Explanation;
