// import { Children, useEffect } from 'react';
// import styled, { css } from 'styled-components';
// import githubLogo from '../images/githubLogo.png';

// const StyledButton = styled.button`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;

// const StyledImg = styled.img`
//   width: 50px;
//   height: auto;
// `;

// const Button = ({ children }: any) => {
//     return <StyledButton>{ children }</StyledButton>
// }

// const LoginPage = () => {
//   const loginGithub = (e: any) => {
//     fetch('/oauth/login')
//       .then((res) => res.json())
//       .then((loginLink) => {
//         window.location.href = loginLink;
//       });
//   };

//   useEffect(() => {}, []);

//   return (
//     <div>
//       <StyledButton onClick={loginGithub}>
//         <StyledImg src={githubLogo} />
//         Login with Github
//       </StyledButton>
//     </div>
//   );
// };

import React from 'react';
import styled from 'styled-components';
import Greeter from '../components/LoginPage/Greeter';
import LoginBox from '../components/LoginPage/LoginBox';

const LoginPage = () => {
  return (
    <Content>
      <Greeter />
      <LoginBox />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background-color: #53B23B;
`;

export default LoginPage;
