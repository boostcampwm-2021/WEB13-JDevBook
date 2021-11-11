import React from 'react';
import styled, { keyframes } from 'styled-components';
import palette from 'theme/palette';

const Wrapper = styled.span`
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 50px;
`;

const SubTitle = styled.div`
  color: ${palette.black};
`;

const Animation = keyframes`
  0% { opacity: 0; transform: translateY(-30px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
  25% { opacity: 1;  transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  75% { opacity: 1;  transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  100% { opacity: 0;  transform: translateY(-30px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
`;

const Content = styled.span`
  width: 50vw;
  font-size: 50px;
  color: ${palette.green};
  display: inline-block;
  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${Animation};
    animation-duration: 4s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }

  ${getAnimaDelay()}
`;

function getAnimaDelay() {
  let str = '';
  for (let i = 1; i <= 8; i++) {
    str += `span:nth-child(${i}) {
            animation-delay: ${i * 0.1}s
        }`;
  }
  return str;
}

const Greeter = () => {
  const textArray = 'JDevBook'.split('');

  return (
    <>
      <Wrapper>
        <SubTitle>우리들의 공간</SubTitle>
        <Content>
          {textArray.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </Content>
      </Wrapper>
    </>
  );
};

export default Greeter;
