import styled from 'styled-components';

const GnbContainer = styled.div`
  position: sticky;
  width: 100%;
  min-width: 720px;
  height: 56px;
  top: 0;
`;

const FakeGnb = () => {
  return <GnbContainer />;
};

export default FakeGnb;
