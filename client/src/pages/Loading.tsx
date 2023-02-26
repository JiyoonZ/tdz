import styled, { keyframes } from 'styled-components';

function Loading() {
  return (
    <>
      <LoadingBar src={require('../assets/loading.png')}></LoadingBar>
      <LoadingH1>Loading...</LoadingH1>
    </>
  );
}

const LoadingH1 = styled.h1`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  margin-top: 245px;
  color: #666666;
`;
const rotation = keyframes`
    from{
        transform:rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

const LoadingBar = styled.img`
  width: 40px;
  position: absolute;
  bottom: 410px;
  animation: ${rotation} 1s linear infinite;
`;

export default Loading;
