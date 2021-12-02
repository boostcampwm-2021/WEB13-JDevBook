import styled from 'styled-components';

const SideBarContainer = styled.div`
  position: sticky;
  top: 56px;
  left: 0;
  width: 340px;
  height: calc(100vh - 56px);

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const FakeSideBar = () => {
  return <SideBarContainer />;
};

export default FakeSideBar;
