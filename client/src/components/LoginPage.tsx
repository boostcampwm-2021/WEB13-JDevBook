import { Children, useEffect } from "react";
import styled, {css} from "styled-components";
import githubLogo from '../images/githubLogo.png'

const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledImg = styled.img`
    width: 50px;
    height: auto;
`;

// const Button = ({ children }: any) => {
//     return <StyledButton>{ children }</StyledButton>
// }

const LoginPage = () => {

    const loginGithub = (e: any) => {
        fetch('/oauth/login')
        .then(res => res.json())
        .then(loginLink => {
            window.location.href = loginLink;
        })
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <StyledButton onClick={loginGithub}>
                <StyledImg src={githubLogo}/>
                Login with Github
            </StyledButton>
        </div>
    )
}

export default LoginPage;