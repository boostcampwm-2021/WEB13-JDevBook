import styled from 'styled-components';

const Footer = () => {
    return (
        <Text>Made by 부스트캠프 WEB 6기 - 제이6543 ( 박기태, 신태수, 이동현, 현상엽 )</Text>
    );
};

const Text = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default Footer;